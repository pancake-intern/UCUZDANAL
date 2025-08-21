document.getElementById('exitaccount').addEventListener("click",()=>{
    localStorage.removeItem("username")
    localStorage.removeItem("useremail")
    localStorage.removeItem("userpassword")
    localStorage.setItem("isLoggedIn",false)
    location.reload()
})

document.addEventListener('DOMContentLoaded', function() {
  const checkstatus= localStorage.getItem("isLoggedIn")
  if(checkstatus === 'true'){
    const mammamia = document.getElementsByClassName("mammamia")[0];
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("container", "text-center", "mt-5");

    const title = document.createElement("h2");
    title.innerText = "Profil Bilgileriniz";
    title.classList.add("goldtext", "mb-4");

    const username = localStorage.getItem("username");
    const useremail = localStorage.getItem("useremail");

    const usernameP = document.createElement("p");
    usernameP.innerHTML = `<strong class="goldtext">Kullanıcı Adı:</strong> ${username}`;
    usernameP.classList.add("fs-4");

    const emailP = document.createElement("p");
    emailP.innerHTML = `<strong class="goldtext">E-posta:</strong> ${useremail}`;
    emailP.classList.add("fs-4");

    mainDiv.appendChild(title);
    mainDiv.appendChild(usernameP);
    mainDiv.appendChild(emailP);

    mammamia.appendChild(mainDiv);
  }else{
    const mammamia= document.getElementsByClassName("mammamia")
    const mainDiv= document.createElement("div")
    mainDiv.classList.add("container","goldtext","fs-1","text-center")
    const notsignedin= document.createElement("p")
    notsignedin.innerText='BİLGİLERİNİZİ GÖRMEK İÇİN LÜTFEN GİRİŞ YAPINIZ'
    mammamia[0].appendChild(mainDiv)
    mainDiv.appendChild(notsignedin)
  }




})