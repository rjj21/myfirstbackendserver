// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.statusCode = 418
//     res.end()
// })

// server.listen(3000,  () => {console.log("Server Ready")})

require('dotenv').config()
const cors = require('cors')

const express = require("express");
const app = express();
const port = process.env.PORT;
const fruits = require("./fruits");


// must be first route
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/fruits', (req, res) => {
    res.send(fruits)
})

const getFruit = (name) => {
    return fruits.find((fruit) => fruit.name.toLowerCase() == name)
}

const getMaxID = () => {
    const ids = fruits.map((fruit) => fruit.id)
    return Math.max(...ids)
}

app.get("/fruits/:name", (req, res) => {
    // const fruit = fruits.find(fruit => fruit.name === req.params.name);
    // res.send(fruit)
    const name = req.params.name.toLowerCase()
    const fruit = getFruit(name)
    if (fruit == undefined) {
        res.status(404).send()
    } else {
        res.send(fruit)
    }
})

// app.post("/fruits", (req, res) => {
//     const fruit = req.body
//     console.log(fruit)
//     // add the fruit
//     res.send("New fruit created")
// })

app.post("/fruits", (req, res) => {
    //Check if fruit already exists
    const fruit = getFruit(req.body.name.toLowerCase())
    if (fruit != undefined) {
        res.status(409).send()
    } else {
        let maxID = getMaxID() + 1
        req.body.id = maxID
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase()
    const fruit = getFruit(name)
    const fruitIndex = fruits.indexOf(fruit)
    if (fruitIndex == -1) {
        res.status(404).send()
    } else {
        fruits.splice(fruitIndex, 1)
        res.status(204).send()
    }
})


app.get('/elephant', (req, res) => {
    res.status(404).send()
})

app.get('/elephant/:name&:age', (req, res) => {
    res.send(req.params)
})

app.get('/elephant/:name', (req, res) => {
    res.send(req.query)
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

