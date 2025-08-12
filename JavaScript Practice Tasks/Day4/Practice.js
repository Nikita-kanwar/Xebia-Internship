// setTimeout-based callback function

function greetUser(callback) {
    console.log("Preparing to greet the user");

    setTimeout(() => {
        console.log("Hello, Nikita");
        callback(); 
    }, 2000); 
}

greetUser(() => {
    console.log("This runs after the greeting is displayed.");
});

//  Create a promise that resolves after 2 sec
function waitTwoSeconds() {
    return new Promise((resolve) => {
        console.log("Waiting for 2 seconds");
        setTimeout(() => {
            resolve("Promise resolved after 2 seconds");
        }, 2000);
    });
}
waitTwoSeconds()
    .then((message) => console.log(message));

//  Handle an intentional error using try...catch
try {
    console.log("Starting the program");

    throw new Error("Something went wrong intentionally");

    console.log("This will not be printed.");
} catch (error) {
    console.log("Error caught:", error.message);
}
