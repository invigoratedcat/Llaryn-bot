const Discord = require('discord.js');
require('cassette');
require('discord.js-music');
const bot = new Discord.Client();
const token = 'NDAwMDA0NjM1MDg5NDM2NzAz.DTVVjA.CXjQLPYxIuDgWl-KnAkLDMrJzLQ';
var prefix = ".";
var cmd_error =  new Discord.RichEmbed().setTitle("Error(!!)").setDescription('Your command could not be processed!:persevere:').setColor('Red');
const maker = "190486358500835328";

function poll(question,message) {
    var yay = message.reactions.find("name","thumbsup").count;
    var nay = message.reactions.find("name",":thumbsdown:").count;
    if(yay>nay)message.edit(`Question: ${question}\nResult: :white_check_mark:`);
    else message.edit(`Question: ${question}\nResult: :negative_squared_cross_mark:`);
}
bot.on('ready',() => {
    console.log('p.wake = true');
});

bot.on('guildMemberRemove', member => {
        if(member.roles.find("name","The Banished")) member.ban();
});

bot.on('message',message => {
    if(message.content.toLowerCase().startsWith(prefix+"setprefix"&&message.author===maker)) {
        prefix = message.content.slice('11');
        console.log(`prefix changed to (${prefix})`);
    } else if (message.content.toLowerCase()===prefix+"ping") {
        message.channel.send("pong");
    } else if (message.content===prefix+"reboot"&&message.author.id===maker) {
        message.channel.send(new Discord.RichEmbed().setTitle("Command {reboot} Accepted (!)"));
        bot.destroy();
        bot.login(token);
        message.channel.send(new Discord.RichEmbed().setTitle("Reboot successful!"));
    } else if(message.content.startsWith(prefix+"poll"&&message.member.roles.find("name","Overlords"))) {
        var p_end = message.content.indexOf("?");
        var p_ask = message.content.slice(6,p_end);
        var p_mess=new Discord.RichEmbed().setTitle(p_ask).setDescription("React with :thumbs_up: or :thumbs_down: to answer!").setColor("Pink");
        message.channel.send(p_mess);
        setTimeout(poll(p_ask,p_mess),message.content.slice(p_end+2)*10);
    } else if(message.content===prefix+"i know de wae"&&message.author.id===maker) {
        message.channel.send(new Discord.RichEmbed().setImage('http://i0.kym-cdn.com/entries/icons/mobile/000/025/067/ugandanknuck.jpg'));
        message.channel.send(message.member.user+" knows de way");
    } else if(message.content.startsWith(prefix+"eval")&&message.author.id===maker) {
        let toeval = message.content.slice(5);
        var out;
        try {
            out = fn(eval(toeval));
        } catch (error) {
            console.log("your evaluation fucked up\n" +  error);
            out = error;
        }
        var showeval = new Discord.RichEmbed().setTitle("Evaluation of code:").addField("in: ", "```" +toeval+"```\n", true).addField("out: ", "```"+out+"```", true);      
        message.channel.send(showeval);
    }
});

function fn(e) {
    return e;
}

bot.login(token);