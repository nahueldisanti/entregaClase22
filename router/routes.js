const express = require('express');
const myRoutes = express.Router();
const generateRandomProducts = require ('../controller/faker.js');
const listRandomProducts = generateRandomProducts(5);

myRoutes.get('/', (req, res) => {
    res.render('faker');
});

myRoutes.get('/api/productos-test', (req, res) => {
    res.render('faker', {itemProduct : listRandomProducts })
})

module.exports = myRoutes