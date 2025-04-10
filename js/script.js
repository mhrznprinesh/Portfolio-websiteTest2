// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Start typing animation
    initTypingAnimation();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup scroll events
    setupScrollEvents();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  });
  
  // Typing Animation
  function initTypingAnimation() {
    const typingTexts = [
      "Civil Engineer",
      "GIS Analyst",
      "Freelancer",
    ];
  
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
  
    function type() {
      const currentText = typingTexts[currentTextIndex];
      
      if (isDeleting) {
        // Deleting characters
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, 50);
        }
      } else {
        // Typing characters
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(type, 1500);
        } else {
          setTimeout(type, 150);
        }
      }
    }
  
    // Start typing after a brief delay
    setTimeout(type, 1000);
  }
  
  // Mobile Menu Toggle
  function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
  
  // Scroll Events
  function setupScrollEvents() {
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Back to top button
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Scroll certificates horizontally
function scrollCertificates(direction) {
  const container = document.getElementById('certificates-container');
  const scrollAmount = 220; // Amount to scroll
  container.scrollLeft += direction * scrollAmount;
  
  // Update button states after scrolling
  updateScrollButtons();
}

// Update scroll button states based on scroll position
function scrollCertificates(direction) {
  const container = document.getElementById('certificates-container');
  const scrollAmount = container.clientWidth * 0.8;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Replace existing certifications JavaScript with this
let currentScroll = 0;
const container = document.getElementById('certificatesContainer');

function scrollNext() {
  const maxScroll = container.scrollWidth - container.clientWidth;
  currentScroll += container.clientWidth;
  
  if (currentScroll > maxScroll) {
    currentScroll = maxScroll;
  }
  
  container.scrollTo({
    left: currentScroll,
    behavior: 'smooth'
  });
}

function scrollPrev() {
  currentScroll -= container.clientWidth;
  
  if (currentScroll < 0) {
    currentScroll = 0;
  }
  
  container.scrollTo({
    left: currentScroll,
    behavior: 'smooth'
  });
}

// Handle window resize
window.addEventListener('resize', () => {
  currentScroll = 0;
  container.scrollTo({
    left: 0,
    behavior: 'auto'
  });
});

// Open certificate in a modal
function openCertificate(certificate) {
  const modal = document.getElementById('certificate-modal');
  const certificateImage = document.getElementById('certificate-img');
  certificateImage.src = certificate;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent page scrolling
}

// Add hover effect
document.querySelectorAll('.certificate').forEach(cert => {
  cert.addEventListener('mouseover', () => {
    cert.style.transform = 'translateY(-5px)';
  });
  cert.addEventListener('mouseout', () => {
    cert.style.transform = 'translateY(0)';
  });
});

// Close certificate modal
function closeCertificate(event) {
  // Only close if clicking directly on modal or close button
  if (!event || event.target === document.getElementById('certificate-modal') || 
      event.target.classList.contains('close')) {
    const modal = document.getElementById('certificate-modal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable page scrolling
  }
}

// Initialize scroll buttons on load
document.addEventListener('DOMContentLoaded', function() {
  updateScrollButtons();
  
  // Also update buttons when user scrolls manually
  const container = document.getElementById('certificates-container');
  container.addEventListener('scroll', updateScrollButtons);
});