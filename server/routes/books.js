const express = require("express");
const mysql = require("mysql");

const router = express.Router();
const connectionPool = require("../database/connection-pool");
const BookRepository = require('../database/book-repository');

let repository = new BookRepository(connectionPool);


//GET A SINGLE BOOK FUNCTION
router.get('/:id', function (req, res) {
  repository.get(req.params.id, (err, result) => {
    if (err) {
       res.status(500).json({ 'error': err.toString() });
     } 
     else {
       //send result of the guery
       res.status(200).json(result);
     } 
   });
})

//UPDATE FUNCTION
router.put('/:id', function (req, res) {
  repository.update(req.params.id, req.body, (err, result) => {
    if(err) {
       res.status(500).json({ 'error': err.toString() });
     } 
     else {
       res.sendStatus(200);
     } 
   });
})

//DELETE FUNCTION
router.delete('/:id', function(req, res) {
  repository.delete(req.params.id, (err, result)=> {
    if(err) {
       res.status(500).json({ 'error': err.toString() });
     } 
     else {
       res.sendStatus(200);
     } 
   });
})

//SAVE 1 BOOK FUNCTION
router.post('/', function(req, res){
  repository.save(req.body, (err, result)=> {
   if(err) {
      res.status(500).json({ 'error': err.toString() });
    } 
    else {
      res.sendStatus(200);
    } 
  });
})

//FUNCTION GET ALL THE BOOKS
router.get("/", function (req, res) {
  repository.getAll((err, result) => {
    if(err) {
       res.status(500).json({ 'error': err.toString() });
     } 
     else {
       res.status(200).json(result);
     } 
   });
});

module.exports = router;
