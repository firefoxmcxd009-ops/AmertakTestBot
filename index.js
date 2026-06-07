require('dotenv').config();

const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();

const BOT_TOKEN =
  process.env.BOT_TOKEN ||
  "YOUR_BOT_TOKEN";

const PORT = process.env.PORT || 3000;

const bot = new Telegraf(BOT_TOKEN);

// ===============================
// OWNER USERNAME
// ===============================
const owner_username = '@Amertak_Network';

// ===============================
// COMMON BUTTONS
// ===============================
const buttons = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "⮞ Tools",
          url: "https://tools-amertaak.vercel.app"
        },
        {
          text: "⮞ Dashboard",
          web_app: {
            url: "https://amertak-bot.onrender.com/dashboard"
          }
        }
      ]
    ]
  }
};

// ===============================
// START COMMAND
// ===============================
bot.start((ctx) => {

  const fullname =
    `${ctx.from?.first_name || ''} ${ctx.from?.last_name || ''}`.trim();

  const username =
    ctx.from?.username
      ? `@${ctx.from.username}`
      : 'No Username';

  const start_cmd = `❱❱ សួរស្តី *(${fullname})[${username}]*!

*⚑ Command (ពាក្យបញ្ជា):*
⮩ */start* - start bot
⮩ */help* - how to use the bot
⮩ */tools* - view all tools
⮩ */dashboard* - open web dashboard

❱❱ Owner: *(Thavrath Amertak)[${owner_username}]*`;

  ctx.replyWithMarkdown(start_cmd, buttons);
});

// ===============================
// HELP COMMAND
// ===============================
bot.command('help', (ctx) => {

  const help_msg = `*⚑ Help Menu*

Use these commands:

⮩ /start - start bot
⮩ /help - how to use the bot
⮩ /tools - view all tools
⮩ /dashboard - open web dashboard`;

  ctx.replyWithMarkdown(help_msg, buttons);
});

// ===============================
// TOOLS COMMAND
// ===============================
bot.command('tools', (ctx) => {

  const tools_cmd = `*⚑ Tools:*

⮩ Video/image/audio downloader
⮩ Generator Qrcode from website url/text and Qrcode scanner
⮩ Ai text to speach (male and female)
⮩ Image to PDF
⮩ Image to text`;

  ctx.replyWithMarkdown(tools_cmd, buttons);
});

// ===============================
// DASHBOARD COMMAND
// ===============================
bot.command('dashboard', (ctx) => {

  ctx.reply(
    '❱❱ Open dashboard below:',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "⮞ Open Dashboard",
              web_app: {
                url: "https://amertak-bot.onrender.com/dashboard"
              }
            }
          ]
        ]
      }
    }
  );
});

// ===============================
// UNKNOWN COMMAND
// ===============================
bot.on('text', (ctx) => {

  const text = ctx.message.text;

  const valid_commands = [
    '/start',
    '/help',
    '/tools',
    '/dashboard'
  ];

  if (
    text.startsWith('/') &&
    !valid_commands.includes(text)
  ) {

    const unknow_cmd = `*✘ Unknow Command*

use command: /help`;

    ctx.replyWithMarkdown(unknow_cmd, buttons);
  }
});

// ===============================
// EXPRESS SERVER
// ===============================
app.get('/', (req, res) => {
  res.send('❱❱❱ Telegram Bot Running...');
});

// ===============================
// START EXPRESS
// ===============================
app.listen(PORT, () => {
  console.log(`❱❱❱ Server running on port ${PORT}`);
});

// ===============================
// START BOT
// ===============================
bot.launch()
  .then(() => {
    console.log('❱❱❱❱ Bot is running...');
  })
  .catch(console.error);

// ===============================
// STOP BOT
// ===============================
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));