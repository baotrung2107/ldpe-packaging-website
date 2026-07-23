import { NextResponse } from "next/server";
import { getCMSStore } from "@/lib/cms-store";

const TELEGRAM_BOT_TOKEN = "8957063322:AAGJm4c-d1s4nOn9-cg26NVWzhLS33rFpao";
const BOT_USERNAME = "Nhamaydppepoam_bot";

export async function GET() {
  try {
    const meRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    const meData = await meRes.json();

    const updatesRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const updatesData = await updatesRes.json();

    const activeChats: Array<{ id: string | number; name: string; type: string }> = [];

    if (updatesData.ok && Array.isArray(updatesData.result)) {
      for (const item of updatesData.result) {
        const chat = item.message?.chat || item.channel_post?.chat || item.my_chat_member?.chat;
        if (chat && chat.id) {
          if (!activeChats.some((c) => c.id === chat.id)) {
            activeChats.push({
              id: chat.id,
              name: chat.title || chat.username || `${chat.first_name || ""} ${chat.last_name || ""}`.trim() || `Chat ${chat.id}`,
              type: chat.type,
            });
          }
        }
      }
    }

    const store = getCMSStore();
    const cmsChatId = store.published?.telegram_chat_id || store.draft?.telegram_chat_id || process.env.TELEGRAM_CHAT_ID;

    return NextResponse.json({
      success: true,
      bot: meData.result || { username: BOT_USERNAME },
      botLink: `https://t.me/${BOT_USERNAME}`,
      configuredChatId: cmsChatId || null,
      activeChats,
      hasActiveChat: activeChats.length > 0 || !!cmsChatId,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const store = getCMSStore();
    const cmsChatId = body.chat_id || store.published?.telegram_chat_id || store.draft?.telegram_chat_id || process.env.TELEGRAM_CHAT_ID;

    const targetChatIds: Array<string | number> = [];
    if (cmsChatId && !targetChatIds.includes(cmsChatId)) {
      targetChatIds.push(cmsChatId);
    }

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

    if (targetChatIds.length === 0) {
      return NextResponse.json({
        success: false,
        error: `Bot chưa nhận được tin nhắn từ bạn! Vui lòng truy cập https://t.me/${BOT_USERNAME} trên điện thoại hoặc máy tính, bấm START (hoặc gửi 1 tin nhắn bất kỳ cho Bot) rồi thử lại.`,
        botLink: `https://t.me/${BOT_USERNAME}`,
      }, { status: 400 });
    }

    const testMessage = `<b>🔔 THỬ NGHIỆM KẾT NỐI TELEGRAM BOT THÀNH CÔNG! 🔔</b>
━━━━━━━━━━━━━━━━━━
✅ Hệ thống báo giá tự động Nhà Máy LDPE Đức Phúc đã kết nối thành công tới Telegram của bạn.
⏰ <b>Thời gian test</b>: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
🌐 <b>Website</b>: https://ldpe-packaging-website.vercel.app`;

    const sendResults = [];
    for (const chatId of targetChatIds) {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: testMessage,
          parse_mode: "HTML",
        }),
      });
      const data = await res.json();
      sendResults.push({ chatId, ok: data.ok, description: data.description });
    }

    const anyOk = sendResults.some((r) => r.ok);

    return NextResponse.json({
      success: anyOk,
      results: sendResults,
      message: anyOk
        ? "✅ Đã thử gửi tin nhắn kết nối thành công tới Telegram!"
        : `⚠️ Gửi tin nhắn thất bại: ${sendResults[0]?.description || "Lỗi Telegram API"}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
