let uId = localStorage.getItem("userId");
let partId = localStorage.getItem("partnerId");

const navigateToHome = () => window.location.href = "../home.html"
const navigateToAbout = () => window.location.href = "../pages/about.html"
const navigateToSignin = () => window.location.href = "../pages/log-in.html"
const navigateToSignup = () => window.location.href = "../pages/log-in.html"

const handleLogout = () => {
    localStorage.clear();
    window.location.href = "../pages/home.html";
}

let navbar = document.getElementById("navbar");
navbar.innerHTML += `
<nav class="navbar">
<div class="navbar-left">
    <a href="../pages/home.html">
        <img src="../assets/images/test_images/quadb.png" style="height: 45px; width: auto;" class="logo">
    </a>
</div>
<div class="navbar-center">
    <ul>
        <li><a href="../pages/home.html" class="active-link"><img src="../assets/images/test_images/icons/home.png"><span>Home</span></a></li>
        <li><a href="../pages/feed.html"><img src="../assets/images/test_images/icons/message.png"><span>Feed</span></a></li>
        <li id="login"><a href="../pages/log-in.html"><img src="../assets/images/test_images/icons/home.png"><span>Login</span></a></li>
        <li><a href="../pages/leaderboard.html"><img src="../assets/images/test_images/icons/leaderboard-icon.png" style="padding: 4px;"><span>Leaderboard</span></a></li>
    </ul>
</div>
<div class="navbar-right" id="nav-profile">
    <div class="online">
        <img src="../assets/images/user_profile_default.jpg"
            class="nav-profile-img" onclick="toggleMenu()">
    </div>
</div>
<div class="profile-menu-wrap" id="profileMenu">
    <div class="profile-menu">
        <a href="../pages/partner_profile.html?id=${partId}" class="profile-menu-link">
            <img src="../assets/images/test_images/icons/feedback.png">
            <p>Profile</p>
            <span>></span>
        </a>
        <a href="" class="profile-menu-link">
            <img src="../assets/images/test_images/icons/setting.png">
            <p>Settings and Privacy</p>
            <span>></span>
        </a>
        <div class="profile-menu-link" id="log_out" style="cursor: pointer;" target="_blank" onclick="handleLogout()">
            <img src="../assets/images/test_images/icons/logout.png">
            <p>Log Out</p>
            <span>></span>
        </div>
    </div>
</div>
</nav>
`

var profileMenu = document.getElementById('profileMenu')
var navProfile = document.getElementById('nav-profile');
var loginOption = document.getElementById("login");
window.onload = () => {
    if (uId == null) {
        navProfile.style.display = "none";
    }
    if (uId || partId) {
        console.log(uId, partId)
        loginOption.style.display = "none";
    }
}
var seeMore = document.getElementById('hidden')
function toggleMenu() {
    profileMenu.classList.toggle("open-menu");
}
function show() {
    if (seeMore.style.display == "none") {
        seeMore.style.display = "inline-block"
        document.getElementById('more').innerHTML = "Less..."
    }
    else {
        seeMore.style.display = "none";
        document.getElementById('more').innerHTML = "More..."
    }
}
