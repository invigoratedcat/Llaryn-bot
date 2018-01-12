const config = require('C:\\Users\\kewlg\\Documents\\Github\\Llaryn-bot\\config.json');
module.exports.run = async (bot,message,args) => {
    config.prefix = args;
    console.log(`prefix changed to (${config.prefix})`);
}

module.exports.help = {
    name:"setprefix"
}