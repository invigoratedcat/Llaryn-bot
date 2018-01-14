const yt = require('ytdl-core');

module.exports.run = (bot,message,args) => {
    if(!message.member.voiceChannel)return message.channel.send('You need to be in a vc to use this!');
    var server = __servers[message.guild.id];
    if(!server.dispatcher.stream)return message.channel.send(`No music to skip`);
    yt.getInfo(__songplaying,async (err,info)=>{
        await message.channel.send(`Skipping ${info.title}`);
    });
    server.dispatcher.end();
}

module.exports.help = {
    name:"skip"
}