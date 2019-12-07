var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser')
var app=express();
var constants=require('./constants')

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
    console.log(">>>>> Request ::"+req.body);

    var name=req.body.name;
    var emailId=req.body.email_id;

    var countryCode=req.body.country_code;
    var phoneNumber=req.body.phone_number;
    var country=req.body.country;

    var address=req.body.address;
    var profilePic=req.body.profile_pic;

    var dateOfBirth=req.body.date_of_birth;
    var password=req.body.password;
    var pincode=req.body.pincode;

    var latitude=req.body.latitude;
    var longitude=req.body.longitude;

    console.log("Password ::"+password);

    var phoneNumberCheck=`select * from user where phone_number=?`;
    console.log("Query Phone ::"+phoneNumberCheck);

    conn.query(phoneNumberCheck,[phoneNumber],function(error,result,fields){
        if(error)throw error;
        console.log("Result ::"+result);
        console.log("Size ::"+result.length);

        if(result.length==0){
            var sql=`insert into user(name,email_id,country_code,phone_number,user_password,country,pincode) values(?,?,?,?,?,?,?)`;

                console.log("Query ::"+sql);

                conn.query(sql,[name,emailId,countryCode,phoneNumber,password,country,pincode],function(error,result,fields){
                     if(error)throw error;

                     console.log('Error ::'+error);
                     console.log('Result ::'+result);

                     var userQuery=`select * from user where phone_number=?`;

                     conn.query(userQuery,[phoneNumber],function(error,result,fields){
                        if(error)throw error;
                        console.log('Error ::'+error);
                        console.log('Result ::'+result);

                        var response={
                            code:constants.CODE_SUCCESS,
                            message:"Signup successfully",
                            data:result[0]
                        };

                        res.status(constants.HTTP_SUCCESS).send(response);
                     });
                });
        }else{
            var response={
                code:constants.CODE_NO_RECORD_FOUND,
                message:"Number is already registered"
            };
            res.status(constants.HTTP_SUCCESS).send(response);
        }
    });

});

app.post('/login',function(req,res){
    console.log(req.body);

    var phoneNumber=req.body.phone_number;
    var password=req.body.password;

    console.log(phoneNumber+">>"+password);

    var sql=`select * from user where phone_number=? and user_password=?`;
//    var sql="select * from user where phone_number='"+phoneNumber+"' AND user_password='"+password+"'";
    console.log('Query ::'+sql);

    conn.query(sql,[phoneNumber,password],function(error,result,fields){
        if(error)throw error;

        console.log(result);
        if(result.length>0)
        {
            var response={
                code:constants.CODE_SUCCESS,
                message:"Users fetched successfully",
                data:result
            };

            res.status(constants.HTTP_SUCCESS).send(response);
        }else{
            var response={
                  code:constants.CODE_NO_RECORD_FOUND,
                  message:"Invalid phone number or password",
            };

            res.status(constants.HTTP_SUCCESS).send(response);
        }
    });
});

app.get('/users',function(req,res){
    console.log(">>>>> Request ::"+req.body);

    var sql=`select * from user`;

    conn.query(sql,function(error,result,fields){

        if(result.length>0)
        {
            var response={
                code:constants.CODE_SUCCESS,
                message:"Users fetched successfully",
                data:result
            };

            res.status(constants.HTTP_SUCCESS).send(response);
        }else{

            var response={
                code:constants.CODE_NO_RECORD_FOUND,
                message:"No users found"
            };

            res.status(constants.HTTP_SUCCESS).send(response);
        }
    });

});

app.get('/users/:id',function(req,res){
    console.log(req.params.id);
    var id=req.params.id;

    var sql=`select * from user where user_id=?`;

    conn.query(sql,[id],function(error,result,fields){
        if(error)throw error;

        if(result.length>0)
        {
            var response={
                code:constants.CODE_SUCCESS,
                message:"Users listing",
                data:result[0]
            };

            res.status(constants.HTTP_SUCCESS).send(response);
        }else{
            var response={
                 code:constants.CODE_NO_RECORD_FOUND,
                 message:"No users found"
            };
            res.status(constants.HTTP_SUCCESS).send(response);
        }

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

/*
create table user(
	user_id bigint auto_increment,
    name varchar(100),
    country_code varchar(5),
    phone_number varchar(20) unique,
    profile_pic varchar(50),
    email_id varchar(50),
    date_of_birth varchar(15),
    user_password varchar(100),
    latitude varchar(50),
    longitude varchar(50),
    country varchar(50),
    pincode long,
    device_id varchar(10) unique,
    google_social_id varchar(50) unique,
    facebook_social_id varchar(50) unique,
    twitter_social_id varchar(50) unique,
    created_on timestamp,
    updated_on timestamp,
    primary key(user_id)
);

*/

