var plugin = {
	name: "RajaKeeper",
	load: function() {
		setInterval(this.keeper, 1.5*60*1000);
	},
	userJoin: function(who) {
		//No OP
	},
	keeper: function() {
		this.bot.say(this.channel, "Raja, stay here");
	},
	message: function (from, msg) {
		
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;