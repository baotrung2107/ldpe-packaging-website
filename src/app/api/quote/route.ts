import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8957063322:AAGJm4c-d1s4nOn9-cg26NVWzhLS33rFpao";

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

    // Attempt to get active chat IDs from Telegram getUpdates or process.env
    let chatId = process.env.TELEGRAM_CHAT_ID;

    if (!chatId) {
      try {
        const updatesRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
        const updatesData = await updatesRes.json();
        if (updatesData.ok && updatesData.result && updatesData.result.length > 0) {
          // Grab the last chat ID from getUpdates
          const lastUpdate = updatesData.result[updatesData.result.length - 1];
          chatId = lastUpdate.message?.chat?.id || lastUpdate.channel_post?.chat?.id;
        }
      } catch (err) {
        console.error("Failed to auto-detect Telegram chat ID:", err);
      }
    }

    // Send Telegram Notification
    let telegramResult = null;
    if (chatId) {
      const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
      telegramResult = await telegramRes.json();
    }

    return NextResponse.json({
      success: true,
      message: "Yêu cầu báo giá đã được nhận thành công!",
      telegramSent: !!(telegramResult && telegramResult.ok),
    });
  } catch (error) {
    console.error("Error processing quote submission:", error);
    return NextResponse.json(
      { success: false, error: "Không thể xử lý yêu cầu báo giá" },
      { status: 500 }
    );
  }
}
