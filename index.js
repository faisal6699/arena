var username,email,password,gender,area,city,phone,postaladdress;





firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      document.getElementById("login").style.display = 'none';
      document.getElementById("signup").style.display = 'none';
      document.getElementById("profile_details").style.display = 'block';
      document.getElementById("search_result").style.display = 'none';
        var userId = firebase.auth().currentUser.uid;
          console.log(userId);
      
      return firebase.database().ref("user").child(userId).once('value').then(function(snapshot) {
      
      console.log(snapshot.val().name);
      
            username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
            
            email  = (snapshot.val() && snapshot.val().email) || 'Anonymous';
          
          password = (snapshot.val() && snapshot.val().password) || 'Anonymous';
          
          gender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
          
          area = (snapshot.val() && snapshot.val().area) || 'Anonymous';
          
          city = (snapshot.val() && snapshot.val().city) || 'Anonymous';
          
          phone = (snapshot.val() && snapshot.val().phone) || 'Anonymous';
          
          postaladdress = (snapshot.val() && snapshot.val().postaladdress) || 'Anonymous';
          
          
          
            
          profile_update(username,email,password,gender,area,city,phone,postaladdress);
          
          
            
          
      
      
      });
  // ...

  } else {
    // User is signed out.
    // ...

      document.getElementById("search_result").style.display = 'none';
      document.getElementById("login").style.display = 'block';
      document.getElementById("signup").style.display = 'block';
      document.getElementById("profile_details").style.display = 'none';
  }
});
            
            
            
            
            
            
            
            
            
            
            
            

//end of auth





















function searchResult() {
document.getElementById("search_result").style.display = 'block';
var resultOfSearch = document.getElementById("searchInput").value;
    




firebase.database().ref().child('uploadbooks').orderByChild('book_name').equalTo(resultOfSearch).on("value", function(snapshot) {
   
    
    
    
    console.log(snapshot.val());
    var i=1;
    snapshot.forEach(function(data) {
        console.log(data.val().book_edition +"books");
       
       if(i%2!==0){
         ++i;
        document.getElementById("ssh"+i).innerHTML = data.val().book_name;
        document.getElementById("sh"+i).innerHTML = "Details:  \n" + "location: " + data.val().book_location + "\n Phone: " + data.val().book_phone;}
        //goto(data.val().book_location,data.val().book_edition,data.val().book_phone);
        
        
      //window.alert("Type: "+ "book " + "location: " + data.val().book_location + "Phone No. " + data.val().book_phone  + "Edition: " + data.val().book_edition);
    });
    
});

firebase.database().ref().child('uploadpdfs').orderByChild('pdf_name').equalTo(resultOfSearch).on("value", function(snapshot) {
    
    var j=2;
    snapshot.forEach(function(data) {
        console.log(data.val().book_edition +"books");
       
       if(j%2===0){
         ++j;
        document.getElementById("ssh"+j).innerHTML = data.val().pdf_name;
        document.getElementById("sh"+j).innerHTML = "Details:  \n" + "location: " + data.val().pdf_location + "\n Browse: " + data.val().pdf_browse;}
    });
});



window.location.href ="#search_result";



}

//end of searchresult






/*
function login(){
  var userEmail = document.getElementById("email_field").value;
    
     var userPass = document.getElementById("password_field").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here        
    var errorCode = error.code;
  var errorMessage = error.message;
        
    window.alert("Error" + " "+ errorMessage);  
  // ...
});
    
    
}
*/

//end of login



/*
function signup(){
    
    var userName = document.getElementById("inputName").value;
    
    var userEmail = document.getElementById("inputEmail").value;
    
     var userPass = document.getElementById("inputPassword").value;
    
    var userArea = document.getElementById("inputArea").value;
    var userGender = document.getElementById("inputGender").value;
    
    var userCity = document.getElementById("inputCity").value;
    
    var userPostalAddress = document.getElementById("inputPostalAddress").value;
    
    var userPhone = document.getElementById("inputPhone").value;
    
    
    
    
    
    if(userName.length < 10){
         window.alert("username is too small");    
        }
    
    else if(userCity === "Enter your city"){
            window.alert("city is not defined");
        }
    
    else if(userGender === "Select your gender"){
             window.alert("Gender is not defined");
        }
    
    else if(userArea.length < 2){
              window.alert("Area is not defined");
        }
    
    else if(userPhone.length < 11){
             window.alert("invalid number");    
        }
    
    else if(userPostalAddress.length < 1){
             window.alert("invalid postal address");  
        }
    
    
    else{
    
    firebase.auth().createUserWithEmailAndPassword(userEmail,userPass)
        .then(function(user) {
            var user = firebase.auth().currentUser;
            var uid=user.uid;
            console.log(uid);
            var ref = firebase.database().ref().child("user");
            var data = {
                name: userName,
                email: userEmail,
                password: userPass,
                area: userArea,
                gender:userGender,
                phone:userPhone,
                postaladdress:userPostalAddress,
                city: userCity,
                id:user.uid
            }
            ref.child(uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                console.log("Saved");
                $location.path('/profile');
            }, function(error) {
                console.log(error); 
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else if (errorCode == 'auth/email-already-in-use') {
                alert('The email is already taken.');
            } else if (errorCode == 'auth/weak-password') {
                alert('Password is weak');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });

}

}

*/
//signup end




