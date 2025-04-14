const fs = require('fs');
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const activities = require("./activities.json");




app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

//const coronaData = require("./coronaData.json");
const orderData = require("./orders.json");

app.get("/orders", function (req, res) {
    //res.send(coronaData);
    res.send(orderData);
});


app.post("/autumn",function(req,res){
    fs.writeFile(__dirname + "/data.txt",
        req.body.activity,
        function() {
            res.send("投稿完了");
        });
});

app.post("/update", function (req, res) { // 修正
    activities[0].activity = req.body.updatedActivity;
    res.send(activities);
});

app.post("/orders/status", function (req, res) { // 修正
    //activities[0].activity = req.body.updatedActivity;
    res.send(activities);
});


app.post("/delete", function (req, res) {
    activities.splice(req.body.number, 1);
    res.send(activities);
});

const port = process.env.PORT || 5000;    // 追加

app.listen(port, function() {       // 修正
    console.log(`Listening on ${port}`);   // 修正
});
