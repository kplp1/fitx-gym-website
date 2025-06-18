// Animation Handlers for FitX Gym Website
// Intersection Observer, counters, carousel/slider

document.addEventListener('DOMContentLoaded', function() {
  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in, .slide-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  fadeEls.forEach(el => observer.observe(el));

  // Animated counters in hero
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const speed = 30;
      let count = +counter.innerText;
      if(count < target) {
        counter.innerText = Math.ceil(count + (target - count) / speed);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    if(counter) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            updateCount();
            observer.disconnect();
          }
        });
      }, { threshold: 0.7 });
      observer.observe(counter);
    }
  });

  // Testimonials carousel
  let currentTestimonial = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  
  function showTestimonial(idx) {
    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }
  
  if(slides.length) {
    showTestimonial(currentTestimonial);
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + slides.length) % slides.length;
      showTestimonial(currentTestimonial);
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % slides.length;
      showTestimonial(currentTestimonial);
    });
    
    // Dot navigation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentTestimonial = i;
        showTestimonial(currentTestimonial);
      });
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % slides.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }
});
