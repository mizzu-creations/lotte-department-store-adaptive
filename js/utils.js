function setScale(elem, duration, scale) {
  gsap.to(elem, duration, {
    scale: scale,
  });
}

export { setScale };
