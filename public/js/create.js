document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const tableBody = document.querySelector("tbody");

    if (!taskForm || !tableBody) return; 

    function fetchCreates() {
        fetch("/api/creates")
            .then(response => response.json())
            .then(creates => {
                if (!Array.isArray(creates)) {
                    console.error("API did not return an array:", creates);
                    return;
                }
                tableBody.innerHTML = "";
                creates.forEach((create, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${create.emp_id}</td>
                        <td>${create.name}</td>
                        <td>********</td>  <!-- Mask password -->
                        <td>
                            <button class="delete-btn" data-id="${create._id}">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
    
                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        const id = this.dataset.id;
                        deleteCreate(id);
                    });
                });
            })
            .catch(error => console.error("Error fetching creates:", error));
    }
    
    function deleteCreate(id) {
        if (!confirm("Are you sure you want to delete this record?")) return;

        fetch(`/api/creates/${id}`, {
            method: "DELETE",
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete record");
            return response.json();
        })
        .then(() => {
            fetchCreates(); 
        })
        .catch(error => console.error("Error deleting create:", error));
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emp_id = document.getElementById("emp_id").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;

        const createData = { emp_id, name, password };

        let url = "/api/creates";
        let method = "POST";

        if (taskForm.dataset.id) {
            url = `/api/creates/${taskForm.dataset.id}`;
            method = "PUT";
        }

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createData),
        })
        .then(response => response.json())
        .then(() => {
            fetchCreates();
            document.getElementById("popup-form").style.display = "none";
            taskForm.reset();
            delete taskForm.dataset.id;
        })
        .catch(error => console.error("Error saving create:", error));
    });

    fetchCreates();
});