/*
function logout(){

firebase.auth().signOut().then(function() {
  // Sign-out successful.
    
    
    document.getElementById("login").style.display = 'block';
    document.getElementById("signup").style.display = 'block';
    document.getElementById("profile_details").style.display = 'none'; 
    window.alert("logout successful");
    
}).catch(function(error) {
  // An error happened.
    window.alert("not");
});

   //document.getElementById("email_field").value ="email...";
    //document.getElementById("password_field").value ="password...";
    
}
*/

//end of logout

/*
function upload_book(){
 
    var book_name = document.getElementById("book_name").value;
    var book_edition = document.getElementById("book_edition").value;
    var book_writer = document.getElementById("book_writer").value;
    var book_sell = document.getElementById("book_sell").value;
    var book_price = document.getElementById("book_price").value;
    var book_img = document.getElementById("book_img").value;
    var book_location = document.getElementById("book_location").value;
    var book_phone = document.getElementById("book_phone").value;
    
    
    var user = firebase.auth().currentUser;
    
    var uid = user.uid;
    
    var email = user.email;
    
    
    
    console.log(uid+" "+email);
    
    
    if(uid !== null){
    
    writeNewPostBook(uid, email, book_name, book_edition, book_writer,book_sell,book_price,book_img,book_location,book_phone);    
    window.alert("successfully uploaded");
}


else{
    //can't upload book
    window.alert("Please login to post!");
}

}
//end of upload book
*/


/*
function upload_pdf(){
 
    var pdf_name = document.getElementById("pdf_name").value;
    var pdf_edition = document.getElementById("pdf_edition").value;
    var pdf_writer = document.getElementById("pdf_writer").value;
    var pdf_get = document.getElementById("pdf_get").value;
    var pdf_browse = document.getElementById("pdf_browse").value;
    var pdf_location = document.getElementById("pdf_location").value;
    var pdf_phone = document.getElementById("pdf_phone").value;
    
    
    var user = firebase.auth().currentUser;
    
    var uid = user.uid;
    
    var email = user.email;
    
    
    
    console.log(uid+" "+email+ pdf_name+pdf_edition+pdf_writer+pdf_get+pdf_browse+pdf_location+pdf_phone);
    
    
    if(uid !== null){
    
    writeNewPostPdf(uid, email, pdf_name, pdf_edition, pdf_writer,pdf_get,pdf_browse,pdf_location,pdf_phone) ;
    window.alert("successfully uploaded");    
}


else{
    //can't upload book
    window.alert("Please login to post!");
}

}
*/
// end of upload_pdf

/*

  function writeNewPostPdf(uid, email, pdf_name, pdf_edition, pdf_writer,pdf_get,pdf_browse,pdf_location,pdf_phone) {
  // A post entry.
  var postData = {
    email: email,
    uid: uid,
    pdf_name: pdf_name,
    pdf_edition: pdf_edition,
    pdf_writer: pdf_writer,
    pdf_get: pdf_get,
    pdf_browse: pdf_browse,
    pdf_location: pdf_location,
    pdf_phone: pdf_phone
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('uploadpdfs').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  
  updates['/uploadpdfs/'  + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
*/
//end of pdf upload function



















/*

    function writeNewPostBook(uid, email, book_name, book_edition, book_writer,book_sell,book_price,book_img,book_location,book_phone) {
  // A post entry.
    console.log(uid+" "+email);
    console.log("called");
    var postData = {
    email: email,
    uid: uid,
    book_name: book_name,
    book_edition: book_edition,
    book_writer: book_writer,
    book_sell: book_sell,
    book_price: book_price,
    book_img: book_img,
    book_location: book_location,
    book_phone: book_phone
  };

  //Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('uploadbooks').push().key;
        console.log(newPostKey);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  
  updates['/uploadbooks/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}*/