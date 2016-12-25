var commands = [];
var disabledCmds = [];
var cfg;
var jokeList;
var channel;

//Thanks StackOverflow (http://stackoverflow.com/a/1181586/5605426)
var contains = function(needle) {
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

function botInfoHandler(bot, from, args) {
    bot.say(from, "Reckor Bot by MrOnlineCoder");
    bot.say(from, "https://github.com/MrOnlineCoder/");
    bot.say(from, "Licensed under MIT");
    bot.say(from, "Build 0.0.1");
}

function jokeHandler(bot, from, args) {
    var randomJoke = jokeList[Math.floor(Math.random()*jokeList.length)];
    bot.say(channel, randomJoke);
}

function timeHandler(bot, from, args) {
    var d = new Date();
    bot.say(from, "Current time: "+d.toLocaleTimeString());
}

function createCommands(config) {
    cfg = config;
    jokeList = config.jokeList;
    channel = config.channel;
    disabledCmds = config.disabledCommands;
    commands["botinfo"] = botInfoHandler;
    commands["joke"] = jokeHandler;
    commands["time"] = timeHandler;
}

function processCommand(bot, from, msg) {
    var tokenStr = msg.substring(1);
    console.log("BOT_CMD: got token string %s", tokenStr);
    var tokens = tokenStr.split(" ");
    var cmd = tokens[0];
    if (commands[cmd] == null) {
        bot.say(from, "Unknown command: "+cmd);
        return;
    }

    if (contains.call(disabledCmds, cmd)) {
        bot.say(from, "This command is disabled.");
        return;
    }
    commands[cmd](bot, from, tokens.slice(1));
}

module.exports.createCommands = createCommands;
module.exports.processCommand = processCommand;