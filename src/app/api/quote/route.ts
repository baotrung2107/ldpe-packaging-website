import { NextResponse } from "next/server";
import { getCMSStore, saveCMSStore } from "@/lib/cms-store";

const TELEGRAM_BOT_TOKEN = "8957063322:AAGJm4c-d1s4nOn9-cg26NVWzhLS33rFpao";
const BOT_USERNAME = "Nhamaydppepoam_bot";

function escapeHTML(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName = "",
      contactName = "",
      phone = "",
      email = "",
      productToPack = "",
      materialGroup = "",
      dimensions = "",
      quantity = "",
      storageCondition = "",
      processingRequirements = "",
      consultingContent = "",
      fileName = null,
    } = body;

    const formattedTime = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    // Safe HTML Telegram message format (100% immune to special chars in emails & underscores)
    const messageHtml = `<b>🚨 YÊU CẦU BÁO GIÁ MỚI TỪ WEBSITE 🚨</b>
━━━━━━━━━━━━━━━━━━
🏢 <b>Doanh nghiệp</b>: ${escapeHTML(companyName) || "Chưa nhập"}
👤 <b>Người liên hệ</b>: ${escapeHTML(contactName) || "Chưa nhập"}
📞 <b>Số điện thoại / Zalo</b>: ${escapeHTML(phone) || "Chưa nhập"}
✉️ <b>Email</b>: ${escapeHTML(email) || "Chưa nhập"}

📦 <b>Sản phẩm cần đóng gói</b>: ${escapeHTML(productToPack) || "Chưa nhập"}
🧩 <b>Nhóm vật liệu</b>: ${escapeHTML(materialGroup) || "Chưa chọn"}
📐 <b>Kích thước</b>: ${escapeHTML(dimensions) || "Chưa nhập"}
🔢 <b>Số lượng dự kiến</b>: ${escapeHTML(quantity) || "Chưa nhập"}
🚚 <b>Lưu kho / Vận chuyển</b>: ${escapeHTML(storageCondition) || "Chưa nhập"}
🛠️ <b>Yêu cầu gia công</b>: ${escapeHTML(processingRequirements) || "Chưa nhập"}
${fileName ? `📄 <b>Tệp bản vẽ</b>: ${escapeHTML(fileName)}\n` : ""}💬 <b>Ghi chú thêm</b>: ${escapeHTML(consultingContent) || "Không có"}

⏰ <b>Thời gian gửi</b>: ${escapeHTML(formattedTime)}
🌐 <b>Nguồn</b>: Website LDPE Packaging Đức Phúc`;

    // 1. Store lead in CMS store so zero leads are ever lost
    try {
      const store = getCMSStore();
      const existingQuotes = (store as any).quotes || [];
      const newQuoteItem = {
        id: `quote_${Date.now()}`,
        createdAt: formattedTime,
        companyName,
        contactName,
        phone,
        email,
        productToPack,
        materialGroup,
        dimensions,
        quantity,
        storageCondition,
        processingRequirements,
        consultingContent,
        fileName,
      };
      saveCMSStore({
        ...store,
        quotes: [newQuoteItem, ...existingQuotes].slice(0, 100), // Keep latest 100 quotes
      } as any);
    } catch (e) {
      console.error("Error storing quote lead to CMS store:", e);
    }

    // 2. Collect all candidate Telegram chat IDs
    const targetChatIds: Array<string | number> = [];

    // Check CMS store for manually configured chat ID
    const store = getCMSStore();
    const cmsChatId = store.published?.telegram_chat_id || store.draft?.telegram_chat_id || process.env.TELEGRAM_CHAT_ID;
    if (cmsChatId && !targetChatIds.includes(cmsChatId)) {
      targetChatIds.push(cmsChatId);
    }

    // Query Telegram API getUpdates to find all active chat IDs
    try {
      const updatesRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
      const updatesData = await updatesRes.json();
      if (updatesData.ok && Array.isArray(updatesData.result)) {
        for (const item of updatesData.result) {
          const chat = item.message?.chat || item.channel_post?.chat || item.my_chat_member?.chat;
          if (chat && chat.id && !targetChatIds.includes(chat.id)) {
            targetChatIds.push(chat.id);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching Telegram getUpdates:", err);
    }

    // 3. Dispatch to all active chat IDs with parse_mode: HTML
    const sendResults = [];
    if (targetChatIds.length > 0) {
      for (const chatId of targetChatIds) {
        try {
          const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageHtml,
              parse_mode: "HTML",
            }),
          });
          const resultData = await telegramRes.json();
          sendResults.push({ chatId, ok: resultData.ok, description: resultData.description });
        } catch (e) {
          console.error(`Error sending message to chatId ${chatId}:`, e);
        }
      }
    }

    const anySuccess = sendResults.some((r) => r.ok);

    return NextResponse.json({
      success: true,
      message: "Yêu cầu báo giá đã được nhận thành công!",
      telegramSent: anySuccess,
      chatCount: targetChatIds.length,
      sendResults,
      notice: !anySuccess
        ? `Bot chưa có Chat ID. Vui lòng mở https://t.me/${BOT_USERNAME} và bấm START.`
        : null,
    });
  } catch (error) {
    console.error("Error processing quote submission:", error);
    return NextResponse.json(
      { success: false, error: "Không thể xử lý yêu cầu báo giá" },
      { status: 500 }
    );
  }
}
