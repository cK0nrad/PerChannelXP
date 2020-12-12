import { GuildMember } from "discord.js";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

export const rolesDB = lowdb(new FileSync("./JSON/roles.json"));
export const channelDB = lowdb(new FileSync("./JSON/channels.json"));
export const userDB = lowdb(new FileSync("./JSON/users.json"));

const verifyChannel = () => {};

const isAllowed = (user: GuildMember): boolean => {
	//Check if the user has admin perm, so he have permission
	if (user.guild.ownerID === user.id) return true;

	//Check if the server exist, if not he's not allowed.
	if (!rolesDB.has(user.guild.id).value()) return false;

	//Get allowed roles from the role DB by selecting the server then look if the user has one of these role.
	let roleAuthorized = rolesDB
		.get(user.guild.id)
		.value()
		.some((item: string) => user.roles.cache.has(item));

	//Return either user is allowed or not to use command
	return roleAuthorized ? true : false;
};

export { isAllowed };
