import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://new-list-15c17-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCDTTGm6M0xy190Bcib6O5ky9PudehrOSg",
//     authDomain: "new-list-15c17.firebaseapp.com",
//     projectId: "new-list-15c17",
//     storageBucket: "new-list-15c17.appspot.com",
//     messagingSenderId: "1069306373343",
//     appId: "1:1069306373343:web:376bd5ad5103a2f7ff756a",
//     databaseURL: "https://new-list-15c17-default-rtdb.asia-southeast1.firebasedatabase.app/"
//   };

  // Initialize Firebase
  const app = initializeApp(appSettings);
  const db = getDatabase(app);
  const moviesInDB = ref(db, "movies")
  const thingsInDB = ref(db, "things")



const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listViewEl = document.getElementById("shopping-list")

onValue(thingsInDB, function(snapshot){
    let thingsArr = Object.values(snapshot.val())

    clear(listViewEl)

    for (let i=0; i < thingsArr.length;i++){
        addItem(thingsArr[i])
    }
})



// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value
    
//     push(moviesInDB, inputValue);

//     addItem(inputValue)
    
//     clear();
// })

function clear(stuff){
    stuff.value = ""
}

function addItem(A){
    listViewEl.innerHTML += `<li>${A}</li>`;

}

