var express=require('express')
var app=express();
var mysql=require('mysql');

var connection =mysql.createConnection({
host:'localhost',
port: 3306,
user:'root' ,
password:'wkd30518!!',
database:'Amour'
});

connection.connect(function(){
    console.error("Amour connection");
});


//회원 가입시에 유저의 정보가 DB에 저장된다.
app.post("/signup",function(req,res){
  var table="user";
  var userId=req.body.userId || req.query.userId;
  var userName=req.body.userName || req.query.userName;
  var userEmail=req.body.userEmail || req.query.userEmail;
  var userPhotoURL=req.body.userPhotoURL || req.query.userPhotoURL;

  var InsertUser="INSERT INTO "+table+" (name) VALUES " + "('" +userName + "')";

  connection.query(InsertUser,function(err,rows){
    if(err) {
      console.log('/signup: user err가 발생하여 삽입할 수 없습니다.');
      res.send("user 테이블에 삽입하였습니다.");
    } else {
      console.log(rows+"를 user 테이블에 삽입하였습니다.");
      res.send("user 테이블에 삽입하였습니다.");
    }
  })
});


//유저의 정보를 db로부터 읽어와서 안드로이드로 보내준다.
app.get("/users",function(req,res){

  var GetUser="select * from user";

  connection.query(GetUser,function(err,rows){
    if(err) {
      console.log('err');
      res.send("/users: user 테이블에 err가 발생하여 참조 할 수 없습니다.");
    } else {
      console.log(rows+"를 user 테이블을 참조하였습니다.");
      res.send(rows);
    }
  })
})
var server=app.listen(23023);
