const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/employee',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then(
()=>{
	console.log('Connection succesfull database')
}).catch((e)=>{
	console.log('the connection is not succesfully established to the database')
})
























