# PerChannelXP

Simple DiscordJS bot to add a role to every member that write more than N messages in a channel

## Config

```json
{
	"discordToken": "Discord bot token", // Token of the bot
	"prefix": "?" // Prefix for commands
}
```

## Usage

| Command                               | Usage                                                                 |
| ------------------------------------- | --------------------------------------------------------------------- |
| ?addRole [Message amount] [Role name] | Set a role who'll be added to every user who type more than N message |
| ?removeRole [Role name]               | Remove the role from the channel                                      |
| ?grantRole [Role name]                | Add a role who'll be able to use commands of this bot                 |
| ?ungrantRole [Role name]              | Remove a role who can already use my command                          |
| ?channelRole                          | Output every role in a channel with the required message amount       |
