/*
    Reckot Bot by MrOnlineCoder
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
/*
    =========
    Variables
    =========
*/
var botConfig = require("./botConfig.json");
var bot;

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
    console.log("<%s> %s", nick, text);
    if (botConfig.chatGuard.enabled) ChatGuard.handle(bot, nick, text);
    if (text.charAt(0) == "!") {
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
    console.log("%s joined.", who);
    if (who == botConfig.name) {
        console.log("[Bot] Successfully joined "+channel);
        return;
    }
    if (botConfig.greetings.enabled) Greetings.handle(bot, who);
});

bot.addListener("part", function(channel, who, reason) {
    console.log("%s has left", who);
});
bot.addListener("kick", function(channel, who, by, reason) {
    console.log("%s was kicked from %s by %s: %s", who, channel, by, reason);
});

/*
    =====
    Setup
    =====
*/
BotCommands.createCommands(botConfig);
Greetings.setup(botConfig);
ChatGuard.setup(botConfig);