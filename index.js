const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const prefix = '£';
const client = new Discord.Client();
const queue = new Map();

client.on('message',  msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const serverQueue = queue.get(msg.guild.id);

    //serverQueue.loop = !serverQueue.loop;
    if(msg.content.startsWith(`${prefix}play`)) {
        execute(msg, serverQueue);
        return;
    } else if(msg.content.startsWith(`${prefix}skip`)) {
        skip(msg, serverQueue);
        return;
    } else if(msg.content.startsWith(`${prefix}stop`)) {
        stop(msg, serverQueue);
        return;
    /*} else if (msg.content.startsWith(`${prefix}loop`)) {
        loop(msg, serverQueue);*/
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
        return message.channel.send('${song.title} has been added to the queue !');
    }
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel) {
        return message.channel.send("Vous n'êtes pas dans un salon vocal");
    }
    if (!serverQueue) {
        return message.channel.send("Pas de musique en cours");
    }
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel) {
        return message.channel.send("Vous n'êtes pas dans un salon vocal");
    }
    if (!serverQueue) {
        return message.channel.send("Pas de musique en cours");
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
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

/*function loop(message, serverQueue) {
    if (serverQueue.loop === false) {
        serverQueue.loop = true;
        message.channel.send(`Loop **activé**`);
    } else {
        serverQueue.loop = false;
        message.channel.send(`Loop **désactivé**`);
    }
    return serverQueue;
}*/

client.login("NzA4MDEzMDkwOTUxNjU5NjAy.XrRKwQ.EijufF48jegiNNUpw6YAIJnYXZc");