const search = require('youtube-search');
const opts = {
    maxResults: 1,
    key: 'Enter your key',
    type: 'video'
};

module.exports = {
    srch: async function search_url(arg) {
        let song = await search(arg, opts);
        let new_song = song.results;
        return new_song;
    }
}