const express = require("express");
const path = require("path");
require("./db/conn");
const app = express();
const hbs = require("hbs");
const {json} =require("express");
const register=require("./models/register");
const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path=path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("views", views_path); // Corrected "view" to "views"
app.set("views", views_path);


app.set("view engine", "hbs"); // Set the view engine to handlebars

hbs.registerPartials(partials_path); // Corrected registerPartial to registerPartials

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/about", (req,res)=>{
    res.render("about")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.post("/register", async(req,res)=>{
    try{
        const pass=req.body.password;
        const cpass=req.body.confirm_password;

        if(pass===cpass){
            const data= new Register({
                username:req.body.username,
                email:req.body.email,
                password: pass,
                confirm_password: cpass
            })

            const registered_data = await data.save();
            res.status(201).render("index");
            
        }

    
        else{
            res.send("password and confirm password are not matching");
        }
        req.body.username
    }
    catch(e){
        console.log(e);
    }
})



app.post("/login", async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        const userEmail=await Register.findOne({email:email});
        if(userEmail.password===password){
            res.status(201).render("index");
        }else{
            res.send("Email and Password are not matching")
        }
    }
    catch(e){
        console.log(e);
    }
})



app.listen(port, () => {
    console.log(`connection successful ${port}`);
});
