# Reckor

A simple IRC bot written in Javascript on Node.js

## Usage

Just run **node index.js** to start the bot.

A config file botConfig.json is required in the same folder.

Example can be seen in botConfig.json

## Commands

All messages, that start with command prefix (specified in config) are considered commands by bot.

They are:

* botinfo - says general info about the bot

* joke - chooses random joke from **jokeList** in config and sends it to channel

* time - says current time

* reload - reloads bot config

* disconnect <reason> - disconnects and shut downs the bot with <reason>

* rejoin - forces bot to rejoin channel

* coinflip <option1> <option2> - makes a random choice of two options or default heads/tails when no arguments specified

* plugins - displays plugins list

* uptime - shows bot's uptime 

## Plugins

Bot functionality can be extended with plugins. Plugin is a js-script file with special structure and all plugins are located in **plugins** folder.

There are some default plugins.

They are:

1. Greetings

	* can say **greeting** every time, when user joins

	* can give +v mode to user every time, when he joins (OP required)

2. ChatGuard (OP required)

	* can kick users when they used any word from **bannedWords** list in config


## Config 

All bot's settings are in botConfig.json file. You always can edit them to customize the bot.

* **name** - bot's nickname (string)

* **debug** - toggle debug mode (boolean)

* **cmdPrefix** - command prefix (string)

* **channel** - channel to join, must start with # (string)

* **server** - IRC server (string)

* **plugins** - list of plugins, which should be enabled (string array)

* **pluginsConfig** - config object for all plugins (object)

Config objects for default plugins: 

* **greetings** - settings for Greetings plugin (object)

	1.**autoVoiceJoined** - should bot give +v to user, when he joins the channel (boolean)

	2.**greetJoined** - should bot greet every user on join? (boolean)

	3.**greeting** - greeting itself. Use %name% placeholder for user's name (string)

* **chatGuard** - settings for ChatGuard plugins (object)

	1.**kickReason** - reason which will be specified on kick (string)

	2.**bannedWords** - array of words/phrases which should cause to kick the user (string array)

* **jokeList** - list of jokes for !joke command (string array)

* **disabledCommands** - list of disabled commands (no command prefix required) (string array)

* **notifyUnknownCommands** - should user be notified when he used unknown command (boolean)

* **admin** - section for bot admins (object)

	1. **adminsList** - list of users, which are bot admins. Bot admins can use admin commands (string array)

	2. **adminCommands** - list of commands, which require admin rights. (string array)

	2.**denyMessage** - message, that will be sent to non-admins that tried to use admin command (string)

* **autoRejoin** - should bot auto-rejoin channel after kick? (boolean)
	

## License: MIT
## By MrOnlineCoder
