import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://new-list-15c17-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

  // Initialize Firebase
  const app = initializeApp(appSettings);
  const db = getDatabase(app);
  const moviesInDB = ref(db, "movies")
  const thingsInDB = ref(db, "things")

//get elements
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listViewEl = document.getElementById("shopping-list")


//catch the values in the database

onValue(thingsInDB, function(snapshot){
    

    if (snapshot.exists()) {
        let thingsArr = Object.entries(snapshot.val())
        
        clearList()

        for (let i=0; i < thingsArr.length;i++){

            let currentItem = thingsArr[i];
            let CurrentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            
            addItem(currentItem)
        }
    } else {
        listViewEl.innerHTML = "no items here yet"
    }
})


// add the values to the database

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    clearInput()
    push(thingsInDB, inputValue);

})


//functions

function clearInput(){
    inputFieldEl.value = ""
}

function clearList(){
    listViewEl.innerHTML = ""
}

function addItem(item){
    let itemId = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li")
    
    
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let locationDB = ref(db,`things/${itemId}`)
        remove(locationDB)
    })
    
    listViewEl.append(newEl)

}

