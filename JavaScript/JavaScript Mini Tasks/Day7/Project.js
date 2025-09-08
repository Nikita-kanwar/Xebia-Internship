//Add Event to Multiple Buttons Using Loop
    const loopButtons = document.querySelectorAll('#loop-buttons button');
    loopButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        console.log(`Button ${index + 1} clicked`);
      });
    });

    // Event Bubbling
    document.querySelector('.inner').addEventListener('click', () => {
      console.log('Inner clicked');
    });
    document.querySelector('.middle').addEventListener('click', () => {
      console.log('Middle clicked');
    });
    document.querySelector('.outer').addEventListener('click', () => {
      console.log('Outer clicked');
    });

    // Event Delegation
    document.getElementById('delegation-container').addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        alert(`You clicked ${e.target.textContent}`);
      }
    });
