const config = require('app/main/config.json');
module.exports.run = async (bot,message,args) => {
    config.prefix = args;
    console.log(`prefix changed to (${config.prefix})`);
}

module.exports.help = {
    name:"setprefix"
}