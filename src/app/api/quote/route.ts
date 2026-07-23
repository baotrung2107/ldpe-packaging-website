import { NextResponse } from "next/server";
import { getCMSStore } from "@/lib/cms-store";

const TELEGRAM_BOT_TOKEN = "8957063322:AAGJm4c-d1s4nOn9-cg26NVWzhLS33rFpao";
const BOT_USERNAME = "Nhamaydppepoam_bot";

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
    } = body;

    const formattedTime = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    // Format rich Telegram message
    const message = `🚨 *YÊU CẦU BÁO GIÁ MỚI TỪ WEBSITE* 🚨
━━━━━━━━━━━━━━━━━━
🏢 *Doanh nghiệp*: ${companyName || "Chưa nhập"}
👤 *Người liên hệ*: ${contactName || "Chưa nhập"}
📞 *Số điện thoại / Zalo*: ${phone || "Chưa nhập"}
✉️ *Email*: ${email || "Chưa nhập"}

📦 *Sản phẩm cần đóng gói*: ${productToPack || "Chưa nhập"}
🧩 *Nhóm vật liệu*: ${materialGroup || "Chưa chọn"}
📐 *Kích thước*: ${dimensions || "Chưa nhập"}
🔢 *Số lượng dự kiến*: ${quantity || "Chưa nhập"}
🚚 *Lưu kho / Vận chuyển*: ${storageCondition || "Chưa nhập"}
🛠️ *Yêu cầu gia công*: ${processingRequirements || "Chưa nhập"}
💬 *Ghi chú thêm*: ${consultingContent || "Không có"}

⏰ *Thời gian*: ${formattedTime}
🌐 *Nguồn*: Website LDPE Packaging Đức Phúc`;

    // Collect all candidate chat IDs
    const targetChatIds: Array<string | number> = [];

    // 1. Check CMS Store for manually configured chat ID
    const store = getCMSStore();
    const cmsChatId = store.published?.telegram_chat_id || store.draft?.telegram_chat_id || process.env.TELEGRAM_CHAT_ID;
    if (cmsChatId) {
      targetChatIds.push(cmsChatId);
    }

    // 2. Fetch updates from Telegram API to find all users/groups that have messaged the bot
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

    // 3. Send message to all active chat IDs
    const sendResults = [];
    if (targetChatIds.length > 0) {
      for (const chatId of targetChatIds) {
        try {
          const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "Markdown",
            }),
          });
          const resultData = await telegramRes.json();
          sendResults.push({ chatId, ok: resultData.ok, resultData });
        } catch (e) {
          console.error(`Error sending message to chatId ${chatId}:`, e);
        }
      }
    } else {
      console.warn(`[TELEGRAM WARNING] No chat_id found for bot @${BOT_USERNAME}. Please start the bot at https://t.me/${BOT_USERNAME}`);
    }

    const anySuccess = sendResults.some((r) => r.ok);

    return NextResponse.json({
      success: true,
      message: "Yêu cầu báo giá đã được tiếp nhận thành công!",
      telegramSent: anySuccess,
      chatCount: targetChatIds.length,
      sendResults,
      notice: !anySuccess
        ? `Vui lòng truy cập https://t.me/${BOT_USERNAME} và bấm START để kích hoạt nhận tin nhắn Telegram.`
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
