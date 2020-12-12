import { Message } from "discord.js";
import { isAllowed, channelDB } from "./utils";

export const removeRole = (message: Message): void => {
	message.delete();
	if (isAllowed(message.member)) {
		let roleName: string | string[] = message.content.split(" ").slice(1).join(" ");

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
			if (!(channelDB.get(message.channel.id) as any).find({ id: guildRole.id }).value()) {
				message.reply("Le role n'est pas defini pour ce channel").then((msg) => {
					msg.delete({ timeout: 5000 });
				});
				return;
			}
			(channelDB.get(message.channel.id) as any).remove({ id: guildRole.id }).write();
			message.reply(`Le role : "${guildRole.name}" à été supprimé de ce channel`).then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		} else {
			message.reply("Aucun role n'est defini pour ce channel.").then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}
	}
};
