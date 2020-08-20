module.exports = {
    list: function list(message, serverQueue) {
        if (serverQueue) {
            message.channel.send("**Music in queue:**");
            for (let i = 0; serverQueue.songs[i]; i++) {
                let song = serverQueue.songs[i];
                message.channel.send(`${i} : **${song[0].title}**\n`);
            }
            return;
        } else {
            message.channel.send("No music in queue !");
            return;
        }
    }
}