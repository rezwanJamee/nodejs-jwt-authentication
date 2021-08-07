const router = require('express').Router();
const { privateRecipes, publicRecipes } = require("../db");
const checkAuth = require("../middleware/checkAuth");

router.get('/public', (req, res) => {
    res.json(publicRecipes);
})

router.get('/private', checkAuth ,(req, res) => {
    res.json(privateRecipes);
})

module.exports = router;