var commands = [];
var disabledCmds = [];
var cfg;
var jokeList;
var channel;
var adminPanel;
var utils = require("./utils.js");

var start = process.hrtime();

var elapsed_time = function(){
    var elapsed = process.hrtime(start)[0]; 
    return elapsed;
}


function isAdmin(nick) {
    return utils.contains.call(cfg.admin.adminsList, nick);
}

function deny(bot, nick) {
    bot.say(channel, nick+", "+cfg.admin.denyMessage);
}

function botInfoHandler(bot, from, args) {
    bot.say(channel, "Reckor Bot by MrOnlineCoder");
    bot.say(channel, "https://github.com/MrOnlineCoder/");
    bot.say(channel, "Licensed under MIT");
    bot.say(channel, "Build 0.0.1");
}

function jokeHandler(bot, from, args) {
    var randomJoke = jokeList[Math.floor(Math.random()*jokeList.length)];
    bot.say(channel, randomJoke);
}

function timeHandler(bot, from, args) {
    var d = new Date();
    bot.say(channel, "Current time: "+d.toLocaleTimeString());
}

function uptimeHandler(bot, from, args) {
    bot.say(channel, "Bot uptime: "+elapsed_time()+" s.");
}

function reloadHandler(bot, from, args) {
    if (!isAdmin(from)) {
        deny(bot, from);
        return;
    }

    adminPanel.reload();
}

function disconnectHandler(bot, from, args) {
    if (!isAdmin(from)) {
        deny(bot, from);
        return;
    }

    adminPanel.disconnect();
}


function createCommands(config, admPanel) {
    cfg = config;
    adminPanel = admPanel;
    jokeList = config.jokeList;
    channel = config.channel;
    disabledCmds = config.disabledCommands;
    commands["botinfo"] = botInfoHandler;
    commands["joke"] = jokeHandler;
    commands["time"] = timeHandler;
    commands["uptime"] = uptimeHandler;
    commands["reload"] = reloadHandler;
    commands["disconnect"] = disconnectHandler;
}

function processCommand(bot, from, msg) {
    var tokenStr = msg.substring(cfg.cmdPrefix.length);
    console.log("BOT_CMD: got token string %s", tokenStr);
    var tokens = tokenStr.split(" ");
    var cmd = tokens[0];
    if (commands[cmd] == null) {
        if (cfg.notifyUnknownCommand) bot.say(from, "Unknown command: "+cmd);
        return;
    }

    if (utils.contains.call(disabledCmds, cmd)) {
        bot.say(from, "This command is disabled.");
        return;
    }
    commands[cmd](bot, from, tokens.slice(1));
}

module.exports.createCommands = createCommands;
module.exports.processCommand = processCommand;