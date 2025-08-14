// ‘this’, call, apply, bind
// This and Call - when we want to hold a functions reference - current context

//  function setUSerName(username){
//         this.username = username
//  }

//  function createUser(username, email, password){
//     setUSerName.call(this,username)
//     this.email = email
//     this.password = password
//  }

//  const log = new createUser("Nikita","nikita@gmail.com","12345")
//  console.log(log);
 

// let userDetails ={
//       name:"Nikita",
//       Age:"20",
//       Designation:"Intern",
//       printDetails:function(){
//             console.log(this.name); 
//       }
// } 
// userDetails.printDetails(userDetails)


// let userDetails2 ={
//       name:"Nikki",
//       Age:"18",
//       Designation:"Web Developer",
    
// } 
// // Function borrowing
// userDetails.printDetails.call(userDetails2);

// // Apply - we can pass multiple arguments in form of an array

 