    // Store and retrieve user object in localStorage
    const user = {
      name: "Nikita",
      age: 25,
      email: "nikita@example.com"
    };

    localStorage.setItem("user", JSON.stringify(user));

    // Retrieve from 
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    console.log("Retrieved User:", parsedUser);

    // Clear item from storage
    // localStorage.removeItem("user")

    //  Parse a JSON string to object
    const jsonString = '{"name": "Alex", "age": 30}';
    const obj = JSON.parse(jsonString);
    console.log("Parsed JSON:", obj);
