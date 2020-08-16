module.exports = {
    skip: function skip(message, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("Vous n'êtes pas dans un salon vocal");
        }
        if (!serverQueue) {
            return message.channel.send("Pas de musique en cours");
        }
        serverQueue.connection.dispatcher.end();
    }
}
