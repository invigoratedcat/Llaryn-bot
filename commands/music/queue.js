const yt = require('ytdl-core');
module.exports.run = (bot,message,args) => {
    if(!args[0])return message.channel.send('You must provide a link to queue music!');
    if(!yt.validateURL(args[0]))return;
    var server = __servers[message.guild.id];
    yt.getInfo(args[0],(err,info)=>{
        if(err){
            message.channel.send('Could not retrieve song information');
            console.log(err);
            return;
        }
        message.channel.send(`Adding ${info.title} to queue`);
        server.queue.push(args[0])
    });
}

module.exports.help = {
    name:"queue"
}