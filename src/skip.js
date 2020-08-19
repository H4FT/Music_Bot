module.exports = {
    skip: function skip(message, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You're not in a voice channel !");
        }
        if (!serverQueue) {
            return message.channel.send("No music actually playing !");
        }
        serverQueue.connection.dispatcher.end();
    }
}
