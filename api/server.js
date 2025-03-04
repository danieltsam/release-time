const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '..', 'public')));

const timezonedbApiKey = process.env.timezonedbApiKey; // TimezoneDB API Key

async function searchTvShow(tvshowName) {
    try {
        const searchResponse = await axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(tvshowName)}`);

        if (!searchResponse.data.length) {
            return ("Couldn't find a TV show with that name, sorry :(");
        }

        const firstShow = searchResponse.data[0].show;
        const seriesName = firstShow.name;
        const seriesId = firstShow.id;
        const seriesURL = firstShow.url;
        console.log(firstShow);
        console.log(`Found show: ${seriesName} (${seriesURL}) | (Series ID:, ${seriesId})`);
        const nextEpisodeLink = firstShow._links.nextepisode?.href;

        if (!nextEpisodeLink) {
            return ("Couldn't find the next episode of that show, sorry :(");
        }
        const nextEpisodeResponse = await axios.get(nextEpisodeLink);
        console.log("------------------------------------------------");
        const nextEpisode = nextEpisodeResponse.data;
        console.log(nextEpisode);
        const nextEpisodeName = nextEpisode.name;
        const airStamp = nextEpisode.airstamp;

        console.log(`Next Episode of ${seriesName}: '${nextEpisodeName}'`);
        console.log(`Next Episode Airs on: ${airStamp} (GMT Timezone)`);

        return {
            nextEpisodeName: nextEpisodeName,
            formattedMessage: `Next Episode: '${nextEpisodeName}' airs on ${airStamp} (GMT Time)`,
            airStamp: airStamp
        }

    } catch (error) {
        console.error("❌ error searching TV Show ):", error.response?.data || error.message);
    }
}

app.get('/search-tv-show', async (req, res) => {
    const { tvshowName } = req.query;
    if (!tvshowName) {
        return res.status(400).json({ error: "Missing tvshowName paramater" });
    }

    try {
        const showData = await searchTvShow(tvshowName);
        if (showData) {
            res.json(showData);
        } else {
            res.status(404).json({ error: "tv show not found :(" });
        }
    } catch (error) {
        console.error("❌ error occurred while searching for TV show:", error);
        res.status(500).json({ error: "Error occurred while fetching TV show data" });
    }
});

// Serve index.html as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
