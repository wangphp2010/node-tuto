/* function updb2(done)
{
    setTimeout(()=>{ done();},3000)
}
updb2( function(){

console.log("updb2 success");

});
console.log("node.js over ") */


function updb1()
{
    var start = new Date().getTime();
    while( new Date().getTime()<start +3000);

    console.log(" 1 over ")
}
updb1();
// 上面程序处理完毕

console.log(" javascrpt")