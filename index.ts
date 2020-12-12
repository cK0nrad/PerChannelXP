import { Client } from "discord.js";
import { discordToken, prefix } from "./JSON/config.json";
import { grantRole } from "./function/grantRole";
import { ungrantRole } from "./function/ungrantRole";
import { addRole } from "./function/addRole";
import { removeRole } from "./function/removeRole";
import { channelRole } from "./function/channelRole";
import { everyMessage } from "./function/everyMessage";

const client = new Client();

client.on("ready", () => {
	console.log(`Connecter en tant que: ${client.user.tag}`);
});

client.on("message", (message) => {
	//If a message is sent by a bot we don't continue.
	if (message.author.bot) return;

	if (message.content.startsWith(prefix) && message.content.length > 2) {
		switch (message.content.substring(1).split(" ")[0]) {
			//Add a role into a channel
			case "addRole":
				addRole(message);
				break;

			//Remove a role in from channel
			case "removeRole":
				removeRole(message);
				break;

			//Add a role who can use bot commands
			case "grantRole":
				grantRole(message);
				break;

			//Remove a role who can use bot commands
			case "ungrantRole":
				ungrantRole(message);
				break;

			case "channelRole":
				channelRole(message);
				break;
		}
	} else {
		everyMessage(message);
	}
});

client.login(discordToken);
