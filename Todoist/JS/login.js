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

      function login(){
       const login=document.getElementById('loginform');
       loginform.addEventListener('submit',e=>{
        e.preventDefault();
        const email=loginform['email'].value;
        const password=loginform['password'].value;
        console.log(email,password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
          console.log("login success");
          location="todo.html";
        }).catch(err=>{
          const loginerror = document.getElementById('loginerror');
          loginerror.innerText=err.message;
        })
       })
      };
