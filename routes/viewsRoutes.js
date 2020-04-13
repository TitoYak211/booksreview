const express = require('express');

// Create router
const router = express();

// Web overview root page
router.get('/', (req, res) => {
    res.status(200).render('base', {
        title: 'Trending Books Books',
        user: 'Tito'
    });
});

// Render overviewpage
router.get('/overview', (req, res) => {
    res.status(200).render('overview', {
        title: 'All Books'
    });
});

// Render a book page
router.get('/book', (req, res) => {
    res.status(200).render('book', {
        title: 'The Litle Brown Fox'
    });
});

module.exports = router;
