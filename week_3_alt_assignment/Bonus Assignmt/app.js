/**As a fan of horror movies, 
 * I've created a mini horror movie guessing game. 
 * Currently, there are 10 movies in the game, 
 * but I hope to add more in the future. 
 * The answers are not case-sensitive but are apostrophe-sensitive, 
 * so please keep that in mind. 
 * Also, only the title of the movie will work as an answer, 
 * not the names of any characters. Enjoy!
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Help parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//File Path and Directory
app.use(express.static(path.join(__dirname, 'public')));

// Setup session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.get("/", (_, res) => res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horror Movie Guessing Game</title>
    <style>
        body {
            font-family: 'Gothic', sans-serif; 
            text-align: center; 
        h1 {
            margin-top: 50px;
        }
        p {
            margin-top: 20px;
        }
        a {
            color: red; /* Change link color to red */
            text-decoration: none; /* Remove underline */
        }
    </style>
</head>
<body>
    <h1>Welcome to Horror Movie Guessing Game</h1>
    <p>A chilling browser experience for horror fans. <br>
    Test your knowledge of iconic horror movies.</p>
    <p><a href="/horrorgame">Click here to start your chilling adventure!</a></p> <!-- Centered link -->
</body>
</html>
`));

// Map of image filenames to answers
const imageAnswers = {
    'A Nightmare on Elm Street.png': 'A Nightmare on Elm Street',
    'Child Play.png': "Child's Play",
    'Friday the 13th.png': 'Friday the 13th',
    'Halloween.png': 'Halloween',
    'Scream.png': 'Scream',
    'Silence of the Lambs.png': 'Silence of the Lambs',
    'The Exorcist.png': 'The Exorcist',
    'The Poltergeist.png': 'The Poltergeist',
    'The Ring.png': 'The Ring',
    'The Shining.png': 'The Shining'
};

// Route to serve the index page
app.get('/horrorgame', (req, res) => {
    const imageFilenames = Object.keys(imageAnswers);
    const randomImageFilename = imageFilenames[Math.floor(Math.random() * imageFilenames.length)];

    // Get the corresponding answer
    const answer = imageAnswers[randomImageFilename];

    // Store current image and answer in the session
    req.session.imageFilename = randomImageFilename;
    req.session.correctAnswer = answer;

    // HTML
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Guess the Horror Movie</title>
        <style>
            body {
                font-family: Gothic, sans-serif;
                text-align: center;
            }
            h1 {
                margin-top: 50px;
            }
            img {
                max-width: 400px;
                margin: 20px auto;
            }
            form {
                margin-top: 20px;
            }
            input[type="text"] {
                padding: 10px;
                font-size: 16px;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                background-color: #FF0000;
                color: white;
                border: none;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <h1>Guess the title of the Horror Movie</h1>
        <img src="/images/${randomImageFilename}" alt="Guess the Picture">
        <form action="/guess" method="POST">
            <label for="guess">Your Guess:</label>
            <input type="text" id="guess" name="guess" required>
            <button type="submit">Submit Guess</button>
        </form>
    </body>
    </html>
    `;
    res.send(html);
});

// Handle guess, get current image and answer for the session, not case sensitive answer
app.post('/guess', (req, res) => {
    const { guess } = req.body;
    const { imageFilename, correctAnswer } = req.session;

    const isCorrect = (guess.toLowerCase() === correctAnswer.toLowerCase());

    let response;
    if (isCorrect) {
        response = "Congratulations! Your guess is correct.";
    } else {
        response = `Sorry, your guess "${guess}" is incorrect. The correct answer is "${correctAnswer}". Try again.`;
    }

    response += `<br/><a href="/horrorgame">Go back and guess another image</a>`;

    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
