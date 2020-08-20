const error = require('./error_message');

module.exports = {
    skip: function skip(message, serverQueue) {
        if (!message.member.voice.channel) {
            return error.error(message, 0);
        }
        if (!serverQueue) {
            return error.error(message, 1);
        }
        serverQueue.connection.dispatcher.end();
    }
}
