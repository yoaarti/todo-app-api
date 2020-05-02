const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use( bodyparser.json() );

const cors = require('cors')
app.use(cors());
const db = require('./db')
db.createConnection()

const toDo = require('./index');
app.use('/api',toDo);
const user = require('./user');
app.use('/api',user);

const port = 3800;
app.listen(port,function(){
    console.log('server is running on '+port);
})

