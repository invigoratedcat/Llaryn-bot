module.exports.run = (bot,message,args)=> {
    message.channel.send('Resuming music');
    __servers[message.guild.id].dispatcher.resume();
}

module.exports.help = {
    name:"resume"
}