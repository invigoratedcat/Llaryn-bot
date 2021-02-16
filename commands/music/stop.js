const yt = require('ytdl-core');

module.exports.run = async (bot,message,args) =>{
    if(!message.member.id==='190486358500835328') {
        if(__queueoverrule)return message.channel.send('YOU CANNOT STOP THE ***QUEUE OVERRULE***!');
    }
    if(!message.member.voiceChannel) return message.channel.send('You need to be in a vc to use this!');
    if(__servers[message.guild.id].dispatcher) {
        __servers[message.guild.id].queue = [];
        __servers[message.guild.id].dispatcher.end();
        message.member.voiceChannel.leave();
    }

    message.channel.send('I\'ve stopped playing music.');
}

module.exports.help = {
    name: "stop"
}