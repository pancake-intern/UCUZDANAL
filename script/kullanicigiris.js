 const form= document.getElementById('loginform')
 form.addEventListener("submit",function(e){
    e.preventDefault();
    const enteredname=document.getElementById('username').value
    const enteredpassword= document.getElementById('password').value

    const username= localStorage.getItem("username")
    const userpassword = localStorage.getItem("userpassword")
    if(username === enteredname && userpassword === enteredpassword){
        localStorage.setItem("isLoggedIn",true);
       alert("Giriş başarılı.Keyifli alışverişler dileriz.");
         window.location.href = "../index.html";
    }else{
        alert("Yanlış kullanıcı adı veya şifre.")
        window.location.href = "kullanicigiris.html"
    }

 })
 