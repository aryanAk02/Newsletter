const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000,function(){
    console.log("server is listening at port 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merged_fields:
                {
                    FNAME: firstName,
                    LNAME: lastName

                }
            }
        ]
    };
    const jasonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/de959d2391"
    const options=
    {
        method:"POST",
        auth:"akash1:075d1f5b31d665df7892da12e5c9a4fa-us21"
    }
    const request=https.request(url,options,function(response){
        if(response.statuscode==200)
        {
            res.sendFile(__dirname+"/success.html");

        } 
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
        console.log(JSON.parse(data));
        })
    })
    request.write(jasonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

// 
// .