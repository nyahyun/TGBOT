const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const tgbot_token = process.env.telegram_bot_token;
const giphy_token = process.env.giphy_token;

const request = require('request');
const options = {
    uri: "http://api.giphy.com/v1/gifs/random",
    qs:{
      api_key: giphy_token,
      tag: 'cat',
    }
};


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(tgbot_token, {polling: true});

//echo
bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];

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
    }

});
//test giphy api
bot.onText(/\/cat/, (msg) => {

    request(options,function(err,response,body){
        const result = JSON.parse(body);
        console.log("send GIF URL : ", result.data.url);
        bot.sendMessage(msg.chat.id, result.data.url);
        //bot.sendAnimation(msg.chat.id, result.data.url);
    });

});

    