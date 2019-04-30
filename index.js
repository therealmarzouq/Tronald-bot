const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-615410042064-620049824085-YfftWovWlvtZ64o338dMKV8z',
  name: "Tronald-Dump"
});

var trumpsCatchphrases = [
  "Make America Great Again",
  "That much I can tell you!",
  "Listen,  I've made a lot of money...",
  "You're Fired",
  "You know what? I've made billions and billions..."
];

var gettrumpsCatchphrases = function() {
  var index = Math.floor(Math.random() * trumpsCatchphrases.length);
  return trumpsCatchphrases[index];
}
var dumpsCatchPhrase = gettrumpsCatchphrases();

    
    bot.on("start", function() {
      var params = {
        icon_url: 'https://pouringmyartout.files.wordpress.com/2017/11/imageedit_4_9296230271.jpg'
    };


    bot.postMessageToChannel('general', dumpsCatchPhrase , params);
  });



 
bot.on('error', err => console.log(err));

bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});


function handleMessage(message) {
  if (message.includes(' Tronald')) {
    tronaldDump();
  }  else if (message.includes(' tronald')) {
        tronaldDump();
      }
  else if (message.includes(' help')) {
    runHelp();
  }
}


function tronaldDump() {
  axios.get('https://api.tronalddump.io/random/quote').then(res => {
    const dump = res.data.value;
    

    const params = {
      icon_url: 'https://pouringmyartout.files.wordpress.com/2017/11/imageedit_4_9296230271.jpg'
    };

    bot.postMessageToChannel('general', `${dump}`, params);
  });
}


function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'general',
    `Type @Tronald-dump with 'Tronald' to hear from Donald Trump`,
    params
  );
}
