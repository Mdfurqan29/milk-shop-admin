
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,ref,set,push,onChildAdded,remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFjP6tYa2qsjDyO6Ob3FpJQUTTkTUGcCs",
  authDomain: "milky-shop.firebaseapp.com",
  projectId: "milky-shop",
  storageBucket: "milky-shop.appspot.com",
  messagingSenderId: "126174129360",
  appId: "1:126174129360:web:0ee9d1724e182b0f1a82d5",
  measurementId: "G-JT5YDLVYLW"
};

const app = initializeApp(firebaseConfig);
var DATABASE = getDatabase(app)

var SerialNo = document.getElementById("SerialNo")
var pushData = document.getElementById("pushingData")

var dataOfObject = [];

function getDataFromDatabase(){
    var reference = ref(DATABASE,'orders')
    onChildAdded(reference,function(data){
      render(data.val())
    })
  }
  function render(data){
    if(data){
        dataOfObject.push(data)
    }
    pushData.innerHTML = ""
    SerialNo.innerHTML = dataOfObject.length
 for (var i = 0; i < dataOfObject.length; i++) {
        pushData.innerHTML += `<tr>
        <th >${i+1}</th>
        <th >${dataOfObject[i].UserName}</th>
        <th >${dataOfObject[i].address}</th>
        <th>${dataOfObject[i].number}</th>
        <th>${dataOfObject[i].name}</th>
        <th>${dataOfObject[i].price}</th>
        <th><i class="fa fa-times" aria-hidden="true" onclick="Del(${i})"></th>
        </tr>`
    }
}
window.onload =  getDataFromDatabase()

window.Del =function(index){
  var id = dataOfObject[index].id
     var refer = ref(DATABASE,`orders/${id}`)
     remove(refer)
     dataOfObject.splice(index,1)
     Swal.fire({
         title: 'Order Data Deleted',
         showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
         }
       })
     render()
 }