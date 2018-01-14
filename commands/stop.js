const yt = require('ytdl-core');

module.exports.run = async (bot,message,args) =>{
    if(!message.member.voiceChannel) return message.channel.send('You need to be in a vc to use this!');
    if(__servers[message.guild.id].dispatcher) {
        __servers[message.guild.id].queue = null;
        __servers[message.guild.id].dispatcher.end();
        message.member.voiceChannel.leave();
    }

    message.channel.send('I\'ve stopped playing music.');
}

module.exports.help = {
    name: "stop"
}