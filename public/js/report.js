document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const tableBody = document.getElementById("table-body");

    // Submit form
    taskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const emp_id = document.getElementById("emp_id").value;
        const work = document.getElementById("work").value;
        const date = document.getElementById("date").value;
        const status = document.getElementById("status").value;

        try {
            const response = await fetch("http://localhost:3000/api/reports/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emp_id, work, date, status })
            });

            if (response.ok) {
                alert("Report added successfully!");
                taskForm.reset();
                fetchReports();  // Refresh table
            } else {
                alert("Failed to add report.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });

    // Fetch and display reports
    async function fetchReports() {
        try {
            const response = await fetch("http://localhost:3000/api/reports/all");
    
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
    
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Invalid JSON response");
            }
    
            const reports = await response.json();
            console.log("Received Reports:", reports);
    
            tableBody.innerHTML = "";
            reports.forEach((report, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${report.work}</td>
                    <td>${new Date(report.date).toLocaleDateString()}</td>
                    <td>${report.status}</td>
                    <td>
                        <button class="edit-btn" data-id="${report._id}">Edit</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }
    
    fetchReports(); // Load data on page load
});
