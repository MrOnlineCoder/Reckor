/*
    Reckor Bot by MrOnlineCoder
    License: MIT (see LICENSE file)
    2016
*/



/*
    ========
    Requires
    ========
*/
var irc = require("irc");
var configPath = process.argv[2] || "./botConfig.json";
var BotCommands = require("./lib/botCommands.js");
var utils = require("./lib/utils.js");
var plugins = [];
/*
    =========
    Variables
    =========
*/
var botConfig = require(configPath);
var bot;
var adminPanel;
console.log("--- STARTUP ---");
console.log("BOT: Connecting to "+botConfig.server);

bot = new irc.Client(botConfig.server, botConfig.name, {
    debug: botConfig.debug,
    channels: [botConfig.channel]
});



/*
    ===============
    Handling events
    ===============
*/
bot.addListener("error", function(message) {
    console.error("ERROR: %s: %s", message.command, message.args.join(" "));
});

bot.addListener("message", function(nick, to, text, message) {
    console.log("IRC: <%s> %s", nick, text);
    for (var i=0;i<plugins.length;i++) {
        plugins[i].message(nick, text);
    }
    if (utils.beginsWith(botConfig.cmdPrefix, text)) {

        BotCommands.processCommand(nick, text);
    }
});

bot.addListener("+mode", function(channel, by, mode, argument, message) {
    console.log("+"+mode+" by "+by+" to "+channel+"/"+argument);
});

bot.addListener("-mode", function(channel, by, mode, argument, message) {
    console.log("-"+mode+" by "+by+" to "+channel+"/"+argument);
});


bot.addListener("join", function(channel, who) {
    console.log("IRC: %s joined.", who);
    if (who == botConfig.name) {
        console.log("BOT: Successfully joined "+channel);
        return;
    }
    for (var i=0;i<plugins.length;i++) {
        plugins[i].userJoin(who);
    }
});

bot.addListener("part", function(channel, who, reason) {
    console.log("IRC: %s has left", who);
    for (var i=0;i<plugins.length;i++) {
        plugins[i].userLeft(who);
    }
});

bot.addListener("kick", function(channel, who, by, reason) {
    console.log("IRC: %s was kicked from %s by %s: %s", who, channel, by, reason);
    if (who == botConfig.name) {
        console.log("BOT: kicked!");
        if (botConfig.autoRejoin) {
            console.log("BOT: rejoining...");
            bot.send("JOIN", botConfig.channel);
        } else {
            console.log("BOT: no rejoin, exiting...");
            adminPanel.disconnect();
        }
    }
});

/*
    =====
    Setup
    =====
*/
function requireUncached(module){
    delete require.cache[require.resolve(module)];
    return require(module);
}


function setup() {
    plugins = [];
    console.log("SETUP: loading config...");
    botConfig = requireUncached(configPath);
    BotCommands = requireUncached("./lib/botCommands.js");
    console.log("SETUP: loading plugins...");
    for(var i=0;i<botConfig.plugins.length;i++) {
        var temp = requireUncached("./plugins/"+botConfig.plugins[i]+".js");
        temp.bot = bot;
        temp.config = botConfig.pluginsConfig;
        temp.channel = botConfig.channel;
        plugins.push(temp);
    }
    console.log("SETUP: configuring plugins...");
    for (var i=0;i<plugins.length;i++) {
        plugins[i].load();
    }
    console.log("SETUP: creating commands...");
    BotCommands.createCommands(bot, botConfig, adminPanel, plugins);
    console.log("SETUP: complete!");
}

/*
    ===========
    Admin panel
    ===========
*/

adminPanel = {
    reload: function() {
        console.log("ADMIN: reloading...");
        bot.say(botConfig.channel, "Reloading...");
        setup();
        bot.say(botConfig.channel, "Reload complete!");
    },
    disconnect: function(msg) {
        console.log("BOT: disconnecting...");
        bot.send("QUIT", msg);
        bot.disconnect(msg);
        console.log("--- SHUTDOWN ---");
        process.exit(0);
    },
    showPlugins: function() {
        var pluginsNames = [];
        for (var i=0;i<plugins.length;i++) {
            pluginsNames.push(plugins[i].name);
        }
        bot.say(botConfig.channel, "Plugins ("+plugins.length+"): "+pluginsNames.join(" "));
    }
};

setup();