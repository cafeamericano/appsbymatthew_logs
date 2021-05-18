// GENERAL DEPENDENCIES =======================================================

require('dotenv').config(); //Environment variables
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')

// EXPRESS ====================================================================

//Define express app and port number
const express = require('express');
const app = express();
const server = require('http').createServer(app);
let port = process.env.PORT || 9475;

//Define express public folder
app.use(express.static('public'));

//Allow express to handle post requests with JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS ====================================================================

const cors = require('cors') //Allow cross-origin requests
app.use(cors());
app.use(cors({
    credentials: true, 
}));

// DB INITIALIZATION ====================================================================

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/graphql')
mongoose.connection.once('open', () => {
    console.log('Database connected.');
});

// ROUTES ====================================================================

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

//Endpoint not found
app.get("*", function(req, res) {
    res
    .status(404)
    .json({error: "The requested endpoint does not exist."})
})

// SERVER LISTEN ==============================================================

//Begin listening for requests
server.listen(port, function(){
    console.log('Listening on port: ' + port);
});