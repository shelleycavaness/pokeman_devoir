const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'pug');

app.get('/', (req, res) =>{
    fetch('https://pokeapi.co/api/v2/pokedex/national/')
    .then( (response) => {
        response.json().then((data) => {
            // console.log(JSON.stringify(data));
            res.render('index', { data: data })
        })
    })
});

// app.get('/pokemon/:item', (req, res) =>{
//     // fetch details for a given pokemon given its id/name
//     // console.log(JSON.stringify(req.body));

//     fetch('https://pokeapi.co/api/v2/pokedex/' + req.params.item)
//     .then( (response) => {
//         response.json().then((data) => {
//             // if data vide
//             // display/render error page
//             if (data.name === undefined) {
//                 res.render('notfound', { item: req.params.item })
//             } else {
//                 data.description = data.descriptions.find(desc => desc.language.name === "fr").description
//                 res.setHeader('Content-Type', 'application/json');
//                 res.send(JSON.stringify(data))
//             }
//         })
//     })
//  });
 app.get('/poke/:id', (req, res) =>{
    // fetch details for a given pokemon given its id/name
    // console.log(JSON.stringify(req.body));
    console.log('https://pokeapi.co/api/v2/pokemon-species/' + req.params.id + '/')
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + req.params.id + '/')
    .then( (response) => {
        response.json().then((data) => {
            // if data vide
            // display/render error page
            if (data.id === undefined) {
                res.render('notfound', { item: req.params.item })
            } else {
                // data.description = data.descriptions.find(desc => desc.language.name === "fr").description
                data.name = data.names.find(desc => desc.language.name === "en").name
                data.flavors = data.flavor_text_entries.filter(flavor => flavor.language.name === 'en')
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data))
            }
        })
    })
 });

 app.get('/pokemon/:id', (req, res) =>{
    // fetch details for a given pokemon given its id/name
    // console.log(JSON.stringify(req.body));

    fetch('https://pokeapi.co/api/v2/pokemon-species/' + req.params.id + '/')
    .then( (response) => {
        response.json().then((data) => {  ///limiting the data returned
            data.name = data.names.find(desc => desc.language.name === "en").name
            data.flavors = data.flavor_text_entries.filter(flavor => flavor.language.name === 'en');
            res.render('item', { data: data });
        })
    })
 });

app.listen(3001, () =>{
    console.log('server running');
});

