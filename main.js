// Typed.js on hero
const typed = new Typed('#typed', {
  strings: ['Software Engineer', 'Machine Learning Engineer', 'Systems Engineer'],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true
});

// Modal functionality
const buttons = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.target).style.display = 'flex';
  });
});
closes.forEach(x => {
  x.addEventListener('click', () => {
    x.closest('.modal').style.display = 'none';
  });
});
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Contact form submit
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your message!');
  form.reset();
});