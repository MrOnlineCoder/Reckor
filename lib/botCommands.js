//A lot of vars
var commands = [];
var disabledCmds = [];
var adminCmds = [];
var cfg;
var jokeList;
var channel;
var adminPanel;
var utils = require("./utils.js");
var bot;
var plugins;

var start = process.hrtime();

var elapsed_time = function(){
    var elapsed = process.hrtime(start)[0]; 
    return elapsed;
}


function isAdmin(nick) {
    return utils.contains.call(cfg.admin.adminsList, nick);
}

function deny(nick) {
    bot.say(channel, nick+", "+cfg.admin.denyMessage);
}

function botInfoHandler(from, args) {
    bot.say(channel, "Reckor Bot by MrOnlineCoder");
    bot.say(channel, "Gender: male");
    bot.say(channel, "https://github.com/MrOnlineCoder/Reckor");
    bot.say(channel, "Licensed under MIT");
    bot.say(channel, "Build 1.5.0");
}

function jokeHandler(from, args) {
    var randomJoke = jokeList[Math.floor(Math.random()*jokeList.length)];
    bot.say(channel, randomJoke);
}

function timeHandler(from, args) {
    var d = new Date();
    bot.say(channel, "Current time: "+d.toLocaleTimeString());
}

function uptimeHandler(from, args) {
    bot.say(channel, "Bot uptime: "+elapsed_time()+" s.");
}

function coinflipHandler(from, args) {
    var result;
    if (args.length == 2) {
        result = utils.coinflip(args[0], args[1]);
    } else {
        result = utils.coinflip("heads", "tails");
    }
    bot.say(channel, "Coinflip Result: "+result);
}

function adminsHandler(from, args) {
     bot.say(channel, "Bot admins: "+cfg.admin.adminsList.join(" "));
}


function reloadHandler(from, args) {
    adminPanel.reload();
}

function disconnectHandler(from, args) {
    adminPanel.disconnect(args.join(" ") || "Force-disconnect by admin");
}

function pluginsHandler(from, args) {
    adminPanel.showPlugins();
}

function rejoinHandler(from, args) {
    bot.send("PART", channel, args[0] || "Rejoin");
    bot.send("JOIN", channel);
}

function opmeHandler(from, args) {
    bot.say(channel, from+", okay, I will try that.");
    bot.send("MODE", channel, "+o", from);
}

function sayHandler(from, args) {
    bot.say(channel, args.join(" "));
}

function createCommands(botInstance, config, admPanel, pl) {
    cfg = config;
    bot = botInstance;
    plugins = pl;
    adminPanel = admPanel;
    jokeList = config.jokeList;
    channel = config.channel;
    disabledCmds = config.disabledCommands;
    adminCmds = config.admin.adminCommands;
    commands = {};
    commands["botinfo"] = botInfoHandler;
    commands["joke"] = jokeHandler;
    commands["time"] = timeHandler;
    commands["uptime"] = uptimeHandler;
    commands["reload"] = reloadHandler;
    commands["disconnect"] = disconnectHandler;
    commands["coinflip"] = coinflipHandler;
    commands["plugins"] = pluginsHandler;
    commands["rejoin"] = rejoinHandler;
    commands["opme"] = opmeHandler;
    commands["say"] = sayHandler;
    commands["admins"] = adminsHandler;
}

function registerCommand(name, func) {
    commands[name] = func;
}


function processCommand(from, msg) {
    var tokenStr = msg.substring(cfg.cmdPrefix.length);
    console.log("BOT_CMD: got token string %s", tokenStr);
    var tokens = tokenStr.split(" ");
    var cmd = tokens[0];  
    for (var i = 0;i<plugins.length;i++) {
        if (plugins[i].commands == null) continue;

        console.log("Checking plugin: "+plugins[i].name);
        if (plugins[i].commands[cmd] != null) {
            console.log("Found command: ");
            (plugins[i].commands[cmd]).call(plugins[i], from, tokens.slice(1));
            return;
        }
    }

    if (commands[cmd] == null) {
        if (cfg.notifyUnknownCommand) bot.say(from, "Unknown command: "+cmd);
        return;
    }

    if (utils.contains.call(disabledCmds, cmd)) {
        bot.say(from, "This command is disabled.");
        return;
    }

    if (utils.contains.call(adminCmds, cmd)) {
        if (!isAdmin(from)) {
            deny(from);
            return;
        }
    }
    commands[cmd](from, tokens.slice(1));
}

module.exports.createCommands = createCommands;
module.exports.processCommand = processCommand;
module.exports.registerCommand = registerCommand;