async function loadHabits() {
    const response = await fetch("http://127.0.0.1:8000/api/habits/");
    const data = await response.json();
    const habitList = document.getElementById("habit-list");
        habitList.innerHTML = "";
        data.forEach(function(habit) {
            habitList.innerHTML += `<li>${habit.name}</li>`;
        });
}

loadHabits();


const habitForm = document.getElementById("habit-form");
const habitNameInput = document.getElementById("habit-name");

habitForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = habitNameInput.value;
    if (name.trim() === "") {
        alert("Please enter a habit name.");
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
        alert("Could not connect to the server.");
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

    const habitSelect = document.getElementById("entry-habit");
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


const entryForm = document.getElementById("entry-form");

entryForm.addEventListener("submit", async function(event) {

    event.preventDefault();
    const habitSelect = document.getElementById("entry-habit");
    if (habitSelect.value === "") {
    alert("Please select a habit.");
    return;
    }
    const completedInput = document.getElementById("entry-completed");
    const moodSelect = document.getElementById("entry-mood");
    const dateInput = document.getElementById("entry-date");

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
        alert("Could not connect to the server.");
        return;
    }
    if (!response.ok) {
        console.log("Server returned an error:", response.status);
        alert("Could not log the entry.");
        return;
  }

const data = await response.json();

console.log("STATUS:", response.status);
console.log("DJANGO RESPONSE:", JSON.stringify(data));
entryForm.reset();
loadEntries();
});
async function loadEntries() {
    const entryList = document.getElementById("entry-list");

    const entryLoading = document.getElementById("entry-loading");

    let response;

try {
    response = await fetch(
        "http://127.0.0.1:8000/api/entries/"
    );
} catch (error) {
    console.log("Request failed:", error);

    entryLoading.textContent = "Failed to load entries.";

    return;
}
if (!response.ok) {
    console.log("Server returned an error:", response.status);
    entryLoading.textContent = "Server returned an error.";

    return;
}

    const data = await response.json();

entryLoading.textContent = "Loading entries...";

    entryList.innerHTML = "";

    data.forEach(function(entry) {

        entryList.innerHTML += `
            <li>
                Habit ID: ${entry.habit} |
                Completed: ${entry.completed} |
                Mood: ${entry.mood}
                <button onclick="deleteEntry(${entry.id})">Delete</button>

            </li>
        `;

    });
    entryLoading.textContent = "";

}

loadEntries();
async function loadQuote() {

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/randomquote/"
        );

        if (!response.ok) {
            console.log("Server returned an error:", response.status);
            document.getElementById("quote-text").textContent =
                "Could not load quote.";
            return;
        }

        const data = await response.json();

        const quote = data[0];

        document.getElementById("quote-text").textContent =
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
        alert("Could not connect to the server.");
        return;
    }
    if (!response.ok) {
        console.log("Server returned an error:", response.status);
        alert("Could not delete the entry.");
        return;
    }
    console.log("Entry deleted successfully.");
    loadEntries();

    
}
