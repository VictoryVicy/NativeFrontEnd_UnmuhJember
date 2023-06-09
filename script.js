// nav
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector(".navbar");

burger.addEventListener("click", () => {
	navLinks.classList.toggle("nav-active");
	burger.classList.toggle("open");
	nav.classList.toggle("scrolled-mini");
});

window.addEventListener("scroll", function () {
	const navbar = document.querySelector(".navbar");
	navbar.classList.toggle("scrolled", window.scrollY > 0);
	// also make the nav links white
	const navLinks = document.querySelectorAll(".nav-links li a");
	navLinks.forEach((link) => {
		link.classList.toggle("scrolled-nav", window.scrollY > 0);
	});
});

const targetDate = new Date("2023-06-25");

setInterval(updateCountdown, 1000);

function updateCountdown() {
	const now = new Date();
	const timeDifference = targetDate - now;

	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor(
		(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
	);
	const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

	const formattedDays = String(days).padStart(2, "0");
	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");

	document.getElementById("countdown").innerHTML = `
	<div class="time days">
	<span class="angka">${formattedDays}</span>
	<span class="teksis">Days</span>
	</div>
	<div class="time hours">
	<span class="angka">${formattedHours}</span>
	<span class="teksis">Hours</span>
	</div>
	<div class="time minutes">
	<span class="angka">${formattedMinutes}</span>
	<span class="teksis">Minutes</span>
	</div>
	<div class="time seconds">
	<span class="angka">${formattedSeconds}</span>
	<span class="teksis">Second</span>
	</div>`;

	if (timeDifference < 0) {
		clearInterval(updateCountdown);
		document.getElementById("countdown").innerHTML = "Pengumuman Juara !";
	}
}
