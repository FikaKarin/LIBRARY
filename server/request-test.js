'use strict';

const axios = require('axios');

const book = {
    'author': 'Leif GW Person',
    'title': 'Blomflickan',
    'published': '1999-01-01',
  };

axios.delete('http://localhost:3000/books/15')
.then(response => {
    console.log(response);

})
.catch(error => {
    console.log(error);

});