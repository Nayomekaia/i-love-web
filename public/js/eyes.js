(() => {
    const svg = document.getElementById('eyes');
    if (!svg) return;
  
    const leftPupil  = document.getElementById('leftPupil');
    const rightPupil = document.getElementById('rightPupil');
  
    const leftCenter  = { x: 160, y: 219 };
    const rightCenter = { x: 662, y: 219 };
    const maxOffset = 20;
  
    svg.addEventListener('mousemove', (e) => {
      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      movePupil(leftPupil, leftCenter, mouseX, mouseY);
      movePupil(rightPupil, rightCenter, mouseX, mouseY);
    });
  
    function movePupil(eye, center, mouseX, mouseY) {
      const dx = mouseX - center.x;
      const dy = mouseY - center.y;
      const angle = Math.atan2(dy, dx);
      const offsetX = Math.cos(angle) * maxOffset;
      const offsetY = Math.sin(angle) * maxOffset;
  
      eye.setAttribute('cx', center.x + offsetX);
      eye.setAttribute('cy', center.y + offsetY);
    }
  })();
  