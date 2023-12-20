# Chess Game

This is an online chess game project built with JavaScript, React, Sass, Python, and Flask. This project allows users to play chess against AI-powered bots or challenge other players online. It features a sleek dark mode UI, user authentication with login and registration, and even includes a game analysis feature to review and learn from your matches.

![Captura de tela 2023-10-15 194702](https://github.com/pedrop-dev/chess-game/assets/92335472/c5ee4f16-2df0-49ca-933a-2d8957f5bfab)

## Features


+ **Dark Mode:** Enjoy a visually pleasing and comfortable gaming experience with the dark mode feature, reducing eye strain during long gameplay sessions.

+ **Login and Register:** Securely create an account or log in using the authentication system, allowing you to keep track of your progress and engage with other players online.

+ **Play Against Bot:** Sharpen your skills by playing against AI-powered bots of varying difficulty levels. Test your strategies and improve your gameplay.

+ **Online Multiplayer:** Challenge your friends or players from around the world to intense chess matches. Show off your strategic prowess and climb the global leaderboard.

+ **Game Analysis:** After each match, review the game analysis feature to see a detailed breakdown of your moves and the AI's moves. Learn from your mistakes and discover new strategies.

## Technologies Used

+ **Frontend:** The frontend is developed using JavaScript and React. The user interface is designed with Sass to create a modern and responsive layout.

+ **Backend:** The backend is powered by Python and Flask. It handles user authentication, game logic, and communication between players during online matches.

## Installation and Setup

**Clone the repository:**
```
git clone https://github.com/pedrop-dev/chess-game.git
```

**Navigate to the project directory:**
```
cd chess-game
```

**Install frontend dependencies:**
```
npm install
```

**Install backend dependencies:**
```
cd api
pipenv install 
pipenv shell

```
**Configure frontend server**
Write a .env file in the root of the project
```
VITE_API_BASE_URL=http://localhost:5000
```
**Run the frontend development server:**
```
npm run dev
```
**Configure Backend Server**
Write a .env file with the following content in the api directory
```
FRONTEND_DOMAIN=http://localhost:5173
FLASK_SECRET_KEY=super-secret-key
MAIL_USERNAME=email-with-app-password-configured@example.com
MAIL_PASSWORD=16-digit-app-password
```
**Run the backend server:**
```
pipenv shell
python app.py
```
Access the application in your browser at http://localhost:5173.

## Contributing
Contributions are welcome! Whether you're an experienced developer or just starting, you can help make this project even better. Fork the repository, create a new branch, and submit your pull requests.

## License
This project is licensed under the MIT License.

Ready to elevate your chess game? Dive into this engaging gameplay, challenge opponents online, and improve your strategy with the game analysis feature. Start playing today and become a chess master!

For any inquiries, contact us at heitorrdpp@gmail.com or pedroh.ps0102@gmail.com.

## Colaborators

[Pedro Henrique](https://www.linkedin.com/in/pedroh-ps/) <br>
[Heitor Prado](https://www.linkedin.com/in/heitor-prado-99767227b/)
