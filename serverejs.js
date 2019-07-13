const http = require('http');
const fs = require('fs') ;
const ejs = require('ejs') ;
 
var template = fs.readFileSync(__dirname + '/hello.ejs','utf-8');

const server = http.createServer((req,res)=>{
   var data = ejs.render(template,{
       title:"hello ejs",
       content:"<b> big helelo ejs </b><strong> big helelo ejs strong </strong>"
   });

   res.setHeader('Content-Type', 'text/html');
   res.statusCode = 200;
   
   res.end(data);
});

const config = require('./config').config ; 
server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
  });
