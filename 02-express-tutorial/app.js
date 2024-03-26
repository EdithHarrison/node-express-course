// Week3 Assignment
const express = require('express');
const app = express();


app.use(express.static("./public"));

app.get("/about", (req, res) => {
    res.status(200).send("Hi my name is Edith, Welcome to my first Express");
});

app.post("/", (req, res) => {
    res.status(200).send("POST request received");
});

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!" });
});

// Retrieving all products
const { products } = require("./data");
app.get("/api/v1/products", (req, res) => {
    res.json(products);
});

// Fetching Products by ID
app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "That product was not found." });
    }
});

// Filtering products by name, not case sensitve if statement applied
app.get("/api/v1/query", (req, res) => {
    const { search, limit } = req.query;
    let filteredProducts = products;
    if (search) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().startsWith(search.toLowerCase()));
    }
    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }
    res.json(filteredProducts);
});

// Week4 Assignment

//Bonus Assignment
const authMiddleware = require('./authMiddleware');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware for parsing request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next();
};

app.use(logger);

// Import routes
const peopleRouter = require('./routes/people');
app.use("/api/v1/people", peopleRouter);

//Week4 Bonus Assignment

// Testing with authentication
app.get("/test", authMiddleware, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user}!` });
});

// Logging in
app.post("/logon", (req, res) => {
    const { name } = req.body;
    if (name) {
        res.cookie("name", name);
        res.status(201).json({ message: `Welcome, ${name}!` });
    } else {
        res.status(400).json({ message: "Name is required for logging in" });
    }
});

// Logging out
app.delete("/logoff", (req, res) => {
    res.clearCookie("name");
    res.status(200).json({ message: "Logged off successfully" });
});

app.all('*', (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
