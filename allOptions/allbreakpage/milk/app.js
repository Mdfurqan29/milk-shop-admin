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



var Name = document.getElementById("Name")
var Price = document.getElementById("Price")
var Lprice = document.getElementById("Lprice");
var SerialNo = document.getElementById("SerialNo")
var pushData = document.getElementById("pushingData")

var dataOfObject = [];

function getDataFromDatabase(){
    var reference = ref(DATABASE,'milk')
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
    var a = i
        pushData.innerHTML += `<tr>
        <th >${i+1}</th>
        <th >${dataOfObject[i].name}</th>
        <th >${dataOfObject[i].price}</th>
        <th>${dataOfObject[i].Lprice}</th>
        <th><i class="fa fa-times" aria-hidden="true" onclick="Del(${a})"></th>
        </tr>`
    }
}
window.onload =  getDataFromDatabase()
 window.Add = function() {
    if(Name.value === "" || Price.value === "" || Lprice.value === ""){
        Swal.fire('Enter Details')
    }else{
    var milk = {
        name: `${Name.value} Milk`,
        price: `Rs:${Price.value}`,
        Lprice:Lprice.value,
        buy:"BUY",
        src:"https://media.istockphoto.com/id/1222018207/photo/pouring-milk-into-a-drinking-glass.webp?b=1&s=170667a&w=0&k=20&c=GQJZg5LmOh5ryVb6Dv9GHvoQLTtsrtqJJyJTi0cEgys=",
    }

    var referId = ref(DATABASE)
    var ID = push(referId).key
    milk.id = ID
    var reference = ref(DATABASE,`milk/${milk.id}`)
    set(reference,milk)
    Name.value = ""
    Price.value = ""
    Lprice.value = ""
    }
    pushData.innerHTML = ""
    render()
}

 window.Del =function(index){
 var id = dataOfObject[index].id
    var refer = ref(DATABASE,`milk/${id}`)
    remove(refer)
    dataOfObject.splice(index,1)
    Swal.fire({
        title: 'Product Deleted',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    render()
}



