import { Message } from "discord.js";
import { isAllowed, channelDB } from "./utils";

interface Role {
	id: string;
	amount: number;
}

export const channelRole = (message: Message): void => {
	message.delete();
	if (isAllowed(message.member)) {
		//Get the page number
		let pageNumber: number = parseInt(message.content.split(" ")[1]);
		if (!pageNumber || isNaN(pageNumber)) pageNumber = 1;

		//Define fields before send it
		let fields = [];

		//Check if the channel exist in db
		if (!channelDB.has(message.channel.id).value() || channelDB.get(message.channel.id).value().length < 1) {
			message.channel.send({
				embed: {
					fields: [{ name: "Vide", value: "Aucun role n'est défini pour ce channel" }],
				},
			});
			return;
		}

		//Get role in a channel (10max), if > 10 => we use an argument for the page
		let channelRolesDB = channelDB
			.get(message.channel.id)
			.value()
			.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10);

		if (channelRolesDB.length < 1) fields = [{ name: "Vide", value: "Il n'y a pas de role a cette page" }];

		channelRolesDB.map((role: Role) => {
			fields.push({
				name: message.guild.roles.cache.find((r) => r.id === role.id).name,
				value: "Message requis : " + role.amount,
			});
		});

		message.channel.send({
			embed: {
				fields: [...fields],
			},
		});
	}
};
