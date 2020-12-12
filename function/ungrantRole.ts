import { Message } from "discord.js";
import { isAllowed, rolesDB } from "./utils";

export const ungrantRole = (message: Message): void => {
	message.delete();
	if (isAllowed(message.member)) {
		//Remove the command from the message to keep only arguments
		let roleToAdd: string | string[] = message.content.split(" ").slice(1);
		roleToAdd = roleToAdd.join(" ");

		//Define guildRole as a role from the server
		let guildRole = message.guild.roles.cache.find((role) => role.name == roleToAdd);

		//If the role don't exist, reply it and stop.
		if (guildRole === undefined) {
			message.reply("Désolé mais le role en question n'existe pas.").then((msg) => {
				msg.delete({ timeout: 5000 });
			});
			return;
		}

		if (rolesDB.has(message.guild.id).value()) {
			//Check if the role exist, if not we do nothing
			if (!rolesDB.get(message.guild.id).value().includes(guildRole.id)) {
				message.reply("Le role n'a pas les permissions pour m'utiliser.").then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			} else {
				(rolesDB.get(message.guild.id) as any).pull(guildRole.id).write();
				message.reply("Le role a été supprimer.").then((msg) => {
					msg.delete({ timeout: 5000 });
				});
			}
		} else {
			message.reply("Le role n'a pas les permissions pour m'utiliser.").then((msg) => {
				msg.delete({ timeout: 5000 });
			});
		}
	}
};
