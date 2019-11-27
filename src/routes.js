// In your routes configuration file
const path = require('path');
module.exports = [
  {
    path: '/',
    component: path.resolve(`src/pages/index.js`)
  },
  {
    path: '/home',
    component: path.resolve(`src/pages/index.js`)
  },
  {
    path: '/404/',
    component: path.resolve(`src/containers/404.js`)
  }
];