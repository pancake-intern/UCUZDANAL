


 const form= document.getElementById('registerform')
 form.addEventListener("submit",function(e){
    e.preventDefault();
     const username= document.getElementById('username').value
     const useremail= document.getElementById('email').value
     const userpassword = document.getElementById('password').value
    localStorage.setItem("username",username)
    localStorage.setItem("useremail",useremail)
    localStorage.setItem("userpassword",userpassword)
    localStorage.setItem("isLoggedIn",true);
   alert("Giriş başarılı.Keyifli alışverişler dileriz.");
   window.location.href = "../index.html";
 })
 