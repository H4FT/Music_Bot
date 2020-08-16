const stop = require('./stop');
const skip = require('./skip');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const prefix = '£';
const client = new Discord.Client();
const queue = new Map();

client.on('message',  msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const serverQueue = queue.get(msg.guild.id);

    if(msg.content.startsWith(`${prefix}play`)) {
        execute(msg, serverQueue);
        return;
    } else if(msg.content.startsWith(`${prefix}skip`)) {
        skip.skip(msg, serverQueue);
        return;
    } else if(msg.content.startsWith(`${prefix}stop`)) {
        stop.stop(msg, serverQueue);
        return;
    } else {
        msg.channel.send("Vous avez entrez une commande invalide !");
    }
})

async function execute(message, serverQueue) {
    const args = message.content.split(" ");
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return message.channel.send("Vous n'êtes pas dans un salon vocal");
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("Need permissions");
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 1,
            playing: true,
        };
        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
            let connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        }
        catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    }
    else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`**${song.title}** has been added to the queue !`);
    }
}

function play(guild, song) {
    console.log(song);
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url, {filter: 'audioonly'}))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolume(1);
    serverQueue.textChannel.send(`Démarrage de **${song.title}**`);
}

client.login("NzA4MDEzMDkwOTUxNjU5NjAy.XrRKwQ.EijufF48jegiNNUpw6YAIJnYXZc");