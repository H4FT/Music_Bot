const discord = require('discord.js');
const youtube = require('ytdl-core');
const error = require('./error_message');

module.exports = {
    supp: function supp(message, serverQueue) {
        let args = message.content.split(" ");

        if (serverQueue) {
            if (!args[1] || !serverQueue.songs[args[1]] || args[1] === 0 || isNaN(parseInt(args[1], 10))) {
                error.error(message, 3);
                return;
            } else {
                if (serverQueue.songs[parseInt(args[1], 10) + 1] === !serverQueue) {
                    serverQueue.songs[args[1]] = !serverQueue;
                    return serverQueue;
                } else {
                    serverQueue.songs[args[1]] = serverQueue.songs[parseInt(args[1], 10) + 1];
                    serverQueue.songs[parseInt(args[1], 10) + 1] = !serverQueue;
                    return serverQueue;
                }
            }
        } else {
            error.error(message, 1);
            return;
        }
    }
}