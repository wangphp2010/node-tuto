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


function showForm(pposts,res)
{
    var data = ejs.render(template,{
        title:"hello ejs",
        posts:pposts
    });
    res.setHeader('Content-Type','text/html'); 
    res.statusCode = 200 ;
    res.end(data);
}
