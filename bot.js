const Discord = require("discord.js");
const client = new Discord.Client();
const footer = "Verifier | Made by ZuleZeh#3097"

const prefix = "!";

client.on("ready", () => {
    console.log("Verifier Bot has Loaded!");
    client.user.setActivity("!Verify | Fusion Discord")
});

client.on("guildMemberAdd", member => {
  var nonverified = member.guild.roles.find(`name`, `NV`);
  member.addRole(nonverified);
});

client.on(`message`, function(message) {
  if (message.channel.name === "verify") {
    if (message.content === "!verify") {
        const customer = message.guild.roles.find(`name`, `Members`)
        var role = message.guild.roles.find(`name`, `NV`);
        message.member.addRole(customer);
        message.member.removeRole(role);
        message.author.send({ embed: {
            color: 0xC0C0C0,
            title: `Fusion Bots - Verification`,
            description: `:white_check_mark: You have Verified Yourself.`,
            footer: {
                text: `Verifier | Made by ZuleZeh#3097`
            },
            timestamp: new Date()
        }})
        message.delete(0)
      } else message.delete()
  };
});

client.on(`message`, (message) => {
    let cont = message.content.slice(prefix.length).split("")
    let args = cont.slice(1);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.toLowerCase().startsWith(prefix + `fakejoin`)) {

      client.emit("guildMemberAdd", message.member);
    }

    if (message.content.toLowerCase().startsWith(prefix + `verify`)) {
      if (message.channel.name === "verify") {
        return;
        }
        else {
            message.delete();
            const embed = new Discord.RichEmbed()
            .setColor(0xC0C0C0) // Light Blue
            .setTitle(`Fusion Bots - Verification`)
            .setDescription(':x: You Cannot be Verified Again!')
            .setFooter(footer)
            return message.author.send({ embed: embed});
        }
    }

});

client.login(process.env.BOT_TOKEN)
