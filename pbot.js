const Discord = require('discord.js'), fs = require('fs');
const bot = new Discord.Client();
global.__base = __dirname + '\\';
global.__servers = bot.guilds;
global.__songplaying;
const config = require(__base + '\\main\\config.json');
var cmd_error =  new Discord.RichEmbed().setTitle("Error(!!)").setDescription('Your command could not be processed!:persevere:').setColor('Red');
const maker = "190486358500835328";
//command loading
bot.commands = new Discord.Collection();
fs.readdir(__base + '\\commands\\',(err,files)=>{
    if(err) return console.log(err);
    let jsFiles = files.filter(f => f.split(".").pop()==="js");
    if(jsFiles.length<= 0) {
        console.log('No commands were loaded.');
    } else console.log(`${jsFiles.length} command(s) were loaded.`);
    jsFiles.forEach((f,i)=> {
        let cmds = require(`${__base}\\commands\\${f}`);
        console.log(`${i+1}: ${f}`);
        bot.commands.set(cmds.help.name, cmds);
    });
});

bot.on('ready',() => {
    console.log('p.wake = true');
    
});

bot.on('guildMemberRemove', member => {
        if(member.roles.find("name","The Banished")||member.roles.find("name","Fallen Angels (Banished Friends)")) member.ban();
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if(!message.content.startsWith(config.prefix)){
        return;
    }
 
    let cont = message.content.split(/\s+/g);
    let args = cont.slice(1);
    let command = cont[0];
    let cmd = bot.commands.get(command.slice(config.prefix.length));
    if(cmd) cmd.run(bot,message,args);
});



bot.login(config.token);