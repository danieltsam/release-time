document.getElementById('searchBtn').addEventListener('click', function() {
    let tvshowName = document.getElementById('showSearch').value;
    // For when show search gets implemented vv | does nothing right now
    // document.getElementById('releaseTime').innerText = `Searching for release time of ${tvshowName}...`;

});

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
    const showTimeZoneSelect = document.getElementById("showTimeZone");
    const localTimeZoneSelect = document.getElementById("localTimeZone");
    const testTimeInput = document.getElementById("testTime");

    TimeZones.forEach(zone => {
        let option1 = new Option(`${zone.name} (${zone.offset})`, zone.name);
        let option2 = new Option(`${zone.name} (${zone.offset})`, zone.name);
        showTimeZoneSelect.add(option1);
        localTimeZoneSelect.add(option2);
    });

    // Set default selection to user's local timezone
    localTimeZoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Call function when page loads
populateTimeZones();

const outputElement = document.getElementById('output');

document.getElementById('convertBtn').addEventListener('click', function () {
    const tvshowTimeZone = document.getElementById("showTimeZone").value;
    const localTimeZone = document.getElementById("localTimeZone").value;
    const testTime = document.getElementById("testTime").value;

    fetch(`http://localhost:3000/convert-time?tvshowTimeZone=${encodeURIComponent(tvshowTimeZone)}&localTimeZone=${encodeURIComponent(localTimeZone)}&testTime=${encodeURIComponent(testTime)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('api response was not ok :(')
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            outputElement.textContent = JSON.stringify(data, null, 2);
            console.log('did everything right')
        })
        .catch(error => {
            console.error('Oh no! Error has occured:', error)
        });
    });

