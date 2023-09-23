const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");
// const { ftruncate } = require("fs");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const fname = req.body.fname;
    const lname= req.body.lname;
    const email = req.body.email;

    const data={
      members:[
        {
        email_address: email,
        status: "subscribed",
 
        merge_fields:{
          FNAME : fname,
          LNAME: lname,
        }
    }]
    }
    const jasonData= JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/c613fee182";
const option={
  method: "POST",
  auth: "cvm:2f4ca444e7b1daffbb5cef7aa957980c-us17"
}
const request= https.request(url,option,function(response){
  if(response.statusCode== 200){
    // res.send("Succersfully subscribed");
    res.sendFile(__dirname+ "/sucess.html");
    // res.sendFile(__dirname+ "/failuare.html");
  }else{
    // res.send("Unsucessful");
    res.sendFile(__dirname+ "/failuare.html");
  }
response.on("data", function(data){
  console.log(JSON.parse(data));
})
})

request.write(jasonData);
request.end();

});

app.post("/failuare", function(req, res){
  res.redirect("/");
})

app.listen(3000, function(){
    console.log("server is live.");
})




// 2f4ca444e7b1daffbb5cef7aa957980c-us17
// c613fee182