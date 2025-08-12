
function placeOrder(item) {
    return new Promise((resolve, reject) => {
        console.log(`Placing order for: ${item}`);

        setTimeout(() => {
            const success = Math.random() > 0.5;

            if (success) {
                resolve(`Your ${item} is ready`);
            } else {
                reject(`Sorry, ${item} order failed.`);
            }
        }, 2000);
    });
}

placeOrder("Pizza")
    .then((message) => console.log(message)) 
    .catch((error) => console.log(error));   
