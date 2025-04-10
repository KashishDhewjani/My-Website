/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    fetch("courses.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("tbody");
            data.forEach(course => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${course.name}</td>
                    <td>${course.category}</td>
                    <td>${course.price}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching courses:", error));
});

// Filter function for live search and button
function filterCourses() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");
    const noResultsMessage = document.getElementById("noResultsMessage");

    let hasVisibleRow = false;

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const match = text.includes(searchInput);
        row.style.display = match ? "" : "none";
        if (match) hasVisibleRow = true;
    });

    // Show or hide the "No results" message
    if (!hasVisibleRow && searchInput !== "") {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
}

// Custom Print View
function printView() {
    const originalContent = document.body.innerHTML;
    const printContent = document.querySelector("#courses-section").innerHTML;

    // Create a temporary container for print content
    const printWindow = document.createElement("div");
    printWindow.innerHTML = printContent;

    // Show QR code in print view
    const qrContainer = printWindow.querySelector(".qr-container");
    if (qrContainer) {
        qrContainer.style.display = "flex";
    }

    // Replace body with print content
    document.body.innerHTML = printWindow.innerHTML;
    window.print();

    // Restore original content
    document.body.innerHTML = originalContent;
}

// cards
function redirectTo(url) {
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let contactData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            console.log("Contact Form Submitted:", JSON.stringify(contactData));
            alert("Thank you for reaching out! We'll get back to you soon.");
            contactForm.reset();
            document.getElementById('char-count').textContent = "0 / 300";
        });
    }

    const messageBox = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const maxLength = 300;

    if (messageBox && charCount) {
        messageBox.addEventListener('input', function () {
            let currentLength = messageBox.value.length;
            charCount.textContent = `${currentLength} / ${maxLength}`;
            charCount.style.color = (currentLength > maxLength - 20) ? 'red' : 'white';
        });
    }
});