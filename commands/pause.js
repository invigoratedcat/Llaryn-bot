module.exports.run = (bot,message,args) => {
    message.channel.send('Pausing music.');
    __servers[message.guild.id].dispatcher.pause();
}

module.exports.help = {
    name:"pause"
}