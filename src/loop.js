const error = require('./error_message');
const loop = require('./valid_message');

module.exports = {
    looping: function looping(message, serverQueue) {
        if (!serverQueue) {
            error.error(message, 1);
            return;
        } else {
            if (serverQueue.loop === false) {
                loop.mess_loop(message, 0);
                serverQueue.loop = true;
                return serverQueue;
            } else {
                loop.mess_loop(message, 1);
                serverQueue.loop = false;
                return serverQueue;
            }
        }
    }
}