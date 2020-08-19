const Discord = require('discord.js');

module.exports = {
    help: function help(message) {
        const embed_message = {
            color: 0x0099f,
            title: 'Command for Musical Bot',
            description: 'Descriptions of all the command you can use for launch music with the bot',
            fields: [
                { name: '**Prefix**', value: '**£** is the prefix for call command.' },
                { name: '**£help**', value: 'open this message.'},
                { name: '**£play [NAME/ID/URL]**', value: 'launch the music. If a song is already in play, bring the new song in queue.'},
                { name: '**£skip**', value: 'skip the music in playing and pass to the next music in queue.'},
                { name: '**£stop**', value: 'stop the music and disconnect the bot from the voice channel.'},
                { name: '**£queue**', value: 'Show the list of music in queue.'}
            ],
            timestamp: new Date(),
        };
        return message.channel.send({ embed: embed_message });
    }
}