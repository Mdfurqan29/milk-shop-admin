var email = document.getElementById("Email")
var password = document.getElementById("password")
function AdminLoginBtn(){
    if(email.value===""){
        Swal.fire('Enter Email')

    }else if(password.value ===""){
        Swal.fire('Enter Password')
    }else if(email.value==="mdfurqanahmed14@gmail.com" && password.value ==="furqanadmin123"){
        Swal.fire('Admin Login')
        window.location = './allOptions/allbreakpage/index.html'
    }else{
        Swal.fire('Wrong Admin')

    }
}