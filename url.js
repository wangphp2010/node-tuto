const http = require('http');

const config = require('./config').config ; 

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  

  switch(req.url){

    case '/':
      res.end('hello world');
      break;
    case '/about':
      res.end('this is about page');
      break;
    case '/contact':
      res.end('this is contact page');
      break;

    default:
      
      res.end('Not found');

  }



});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
