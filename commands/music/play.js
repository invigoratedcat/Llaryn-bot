const Discord = require('discord.js');
const yt = require('ytdl-core');

async function play(connection, message){
    if(__queueoverrule)return;
    var server = __servers[message.guild.id];
    console.log(server.queue);
    __songplaying = server.queue[0];
    server.dispatcher = connection.playStream(yt(server.queue[0]), {audioonly: true});
    yt.getInfo(server.queue[0], (err,info)=>{
        message.channel.send(`Playing ${info.title}`);
    });
    server.queue.shift();
    server.dispatcher.on('end', ()=>{
        if (server.queue[0]){
            play(connection,message);
        } else message.channel.send('There\'s no more music for me to play!');
    });
}
module.exports.run = (bot,message,args)=> {
    if(message.member.id != "190486358500835328")
        if(__queueoverrule)return message.channel.send('FOOLISH MORTAL, YOU CANNOT OVERCOME THE ***QUEUE OVERRULE***!');
    if(!args[0])return message.channel.send('You must provide a link to play music!');
    if(!yt.validateURL(args[0]))return;
    if(!message.member.voiceChannel) return message.channel.send('You need to be in a vc to use this!');
    if(!__servers[message.guild.id]) __servers[message.guild.id] = {
        queue: []
    }
    var server = __servers[message.guild.id];
    server.queue.push(args[0]);
    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection=>{
        play(connection,message);
    }); else {
        play(message.guild.voiceConnection, message);
    }
}

module.exports.help = {
    name: "play"
}