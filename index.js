const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const express = require('express');
const cors = require('cors');

const Promise = require('bluebird');
  Promise.config({
    cancellation: true
  });

const port = process.env.PORT;
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const webAppUrl = process.env.WEB_URL;
const app = express();
app.use(express.json());
app.use(cors());

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(bot.isPolling()) {
    await bot.stopPolling();
    }
    await bot.startPolling();


  await bot.sendMessage(
    chatId,
    `${msg.text}
    Вітаю ${msg.from.first_name}! Все що я зараз можу, це повторювати за тобою, напиши команду /start і роби замовлення`)

    if(text === '/start'){
    await bot.sendMessage(chatId, 'Ласкаво просимо', {
      reply_markup: {
          inline_keyboard: [
              [{text: 'Зробити замовлення', web_app: {url: webAppUrl}}]
          ]
      }
  })
  }
  await bot.stopPolling();
});

app.listen(port, () => console.log('server started on port:' + port))