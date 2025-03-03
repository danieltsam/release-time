let airStamp;
let nextEpisodeName;
document.getElementById('convertBtn').disabled = true

document.getElementById('searchBtn').addEventListener('click', function() {
    const tvshowName = document.getElementById('showSearch').value.trim();
    document.getElementById('releaseTime').style.display = "block"; 
    document.getElementById('convertedTime').style.display = "none";
    // if tvShowName is empty, return error
    if (!tvshowName) {
        document.getElementById('releaseTime').innerText = `Please enter the name of a show!`;
        return;
    }
    document.getElementById('releaseTime').innerText = `Searching for release time of ${tvshowName}...`;
    

    // call the backend server API to search for the TV show
    fetch(`http://localhost:3000/search-tv-show?tvshowName=${encodeURIComponent(tvshowName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('womp-womp API response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            airStamp = data.airStamp
            nextEpisodeName = data.nextEpisodeName
            if (airStamp) {
                showMessage = `Next Episode: '${nextEpisodeName}' airs on ${airStamp} (GMT Time)`
                document.getElementById('convertBtn').disabled = false;
            }
            else {
                showMessage = `😔 We were unable to find the next episode airtime for the show you've searched for. 😔`
                document.getElementById('convertBtn').disabled = true;
            }
            document.getElementById('releaseTime').innerText = showMessage;
            
        })
        .catch(error => {
            console.error('Error occurred while fetching TV show data:', error);
            document.getElementById('releaseTime').innerText = "Error occurred while fetching data.";
        });
});

function convertToUnix(airStamp) {
    return Math.floor(new Date(airStamp).getTime() / 1000); 
}

function unixToReadable(unixTimestamp) {
    // converts back to date from unix
    const date = new Date(unixTimestamp * 1000);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    // convert to 12 hour format with am and pm
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Converts 0 to 12
    const formattedHours = hours.toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
}

const TimeZones = [
    { name: "Australia/Adelaide", offset: "UTC +10:30" },
    { name: "Australia/Brisbane", offset: "UTC +10:00" },
    { name: "Australia/Broken_Hill", offset: "UTC +10:30" },
    { name: "Australia/Darwin", offset: "UTC +09:30" },
    { name: "Australia/Eucla", offset: "UTC +08:45" },
    { name: "Australia/Hobart", offset: "UTC +11:00" },
    { name: "Australia/Lindeman", offset: "UTC +10:00" },
    { name: "Australia/Lord_Howe", offset: "UTC +11:00" },
    { name: "Australia/Melbourne", offset: "UTC +11:00" },
    { name: "Australia/Perth", offset: "UTC +08:00" },
    { name: "Australia/Sydney", offset: "UTC +11:00" }
];

function populateTimeZones() {
    const localTimeZoneSelect = document.getElementById("localTimeZone");
    const testTimeInput = document.getElementById("testTime");

    TimeZones.forEach(zone => {
        let option1 = new Option(`${zone.name} (${zone.offset})`, zone.name);
        localTimeZoneSelect.add(option1);
    });

    // sets default selection to user's local timezone
    localTimeZoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// calls function when page loads
populateTimeZones();

const outputElement = document.getElementById('output');

document.getElementById('convertBtn').addEventListener('click', function () {
    
    const tvshowTimeZone = 'Europe/London'
    const localTimeZone = document.getElementById("localTimeZone").value;
    console.log(airStamp)
    const testTime = convertToUnix(airStamp)
    document.getElementById('convertedTime').innerText = `Converting Time...`;
    document.getElementById('convertedTime').style.display = "block";

    fetch(`http://localhost:3000/convert-time?tvshowTimeZone=${encodeURIComponent(tvshowTimeZone)}&localTimeZone=${encodeURIComponent(localTimeZone)}&testTime=${encodeURIComponent(testTime)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('api response was not ok :(')
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            convertedUnixTime = data.toTimestamp;
            convertedShowTime = unixToReadable(convertedUnixTime);

            document.getElementById('convertedTime').innerText = `Next Episode: '${nextEpisodeName}' airs on ${convertedShowTime} (${localTimeZone} Time)`;
            console.log('enjoy your converted time!')
        })
        .catch(error => {
            console.error('Oh no! Error has occured:', error)
        });
    });

