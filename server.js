const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
  client: 'pg',
  connection: {
   connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  }
});


const app=express();

app.use(bodyParser.json());
app.use(cors())




app.get('/',(req,res)=>{res.send('it is working')})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})


app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });


//  bcrypt.hash(password, null, null, function(err, hash) {
//     // Store hash in your password DB.
//     console.log(hash)
// });

app.listen(process.env.PORT||8080,()=>{
  console.log(`Running on port ${process.env.PORT}`);
})