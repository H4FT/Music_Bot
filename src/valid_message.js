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

    mess_add: function mess_add(messagen, song) {
        const embed_message = {
            color: 0x09D000,
            title: 'ADD',
            timestamp: new Date(),
        }
        return message.channel.send( { embed: embed_message } );
    },

    mess_play: function mess_play(message, song) {
        const embed_message = {
            color: 0x09D000,
            title: 'PLAY',
            timestamp: new Date(),
        }
        return message.channel.send( { embed: embed_message } );
    }
}