// Show loader initially
const loader = document.getElementById("loader");
const userList = document.getElementById("userList");

// Fetch user data from API
async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const users = await response.json();

        // Hide loader
        loader.style.display = "none";

        // Display user names in DOM
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name;
            userList.appendChild(li);
        });

    } catch (error) {
        loader.textContent = "Error loading users!";
        console.error(error);
    }
}

// Call function
fetchUsers();
