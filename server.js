const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const PORT = 3002;
const knex = require('knex');
const { user } = require('pg/lib/defaults');

const register = require('./controlers/register');
const { handlesignin } = require('./controlers/signin');
const { handleprofile } = require('./controlers/profile');
const { handleimage } = require('./controlers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'yourstruly',
        password: 'Hirna@#77',
        database: 'postgres'
    }
});


// db.select('*').from('users').then(data => {
//     console.log(data)
// })

const app = express();

app.use(bodyParser.json());
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'jhon',
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: '456',
            name: 'andrei',
            email: "andrei@gmail.com",
            password: 'cakes',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '789',
            hash: '',
            email: 'jhon@gmail.com'
        }
    ]
}
app.get('/' , (req,res) =>{
    res.send(database.users);
    })
app.post('/signin', (req,res) => { handlesignin(req, res, db, bcrypt)})
app.post('/register', (req,res) => { register.handleregister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleprofile(req, res, db) })
app.put('/image', (req, res) => { handleimage(req, res, db) })
    // Load hash from your password DB.
    // bcrypt.compare("bacon", hash, function(err, res) {
    //     // res == true
    // });
    // bcrypt.compare("veggies", hash, function(err, res) {
    //     // res = false
    // });



app.listen(PORT, () => {
    console.log(`its running on port ${PORT}`)
})