const discord = require('discord.js');
const youtube = require('ytdl-core');

module.exports = {
    supp: function supp(message, serverQueue) {
        let args = message.content.split(" ");

        if (serverQueue) {
            if (!args[1] || !serverQueue.songs[args[1]] || args[1] === 0 || isNaN(parseInt(args[1], 10))) {
                message.channel.send("You need to indicate a valid number !");
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
            message.channel.send("No music in queue !");
            return;
        }
    }
}