const error = require('./error_message');
const msg_vol = require('./valid_message');

module.exports = {
    volume: function volume(message, serverQueue) {
        let arg = message.content.split(" ");

        if (!serverQueue) {
            return error.error(message, 1);
        } else {
            if (isNaN(parseInt(arg[1], 10)) || !arg[1] || arg[1] < 0 || arg[1] > 100) {
                return error.error(message, 3);
            } else {
                msg_vol.mess_vol(message, serverQueue, arg[1]);
                serverQueue.volume = parseInt(arg[1], 10);
                return serverQueue;
            }
        }
    }
}