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
var BotCommands = require("./lib/botCommands.js");
var Greetings = require("./lib/greetings.js");
var ChatGuard = require("./lib/chatGuard.js");
var utils = require("./lib/utils.js");
/*
    =========
    Variables
    =========
*/
var botConfig = require("./botConfig.json");
var bot;
var adminPanel;

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
    if (botConfig.chatGuard.enabled) ChatGuard.handle(bot, nick, text);
    if (utils.beginsWith(botConfig.cmdPrefix, text)) {
        BotCommands.processCommand(bot, nick, text);
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
    if (botConfig.greetings.enabled) Greetings.handle(bot, who);
});

bot.addListener("part", function(channel, who, reason) {
    console.log("IRC: %s has left", who);
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
function setup() {
    botConfig = require("./botConfig.json");
    BotCommands.createCommands(botConfig, adminPanel);
    Greetings.setup(botConfig);
    ChatGuard.setup(botConfig);
}

/*
    ===========
    Admin panel
    ===========
*/

adminPanel = {
    reload: function() {
        console.log("ADMIN: reloading...");
        bot.say(botConfig.channel, "Reloading config...");
        setup();
        bot.say(botConfig.channel, "Reload complete!");
    },
    disconnect: function(msg) {
        console.log("BOT: disconnecting...");
        bot.disconnect(msg);
        console.log("--- SHUTDOWN ---");
        process.exit(0);
    }
};

setup();