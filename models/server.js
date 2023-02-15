const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usersPath = '/api/users';

    this.connectDB();

    // Middlewares
    this.middlewares();

    //App routes
    this.routes();
  }

  //DB connection

  async connectDB() {
    await dbConnection();
  }
  middlewares() {
    // CORS
    this.app.use(cors());

    //parse and read body

    this.app.use(express.json());

    //Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server run in  ${this.port}`)
    );
  }
}

module.exports = Server;
