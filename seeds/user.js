const { User } = require('../models');

const userData =
[
  {
    "username": "Xandromus",
    "email": "xantheman@gmail.com",
    "password": "admin12345"
  },
  {
    "username": "Lernantino",
    "email": "lernantino@hotmail.com",
    "password": "password12345"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;