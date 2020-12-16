const express = require('express');
const bcrypt = require('bcryptjs')
const path = require('path')
const app = express();
const port = process.env.PORT || 3000
const hbs = require('hbs')

require('./db/conn.js')
const Register = require('./models/useraccount.js')

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,'../templates/partials')

app.use(express.static(static_path))
app.set('view engine','hbs')
app.set('views',template_path)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
hbs.registerPartials(partials_path)







app.get("/",(req,res)=>{
	res.render("index")
})

app.get("/register",(req,res)=>{
	res.render("registation")
})

const securePassword = async(password)=>{
	const passwordHash= await bcrypt.hash(password,4)
	return passwordHash;
	}

securePassword("Shivamboss")

app.post("/register",async (req,res)=>{
	try {
		const password = req.body.password;
		const cpassword = req.body.confirmpassword;
		if(password===cpassword){
			const registerEmployee = new Register({
				firstname:req.body.firstname,
				lastname:req.body.lastname,
				email:req.body.email,
				gender:req.body.gender,
				phone:req.body.phone,
				age:req.body.age,
				password:req.body.password,
				confirmpassword:req.body.confirmpassword
			})

			const register = await registerEmployee.save()
			res.status(201).render("index");
		}else{
			res.send("password not match")
		}

	} catch(e) {
		res.status(400).send(e)	
	}
})


app.get('/login',(req,res)=>{
	res.render('login')
})



app.post('/login',async (req,res)=>{
	try {
		const email = req.body.email;
		const password  = req.body.password;
		const userEmail =  await Register.findOne({email:email})
		console.log(userEmail)
		if(bcrypt.compare(password,userEmail.password)){
			
			res.status(201).render("index")
		}else{
			res.send("Password does not match")
		}
		// res.send(userEmail)

	} catch(e) {
		console.log(e);
		res.status(400).send("Invalid entry input")
	}
})



app.listen(port,'127.0.0.1',()=>{
	console.log('the server is running ')
})






































