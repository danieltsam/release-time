const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;
require('dotenv').config();

const timezonedbApiKey = process.env.timezonedbApiKey; // TimezoneDB API Key

async function searchTvShow(tvshowName) {
    try {
        const searchResponse = await axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(tvshowName)}`);

        if (!searchResponse.data.length) {
            return ("Couldn't find a TV show with that name, sorry :(")
            
        }

        const firstShow = searchResponse.data[0].show;
        const seriesName = firstShow.name;
        const seriesId = firstShow.id;
        const seriesURL = firstShow.url;
        console.log(firstShow)
        console.log(`Found show: ${seriesName} (${seriesURL}) | (Series ID:, ${seriesId})`);
        const nextEpisodeLink = firstShow._links.nextepisode?.href; 
        
        if (!nextEpisodeLink) {
            return ("Couldn't find the next episode of that show, sorry :(")
        }
        const nextEpisodeResponse = await axios.get(nextEpisodeLink);
        console.log("------------------------------------------------")
        const nextEpisode = nextEpisodeResponse.data;
        console.log(nextEpisode)
        const nextEpisodeName = nextEpisode.name
        const airStamp = nextEpisode.airstamp

        console.log(`Next Episode of ${seriesName}: '${nextEpisodeName}'`)
        console.log(`Next Episode Airs on: ${airStamp} (GMT Timezone)`);

        return (`Next Episode: '${nextEpisodeName}' airs on ${airStamp} (GMT Time)`)

    } catch(error) {
        console.error("❌ error searching TV Show ):", error.response?.data || error.message)
    }
}

// tv show search route
app.get('/search-tv-show', async (req, res) => {
    const {tvshowName} = req.query;
    if (!tvshowName) {
        return res.status(400).json({error: "Missing tvshowName paramater"});
    }

    try {
        const showData = await searchTvShow(tvshowName)
        if (showData) {
            res.json(showData); 
        } else {
            res.status(404).json({error: "tv show not found :("});
        }
    } catch (error) {
        console.error("❌ error occurred while searching for TV show:", error);
        res.status(500).json({ error: "Error occurred while fetching TV show data" });
    }
})


// time zone conversion route
app.get('/convert-time', async (req, res) => {
    const {localTimeZone, tvshowTimeZone, testTime } = req.query;

    if (!localTimeZone || !tvshowTimeZone || !testTime) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
        // Call the API to convert time
        const response = await fetch(`https://api.timezonedb.com/v2.1/convert-time-zone?key=${timezonedbApiKey}&format=json&from=${tvshowTimeZone}&to=${localTimeZone}&time=${testTime}`);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error("failed to fetch data from the API :(");
        }

        // Parse the JSON data
        const data = await response.json();
        console.log("api response:", data);

        // Send the data back to the client
        res.json(data);
    } catch (error) {
        console.error("error occurred:", error)
        res.status(500).json({ error: "Error occurred while fetching time data oh no" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
