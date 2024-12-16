document.addEventListener("DOMContentLoaded", () => {
    const mealForm = document.getElementById("mealForm");

    // Function to fetch meal suggestions from an API or backend
    async function fetchMealSuggestions(mealType, calories) {
        try {
            const response = await fetch(`/api/meal-planner`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mealType, calories }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch meal suggestions");
            }

            const data = await response.json();
            return data.meals; // Assuming the backend returns a list of meals
        } catch (error) {
            console.error(error.message);
            alert("Unable to fetch meal suggestions. Please try again later.");
            return [];
        }
    }

    // Function to display meal suggestions
    function displayMeals(meals) {
        const resultsDiv = document.getElementById("mealResults");
        resultsDiv.innerHTML = ""; // Clear previous results

        if (meals.length === 0) {
            resultsDiv.innerHTML = "<p>No meals found. Try adjusting your input.</p>";
            return;
        }

        const list = document.createElement("ul");
        meals.forEach((meal) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${meal.name} - ${meal.calories} kcal`;
            list.appendChild(listItem);
        });
        resultsDiv.appendChild(list);
    }

    // Form submit handler
    mealForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const mealType = document.getElementById("mealType").value;
        const calories = parseInt(document.getElementById("calories").value, 10);

        if (!mealType || isNaN(calories) || calories <= 0) {
            alert("Please provide valid meal type and calorie target.");
            return;
        }

        const meals = await fetchMealSuggestions(mealType, calories);
        displayMeals(meals);
    });
});
