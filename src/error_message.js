const discord = require('discord.js');
const string = ["You are not in a voice channel !!!", "No music in queue !!!", "Invalid command !!!", "Invalid number !!!", "Invalid permissions !!!"];

module.exports = {
    error: function error(message, nb) {
        const embed_message = {
            color: 0xFF0000,
            title: 'ERROR',
            description: `${string[nb]}`,
            timestamp: new Date(),
        }
        return message.channel.send( { embed: embed_message } );
    },
}