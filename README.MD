
Node.js
==========


## 概要

NodeJS 是一个javascript运行环境(runtime),有Ryan Dahl开发,实质是对Chrome V8进行了封装


## 线程模型和事件循环 event loop
 

### Apache+Tomcat(6,7,8,9) 线程模型


1. req 客户端请求
2. thread应对,客户端等待
3. 等待处理req 完毕后,thread释放

线程处理模型就是这三步,缺点,当有大量客户端请求是,服务器消耗的资源也随之增加.

### NodeJS事件循环 

1. 开一个事件等待循环(event-loop)
2. req 客户端请求
3. 放入事件处理队列中,然后继续等待新的req请求
4. req 处理完成后,调用i/o,结束req(非阻塞调用)

时间循环处理模式中,线程不用等待req处理完后才进行一个req处理,而是将所有的req请求放入到队列中,然后采用非同步的方式,等待req处理完后再调用i/o资源,然后结束req.


## 从HelloWorld开始

```bash
$ node -v
$ npm -v
$ node // 可直接纯js脚本编写
> console.log('hello world');
> .help
> .exit 
```

#### helloworld.js

创建 helloworld.js
```javascript
console.log('hello world');

var mystr = "hellor world";
console.log(mystr);

```

``` bash
$ more helloworld.js // 查看文件内容
$ node helloworld.js
```

## 非阻塞处理

* 阻塞处理(Java,ruby,PHP,asp,net)
* 非阻塞处理 

```javascrpt
// 阻塞处理
function updb1()
{
    var start = new Date().getTime();
    while( new Date().getTime()<start +3000);
}
updb1();
// 上面程序处理完毕
console.log(" 1 over ")
console.log(" javascrpt")


// 非阻塞处理

function updb2(done)
{
    setTimeout(()=>{ done();},3000)
}
updb2( function(){

console.log("updb2 success");

});
console.log("node.js over ")

 ```


 ## 简单的Web服务器

* http 内置模块

文档:

https://nodejs.org/en/about/

```javascript

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


```


## config.js设定 

* require('..js')
### config.js

```javascript

const  config = {
      hostname : '127.0.0.1',
       port : '3000' 
}


exports.config = config ; 


``` 

### server2.js

```javascript

const http = require('http');

const config = require('.config').config ; 

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});



```
https://www.youtube.com/watch?v=q6qRk41i7hM&list=PLliocbKHJNwvbitOJ73M04PUoJae79kEg&index=6