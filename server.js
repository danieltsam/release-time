const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000; // You can change the port if needed
require('dotenv').config();

const timezonedbApiKey = process.env.timezonedbApiKey; // TimezoneDB API Key
console.log("timezonedb api key is", timezonedbApiKey);
const tvdbApiKey = process.env.tvdbApiKey // tvdb API Key;

async function getTvdbToken(){
    try {
        const response = await axios.post('https://api4.thetvdb.com/v4/login', {
            apikey: tvdbApiKey
        });
        const tvdbJwtToken = response.data.data.token;
        console.log("TVDB Token Acquired! ✅ TVDB Token:", tvdbJwtToken)
        return tvdbJwtToken
    } catch (error) {
        console.error("❌ womp-womp! error getting tvdb token:", error.response?.data || error.message);
        return null;
    }
}

async function searchTvShow(tvshowName) {
    const tvdbJwtToken = await getTvdbToken();
    if (!tvdbJwtToken) return;

    try {
        const response = await axios.get(`https://api4.thetvdb.com/v4/search?query=${encodeURIComponent(tvshowName)}`, {
            headers: { Authorization: `Bearer ${tvdbJwtToken}`}
        });

        const tvShowData = response.data.data
        const firstShow = response.data.data[0];
        const seriesName = firstShow.name;
        const seriesId = firstShow.tvdb_id;
        console.log(firstShow)
        console.log("Series ID:", seriesId);
        console.log("Series Name:", seriesName)

       return getNextAiredEpisode(seriesId, tvdbJwtToken);
        
    } catch(error) {
        console.error("❌ error searching TV Show ):", error.response?.data || error.message)
    }
}

async function getNextAiredEpisode(seriesId, tvdbJwtToken) {
    try {
        const response = await axios.get(`https://api4.thetvdb.com/v4/series/${seriesId}/nextAired`, {
            headers: { Authorization: `Bearer ${tvdbJwtToken}` }
        });

        console.log("Next Aired Episode:", response.data);
        const nextAiredDateData = response.data.data ? response.data.data.airDate : 'No next aired episode available';
        const nextAiredDate = response.data.data?.nextAired || 'Date not available';
        console.log('Next Aired Date:', nextAiredDate);
        return nextAiredDate;
    } catch (error) {
        console.error(`error fetching next aired date for tv show:`, error.response?.data || error.message);
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
