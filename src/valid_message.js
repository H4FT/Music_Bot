const discord = require('discord.js');
const loop = ["Looping activated !", "Looping desactivated !"];

module.exports = {
    mess_loop: function mess_loop(message, nb) {
        const embed_message = {
            color: 0x09D000,
            title: 'LOOP',
            description: `${loop[nb]}`,
            timestamp: new Date(),
        }
        return message.channel.send( { embed: embed_message } );
    },

    mess_add: function mess_add(message, song) {
        const embed_message = {
            color: 0x09D000,
            title: 'ADD',
            description: `**__${song[0].title}__** was been add to the queue`,
            image: {
                url: `${song[0].thumbnails.high.url}`,
            },
            timestamp: new Date(),
        }
        return message.channel.send( { embed: embed_message } );
    },

    mess_play: function mess_play(message, song) {
        const embed_message = {
            color: 0x09D000,
            title: 'PLAY',
            description: `**__${song[0].title}__** started`,
            image: {
                url: `${song[0].thumbnails.high.url}`,
            },
            timestamp: new Date(),
        }
        return message.textChannel.send( { embed: embed_message } );
    },

    mess_vol: function mess_vol(message, serverQueue, nb) {
        const embed_message = {
            color: 0x09D000,
            title: 'VOLUME',
            description: `Volume has been changed of ${serverQueue.volume} to ${nb}`,
            timestamp: new Date(),
        }
        return message.channel.send( { embed: embed_message } );
    }
}