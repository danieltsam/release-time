# TV Show Release Time Finder

*Currently on hold for different projects*

---

### Instructions:
1. **Start the Server**  
   Run `node server.js` to start the backend.
   
2. **Open the Frontend**  
   Open `index.html` and start converting time!

---

### Current Progress:
- **Core functionality completed!**
  - Every possible input returns an output on the front-end, so users are never guessing what went wrong.
  - The UI is minimalist but presentable.

---

### Future Plans:
- **Error handling improvements**:
  - Specific error messages depending on the show's status (e.g., show is finished, no new episodes coming out, or show not found).
  
- **Display show name**:  
  Put the show name in the error and result messages for better clarity.

---

### 🔹 Additional Functionalities to Work on in Future:

1️⃣ **Convert to Local Time Automatically**  
   - Detect the user's time zone automatically and display the converted time after fetching the airstamp.
   - Use the `Intl.DateTimeFormat` API to detect the user's time zone and convert from GMT.

2️⃣ **Countdown Timer ⏳**  
   - Show a live countdown until the next episode airs!
   - Use JavaScript's `setInterval()` to update the countdown every second, showing days, hours, minutes, and seconds.

3️⃣ **Show Past Episodes 📺**  
   - Fetch and display past episodes alongside the next episode.
   - Use TVMaze’s episode list API (`/shows/:id/episodes`) to get episode information.

4️⃣ **Alternative Release Timezones 🌍**  
   - Allow users to select different time zones (e.g., US, UK, AU) and see how the release time changes accordingly.

5️⃣ **Streaming Platform Link 🔗**  
   - Display where the show is available (Netflix, Apple TV+, Hulu, etc.), using TVMaze’s official streaming links.

6️⃣ **Episode Information & Summary 📝**  
   - Show more episode details, such as:
     - Episode synopsis
     - Duration
     - Director & Writers

7️⃣ **Save Searches for Quick Access 🔖**  
   - Store the last searched show in `localStorage`, so users don’t have to retype it.

8️⃣ **UI Improvements with Icons & Animations 🎨**  
   - Use FontAwesome to add icons (e.g., ⏳ for countdown, 🎥 for episodes).
   - Implement smooth fade-in animations when fetching new data.

---

Feel free to explore the project, contribute, or offer suggestions! ✨
