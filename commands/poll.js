const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
    var p_end = message.content.indexOf("?");
    var p_ask = message.content.slice(6,p_end+1);
    var p_mess=new Discord.RichEmbed().setTitle("Poll: "+p_ask).setDescription("React with :thumbsup: or :thumbsdown: to answer!").setColor([255, 0, 255]);
    let p_msg = await message.channel.send(p_mess);
    p_msg.catch,err=>{console.log(err)};
    await p_msg.react('👍');
    await p_msg.react('👎');
    const reactions = await p_msg.awaitReactions((reaction)=>{return reaction.emoji.name==="👍"||reaction.emoji.name==="👎";},{time:args[args.length-1]*1000});
    console.log("Voting has ended!");
    let p_y = reactions.get('👍').count-1;
    let p_n = reactions.get('👎').count-1;
    let p_r = (p_y>p_n)?"Yes":(p_n>p_y)?"No":"Tie";
    message.channel.send(new Discord.RichEmbed().setTitle(`The poll on "${p_ask}" has ended!`).setDescription(`Result: ${p_r}`).setColor([255, 0, 255]));
}

module.exports.help = {
    name:"poll"
}