
function dbupAsync(sql){
    
     


     const p = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log(sql + " update ok");
        resolve(sql + " resolve.ok");
  
      },1000);
    });
     return p ;  
     
      
  } 
  
    dbupAsync("1.sql")
    .then(()=> dbupAsync("2.sql"))
    .then(()=> dbupAsync("3.sql"));
   
     console.log( ' ') ;
  
    //  更加简洁   async/await

/*   async function upAllDB(){
    const result1 = await dbupAsync("1.sql") ;
    const result2 = await dbupAsync("2.sql") ;
    const result3 = await dbupAsync("3.sql") ;
    console.log( ' ')

     console.log( result1,result2,result3)
  }
  
  upAllDB();   */