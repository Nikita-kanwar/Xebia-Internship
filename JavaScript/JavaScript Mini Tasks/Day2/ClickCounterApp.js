(function () {
    function createCounter() {
        let count = 0; 
        return function () {
            count++;
            document.getElementById("display").textContent = `Current Counter Value is ${count}`;
        };
    }

    const counter = createCounter();

    document.getElementById("value").onclick = counter;
})();