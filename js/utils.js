function setScale(elem, scale) {
  gsap.to(elem, 0.4, {
    scale: scale,
  });
}

export { setScale };
