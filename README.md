# ♟️ Chess.com Clone — Real-Time Multiplayer Chess

A real-time multiplayer chess web application where users can play chess online with live updates using WebSockets. This project focuses on building real-time communication, game synchronization, and a smooth user experience.

---

## 🚀 Live Demo

👉 Deployed on Render — play the game here:
**[https://chess-com-l3ai.onrender.com]**

---

## ✨ Features

* ♟️ Real-time chess gameplay
* ⚡ Live moves using WebSockets
* 👥 Multiplayer game session
* 🎨 Clean UI with Tailwind CSS
* 📡 Instant board synchronization
* 🌐 Deployed and accessible online
* 🧩 Lightweight and fast

> Currently supports **play mode only** — no authentication or matchmaking yet.

---

## 🛠️ Tech Stack

**Backend**

* Node.js
* Express.js
* Socket.IO (WebSockets)

**Frontend**

* EJS templates
* JavaScript
* HTML
* CSS
* Tailwind CSS

**Deployment**

* Render

---

## 🧠 How It Works

1. Players join the game page.
2. Socket connection is established.
3. Moves are emitted via WebSocket events.
4. Server broadcasts updates to both players.
5. Board state stays synchronized in real time.

---

## 📂 Project Structure

```
├── public/        # Static assets (CSS, JS)
├── views/         # EJS templates
├── routes/        # Express routes
├── sockets/       # Socket logic
├── server.js      # Entry point
├── package.json
```

---

## ⚙️ Installation & Local Setup

Clone the repository:

```bash
git clone https://github.com/your-username/chess-app.git
cd chess-app
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm start
```

Open:

```
http://localhost:3000
```

---

## 📡 WebSocket Events (Example)

* `joinGame` — player joins session
* `move` — send chess move
* `updateBoard` — sync board state

---

## 🔮 Future Improvements

* ✅ User authentication
* ✅ Matchmaking system
* ✅ Game history
* ✅ Timer / clock
* ✅ Spectator mode
* ✅ Chat during game
* ✅ Mobile responsiveness improvements

---

## 🎯 Learning Outcomes

* Built real-time apps using Socket.IO
* Managed live state synchronization
* Understood client-server event flow
* Practiced full-stack deployment

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📜 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Sandeep Yadav**

If you like this project, consider giving it a ⭐ on GitHub!
