module.exports = {
    stop: function stop(message, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You're not in a voice channel !");
        }
        if (!serverQueue) {
            return message.channel.send("No music actually playing !");
        }
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}