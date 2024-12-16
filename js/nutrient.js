document.addEventListener("DOMContentLoaded", () => {
    const nutrientForm = document.getElementById("nutrientForm");
    const chartCanvas = document.getElementById("nutrientChart");

    // Placeholder for the chart
    let nutrientChart;

    // Function to fetch nutrient data from API
    async function fetchNutrients(foodName, quantity) {
        try {
            const apiKey = 'YOUR_API_KEY'; // Replace with your API key
            const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${foodName}&app_id=YOUR_APP_ID&app_key=${apiKey}`);
            const data = await response.json();

            if (data.hints.length === 0) {
                throw new Error("Food not found in the database.");
            }

            const nutrients = data.hints[0].food.nutrients;
            return {
                protein: (nutrients.PROCNT || 0) * (quantity / 100),
                fat: (nutrients.FAT || 0) * (quantity / 100),
                carbs: (nutrients.CHOCDF || 0) * (quantity / 100),
                calories: (nutrients.ENERC_KCAL || 0) * (quantity / 100),
            };
        } catch (error) {
            console.error("Error fetching nutrients:", error);
            alert(error.message || "Unable to fetch nutrient data.");
            return null;
        }
    }

    // Function to update the chart
    function updateChart(data) {
        if (nutrientChart) {
            nutrientChart.destroy();
        }

        nutrientChart = new Chart(chartCanvas, {
            type: "pie",
            data: {
                labels: ["Protein (g)", "Fat (g)", "Carbs (g)", "Calories (kcal)"],
                datasets: [{
                    label: "Nutrient Breakdown",
                    data: [data.protein, data.fat, data.carbs, data.calories],
                    backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
                    borderColor: ["#388e3c", "#d32f2f", "#1976d2", "#f57c00"],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Nutrient Breakdown"
                    }
                }
            }
        });
    }

    // Form submit handler
    nutrientForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const foodName = document.getElementById("foodName").value;
        const quantity = parseFloat(document.getElementById("quantity").value);

        if (!foodName || isNaN(quantity) || quantity <= 0) {
            alert("Please provide valid food name and quantity.");
            return;
        }

        const nutrients = await fetchNutrients(foodName, quantity);
        if (nutrients) {
            updateChart(nutrients);
        }
    });
});
