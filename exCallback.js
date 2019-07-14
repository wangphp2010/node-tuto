function dbupd(sql,done){
  setTimeout(()=>done(sql+" update ok "),800 ) ;
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