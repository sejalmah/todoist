 var firebaseConfig = {
    apiKey: "AIzaSyATIct3Hn2-UL9kn_3nJqm3uDpFvHmNpYc",
    authDomain: "sejal-2de57.firebaseapp.com",
    projectId: "sejal-2de57",
    storageBucket: "sejal-2de57.appspot.com",
    messagingSenderId: "281016905331",
    appId: "1:281016905331:web:b01ea74a41e90bb3e9c406",
    measurementId: "G-47KGHZND55"
  };

  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
   const db = firebase.firestore();
   const auth =  firebase.auth();


function signup() {
const signup = document.getElementById('signupform');
signup.addEventListener('submit', e=>{
	e.preventDefault();
	console.log(signup);
	const email = signup['email'].value;
	const name= signup['name'].value;
	const password = signup['password'].value;
	console.log("hello",name, email, password);
	signup.reset();
	auth.createUserWithEmailAndPassword(email,password).then((cred) =>{
    return db.collection('users').doc(cred.user.uid).set({
      name : name,
      email: email,
      password : password
    }).then(()=>{
    	console.log("success");
    	location="todo.html";
    }).catch(err=>{
          const signuperror = document.getElementById('signuperror');
          signuperror.innerText=err.message;
    })
	}).catch(err=>{
     const signuperror2 = document.getElementById('signuperror');
          signuperror2.innerText=err.message;
  })
})
 };

