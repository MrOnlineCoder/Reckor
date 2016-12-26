# Reckor

A simple IRC bot written in Javascript on Node.js

## Usage

Just run **node index.js** to start the bot.

A config file botConfig.json is required in the same folder.

Example can be seen in botConfig.json

## Commands

All messages, that start with command prefix (specified in config) are considered commands by bot.

They are:

* botinfo - says general info about the bot by PM.

* joke - chooses random joke from **jokeList** in config and sends it to channel

* time - says current time in PM

* reload (ADMIN) - reloads bot config.

* disconnect (ADMIN) - disconnects and shut downs the bot.



## Useful sections

There are some sections, that add some functionality to bot.

They are:

1. Greetings

	* can say **greeting** every time, when user joins

	* can give +v mode to user every time, when he joins (OP required)

2. ChatGuard (OP required)

	* can kick users when they used any word from **bannedWords** list in config

3. Disabled commands

	* you can disable some commands by adding them in that list

## Config 

All bot's settings are in botConfig.json file. You always can edit them to customize the bot.

* **name** - bot's nickname (string)

* **debug** - toggle debug mode (boolean)

* **cmdPrefix** - command prefix (string)

* **channel** - channel to join, must start with # (string)

* **server** - IRC server (string)

* **greetings** - settings for Greetings section (object)

	1.**enabled** - enable or disable that section (boolean)

	2.**autoVoiceJoined** - should bot give +v to user, when he joins the channel (boolean)

	3.**greetJoined** - should bot greet every user on join? (boolean)

	4.**greeting** - greeting itself. Use %name% placeholder for user's name (string)

* **chatGuard** - settings for ChatGuard section (object)

	1.**enabled** - enable or disable that section (boolean)

	2.**kickReason** - reason which will be specified on kick (string)

	3.**bannedWords** - array of words/phrases which should cause to kick the user (string array)

* **jokeList** - list of jokes for !joke command (string array)

* **disabledCommands** - list of disabled commands (no command prefix required) (string array)

* **notifyUnknownCommands** - should user be notified when he used unknown command (boolean)

* **admin** - section for bot admins (object)

	1. **adminsList** - list of users, which are bot admins. Bot admins can use commands with (ADMIN) label (string array)

	2.**denyMessage** - message, that will be sent to non-admins that tried to use admin command (string)

* **autoRejoin** - should bot auto-rejoin channel after kick? (boolean)
	

## License: MIT
## By MrOnlineCoder
