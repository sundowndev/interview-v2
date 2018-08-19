const postsRoutes = require('./posts');

module.exports = function(app, db) {
  postsRoutes(app);
};
