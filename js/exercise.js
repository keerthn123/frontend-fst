document.addEventListener("DOMContentLoaded", () => {
    const exerciseForm = document.getElementById("exerciseForm");

    // Function to fetch exercise suggestions from an API or backend
    async function fetchExerciseSuggestions(goal) {
        try {
            const response = await fetch(`/api/exercise-suggestions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ goal }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch exercise suggestions");
            }

            const data = await response.json();
            return data.exercises; // Assuming the backend returns a list of exercises
        } catch (error) {
            console.error(error.message);
            alert("Unable to fetch exercise suggestions. Please try again later.");
            return [];
        }
    }

    // Function to display exercise suggestions
    function displayExercises(exercises) {
        const resultsDiv = document.getElementById("exerciseResults");
        resultsDiv.innerHTML = ""; // Clear previous results

        if (exercises.length === 0) {
            resultsDiv.innerHTML = "<p>No exercises found. Try adjusting your input.</p>";
            return;
        }

        const list = document.createElement("ul");
        exercises.forEach((exercise) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${exercise.name} - ${exercise.duration} minutes`;
            list.appendChild(listItem);
        });
        resultsDiv.appendChild(list);
    }

    // Form submit handler
    exerciseForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const goal = document.getElementById("goal").value;

        if (!goal) {
            alert("Please select a fitness goal.");
            return;
        }

        const exercises = await fetchExerciseSuggestions(goal);
        displayExercises(exercises);
    });
});
