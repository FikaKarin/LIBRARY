/**
 * Variable to require the express package framework
 */
const express = require("express");

/**
 * Variable for loading the express module
 */
const router = express.Router();

/**
 * Require statements to import modules with connectionPool and book-repository to connect to database
 * 
 */
const connectionPool = require("../database/connection-pool");

/**
 * Require statements to import modules with connectionPool and book-repository to connect to database
 * 
 */
const BookRepository = require('../database/book-repository');

let repository = new BookRepository(connectionPool);

/**
 * FOR ALL FUNCTIONS BELOW:
 * request method and results of request
 * get request targeting id, all data, and/or body in database
 * status message for good<200> and bad request<500> 
 * @param req request method GET, PUT, DELETE POST
 * @param res result of request
 */

//*** START ***GET A SINGLE BOOK FUNCTION***
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
//*** END ***GET A SINGLE BOOK FUNCTION***


//*** START ***UPDATE FUNCTION***
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
//*** END ***UPDATE FUNCTION***


//*** START ***DELETE FUNCTION***
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
//*** END ***DELETE FUNCTION***


//*** START ***SAVE 1 BOOK FUNCTION***
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
//*** END ***SAVE 1 BOOK FUNCTION***


//*** START ***FUNCTION GET ALL THE BOOKS***
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
//*** END ***FUNCTION GET ALL THE BOOKS***

module.exports = router;
