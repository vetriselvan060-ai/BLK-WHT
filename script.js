// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Smooth Scroll Navigation
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    if (navMenu.style.display === 'flex') {
      navMenu.style.display = 'none';
    }
  });
});

// Update Active Link on Scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Scroll Animation for Elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animations to cards
document.querySelectorAll('.service-card, .portfolio-item, .stat-card, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const subject = `Project Inquiry: ${projectType}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ACompany: ${company}%0D%0AProject Type: ${projectType}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    // Open email client
    window.location.href = `mailto:Vetriselvan060@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Show success message
    alert('Thank you! Your message will be sent to my email. I\'ll get back to you within 24 hours.');
    
    // Reset form
    contactForm.reset();
  });
}

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.transition = 'width 1s ease';
        entry.target.style.width = width;
      }, 100);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Scroll to top button functionality
const createScrollToTop = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #0066cc;
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 99;
    font-size: 1.5rem;
    font-weight: bold;
  `;
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    } else {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }
  });
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

createScrollToTop();

// Contact button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255,255,255,0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: rippleAnimation 0.6s ease-out;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnimation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Responsive menu
const handleResize = () => {
  if (window.innerWidth > 768) {
    navMenu.style.display = 'flex';
  } else {
    navMenu.style.display = 'none';
  }
};

window.addEventListener('resize', handleResize);
handleResize();

console.log('BLK-WHT Website Loaded Successfully!');
console.log('Ready to transform your CAD design projects into precision 3D models.');