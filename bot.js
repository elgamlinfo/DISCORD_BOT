require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    if (msg.content === "ذايد") {
        msg.channel.send("اخويااااا");
        //msg.reply("Pong!");
    }
    if (msg.content === "$mmb-me") {
        msg.member.roles.add("819175285395423243");
    }
    if (msg.content === "$not-mmb-me") {
        msg.member.roles.remove("819175285395423243");
    }
    if(msg.content.includes("ذايد")){
        msg.react("❤️");
    }
});

client.login(process.env.BOT_TOKKEN);
