const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB",{useNewUrlParser:true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("Article",articleSchema);

app.route("/article")
    .get(function(req,res){
        Article.find({})
            .then(foundProduct => {
                res.send(foundProduct)
            })
            .catch(err => {
                console.log(err);
            })
    })
    .post(function(req,res){
        const article = new Article({
            title:req.body.title,
            content:req.body.content
        })
        article.save()
            .then(savedProuct =>{
                res.send("success");
            })
            .catch(err => {
                res.send("error:"+err);
            })
    })
    .delete(function(req,res){
        Article.deleteMany({})
        .then(deltedProuct =>{
            res.send("successfully deleted all article");
        })
        .catch(err => {
            res.send("error:"+err);
        })
    });

app.route("/article/:customName")
    .get(function(req,res){
        Article.findOne({title:req.params.customName})
            .then(foundProduct => {
                res.send(foundProduct);
            })
            .catch(err => {
                res.send("error:"+err);
            })
    })
    .patch(function(req,res){
        Article.updateOne({title:req.params.customName},{
            title:req.body.title,
            content:req.body.content
        })
        .then(savedProuct =>{
            res.send("successully updated");
        })
        .catch(err => {
            res.send("error:"+err);
        })
    })
    .delete(function(req,res){
        Article.deleteOne({title:req.params.customName})
        .then(deltedProuct =>{
            res.send("successfully deleted");
        })
        .catch(err => {
            res.send("error:"+err);
        })
    });

app.listen(3000,function(){
    console.log("listening 3000");
})