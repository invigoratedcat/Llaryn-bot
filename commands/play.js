const Discord = require('discord.js');
const yt = require('ytdl-core');

function play(connection, message,args,servers){
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(yt(server.queue[0]), {audioonly: true});
    yt.getInfo(args[0], (err,info)=>{
        const title=info.title;
        message.channel.send(`Playing '${title}'`);
    });
    server.queue.shift();
    server.dispatcher.on('end', ()=>{
        if (server.queue[0]){
            play(connection,message,args,servers);
        } else message.channel.send('There\'s no more music for me to play!');
    });
}
module.exports.run = async (bot,message,args,servers)=> {
    const playlist = message.guild.playlist;
    if(!message.member.voiceChannel) return message.channel.send('You need to be in a vc to use this!');
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    }
    var server = servers[message.guild.id];
    server.queue.push(args[0]);
    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection=>{
        play(connection,message,args,servers);
    });
}

module.exports.help = {
    name: "play"
}