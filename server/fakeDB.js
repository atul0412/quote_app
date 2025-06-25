const { text } = require("express");

const Users = [
    { id: '0412',
        name: 'John',
        email: 'john@example.com',
        password:"232323"
    },
    { id: '0413',
        name: 'Jane',
        email: 'jane@example.com',
        password:"342424"
    }
];

const Quotes =[
    { 
        text: "I turn Coffee into code ",
        by: "0412"
    },
    { 
        text: 'This is another quote',
        by: "0413"
    }, 
    { 
        text: 'name is NAME',
        by: "0412"
    }
];

module.exports = { Users, Quotes };