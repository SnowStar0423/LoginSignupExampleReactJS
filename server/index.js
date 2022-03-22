//Cost declarations
const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const { response } = require("express");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Cors & Express init
app.use(cors());
app.use(express.json());

//Server Connection *Modify this to match your mysql database*
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "login_signup",
});

app.post('/signup', (require,response) =>{
    const username = require.body.username;
    const email = require.body.email;
    const password = require.body.password;

    db.query("SELECT * FROM user WHERE email = ?;",
    email,
    (err, result) =>{
        if (err) {
            response.send({err: err});
        }
        if(result.length > 0) {
            response.send({success: false, message: "User already exists. Please try again!"});
        } else{
            bcrypt.hash(password,saltRounds, (err,hash) =>{
                if (err){
                    console.log(err);
                }
                db.query('INSERT INTO user (username, email, password) VALUES (?,?,?)',
                [username, email, hash],
                (err,result1) =>{
                    if(err){
                        console.log(err)
                    }else{
                        response.send({success: true, message: "User has been registered successfully!"})
                    }
                }
                );
            })
        }
    })
    
    
    
});

app.post('/login',(require,response) =>{
    const email = require.body.email;
    const password = require.body.password;
    db.query("SELECT * FROM user WHERE email = ?;",
    email,
    (err, result) =>{
        if (err) {
            response.send({err: err});
        }
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, res) => {
                if(res){
                    response.send(result)
                }else{
                    response.send({message: "Wrong email or password"});
                }
            })
        } else{
            response.send({message: "User doesn't exist"});
        }
    })
})


app.listen(3001, ()=> {
    console.log('Server is running...')
})