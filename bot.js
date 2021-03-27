require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

const { Player } = require("discord-player");
const player = new Player(client);
client.player = player;

const settings = {
    prefix: "$"
};

client.player.on("trackStart", (msg, trk) => {
    msg.channel.send(`Now Playing ${trk.title}.....`);
})


client.player.on('queueEnd', (message, queue) => message.channel.send('Music stopped as there is no more music in the queue!'))

client.player.on('channelEmpty', (message, queue) => message.channel.send('Music stopped as there is no more member in the voice channel!'))

client.player.on('botDisconnect', (message) => {
    message.channel.send('Music stopped as I have been disconnected from the channel!')
});


client.player.on('noResults', (message, query) => message.channel.send(`No results found on YouTube for ${query}!`))


client.player.on('searchResults', (message, query, tracks) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Here are your search results for ${query}!`)
    .setDescription(tracks.map((t, i) => `${i}. ${t.title}`))
    .setFooter('Send the number of the song you want to play!')
    message.channel.send(embed);

})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




//music
client.on("message", async (msg) => {

    const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //play music
    if(command === "play" || command === "p"){
        EmptyChannel(msg);
        await client.player.play(msg, args[0], true);
    }


    //search for music
    if(command === "search"){
        EmptyChannel(msg);
        await client.player.search(args[0])
    }

    //pause music
    if(command === "pause" || command === "pus"){
        EmptyChannel(msg);
        await client.player.pause(msg)
    }

    //resume music
    if(command === "resume" || command === "res"){
        EmptyChannel(msg);
        await client.player.resume(msg)
    }

    //stop music
    if(command === "stop" || command === "s"){
        EmptyChannel(msg);
        await client.player.stop(msg);
    }
});


function EmptyChannel(msg) {
    if (!msg.member.voice.channel) return msg.channel.send(` - You're not in a voice channel !\n- Please Join One!`);
}



client.login(process.env.BOT_TOKKEN);
