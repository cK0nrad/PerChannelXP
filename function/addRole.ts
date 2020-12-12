import { Message } from "discord.js";
import { prefix } from "../JSON/config.json";
import { isAllowed, channelDB, rolesDB } from "./utils";

export const addRole = (message: Message): void => {
	message.delete();
	if (isAllowed(message.member)) {
		//Check if arguments are valid
		let messageAmount: string | string[] = message.content.split(" ")[1];
		if (isNaN(parseInt(messageAmount))) {
			message.reply("Le nombre de message doit etre un nombre, exemple: " + prefix + "addRole [nbr message] [nom du role]").then((msg) => {
				msg.delete({ timeout: 10000 });
			});
			return;
		}

		let roleName: string | string[] = message.content.split(" ").slice(2).join(" ");

		//Define guildRole as a role from the server
		let guildRole = message.guild.roles.cache.find((role) => role.name == roleName);
		//If the role don't exist, reply it and stop.
		if (guildRole === undefined) {
			message.reply("Désolé mais le role en question n'existe pas.").then((msg) => {
				msg.delete({ timeout: 5000 });
			});
			return;
		}

		//Check if the channel is already registered
		if (channelDB.has(message.channel.id).value()) {
			//Check if the role isn't already registered
			if ((channelDB.get(message.channel.id) as any).find({ id: guildRole.id }).value()) {
				message.reply("Le role a déjà été ajouté au channel").then((msg) => {
					msg.delete({ timeout: 5000 });
				});
				return;
			}
			(channelDB.get(message.channel.id) as any).push({ id: guildRole.id, amount: parseInt(messageAmount) }).write();
		} else {
			channelDB.set(message.channel.id, [{ id: guildRole.id, amount: messageAmount }]).write();
		}
	}
};
