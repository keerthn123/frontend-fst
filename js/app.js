// Placeholder for future Django API integration
async function fetchData(endpoint, data = {}) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Example: Trigger form submission for login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const loginData = Object.fromEntries(formData.entries());
            const result = await fetchData('/login', loginData);
            alert(result.message || "Logged In!");
        });
    }
});
