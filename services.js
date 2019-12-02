var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser')
var app=express();

app.use(bodyParser.json());

var conn=mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"root@1234",
    "database":"TripConnect"
});

conn.connect(function(err){
  console.log(">>>>> Connected"+">>>>>"+err+">>>>>"+err);
});


app.post('/signup',function(req,res){
    console.log("Request ::"+req.body);

    var name=req.body.user_name;
    var emailId=req.body.email_id;

    var countryCode=req.body.country_code;
    var phoneNumber=req.body.phone_number;
    var country=req.body.country;

    var address=req.body.address;
    var profilePic=req.body.profile_pic;

    var dateOfBirth=req.body.date_of_birth;
    var password=req.body.user_password;
    var pincode=req.body.pincode;

    var latitude=req.body.latitude;
    var longitude=req.body.longitude;

    var socialType=req.body.social_type;
    var socialId=req.body.social_id;

    console.log("Name ::"+name);
    console.log("Address ::"+address);

    var sql=`insert into user(user_name,email_id,country_code,phone_number,user_password,country,pincode) values(?,?,?,?,?,?,?)`;

    console.log("Query ::"+sql);

    conn.query(sql,[name,emailId,countryCode,phoneNumber,password,country,pincode],function(error,result,fields){
         console.log('Error ::'+error);
         console.log('Result ::'+result);
         res.status(200).send(req.body);
    });

});

var server=app.listen(8080,function(){
    console.log("Server is running on port 8080");
    console.log("Port     ::"+server.address().port);
    console.log("Address  ::"+server.address().address);
});

/*
Database

show databases;
create database TripConnect;

use TripConnect;
show tables;

create table user(
	user_id bigint auto_increment,
    user_name varchar(100),
    country_code varchar(5),
    phone_number varchar(20),
    profile_pic varchar(50),
    email_id varchar(50),
    date_of_birth varchar(15),
    user_password varchar(100),
    latitude varchar(50),
    longitude varchar(50),
    country varchar(50),
    pincode long,
    social_id varchar(50),
    social_type int,
    created_on Datetime,
    updated_on Datetime,
    primary key(user_id)
);

*/
