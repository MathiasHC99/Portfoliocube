const cube = document.getElementById('cube');
let isDragging = false;
let startX, startY;
let currentX = 0;
let currentY = 0;

// Event listeners for mouse interactions
cube.addEventListener('mousedown', startDrag);
window.addEventListener('mouseup', stopDrag);
window.addEventListener('mousemove', onDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.pageX;
    startY = e.pageY;
}

function stopDrag() {
    isDragging = false;
}

function onDrag(e) {
    if (!isDragging) return;

    // Calculate how much the mouse has moved
    let deltaX = e.pageX - startX;
    let deltaY = e.pageY - startY;

    // Update cube rotation based on mouse movement
    currentX -= deltaY * 0.5; // Rotates following the mouse direction
    currentY += deltaX * 0.5;

    // Apply the rotation to the cube
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    // Update the starting position for the next movement
    startX = e.pageX;
    startY = e.pageY;
}
