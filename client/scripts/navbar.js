const navigateToHome = () => window.location.href = "../index.html"
const navigateToAbout = () => window.location.href = "../pages/about.html"
const navigateToSignin = () => window.location.href = "../pages/log-in.html"
const navigateToSignup = () => window.location.href = "../pages/log-in.html"

let navbar = document.getElementById("navbar");
navbar.innerHTML += `
<nav class="navbar">
<div class="navbar-left">
    <a href="index.html">
        <img src="../assets/images/quadb_logo.png" class="logo">
    </a>
</div>
<div class="navbar-center">
    <ul>
        <li><a href="" class="active-link"><img src="../assets/images/test_images/icons/home.png"><span>Home</span></a></li>
        <li><a href=""><img src="../assets/images/test_images/icons/network.png"><span>About</span></a></li>
        <li><a href=""><img src="../assets/images/test_images/icons/message.png"><span>Feed</span></a></li>
        <li><a href=""><img src="../assets/images/test_images/icons/notification.png"><span>Discover</span></a></li>
        <li><a href=""><img src="../assets/images/test_images/icons/leaderboard-icon.png"><span>  Leaderboard</span></a></li>
    </ul>
</div>
<div class="navbar-right">
    <div class="online">
        <img src="../assets/images/user_profile_default.jpg"
            class="nav-profile-img" onclick="toggleMenu()">
    </div>
</div>
<div class="profile-menu-wrap" id="profileMenu">
    <div class="profile-menu">
        <a href="" class="profile-menu-link">
            <img src="../assets/images/test_images/icons/feedback.png">
            <p>Give Feedback</p>
            <span>></span>
        </a>
        <a href="" class="profile-menu-link">
            <img src="../assets/images/test_images/icons/setting.png">
            <p>Settings and Privacy</p>
            <span>></span>
        </a>
        <a href="#" class="profile-menu-link" id="log_out" target="_blank">
            <img src="../assets/images/test_images/icons/logout.png">
            <p>Log Out</p>
            <span>></span>
        </a>
    </div>
</div>
</nav>
`

var profileMenu = document.getElementById('profileMenu')
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