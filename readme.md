# 📺 Release Time Converter  

🚀 **Live Site:** [release-time.onrender.com](https://release-time.onrender.com/)  

## 🔹 What is This?  
A simple tool to check when a TV show's next episode airs, converted to your local time. No more guessing when your favourite show is coming out!  

---

## 🛠️ How to Use  
1️⃣ Start the server with:  
   ```sh
   node server.js
   ```  
2️⃣ Open `index.html` in your browser and start converting times instantly!  

---

## ✅ Current Progress  
✔️ **Core functionality complete** – every input gets an output, so users are never left guessing.  
✔️ **Minimalist yet presentable design** – clean and easy to use.  
✔️ **Rate Limiting Implemented** – Prevents excessive API requests to avoid key suspension.  

---

## 🔮 Future Plans  
🔹 **Specific Error Messages**  
- Distinguish between "No upcoming episodes" vs. "Show not found."  

🔹 **Show Identification Issues**  
- Some shows have multiple versions (remakes, different years), causing incorrect results.  
- Example: Searching for *Battlestar Galactica* might return the wrong version.  
- Potential fix: Allow users to select from multiple search results (an image preview could help).  

🔹 **Auto Convert to Local Time**  
- Detect the user’s time zone and convert the air time automatically.  

🔹 **Countdown Timer ⏳**  
- Show a live countdown until the next episode airs.  

🔹 **Show Past Episodes 📺**  
- Fetch and display previous episodes alongside the next air date.  

🔹 **Alternative Timezones 🌍**  
- Allow users to check different time zones (US, UK, AU, etc.).  

🔹 **Streaming Platform Link 🔗**  
- Display where the show is available (Netflix, Hulu, Apple TV+, etc.).  

🔹 **Episode Information & Summary 📝**  
- Include details like episode synopsis, duration, and creators.  

🔹 **Save Searches for Quick Access 🔖**  
- Store the last searched show in `localStorage` for convenience.  

🔹 **UI Improvements 🎨**  
- Add icons, animations, and smooth UI transitions.  

---

## ⚠️ Current Issues  
❌ **Lack of Show Year/Specific Identification**  
- No option to select between multiple results (e.g., *Battlestar Galactica 2004* vs *1978*).  
- Users might get incorrect results.  

![Example Issue](https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Battlestar_Galactica_TOS_Title.jpg/250px-Battlestar_Galactica_TOS_Title.jpg)  

❌ **Non-Specific Error Handling**  
- Doesn't differentiate between "No new episodes" and "Show not found."  

❌ **Potential Rate Limit Hits**  
- Spamming "Convert Time" could get the API key suspended.  
- Implemented rate limiting to prevent abuse (1-minute and 10-minute cooldowns).  

---

## ⏳ Rate Limiting Details  
To prevent excessive API calls, rate limiting is in place:  
- **1-minute limit:** Too many requests in a short period will block further queries.  
- **10-minute limit:** Additional restrictions apply to prevent abuse.  
- Users who exceed limits will see a message explaining the cooldown period.  

---
💡 **Made with HTML, CSS, JavaScript, Node.js, and TVMaze API** 🎬
**Hosted on Render**

*Thank you for checking my first coding project out!*