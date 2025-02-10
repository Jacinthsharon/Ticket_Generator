document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("add-task-btn");

    // Search Functionality
    document.getElementById("search-input").addEventListener("input", function (event) {
        const searchTerm = event.target.value.toLowerCase(); 
        filterTable(searchTerm); 
    });

    function filterTable(searchTerm) {
        const rows = document.querySelectorAll("table tbody tr");
    
        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase(); 
            if (rowText.includes(searchTerm)) {
                row.style.display = ""; 
            } else {
                row.style.display = "none"; 
            }
        });
    }

    //Open Popup 
    addTaskBtn.addEventListener('click', () => {
        document.getElementById('popup-form').style.display = 'flex';
    });
    
    // Close popup 
    document.getElementById('close-popup').addEventListener('click', () => {
        document.getElementById('popup-form').style.display = 'none';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const notificationIcon = document.getElementById("notification-icon");
    const profileIcon = document.getElementById("profile-icon");
    const notificationCount = document.getElementById("notification-count");

    // Create dropdowns
    const notificationDropdown = document.createElement("div");
    notificationDropdown.className = "dropdown";
    notificationDropdown.innerHTML = `
        <ul>
            <li>No new notifications</li>
        </ul>
    `;
    notificationIcon.appendChild(notificationDropdown);

    // Toggle dropdowns
    notificationIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        notificationDropdown.classList.toggle("active");
        profileDropdown.classList.remove("active");
    });

    // Close dropdowns 
    document.addEventListener("click", function () {
        notificationDropdown.classList.remove("active");
        profileDropdown.classList.remove("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebarClose = document.getElementById("sidebar-close");

    // Toggle sidebar visibility
    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    // Close sidebar
    sidebarClose.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });

    // Close sidebar 
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const taskReportBtn = document.getElementById("task-report-btn");
    const popupForm = document.getElementById("popup-form");
    const closePopup = document.getElementById("close-popup");
    const taskForm = document.getElementById("task-form");

    // Show popup 
    taskReportBtn.addEventListener("click", function () {
        popupForm.style.display = "flex";
    });

    // Close popup 
    closePopup.addEventListener("click", function () {
        popupForm.style.display = "none";
    });

    });

//Signup
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const errorMessage = document.getElementById("errorMessage");

    if (!signupForm) {
        console.error("Signup form not found!");
        return;
    }

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const emp_id = document.getElementById("emp_id").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!name || !emp_id || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.style.display = "block";
            return;
        } else {
            errorMessage.style.display = "none";
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, emp_id, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                window.location.href = result.redirect;  
            } else {
                alert(result.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});

//Toggle button
function togglePasswordVisibility(id) {
    const passwordField = document.getElementById(id);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

//login
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const emp_id = document.getElementById("emp_id").value.trim(); 
    const password = document.getElementById("password").value.trim();

    console.log("Sending data:", { emp_id, password }); 

    try {
        const response = await fetch("http://localhost:3000/login", { 
            method: "POST",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ emp_id, password }),
        });

        console.log("Response status:", response.status); 

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            sessionStorage.setItem("isAdmin", data.isAdmin);
            window.location.href = data.isAdmin ? "/admin" : "/user";
        } else {
            alert(data.message); 
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while logging in.");
    }
});
