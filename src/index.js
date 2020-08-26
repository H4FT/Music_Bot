const stop = require('./stop');
const skip = require('./skip');
const error = require('./error_message');
const help = require('./help');
const list = require('./list');
const no_split = require('./args_no_split');
const search = require('./search');
const remove = require('./remove');
const loop = require('./loop');
const msg_valid = require('./valid_message');
const vol = require('./volume');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const prefix = '£';
const client = new Discord.Client();
const queue = new Map();

client.on('message',  msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const serverQueue = queue.get(msg.guild.id);

    let verif = msg.content.split(" ");
    switch (verif[0]) {
        case `${prefix}play` :
            execute(msg, serverQueue);
            break;
        case `${prefix}stop` :
            stop.stop(msg, serverQueue);
            break;
        case `${prefix}skip` :
            skip.skip(msg, serverQueue);
            break;
        case `${prefix}loop` :
            loop.looping(msg, serverQueue);
            break;
        case `${prefix}remove` :
            remove.supp(msg, serverQueue);
            break;
        case `${prefix}queue` :
            list.list(msg, serverQueue);
            break;
        case `${prefix}volume` :
            vol.volume(msg, serverQueue);
            break;
        case `${prefix}help` :
            help.help(msg);
            break;
        default :
            error.error(msg, 2);
    }
})

async function execute(message, serverQueue) {
    const args = message.content.split(" ");
    let arg_complete = no_split.no_split(args);
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return error.error(message, 0);
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return error.error(message, 4);
    }

    const song = await search.srch(arg_complete);

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            loop: false,
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
        return msg_valid.mess_add(message, song);
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection
        .play(ytdl(song[0].link, {filter: 'audioonly'}))
        .on("finish", () => {
            if (serverQueue.loop === false) {
                serverQueue.songs.shift();
            } else {
                serverQueue.songs.push(serverQueue.songs.shift());
            }
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolume(serverQueue.volume);
    return msg_valid.mess_play(serverQueue, song)
}

client.login("Enter your Token");
