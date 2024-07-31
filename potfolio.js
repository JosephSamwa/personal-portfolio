let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section'); // Changed to querySelectorAll to get all sections
let navLinks = document.querySelectorAll('header nav a'); // Changed to querySelectorAll to get all nav links

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight; // Corrected typo
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active'); // Corrected syntax
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAujFKDx_T7ZSEyYGmvbdhkmn8SdKCNXjs",
    authDomain: "hope-kokeno-cbo.firebaseapp.com",
    databaseURL: "https://hope-kokeno-cbo-default-rtdb.firebaseio.com",
    projectId: "hope-kokeno-cbo",
    storageBucket: "hope-kokeno-cbo.appspot.com",
    messagingSenderId: "508964589142",
    appId: "1:508964589142:web:33a4d190a497bb5ecab5f7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to save contact form data
function saveContactFormData(name, email, phone, selection) {
    const newContactFormRef = database.ref('portfolio').push();
    const date = new Date();
    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${day} ${month} ${year} || ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    newContactFormRef.set({
        name: name,
        email: email,
        phone: phone,
        selections: selection,
        date: formattedTime
    });
}

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const selection = document.getElementById('selections').value;
    saveContactFormData(name, email, phone, selection); // Uncommented to save data
    showConfirmation(name);
    setTimeout(hideConfirmation, 3000);
    document.getElementById('contactForm').reset();
    setTimeout(hideForm, 3000);
});

function showConfirmation(name) {
    let alerts = document.getElementById('alert');
    alerts.style.display = 'block';
    // Show a success message
    alerts.innerHTML = `Thank you for contacting us, ${name}! Serving you is our pleasure!`;
}

function hideConfirmation() {
    let alerts = document.getElementById('alert');
    alerts.style.display = 'none';
}

function hideForm() {
    const contactForm = document.getElementById('DevForm');
    const overlay = document.getElementById('overlay');
    contactForm.style.display = 'none';
    overlay.style.display = 'none';
}

/*
function DevAlert() {
    const DevAlerts = document.getElementById('DevAlert');
    DevAlerts.style.display = 'block';
    DevAlerts.innerHTML = 'Kindly click this alert to contact us via WhatsApp.';
    setTimeout(HideDevAlert, 5000);
}

function HideDevAlert() {
    const Dev = document.getElementById('DevAlert');
    Dev.style.display = 'none';
}

document.getElementById('devBt').addEventListener('click', DevAlert);
*/
