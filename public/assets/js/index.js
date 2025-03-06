import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBNVc0Hg4-PecMH0ZdFRPkZqdGL2bQHRho",
    authDomain: "elektro-home-2025.firebaseapp.com",
    // databaseURL: "https://elektro-home-2025.firebaseio.com",
    projectId: "elektro-home-2025",
    storageBucket: "elektro-home-2025.firebasestorage.app",
    messagingSenderId: "1082403793217",
    appId: "1:1082403793217:web:2be7b7b21afc784bd619c0"
  };


// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    loadHTML('header.html', document.getElementById('header-placeholder'), function() {
      setupNavigation();
    });
  
    loadHTML('footer.html', document.getElementById('footer-placeholder'));
  
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
    // Clear previous error messages function
      function clearErrorMessages() {
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('subjectError').textContent = '';
        document.getElementById('messageError').textContent = '';
        document.getElementById('errorMessage').textContent = '';
      }
  
      // Validate email function
      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
  
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrorMessages();
  
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.querySelector('textarea[name="message"]').value.trim();
  
        const isNameValid = name !== '';
        const isEmailValid = validateEmail(email);
        const isSubjectValid = subject !== '';
        const isMessageValid = message !== '';
  
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
          if (!isNameValid) {
            document.getElementById('nameError').textContent = 'Please enter your name.';
          }
          if (!isEmailValid) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
          }
          if (!isSubjectValid) {
            document.getElementById('subjectError').textContent = 'Please enter a subject.';
          }
          if (!isMessageValid) {
            document.getElementById('messageError').textContent = 'Please enter a message.';
          }
          document.getElementById('errorMessage').classList.remove('hidden');
          document.getElementById('errorMessage').textContent = 'Please correct the errors before submitting.';
          return; // Exit the function if validation fails
        }
  
        // Proceed with Firestore document addition
        try {
          await addDoc(collection(db, "contacts"), {
            name,
            email,
            subject,
            message,
            createdAt: serverTimestamp()
          });
  
          document.getElementById('submitMessage').classList.remove('hidden');
          document.getElementById('errorMessage').classList.add('hidden');
          contactForm.reset();
  
        } catch (error) {
          console.error('Error sending message:', error);
          document.getElementById('submitMessage').classList.add('hidden');
          document.getElementById('errorMessage').classList.remove('hidden');
          document.getElementById('errorMessage').textContent = 'An error occurred while sending your message. Please try again.';
        }
      });
    }  
  });
  
  // Load HTML content from a URL and insert it into an element
  function loadHTML(url, element, callback) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        element.innerHTML = html;
        if (callback) callback();
      })
      .catch(err => console.error(`Failed to load ${url}: ${err}`));
  }
  
  function setupNavigation() {
    // To toggle the menu icon's checkbox
    function toggleMenuIcon() {
      var menuIcon = document.getElementById('menu-icon');
      if (menuIcon) {
        menuIcon.checked = !menuIcon.checked;
      }
    }
  
    // Set event listeners for navigation links
    document.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        toggleMenuIcon();
      });
    });
  }
  
// Monitor scroll events to toggle the visibility of the scroll-to-top button
// window.addEventListener("scroll", function() {
//     var scrollButton = document.getElementById("scroll-to-top");
//     if (window.scrollY > 300) { // Show the button when scrolled 300 pixels or more
//       scrollButton.classList.remove("hidden");
//     } else {
//       scrollButton.classList.add("hidden"); // Hide the button when scrolled less than 300 pixels
//     }
//   });
  
//   // Handle click event for the scroll-to-top button
//   document.getElementById("scroll-to-top").addEventListener("click", function(event) {
//     event.preventDefault(); // Disable the default behavior of page links
//     window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll smoothly to the top of the page
//   });
  
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/") {
        window.location.href = "/index.html";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded: スクリプトが読み込まれました。");
    const video = document.querySelector(".video-slide video");

    if (video) {
        video.play().catch(error => {
            console.error("Autoplay failed:", error);
        });
    }
});
