// Mobile menu toggle (handled by component loader)
// This functionality is now managed by assets/components.js

// Theme Toggle Functionality
const initThemeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  // Check for saved theme preference or use default dark theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation class
    themeToggle.classList.add('theme-toggle-animation');
    setTimeout(() => {
      themeToggle.classList.remove('theme-toggle-animation');
    }, 500);
  });
};

// Project tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Show corresponding content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Clipboard functionality for package installation commands
const copyButtons = document.querySelectorAll('.copy-btn');
if (copyButtons.length > 0) {
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.getAttribute('data-clipboard-text');
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show copied feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = 'var(--success)';

        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = '';
        }, 2000);
      });
    });
  });
}

// Navbar scroll effect (handled by component loader)
// This functionality is now managed by assets/components.js

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .slide-in');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
};

// Scroll to top button functionality (handled by component loader)
// This functionality is now managed by assets/components.js

// Update copyright year in footer (handled by component loader)
// This functionality is now managed by assets/components.js

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Typing animation for hero section
const initTypingAnimation = () => {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const skills = [
    'React/Node.js Developer',
    'Python Developer',
    'Machine Learning Engineer',
    'Generative AI Specialist',
    'API Developer',
    'Web Scraping Expert',
    'Multi-Agent AI Developer',
    'Prompt Engineering Specialist'
  ];
  
  let currentSkillIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  const type = () => {
    const currentSkill = skills[currentSkillIndex];
    
    if (isDeleting) {
      // Deleting text
      typingElement.textContent = currentSkill.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      typingElement.textContent = currentSkill.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100; // Normal speed when typing
    }
    
    // If finished typing the current skill
    if (!isDeleting && currentCharIndex === currentSkill.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end of typing
    } 
    // If finished deleting the current skill
    else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentSkillIndex = (currentSkillIndex + 1) % skills.length; // Move to next skill
      typingSpeed = 500; // Pause before typing next skill
    }
    
    setTimeout(type, typingSpeed);
  };
  
  // Start the typing animation
  setTimeout(type, 1000);
};

// Initialize typing animation on page load
window.addEventListener('load', initTypingAnimation);
