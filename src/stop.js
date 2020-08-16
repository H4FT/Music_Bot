module.exports = {
    stop: function stop(message, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("Vous n'êtes pas dans un salon vocal");
        }
        if (!serverQueue) {
            return message.channel.send("Pas de musique en cours");
        }
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}