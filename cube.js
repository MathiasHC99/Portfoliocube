const cube = document.getElementById('cube');
let isDragging = false;
let startX, startY;
let currentX = 0;
let currentY = 0;

// Mouse events
cube.addEventListener('mousedown', startDrag);
window.addEventListener('mouseup', stopDrag);
window.addEventListener('mousemove', onDrag);

// Touch events
cube.addEventListener('touchstart', startTouch);
window.addEventListener('touchend', stopTouch);
window.addEventListener('touchmove', onTouchMove);

// Function to handle the start of dragging (mouse click event)
function startDrag(e) {
    isDragging = true;
    startX = e.pageX;
    startY = e.pageY;
}

// Function to handle the start of touching (mobile touch event)
function startTouch(e) {
    isDragging = true;
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
}

// Function to stop dragging (mouse)
function stopDrag() {
    isDragging = false;
}

// Function to stop touching (mobile touch)
function stopTouch() {
    isDragging = false;
}

// Function to handle dragging movement (mouse)
function onDrag(e) {
    if (!isDragging) return;

    // Calculate the amount of dragging
    let deltaX = e.pageX - startX;
    let deltaY = e.pageY - startY;

    // Update the current rotation
    currentX -= deltaY * 0.5;
    currentY += deltaX * 0.5;

    // Apply transformation
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    // Update start positions
    startX = e.pageX;
    startY = e.pageY;
}

// Function to handle touch movement (mobile touch)
function onTouchMove(e) {
    if (!isDragging) return;

    // Calculate the amount of touch movement
    let deltaX = e.touches[0].pageX - startX;
    let deltaY = e.touches[0].pageY - startY;

    // Update the current rotation
    currentX -= deltaY * 0.5;
    currentY += deltaX * 0.5;

    // Apply transformation
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    // Update start positions
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
}




/* Party mode toggle */
const partyToggleButton = document.getElementById('partyToggle');
const themeToggleButton = document.getElementById('themeToggle');
const body = document.body;
let partyActive = false; // Track whether party mode is active or not
let partyInterval; // Store interval ID for color changes

// Function to generate a random color
// inspired by article on stackoverflow
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to change all cube face colors, shadow, and border to the same random color
function changeCubeColors() {
    const randomColor = getRandomColor();
    const faces = document.querySelectorAll('.face');
    faces.forEach(face => {
        face.style.backgroundColor = randomColor; //
        face.style.boxShadow = `0 0 20px ${randomColor}`; // Apply the same color to shadows
        face.style.border = `2px solid ${randomColor}`; // Apply the same color to the borders
    });
}

// Party mode toggle
partyToggleButton.addEventListener('click', () => {
    partyActive = !partyActive;
    if (partyActive) {
        partyToggleButton.textContent = 'Stop party';
        startPartyMode();
    } else {
        partyToggleButton.textContent = 'Party mode';
        stopPartyMode();
    }
});

function startPartyMode() {
    changeCubeColors();
    partyInterval = setInterval(changeCubeColors, 2000); // Change color every 2 sec (to match the fade duration)
}

function stopPartyMode() {
    clearInterval(partyInterval); // Stop color changes
    resetCubeColors(); // Reset the cube colors based on the current mode (dark or light)
}

// Function to reset the cube faces to the original colors based on the current theme
// I gotta update this and make it more smooth and separate css and js
function resetCubeColors() {
    const faces = document.querySelectorAll('.face');
    if (body.classList.contains('darkMode')) {
        faces.forEach(face => {
            face.style.backgroundColor = '#404040'; // Dark mode color
            face.style.boxShadow = '0 0 20px #000000'; // Dark mode shadow
            face.style.border = '2px solid #000000'; // Dark mode border
        });
    } else {
        faces.forEach(face => {
            face.style.backgroundColor = '#088395'; // Light mode color
            face.style.boxShadow = '0 0 20px #37B7C3'; // Light mode shadow
            face.style.border = '2px solid #37B7C3'; // Light mode border
        });
    }
}

// Dark mode toggle
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('darkMode');
    themeToggleButton.textContent = body.classList.contains('darkMode') ? 'Light mode' : 'Dark mode';
    if (!partyActive) {
        resetCubeColors();
    }
});

