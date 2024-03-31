const navigateToHome = () => window.location.href = "../index.html"
const navigateToAbout = () => window.location.href = "../pages/about.html"
const navigateToSignin = () => window.location.href = "../pages/log-in.html"
const navigateToSignup = () => window.location.href = "../pages/log-in.html"

let navbar = document.getElementById("navbar");
navbar.innerHTML += `
<div class="w-screen flex items-center justify-between gap-x-6 py-3 px-6 min-h-[64px] bg-gray-800 text-white">
    <div class="text-xl leading-none px-4 cursor-pointer tracking-wide" onclick="navigateToHome()">QUAD.B</div>
    <div class="flex items-center gap-x-5 text-base leading-none px-4">
        <div class="cursor-pointer tracking-wide" onclick="navigateToAbout()">About</div>
        <div class="cursor-pointer tracking-wide">Contact</div>
        <div class="cursor-pointer tracking-wide" onclick="navigateToSignin()">Signin</div>
        <div class="cursor-pointer tracking-wide" onclick="navigateToSignup()">Signup</div>
        <div class="cursor-pointer tracking-wide">Predict</div>
    </div>
</div>
`