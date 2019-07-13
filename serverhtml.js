const http = require('http');
const fs = require('fs') ;

const server = http.createServer((req,res)=>{
  fs.readFile(__dirname + '/index.html','utf-8',function(err,data){
    if(err){
      res.setHeader('Content-Type','text/plain');
      res.statusCode = 404 ;
      res.end('Not found');
    }else
    {
      res.setHeader('Content-Type','text/html');// json/html...
      res.statusCode = 200 ;
      res.end(data);
    }

  });
});

const config = require('./config').config ; 
server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
  });


  