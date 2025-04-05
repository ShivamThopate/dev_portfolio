// Optional: scroll-triggered fade animation
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
