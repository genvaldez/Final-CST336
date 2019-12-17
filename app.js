const express=require("express");
const mysql=require("mysql");
const app= express();
const session=require('express-session');
const bcrypt=require('bcrypt');
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css
app.use(session({
    secret:"SECRET!",
    resave:true,
    saveUninitialized:true
}));
app.use(express.urlencoded({extended:true}));


//routes
app.get("/", function(req,res){
    res.send("it works!");
});


app.get("/LoginRequest", async function(req,res){
    let user=await getUser(req.query.username);
    let success=false;
       try {
        if (user[0].username == req.query.username) {
            res.send(success);
        }
    } catch (e) {
        let insert = await insertNewUser(req.query);
        if (insert.affectedRows == 0) {
            res.send(success);
        } else {
            let schedule = await createNewSchedule(req.query);
            success = true;
            res.send(success);
        }
    }
}); //LoginRequest

app.get("/logout", function(req,res){
    req.session.destroy();
    res.redirect("/");
}); //logout

app.get("/dashboard", isAuthenticated, function(req,res){
    res.render("dashboard");
});//dashboard

app.get("/getUsersEvents",async function(req,res){
    let username=req.session.username;
    let scheduleId = await getScheduleId(username);
    let id = scheduleId[0].scheduleId;

    let events = await getEvents(id);
    res.send(events);
});//getUserEvents

app.get("/addTimeSlot", isAuthenticated, function (req, res) {
    res.render("addTimeSlot");
});//addTimeSlot

app.get("/addRequest", isAuthenticated, async function(req, res){
    let scheduleId = await getScheduleId(req.session.username);
    let id = scheduleId[0].scheduleId;
    let success = false;

    if (id == 0) {
        res.send(success);
    } else {
        let insert = await insertAppointment(req.query, id);
        success = true;
        res.send(success);
    }
}); //addRequest


app.get("/removeTimeSlot", isAuthenticated, function (req, res) {
    res.render("removeTimeSlot");
});//removeTimeSlot

app.get("/removeTimeSlotRequest", isAuthenticated, async function (req, res) {
    let scheduleId = await getScheduleId(req.session.username);
    let id = scheduleId[0].scheduleId;
    let success = false;

    if (id == undefined) {
        res.send(success);
    } else {
        let del = await deleteApp(req.query, id);
        if (del.affectedRows == 0) {
            res.send(success);
        } else {
            success = true;
            res.send(success);
        }
    }
});//removeTimeSlotRequest

app.get("/availableApp", isAuthenticated, async function(req, res){
    let result=await getResult();
    res.render("result",{"result":result});
})//availability

app.get("/getResult",async function(req, res) {
    let username=req.session.username;
    let result=await getResult(username);
    
    res.send(result);
}); //getResults

app.get("/getAvailability", async function (req, res) {
    let available = await getAvailability(req.query);
    res.send(available);
});//getAvailability


//connection to database
function dbConnection(){
    let connect=mysql.createConnection({
        host:"ip-172-31-21-89",
        user:"ec2-user@localhost",
        password:"",
        database:"Scheduler",
    });//createConnection
    return connect;
}//dbConnection

//starting server
app.listen(process.env.PORT,process.env.IP,function(){
     console.log("Express server is running..");
});