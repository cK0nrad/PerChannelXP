import { Message } from "discord.js";
import { userDB, channelDB } from "./utils";
export const everyMessage = (message: Message): void => {
	//Check if there's any role for the channel
	if (!channelDB.has(message.channel.id).value()) return;

	//Fetch all role of the channel
	let roleList = channelDB.get(message.channel.id).value();

	//If no role => we return
	if (roleList.length < 1) return;

	//Check if the user is already in the DB
	let roles = [];
	if (!userDB.has(message.author.id).value()) {
		roles[message.channel.id] = 1;
		userDB.set(message.author.id, { ...roles }).write();
	} else {
		//If the user is in the db, we check either if he already talked in the channel if not we set the channel to 1 msg
		if (userDB.get(message.author.id).has(message.channel.id).value()) {
			userDB
				.get(message.author.id)
				.update(message.channel.id, (n) => n + 1)
				.write();
		} else {
			(userDB.get(message.author.id).set(message.channel.id, 1) as any).write();
		}
	}

	//Check if the user has earned a role

	//Define current user from DB
	let user = userDB.get(message.author.id).value();
	//Check all roles
	roleList.forEach((role, i) => {
		//Role = {id: "", amount: N}
		//Could use == but if we add a role later, he'll be checked and added
		if (role.amount <= user[message.channel.id]) {
			//Check if the user already have the role
			if (!message.member.roles.cache.has(role.id)) {
				message.member.roles.add(role.id);
			}
		}
	});
};
