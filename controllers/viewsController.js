exports.getOverview = (req, res) => {
    res.status(200).render('overview', {
        title: 'All Books'
    });
};

exports.getBook = (req, res) => {
    res.status(200).render('book', {
        title: 'The Litle Brown Fox'
    });
};