document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("add-task-btn");
    const popupForm = document.getElementById("task-popup-form");
    const closePopup = document.getElementById("close-task-popup");

    if (addTaskBtn && popupForm) {
        addTaskBtn.addEventListener("click", function () {
            popupForm.style.display = "flex";
        });
    } else {
        console.error("Add Task button or popup form not found!");
    }

    if (closePopup && popupForm) {
        closePopup.addEventListener("click", function () {
            popupForm.style.display = "none";
        });
    } else {
        console.error("Close popup button not found!");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const taskTableBody = document.getElementById("task-table-body");
    const popupForm = document.getElementById("task-popup-form");
    const closePopup = document.getElementById("close-task-popup");
    const addTaskBtn = document.getElementById("add-task-btn");

    let editingTaskId = null;

    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskTableBody.innerHTML = ""; 
                tasks.forEach((task, index) => {
                    addTaskRow(task, index + 1);
                });
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    function addTaskRow(task, index) {
        const row = document.createElement("tr");
        row.setAttribute("data-id", task._id);
        row.innerHTML = `
            <td>${index}</td>
            <td>${task.emp_id}</td>
            <td>${task.name}</td>
            <td>${task.work}</td>
            <td>${new Date(task.date).toDateString()}</td>
            <td>
                <button class="edit-btn" data-id="${task._id}">Edit</button>
                <button class="delete-btn" data-id="${task._id}">Delete</button>
            </td>
        `;
        taskTableBody.appendChild(row);
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emp_id = document.getElementById("task-emp-id").value;
        const name = document.getElementById("task-name").value;
        const work = document.getElementById("task-work").value;
        const date = document.getElementById("task-date").value;

        if (editingTaskId) {
            fetch(`/api/tasks/${editingTaskId}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emp_id, name, work, date })
            })
            .then(response => response.json())
            .then(updatedTask => {
                fetchTasks();
                taskForm.reset();
                popupForm.style.display = "none";
                editingTaskId = null;
            })
            .catch(error => console.error("Error updating task:", error));
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emp_id, name, work, date })
            })
            .then(response => response.json())
            .then(task => {
                addTaskRow(task, taskTableBody.children.length + 1);
                taskForm.reset();
                popupForm.style.display = "none";
            })
            .catch(error => console.error("Error adding task:", error));
        }
    });

    taskTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const taskId = event.target.getAttribute("data-id");
            fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(() => {
                    event.target.closest("tr").remove();
                })
                .catch(error => console.error("Error deleting task:", error));
        }

        if (event.target.classList.contains("edit-btn")) {
            const taskId = event.target.getAttribute("data-id");

            fetch(`/api/tasks`)
                .then(response => response.json())
                .then(tasks => {
                    const taskToEdit = tasks.find(task => task._id === taskId);
                    if (taskToEdit) {
                        document.getElementById("task-emp-id").value = taskToEdit.emp_id;
                        document.getElementById("task-name").value = taskToEdit.name;
                        document.getElementById("task-work").value = taskToEdit.work;
                        document.getElementById("task-date").value = taskToEdit.date.split("T")[0];

                        editingTaskId = taskId;
                        popupForm.style.display = "flex";
                    }
                })
                .catch(error => console.error("Error fetching task for edit:", error));
        }
    });

    closePopup.addEventListener("click", function () {
        popupForm.style.display = "none";
        taskForm.reset();
        editingTaskId = null;
    });

    addTaskBtn.addEventListener("click", function () {
        taskForm.reset();
        editingTaskId = null;
        popupForm.style.display = "flex";
    });

    fetchTasks();
});


document.addEventListener("DOMContentLoaded", () => {
    const adminInfoString = localStorage.getItem("adminInfo");

    if (!adminInfoString || adminInfoString === "undefined") {
        console.warn("User info not found or invalid!");
        return;
    }

    try {
        const adminInfo = JSON.parse(adminInfoString);
        if (adminInfo.name && adminInfo.emp_id) {
            document.getElementById("adminName").textContent = `Name: ${adminInfo.name}`;
            document.getElementById("adminId").textContent = `Emp ID: ${adminInfo.emp_id}`;
        } else {
            console.warn("Incomplete user data");
            localStorage.removeItem("adminInfo");
        }
    } catch (error) {
        console.error("Error parsing adminInfo:", error);
        localStorage.removeItem("adminInfo");
    }
});
