async function loadHabits() {
    const response = await fetch("http://127.0.0.1:8000/api/habits/");
    const data = await response.json();
    const habitCount = document.getElementById("habitCount");
    habitCount.textContent = data.length;

    const habitList = document.getElementById("habitList");
        habitList.innerHTML = "";
        data.forEach(function(habit) {
            habitList.innerHTML += `<li>${habit.name}</li>`;
        });
}

loadHabits();


const habitForm = document.getElementById("habitForm");
const habitNameInput = document.getElementById("habitName");

habitForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = habitNameInput.value;
    if (name.trim() === "") {
        showMessage("Please enter a habit name.");
        return;
    }

    const habitData = {
        name: name
    };

    let response;

    try {
        response = await fetch(
            "http://127.0.0.1:8000/api/habits/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(habitData)
            }
        );
    } catch (error) {
        console.log("Request failed:", error);
        showMessage("Could not connect to the server.");
        return;
    }

    const data = await response.json();

    console.log(data);
    habitNameInput.value = "";
    loadHabits();
    loadHabitOptions();
});
async function loadHabitOptions() {

    const response = await fetch(
        "http://127.0.0.1:8000/api/habits/"
    );

    const data = await response.json();

    const habitSelect = document.getElementById("entryHabitSelect");
    habitSelect.innerHTML = `
        <option value="">Select a habit</option>
    `;

    data.forEach(function(habit) {

        habitSelect.innerHTML += `
            <option value="${habit.id}">
                ${habit.name}
            </option>
        `;

    });
}
loadHabitOptions();


const entryForm = document.getElementById("entryForm");

entryForm.addEventListener("submit", async function(event) {

    event.preventDefault();
    const habitSelect = document.getElementById("entryHabitSelect");
    if (habitSelect.value === "") {
    showMessage("Please select a habit.");
    return;
    }
    const completedInput = document.getElementById("entryCompleted");
    const moodSelect = document.querySelector('input[name="mood"]:checked');
    const dateInput = document.getElementById("entryDate");

    console.log(habitSelect.value);
    console.log(completedInput.checked);
    console.log(moodSelect.value);
    console.log(dateInput.value);

    const entryData = {
    habit: habitSelect.value,
    date: dateInput.value,
    completed: completedInput.checked,
    mood: moodSelect.value
    };
    let response;

    try {
        response = await fetch(
            "http://127.0.0.1:8000/api/entries/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(entryData)
            }
        );
    } catch (error) {
        console.log("Request failed:", error);
        showMessage("Could not connect to the server.");
        return;
    }
    if (!response.ok) {
        console.log("Server returned an error:", response.status);
        showMessage("Could not log the entry.");
        return;
  }

const data = await response.json();

console.log("STATUS:", response.status);
console.log("DJANGO RESPONSE:", JSON.stringify(data));
entryForm.reset();
loadEntries();
});
async function loadEntries() {
    const entryList = document.getElementById("recentEntriesBody");
    const emptyState = document.getElementById("entriesEmptyState");
    let response;

try {
    response = await fetch(
        "http://127.0.0.1:8000/api/entries/"
    );
} catch (error) {
    console.log("Request failed:", error);

    return;
}
if (!response.ok) {
    console.log("Server returned an error:", response.status);

    return;
}

    const data = await response.json();
    console.log("ENTRIES FROM API:", data);
    if (data.length === 0) {
        emptyState.hidden = false;
        entryList.innerHTML = "";
        return;
  }

    emptyState.hidden = true;

    entryList.innerHTML = "";

    data.forEach(function(entry) {

        entryList.innerHTML += `
            <tr>
                <td>${entry.habit}</td>
                <td>${entry.date}</td>
                <td>${entry.mood}</td>
                <td>${entry.completed ? "Completed" : "Not completed"}</td>
            
                <td><button onclick="deleteEntry(${entry.id})">Delete</button></td>
            </tr>
        `;

    });

}

loadEntries();
async function loadQuote() {

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/randomquote/"
        );

        if (!response.ok) {
            console.log("Server returned an error:", response.status);
            document.getElementById("quoteText").textContent =
                "Could not load quote.";
            return;
        }

        const data = await response.json();

        const quote = data[0];

        document.getElementById("quoteText").textContent =
            `"${quote.quote}"`;

    } catch (error) {

        console.log("Request failed:", error);

        document.getElementById("quote-text").textContent =
            "Could not connect to the server.";
    }
}

loadQuote();
setInterval(loadQuote, 60 * 60 * 1000);

async function deleteEntry(entryid) {
    const confirmed = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmed) {
        return;
    }
    let response;

    try {
        response = await fetch(
            `http://127.0.0.1:8000/api/entries/${entryid}/`,
            {
                method: "DELETE",
            }
        );
    } catch (error) {
        console.log("Request failed:", error);
        showMessage("Could not connect to the server.");
        return;
    }
    if (!response.ok) {
        console.log("Server returned an error:", response.status);
        showMessage("Could not delete the entry.");
        return;
    }
    console.log("Entry deleted successfully.");
    loadEntries();

    
}
function showMessage(message) {
    const messageBox = document.getElementById("messageBox");

    messageBox.textContent = message;
    messageBox.classList.add("show");

    setTimeout(function() {
        messageBox.classList.remove("show");
    }, 3000);
}