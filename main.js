const typed = new Typed('#typed', {
  strings: ['Software Engineer', 'Machine Learning Engineer', 'Systems Engineer'],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true
});

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

const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your message!');
  form.reset();
});

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, header');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
    
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && 
      rect.bottom >= 0
    );
    
    if (isVisible && !skillsSection.classList.contains('animated')) {
      animateSkillBars();
      skillsSection.classList.add('animated');
    }
  }
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

function animateSkillBars() {
  console.log('Animating skill bars');
  const skillBars = document.querySelectorAll('.skill .bar div');
  
  skillBars.forEach((bar, index) => {
    
    if (!bar.getAttribute('data-width')) {
      const targetWidth = bar.style.width;
      bar.setAttribute('data-width', targetWidth);
    }
    
    bar.style.width = '0';
    
    
    void bar.offsetWidth;
    
    setTimeout(() => {
      requestAnimationFrame(() => {
        bar.style.width = bar.getAttribute('data-width');
      });
    }, index * 150); 
  });
}

const themeToggle = document.getElementById('theme-switch');
const body = document.body;

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  // Check if OS prefers dark mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme to document
const applyTheme = (theme) => {
  body.classList.add('theme-transition');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.checked = true;
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.checked = false;
  }
  setTimeout(() => {
    body.classList.remove('theme-transition');
  }, 300);
};

// Set initial theme
const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

// Handle theme toggle
themeToggle.addEventListener('change', function() {
  const newTheme = this.checked ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
  }
});
