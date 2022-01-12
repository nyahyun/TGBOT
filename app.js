const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const tgbot_token = process.env.telegram_bot_token;
const giphy_token = process.env.giphy_token;

const https = require('https');
const options = {
    hostname: 'http://api.giphy.com/v1/gifs/random',
    api_key: giphy_token,
    tag: 'ket',
    method: 'GET'
  }


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(tgbot_token, {polling: true});

//echo
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

//message ack
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});
//Greting
bot.on('message', (msg) => {

    let Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id,"Hello dear user");
    console.log(msg.chat.id);
    }

});
//test giphy api
//bot.onText(/\/cat (.+)/, (msg) => {
//
//
//})

    