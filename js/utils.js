function setScale(elem, duration, scale) {
  gsap.to(elem, duration, {
    scale: scale,
  });
}

function returnCurrentElement(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const elementAtMouse = document.elementFromPoint(mouseX, mouseY);
  return elementAtMouse;
}

export { setScale, returnCurrentElement };
