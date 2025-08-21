document.getElementById('exitaccount').addEventListener("click",()=>{
    localStorage.removeItem("username")
    localStorage.removeItem("useremail")
    localStorage.removeItem("userpassword")
    localStorage.setItem("isLoggedIn",false)

})