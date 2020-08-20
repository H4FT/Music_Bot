const Discord = require('discord.js');

module.exports = {
    help: function help(message) {
        const embed_message = {
            color: 0x2FECE0,
            title: '__Command for Musical Bot__',
            description: 'Descriptions of all the command for use the bot',
            fields: [
                { name: '**__Prefix__**', value: '**£** is the prefix for call command.' },
                { name: '**__£help__**', value: 'open this message.'},
                { name: '**__£play [NAME/ID/URL]__**', value: 'launch the music. If a song is already in play, bring the new song in queue.'},
                { name: '**__£skip__**', value: 'skip the music in playing and pass to the next music in queue.'},
                { name: '**__£stop__**', value: 'stop the music and disconnect the bot from the voice channel.'},
                { name: '**__£loop__**', value: 'Make the queue of music loop.'},
                { name: '**__£queue__**', value: 'Show the list of music in queue.'},
                { name: '**__£remove [NB]__**', value: 'Remove the music who correspond to the number enter.'}
            ],
            timestamp: new Date(),
        };
        return message.channel.send({ embed: embed_message });
    }
}