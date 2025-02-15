import path from "path";
import { Config } from "../Modules/Structures/Handlers/Config.js";
import { CommandData } from "../Modules/Structures/Interfaces/Command.js";

const __dirname = path.resolve();

const CommandsType = {
    Admin: {
        Eval: CommandData
    },
    General: {
        Info: CommandData,
        Help: CommandData
    }
}

/** @type {CommandsType} */
const defaultConfig = {
    Admin: {
        Eval: {
            Enabled: true,
            Name: "eval",
            Usage: "eval <code>",
            Cooldown: 0,
            Permission: ["272257729320714240"],
            "~11": "Set this to your Discord user ID. Only trusted users should have access.",
            "~12": "⚠️ Eval grants full control over the bot and server.",
            "~13": "Misuse can lead to serious consequences. Use with caution.",
            Description: "Evaluates JavaScript code from the bot.",
            DeleteCommand: false,
            Arguments: [
                {
                    Name: "code",
                    Type: "string",
                    Description: "The JavaScript code to evaluate",
                    Required: true,
                },
            ],
        }
    },
    General: {
        Info: {
            Enabled: true,
            Name: "info",
            Type: "General",
            Usage: 'info <bot/user/channel/guild> [parameter]',
            Cooldown: false,
            Permission: ["@everyone"],
            Description: "Show's Information about the Bot, User, Channel or Guild",
            DeleteCommand: false,
            Aliases: ['information'],
            Arguments: [{
                Type: "Sub Command",
                Name: "bot",
                Description: "Show's Information about a Bot",
            }, {
                Type: "Sub Command",
                Name: "guild",
                Description: "Show's Information about a Guild",
            }, {
                Type: "Sub Command",
                Name: "user",
                Description: "Show's Information about a User",
                Options: [{
                    Type: "User",
                    Name: "user",
                    Description: "The User to show Information about",
                    Required: false
                }]
            }]
        },
        Help: {
            Enabled: true,
            Name: "help",
            Type: "General",
            Usage: 'help <type/command>',
            Cooldown: false,
            Permission: ["@everyone"],
            Description: "Helps you with the Bot's Commands",
            DeleteCommand: false,
            Aliases: [],
            Arguments: [{
                Type: "Sub Command",
                Name: "Category",
                Description: "Shows Information about a Category of Commands",
                Options: [{
                    Type: "String",
                    Name: "type",
                    Description: "The Type of Commands to show Information about",
                    AutoComplete: true,
                    Required: true,
                }]
            }, {
                Type: "Sub Command",
                Name: "Command",
                Description: "Shows Information about a Command",
                Options: [{
                    Type: "String",
                    Name: "command",
                    Description: "The Command to show Information about",
                    AutoComplete: true,
                    Required: true
                }]
            }]
        }
    },
}

export default new Config(path.join(__dirname, "./data/commands.yml"), defaultConfig)

export { CommandsType }