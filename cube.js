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

// Function to handle the start of dragging (mouse)
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

// Function to stop touching (mobile touch event)
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

// Function to handle touch movement (mobile)
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
