// Task 1: Convert Promise to Async/Await version


function delayPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved after 2 seconds");
            
        }, 2000);
    });
}

delayPromise()
    .then(result => console.log("Promise Version:", result))
    .catch(error => console.error("Promise Version Error:", error));

// Async/Await version
async function delayAsyncAwait() {
    try {
        const result = await delayPromise();
        console.log("Async/Await Version:", result);
    } catch (error) {
        console.error("Async/Await Version Error:", error);
    }
}

delayAsyncAwait();


// Show fetched data in console
async function fetchUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const users = await response.json();

        console.log("\nUsers List:");
        users.forEach(user => {
            console.log(`Name: ${user.name} | Email: ${user.email}`);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

fetchUsers();
