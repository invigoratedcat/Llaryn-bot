const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NDAwMDA0NjM1MDg5NDM2NzAz.DTVVjA.CXjQLPYxIuDgWl-KnAkLDMrJzLQ';
var prefix = ".";
var cmd_error =  new Discord.RichEmbed().setTitle("Error(!!)").setDescription('Your command could not be processed!:persevere:').setColor('Red');

function poll(question,message) {
    clearInterval(poll);
    var yay = message.reactions.find("thumbsup").count;
    var nay = message.reactions.find("thumbsdown").count;
    if(yay>nay)message.edit(`Question: ${question}\nResult: :white_check_mark:`);
    else message.edit(`Question: ${question}\nResult: :negative_squared_cross_mark:`);
}
bot.on('ready',() => {
    console.log('p.wake = true');
});

bot.on('guildMemberRemoved', member => {
    if(member.hasRole('The Banished')) {
        member.ban();
    }
});

bot.on('message',message => {
    if(message.content.toLowerCase().startsWith(prefix+"setprefix")) {
        prefix = message.content.slice('11');
        console.log(`prefix changed to (${prefix})`);
    } else if (message.content.toLowerCase()===prefix+"ping") {
        message.channel.send("pong");
    } else if (message.content===prefix+"reboot") {
        message.channel.send(new Discord.RichEmbed().setTitle("Command {reboot} Accepted (!)"));
        bot.destroy();
        bot.login(token);
        message.channel.send(new Discord.RichEmbed().setTitle("Reboot successful!"));
    } else if(message.content.startsWith(prefix+"poll")) {
        var p_end = message.content.indexOf("?");
        var p_ask = message.content.slice(6,p_end);
        var p_mess=new Discord.RichEmbed().setTitle(p_ask).setDescription("React with :thumbs_up: or :thumbs_down: to answer!").setColor("Pink");
        setInterval(poll(p_ask,p_mess), message.content.slice(p_end+2));
        message.channel.send(p_mess);
    }
});

bot.login(token);