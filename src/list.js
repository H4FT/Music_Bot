const error = require('./error_message');

module.exports = {
    list: function list(message, serverQueue) {
        if (serverQueue) {
            let queue;
            for (let b = 0; serverQueue.songs[b] != null; b++) {
                if (queue === undefined) {
                    queue = serverQueue.songs[b].map(result => {
                        return `${b}: **__${result.title}__**\n`;
                    });
                } else {
                    queue = queue + serverQueue.songs[b].map(result => {
                        return `${b}: **__${result.title}__**\n`;
                    });
                }
            }
            return message.channel.send( {
                embed: {
                    title: "QUEUE",
                    description: String(queue),
                }
            });
        } else {
            error.error(message, 1);
            return;
        }
    }
}