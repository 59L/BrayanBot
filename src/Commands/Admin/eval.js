import { Command } from "../../Modules/Structures/Handlers/Commands.js";
import Utils from "../../Modules/Utils.js";
import { manager } from "../../index.js";
import os from "os";
import ms from "ms";

export default new Command({
    commandData: manager.configs.commands.Admin.Eval,
    commandConfig: {
      guildOnly: true,
      dmOnly: false,
      requiredPermissions: {
        bot: [],
        user: [],
      },
    },
  
    LegacyRun: async (manager, message, args) => {
      const input = args.join(" ");
      if (!input) {
        return message.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Presets.Error,
            variables: [
              Utils.createVariable("error", "You need to define code to execute!"),
              ...Utils.userVariables(message.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      }
      if (input.includes("token")) {
        return message.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Presets.Error,
            variables: [
              Utils.createVariable("error", "You can't execute code that includes the bot token!"),
              ...Utils.userVariables(message.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      }
      try {
        let output = eval(input);
        message.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Admin.Eval,
            variables: [
              Utils.createVariable("input", input),
              Utils.createVariable("output", output),
              ...Utils.userVariables(message.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      } catch (error) {
        message.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Presets.Error,
            variables: [
              Utils.createVariable("error", error.toString()),
              ...Utils.userVariables(message.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      }
    },
  
    InteractionRun: async (manager, interaction) => {
      const input = interaction.options.getString("code");

      if (!input) {
        return interaction.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Presets.CommandError,
            variables: [
              Utils.createVariable("error", "```You need to define code to execute!```"),
              ...Utils.userVariables(interaction.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      }
      if (input.includes("token")) {
        return interaction.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Presets.Error,
            variables: [
              Utils.createVariable("error", "```You can't execute code that includes the bot token!```"),
              ...Utils.userVariables(interaction.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      }
      try {
        let output = await eval(`(async () => {
            ${input}
        })()`);
        interaction.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Admin.Eval,
            variables: [
              Utils.createVariable("input", input),
              Utils.createVariable("output", output),
              ...Utils.userVariables(interaction.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      } catch (error) {
        interaction.reply(
          Utils.setupMessage({
            configPath: manager.configs.lang.Presets.Error,
            variables: [
              Utils.createVariable("error", `\`\`\`${error.toString()}\`\`\``),
              ...Utils.userVariables(interaction.member),
              ...Utils.botVariables(manager),
            ],
          })
        );
      }
    },
  });