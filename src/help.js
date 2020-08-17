const Discord = require('discord.js');

module.exports = {
    help: function help(message) {
        const embed_message = {
            color: 0x0099f,
            title: 'Command for Musical Bot',
            description: 'Descriptions of all the command you can use for launch music with the bot',
            fields: [
                { name: '**Prefix**', value: '**£** is the prefix for call command.' },
                { name: '**help**', value: '**£help** open this message.'},
                { name: '**play**', value: '**£play {URL of music}** launch the music. If a song is already in play, bring the new song in queue.'},
                { name: '**skip**', value: '**£skip** skip the music in playing and pass to the next music in queue.'},
                { name: '**stop**', value: '**£stop** stop the music and disconnect the bot from the voice channel.'}
            ],
            timestamp: new Date(),
        };

        console.log('message launch');
        return message.channel.send({ embed: embed_message });
    }
}