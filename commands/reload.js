const config = require('app/main/config.json');
const Discord = require('discord.js'),fs=require('fs');

module.exports.run = async (bot,message,args) => {
    if(message.author.id==="190486358500835328") {
        message.channel.send(new Discord.RichEmbed().setTitle("Command reload accepted (!)"));
        
        // fs.readdir('./commands/',(err,files)=>{
        //     console.log('Loading commands...');
        //     if(err) return console.log(err);
        //     let jsFiles = files.filter(f => f.split(".").pop()==="js");
        //     if(jsFiles.length<= 0) {
        //         console.log('No commands were loaded.');
        //     } else console.log(`${jsFiles.length} command(s) were loaded.`);
        //     jsFiles.forEach((f,i)=> {
        //         let cmds = require(`C:\\Users\\kewlg\\Documents\\Github\\Llaryn-bot\\commands\\${f}`);
        //         console.log(`${i+1}: ${f}`);
        //         bot.commands.delete(cmds.help.name);
        //         bot.commands.set(cmds.help.name,cmds);
        //     });
        // });

        let cmd = args[0] + ".js";
        `./${cmd}`
        // message.channel.send(new Discord.RichEmbed().setTitle("Reload failed..."));
        delete require.cache[require.resolve(`./${cmd}`)];
        let cmds = require(`./commands\\${cmd}`);
        bot.commands.delete(cmds.help.name);
        bot.commands.set(cmds.help.name,cmds);
        console.log(bot.commands);
        message.channel.send(new Discord.RichEmbed().setTitle("Reload successful!"));
    }else{
        message.channel.send(`Sorry ${message.user}, but only my master can use this command!`);
    }
}

module.exports.help = {
    name: "reload"
}