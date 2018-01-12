const yt = require('ytdl-core');

module.exports.run = async (bot,message,args,servers) =>{
    if(!message.member.voiceChannel) return message.channel.send('You need to be in a vc to use this!');
    var server = servers[message.guild.id];
    if(server.dispatcher) server.dispatcher.end();
    message.channel.send('I\'ve stopped playing music.');
}

module.exports.help = {
    name: "stop"
}