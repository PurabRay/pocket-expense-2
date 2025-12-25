module.exports = function (req, res, next) {
 
  req.user = { id: 'demo-user-id-123' }; 
  next();
};