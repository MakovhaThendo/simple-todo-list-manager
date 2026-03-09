
const input = document.getElementById("todoInput");
const form = document.getElementById("addForm");
const list = document.getElementById("todoList");

const API = "/todos";

/* Load tasks */
async function loadTasks() {
    try {
        const res = await fetch(API);
        const tasks = await res.json();

        list.innerHTML = "";

        tasks.forEach(task => {
            // task.completed does not exist yet, so show all tasks
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";

            const text = document.createElement("span");
            text.textContent = task.text;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("deleteBtn");

            deleteBtn.addEventListener("click", async () => {
                await deleteTask(task._id);
            });

            li.appendChild(text);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });

    } catch (err) {
        console.error("Error  loading tasks:", err);
    }
}

/*logic for adding my todo tasks*/
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim(); 

    if (!text) return;

    try {
        await fetch(API , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text }) 
        });

        input.value = "";

        loadTasks();

    } catch (err) {
        console.error(   "Error,Failed to add task:",  err);
    }
});

/*marking task complete by deleting it on frontend ui*/
async function deleteTask(id) {
    try {
        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        loadTasks();



    } catch (err) {
        console.error("Error,Failed to delete task:", err);
    }
}

/*here im loading the task*/
loadTasks();
