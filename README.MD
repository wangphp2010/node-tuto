
Node.js
==========


git remote add origin https://github.com/wangphp2010/nodeJS-tuto.git

git push -u origin master




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


## URL 地址

* req.url 返回客户端请求的url 路由

url.js

```javascript

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
      res.end('NO found ');

  }



});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});


```

## html

* fs 文件读写模块的引用

### index.html

```html

<html>
  <body>
    <h1>hellor world</h1>
  </body>
</html>

```
### serverhtml.js

```javascript
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
      res.setHeader('Content-Type','text/html');
      res.statusCode = 200 ;
      res.end(data);
    }

  });
});

const config = require('./config').config ; 
server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
  });

```


## npm 包管理器

* npm 的使用
* ejs的安装

### npm官网

https://npmjs.org/

### ejs(Effective javascript templating)

https://ejs.co/


```bash
$npm install ejs
```
### hello.ejs
```html
<html>
  <title><%= title %></title>
  <body><%- content %></body> //注意是小横线不是等号
</html>
```


## ejs的使用

serverejs.js

```javascript
 const http = require('http');
const fs = require('fs') ;
const ejs = require('ejs') ;
 
var template = fs.readFileSync(__dirname + '/hello.ejs','utf-8');

const server = http.createServer((req,res)=>{
   var data = ejs.render(template,{
       title:"hello ejs",
       content:"<b> big helelo ejs </b>"
   });

   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/html');
   res.end(data);
});

const config = require('./config').config ; 
server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
  });



```


## 做个小论坛

### 客户端
forum.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>little forum</title>
</head>
<body>
    <form action=""method="post">
        <input type="text" name="content" id="content">
        <input type="submit" value="submit">
        <ul>
            <% for(var i =0;i<posts.length;i++){%>
                <li><%= posts[i] %></li>
             <% } %>   
        </ul>
    </form>
    
</body>
</html>
```

### 服务器端表单处理

serverforum.js

```javascript

const http = require('http');
const fs = require('fs') ;
const ejs = require('ejs') ;
const qs = require('querystring');//查询字符串 :处理表单提交过来的数据

 
var template = fs.readFileSync(__dirname + '/forum.ejs','utf-8');
var posts=[];

const server = http.createServer((req,res)=>{
   if(req.method === 'POST')
   {
       req.data = "";
       // 持续读取数据流 如果有数据则一直往req.data里添加
       req.on("readable",function(){
           // 收集表单数据
           var chr = req.read();
           if(chr)
                req.data += chr ;

       })
       // end 数据流读取完毕
       req.on("end",function(){
        // 表单数据处理
        var query = qs.parse(req.data);
        posts.push(query.content);
        showForm(posts , res);

    })

   }else{

     
       //表单显示
       showForm(posts,res);
   }


     
});

const config = require('./config').config ; 
server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
  });


function showForm(posts,res)
{
    var data = ejs.render(template,{
        title:"hello ejs",
        posts:posts
    });
    res.setHeader('Content-Type','text/html'); 
    res.statusCode = 200 ;
    res.end(data);
}




```


## MongoDB 数据库 

* 安装mongodb驱动
* node.js连接mongodb

http://mongodb.github.io/node-mongodb-native/

```bash
$ npm install mongodb  
```

### 连接mongodb

  mongofunc.js

```javascript

const MongoClient = require('mongodb').MongoClient;

// 用来判定值是否有效 否则就报错
const assert = require('assert');

//connection url
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'blog';

MongoClient.connect(url,function(err,client){
  assert.equal(null,err); //判定err是否是null 否则报错
  console.log("Connected successfully to server") ;

  const db = client.db(dbName);

  client.close();

});


```

### 插入mongodb文档

mongoinsert.js

```javascript

const MongoClient = require('mongodb').MongoClient;

// 用来判定值是否有效 否则就报错
const assert = require('assert');

//connection url
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'blog';

MongoClient.connect(url, sfunction(err,client){
  assert.equal(null,err); //判定err是否是null 否则报错
  console.log("Connected successfully to server") ;

  const db = client.db(dbName);

    db.collection("posts",function(err,collection){
    var list=[
      {title:"i love playing mario" , tag:"game"},
      {title:"i like Node js programer" , tag:"it"},
      {title:"i konw use Mongodb" , tag:"it"}
      
    ];
    collection.insert(list,function(err,result){
      assert.equal(null,err);
      console.log("  successfully to insert into mongodb") ;
    })

  });  



  client.close();

});


```

### 读出MongoDB文档


mongoread.js

```javascript


const MongoClient = require('mongodb').MongoClient;

// 用来判定值是否有效 否则就报错
const assert = require('assert');

//connection url
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'blog';
 

MongoClient.connect(url, function(err,client){
  assert.equal(null,err); //判定err是否是null 否则报错
  console.log("Connected successfully to server") ;

  const db = client.db(dbName);

    db.collection("posts",function(err,collection){
     
        collection.find({tag:"game"}).toArray(function(err,docs){
            assert.equal(null,err);
            console.log(docs);
            client.close();
        });

  });  
 
  
});


```


## Promise 

* nodeJS 回调
* promise 承诺

### 回调地狱(指可读性地狱)
Node.js是非阻塞编程.那么在编码过程中会遇到许多的回调函数(callback).如果多个处理的回调函数嵌套在一起的话,就会形成回调地狱,虽然对于程序的结果并没有任何影响,但是对于程序代码的可读性来说就是个地狱.

exCallback.js

 ```javascript

 //回调地狱 示例

 function dbupd(sql,done){
   setTimeout(()=>done(sql+" update ok "),1000 ) ;
 }
 dbupd('1.sql',result=>{
   console.log(result);
   dbupd("2.sql",result=>{
     console.log(result);
      dbupd("3.sql",result=>{
        console.log(result);

      })

   })


 })

 ```

### 用Promise解决

exPromise.js

```javascript
// async = 非同步
function dbupAsync(sql){
  const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(sql + " update ok .");
      resolve(sql + " .ok");//成功调用的方法,需要const result1 = await dbupAsync("1.sql") ; 来接收



    },1000);
  });
  return p ; 
}

// dbupAsync 的返回值是p 而p 是new Promose来的 所以才能用then方法
 dbupAsync("2.sql")
  .then(()=> dbupAsync("2.sql"))
  .then(()=> dbupAsync("3.sql"));



//  更加简洁   async/await

async function upAllDB(){
  const result1 = await dbupAsync("1.sql") ;
  const result2 = await dbupAsync("2.sql") ;
  const result3 = await dbupAsync("3.sql") ;
  console.log( result1,result2,result3)
}

upAllDB();

```