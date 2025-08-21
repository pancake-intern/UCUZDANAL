document.addEventListener('DOMContentLoaded', function() {
  
  checkUserSession();
});

function checkUserSession() {
 
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
  const loginButton = document.getElementById('signinButton');
  const signupButton = document.getElementById('signupButton');
  const profileSection = document.getElementById('profile-section');
  const exitButton = document.getElementById('exitaccount')
  if (isUserLoggedIn) {
   
    if (loginButton) loginButton.style.display = 'none';
    if (signupButton) signupButton.style.display = 'none';
    
    
    if (profileSection) profileSection.style.display = 'flex';
    
    
    updateProfileInfo(profileSection);
    
  } else {
    exitButton.style.display ='none';

  }
}

function updateProfileInfo(profileSection) {
    const username = localStorage.getItem('username')
    const greeting= document.createElement('p')
    greeting.classList.add("profile-section","goldtext","mx-1","my-auto")
;
    greeting.innerText=`Hoşgeldin ${username}`
    profileSection.appendChild(greeting)
}