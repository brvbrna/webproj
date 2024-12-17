// Menu toggle functionality
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  }
});

// Scroll reveal animation
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".order__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".review__card", {
  duration: 1000,
});

ScrollReveal().reveal(".section__container footer__container", {
  ...scrollRevealOption,
  interval: 500,
});

// Table selection and reservation functionality
const tables = document.querySelectorAll(".table");
const form = document.getElementById("reservation-form");
const confirmationMessage = document.getElementById("confirmation-message");
let selectedTable = null;

// Handle table selection
tables.forEach((table) => {
  table.addEventListener("click", () => {
    if (!table.classList.contains("occupied")) {
      // Deselect previously selected table
      if (selectedTable) {
        selectedTable.classList.remove("selected");
      }

      // Select the clicked table
      selectedTable = table;
      selectedTable.classList.add("selected");
    }
  });
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectedTable) {
    alert("Please select a table first!");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value.trim();
  const time = document.getElementById("time").value.trim();
  const people = document.getElementById("people").value.trim();

  if (!name || !email || !date || !time || !people) {
    alert("All fields are required!");
    return;
  }

  // Display confirmation message
  confirmationMessage.innerHTML = `
    <p>Reservation confirmed for <strong>${name}</strong> at Table 
    <strong>${selectedTable.querySelector(".table-number").textContent}</strong>, 
    <strong>${people} people</strong>, on <strong>${date}</strong> at <strong>${time}</strong>.</p>`;
  confirmationMessage.classList.add("visible");

  // Mark the table as occupied
  selectedTable.classList.remove("selected");
  selectedTable.classList.add("occupied");

  // Reset the form and selection
  selectedTable = null;
  form.reset();

  // Automatically hide confirmation after a few seconds
  setTimeout(() => {
    confirmationMessage.classList.remove("visible");
    confirmationMessage.innerHTML = "";
  }, 5000);
});

