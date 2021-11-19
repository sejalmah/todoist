var firebaseConfig = {
  apiKey: "AIzaSyATIct3Hn2-UL9kn_3nJqm3uDpFvHmNpYc",
  authDomain: "sejal-2de57.firebaseapp.com",
  projectId: "sejal-2de57",
  storageBucket: "sejal-2de57.appspot.com",
  messagingSenderId: "281016905331",
  appId: "1:281016905331:web:b01ea74a41e90bb3e9c406",
  measurementId: "G-47KGHZND55",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const project = form["project"].value;
  form.reset();
  auth.onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;
      db.collection("projects")
        .doc()
        .set({
          project,
          userid,
        })
        .then(() => {
          console.log("todo added");
        })
        .catch((err) => {
          const todoerror = document.getElementById("todoerror");
          todoerror.innerText = err.message;
        });
    } else {
      const todoerror = document.getElementById("todoerror");
      todoerror.innerText = "user is not signed in to add todos";
    }
  });
});

function logout() {
  console.log("oo");
  auth.signOut();
}

function refreshPage() {
  window.location.reload();
}

auth.onAuthStateChanged((user) => {
  if (user) {
    var userid = user.uid;
    console.log(userid);
    db.collection("projects")
      .get()
      .then(function (querySnapshot) {
        let row = "";
        querySnapshot.forEach(function (doc) {
          dataObj = doc.data();
          function buildTable(data) {
            row += `<tr>               <div>
                                              <td>${data.project}
                                              
                                              </div>

                                              <div>Add task <button type="submit" onclick="open1('${doc.id}')">+</button>    </div>                                    
                                              <div id=${doc.id}><b>Tasks</b><div>
                                              </td>
                                        </tr>`;

            db.collection("tasks")
              .get()
              .then(function (querySnapshot1) {
                querySnapshot1.forEach(function (doc1) {
                  dataObj1 = doc1.data();
                  //console.log(dataObj1);
                  if (dataObj1.projectid == doc.id) buildTable(dataObj1);
                  function buildTable(data1) {
                    var mo = document.getElementById(doc.id);
                    mo.innerHTML += `
                                                                <p>${data1.task}</p>
                                                                <p>${data1.localDateTime}</p>
                                                          `;
                  }
                });
              });
          }
          if (dataObj.userid == userid) buildTable(dataObj);
        });
        var table = document.getElementById("myTable");
        table.innerHTML = row;
      });
  } else {
    document.getElementById("nouser").innerHTML =
      "NO USER LOGGED IN. PLEASE LOG IN FIRST";
    location = "login.html";
  }
});

Number.prototype.AddZero = function (b, c) {
  var l = String(b || 10).length - String(this).length + 1;
  return l > 0 ? new Array(l).join(c || "0") + this : this;
};

var d = new Date(),
  localDateTime =
    [(d.getMonth() + 1).AddZero(), d.getDate().AddZero(), d.getFullYear()].join(
      "/"
    ) +
    ", " +
    [d.getHours().AddZero(), d.getMinutes().AddZero()].join(":");
var elem = document.getElementById("datetime");
elem.value = localDateTime;

function open1(id) {
  console.log(id);
  var model = document.getElementById("taskadd");
  model.style.display = "block";
  // document.getElementById(myModal).show();
  const taskform = document.getElementById("addtaskform");
  //const project = document.getElementById('project-input');
  console.log(taskform);
  //console.log(project);
  taskform.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskform["taskname"].value;
    console.log(task);
    taskform.reset();
    auth.onAuthStateChanged((user) => {
      if (user) {
        var projectid = id;
        //var date = document.getElementById("datetime");
        console.log(localDateTime);
        db.collection("tasks")
          .doc()
          .set({
            localDateTime,
            task,
            projectid,
          })
          .then(() => {
            console.log("task added");
          })
          .catch((err) => {
            const taskerror = document.getElementById("taskerror");
            taskerror.innerText = err.message;
          });
      } else {
        const taskerror = document.getElementById("taskerror");
        taskerror.innerText = "user is not signed in to add task";
      }
    });
  });
}

function close1() {
  var model = document.getElementById("taskadd");
  model.style.display = "none";
}
// 
// function del() {
//   var retval = confirm("Are you sure you want to delete this project?");
//   console.log(retval);
//   if (retval == true) {
//     console.log(projectid.value);
//     db.collection("projects")
//       .doc(projectid)
//       .delete()
//       .then(() => {
//         console.log("Document successfully deleted!");
//       })
//       .catch((error) => {
//         console.error("Error removing document: ", error);
//       });
//   } else {
//   }
// }
