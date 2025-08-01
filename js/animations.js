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
    const target = +counter.getAttribute('data-count');
    let count = 0;

    const updateCount = () => {
      if(target <= 20) {
        // For small numbers like 10, count one by one slowly
        if(count < target) {
          count++;
          counter.innerText = count;
          setTimeout(updateCount, 200); // 200ms delay between each number
        }
      } else {
        // For larger numbers like 500, use the faster animation
        const speed = 30;
        let currentCount = +counter.innerText;
        if(currentCount < target) {
          counter.innerText = Math.ceil(currentCount + (target - currentCount) / speed);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      }
    };

    if(counter) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            counter.innerText = '0'; // Start from 0
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
