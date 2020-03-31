exports.checkID = (req, res, next, value) => {
    console.log(`Tour id is: ${value}`);
  
    if (!req.params.id) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      });
    }
    next();
};
  
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing name or email'
      });
    }
    next();
  };