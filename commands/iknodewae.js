const Discord = require('discord.js');
module.exports.run = async (bot,message,args)=>{
    if(!message.author.id==="190486358500835328") {
        message.channel.send(`Sorry, ${message.user},but you don't know the way.`);
        return;
    }
    message.channel.send(new Discord.RichEmbed().setImage('http://i0.kym-cdn.com/entries/icons/mobile/000/025/067/ugandanknuck.jpg'));
    message.channel.send(message.member.user+" knows de way");
}

module.exports.help = {
    name:"iknodewae"
}