const fs = require('fs');
function play(connection,message) {
    let server = __servers[message.guild.id];
    server.dispatcher = connection.playFile(server.queue[0]);
    server.queue.shift();
    server.dispatcher.on('end',()=>{
        if(!server.queue[0])return;
        play(connection,message);
    });
}
module.exports.run = (bot,message,args) => {
    if(!message.member.id ==='190486358500835328')return message.channel.send('You cannot use this command.');
    __queueoverrule = true;
    if(!__servers[message.guild.id])__servers[message.guild.id] = {
        queue: []
    };
    let server = __servers[message.guild.id];
    if(server.queue[0])server.queue = [];
    if(server.dispatcher)server.dispatcher.end();
    fs.readdir(`${__base}mypianoqueue`,(err,files)=>{
        files.forEach((f,i)=> {
            server.queue.push(f);
        });
    });
    if(!message.guild.voiceConnection)message.member.voiceChannel.join().then(connection=>{
        play(connection,message);
    });

}

module.exports.help = {
    name: "queueoverrule"
}