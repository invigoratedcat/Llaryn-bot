const Discord = require('discord.js');
function fn(e) {
    return e;
}

module.exports.run = async (bot,message,args)=> {
    if(message.author.id==="190486358500835328") {
        let toeval = message.content.slice(5);
        var out;
        try {
            out = fn(eval(toeval));
        } catch (error) {
            console.log("your evaluation fucked up\n" +  error);
            out = error;
        }
        var showeval = new Discord.RichEmbed().setTitle("Evaluation of code:").addField("in: ", "```" +toeval+"```\n", true).addField("out: ", "```"+out+"```", true);      
        message.channel.send(showeval);
    } else {

    }
}

module.exports.help = {
    name:"eval"
}