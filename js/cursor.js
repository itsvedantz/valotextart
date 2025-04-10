document.addEventListener('DOMContentLoaded', function () {
  const follower = document.getElementById('cursorFollower');

  // Check if the element exists before proceeding
  if (follower) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isMouseMoving = false;
    let lastMoveTime = Date.now();

    const positionQueue = [];
    const queueSize = 26;

    function animate() {
      positionQueue.push({ x: mouseX, y: mouseY });

      if (positionQueue.length > queueSize) {
        const delayedPos = positionQueue.shift();
        currentX += (delayedPos.x - currentX) * 0.06;
        currentY += (delayedPos.y - currentY) * 0.06;

        const isGrown = follower.classList.contains('grow');
        const scale = isGrown ? 2 : 1;

        follower.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
      }

      if (Date.now() - lastMoveTime > 2000 && isMouseMoving) {
        follower.style.opacity = '0';
        isMouseMoving = false;
      }

      requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', e => {
      const offset = 10;
      mouseX = e.clientX - offset;
      mouseY = e.clientY - offset;

      lastMoveTime = Date.now();

      if (!isMouseMoving) {
        follower.style.opacity = '1'; // This should work now
        isMouseMoving = true;
      }
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target;

      // Apply grow effect for .copy-card, buttons, anchor tags, and their children
      if (
        target.closest('.copy-card') ||  // Check if the target or its parent has the .copy-card class
        (target.tagName === 'BUTTON' && target === e.target) ||   // Directly check if the target is a BUTTON and not its children
        (target.tagName === 'A' && target === e.target) ||        // For anchor tags
        target.getAttribute('role') === 'button' ||                // For accessibility buttons
        target.onclick !== null                                      // For elements with an onclick handler
      ) {
        follower.classList.add('grow');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;

      // Remove grow effect for .copy-card, buttons, anchor tags, and their children
      if (
        target.closest('.copy-card') ||  // Check if the target or its parent has the .copy-card class
        (target.tagName === 'BUTTON' && target === e.target) ||   // Directly check if the target is a BUTTON and not its children
        (target.tagName === 'A' && target === e.target) ||        // For anchor tags
        target.getAttribute('role') === 'button' ||                // For accessibility buttons
        target.onclick !== null                                      // For elements with an onclick handler
      ) {
        follower.classList.remove('grow');
      }
    });

    animate();
  } else {
    console.error('Cursor follower element not found.');
  }
});
