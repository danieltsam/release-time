*currently on hold for different projects

1. Start server.js (node server.js)
2. Open index.html and Convert Time!

Current Progress:
core functionality completed!
every possible input returns an output on front-end so user is never guessing what went wrong.
looks minimalist but presentable

Future Plans:
specific error messages based on whether show is finished/no new episodes coming out or couldn't find show
put show name in

🔹 Additional Functionalities:
1️⃣ Convert to Local Time Automatically
Instead of requiring the user to manually convert the time, automatically detect their time zone and display the converted time immediately after fetching the airstamp.

Use the Intl.DateTimeFormat API to detect the user's time zone.
Automatically convert the airstamp (GMT) to their local time.
2️⃣ Countdown Timer ⏳
Show a live countdown until the next episode airs!

Use JavaScript's setInterval() to update the countdown every second.
Display days, hours, minutes, and seconds until release.
3️⃣ Show Past Episodes 📺
Right now, you're only fetching the next episode. What about past episodes?

Use TVMaze’s episode list API (/shows/:id/episodes) to fetch all episodes.
Show a list of the most recent episodes with their air dates.
4️⃣ Alternative Release Timezones 🌍
Let users select different time zones and see how the release time changes.

Keep a dropdown of major time zones (US, UK, AU, etc.) and update the time accordingly.
5️⃣ Streaming Platform Link 🔗
TVMaze provides official streaming links for some shows.
Extract and display where the show is available (Netflix, Apple TV+, Hulu, etc.).
6️⃣ Episode Information & Summary 📝
Instead of just the name and time, show more details:

Episode synopsis
Duration
Director & Writers
7️⃣ Save Searches for Quick Access 🔖
Store the last searched show in localStorage, so users don’t have to retype it.
8️⃣ UI Improvements with Icons & Animations 🎨
Use FontAwesome to add icons (⏳ for countdown, 🎥 for episodes, etc.).
Smooth fade-in animations when fetching new data.