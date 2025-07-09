document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); 
    const name = document.getElementById('name').value;
    alert(`Thank you, ${name}, your message has been sent!`);
    
    document.querySelector('form').reset();
});
