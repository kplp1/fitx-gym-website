// Core JS for FitX Gym Website
// Navigation, smooth scroll, mobile menu, modals, scroll-based effects

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  hamburger.addEventListener('click', function() {
    const expanded = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });
  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Sticky nav background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if(window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function() {
    if(window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Membership Modal
const choosePlanBtns = document.querySelectorAll('.choose-plan-btn');
const membershipModal = document.getElementById('membership-modal');
const closeMembershipModal = document.getElementById('close-membership-modal');

if (choosePlanBtns.length > 0 && membershipModal && closeMembershipModal) {
    choosePlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            membershipModal.style.display = 'flex';
            membershipModal.focus();
            document.body.style.overflow = 'hidden';
            
            // Get the plan from the button's parent card
            const card = btn.closest('.membership-card');
            const planTitle = card.querySelector('h3').textContent;
            const planSelect = document.getElementById('membership-plan');
            
            // Select the corresponding option in the dropdown
            for (let i = 0; i < planSelect.options.length; i++) {
                if (planSelect.options[i].text.includes(planTitle)) {
                    planSelect.selectedIndex = i;
                    break;
                }
            }
        });
    });

    closeMembershipModal.addEventListener('click', () => {
        membershipModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    membershipModal.addEventListener('click', (e) => {
        if (e.target === membershipModal) {
            membershipModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            membershipModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

  // Membership Plan Tabs
  const planTabs = document.querySelectorAll('.plan-tab');
  const gymOnlyContent = `
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="150">
        <div class="membership-header">
            <h3>1 Month</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">2,000</span>
                <span class="period">/month</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Weight training access</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="200">
        <div class="membership-header">
            <h3>3 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">5,500</span>
                <span class="period">/3 months</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Weight training access</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> 1 free personal training session</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card best-value fade-in" data-aos="fade-up" data-aos-delay="250">
        <div class="best-value-tag">Best Value</div>
        <div class="membership-header">
            <h3>6 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">10,000</span>
                <span class="period">/6 months</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Weight training access</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> 3 free personal training sessions</li>
                <li><i class="fas fa-check"></i> Nutrition guidance</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="300">
        <div class="membership-header">
            <h3>12 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">18,000</span>
                <span class="period">/year</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Weight training access</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> 5 free personal training sessions</li>
                <li><i class="fas fa-check"></i> Nutrition guidance</li>
                <li><i class="fas fa-check"></i> Guest passes (2/month)</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
  `;
  
  const gymCardioContent = `
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="150">
        <div class="membership-header">
            <h3>1 Month</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">3,000</span>
                <span class="period">/month</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Full gym access</li>
                <li><i class="fas fa-check"></i> Cardio machines</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="200">
        <div class="membership-header">
            <h3>3 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">8,000</span>
                <span class="period">/3 months</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Full gym access</li>
                <li><i class="fas fa-check"></i> Cardio machines</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> 1 free personal training session</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card best-value fade-in" data-aos="fade-up" data-aos-delay="250">
        <div class="best-value-tag">Best Value</div>
        <div class="membership-header">
            <h3>6 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">15,000</span>
                <span class="period">/6 months</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Full gym access</li>
                <li><i class="fas fa-check"></i> Cardio machines</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> 3 free personal training sessions</li>
                <li><i class="fas fa-check"></i> Nutrition guidance</li>
                <li><i class="fas fa-check"></i> Group classes access</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="300">
        <div class="membership-header">
            <h3>12 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">28,000</span>
                <span class="period">/year</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Full gym access</li>
                <li><i class="fas fa-check"></i> Cardio machines</li>
                <li><i class="fas fa-check"></i> Strength equipment</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> 5 free personal training sessions</li>
                <li><i class="fas fa-check"></i> Nutrition guidance</li>
                <li><i class="fas fa-check"></i> Group classes access</li>
                <li><i class="fas fa-check"></i> Guest passes (2/month)</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
  `;
  
  const cardioOnlyContent = `
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="150">
        <div class="membership-header">
            <h3>1 Month</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">1,500</span>
                <span class="period">/month</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Cardio zone access</li>
                <li><i class="fas fa-check"></i> Treadmills & ellipticals</li>
                <li><i class="fas fa-check"></i> Stationary bikes</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="200">
        <div class="membership-header">
            <h3>3 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">4,000</span>
                <span class="period">/3 months</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Cardio zone access</li>
                <li><i class="fas fa-check"></i> Treadmills & ellipticals</li>
                <li><i class="fas fa-check"></i> Stationary bikes</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> Heart rate monitoring</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card best-value fade-in" data-aos="fade-up" data-aos-delay="250">
        <div class="best-value-tag">Best Value</div>
        <div class="membership-header">
            <h3>6 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">7,500</span>
                <span class="period">/6 months</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Cardio zone access</li>
                <li><i class="fas fa-check"></i> Treadmills & ellipticals</li>
                <li><i class="fas fa-check"></i> Stationary bikes</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> Heart rate monitoring</li>
                <li><i class="fas fa-check"></i> Cardio classes access</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
    
    <div class="membership-card fade-in" data-aos="fade-up" data-aos-delay="300">
        <div class="membership-header">
            <h3>12 Months</h3>
            <div class="membership-price">
                <span class="currency">Rs.</span>
                <span class="amount">14,000</span>
                <span class="period">/year</span>
            </div>
        </div>
        <div class="membership-features">
            <ul>
                <li><i class="fas fa-check"></i> Cardio zone access</li>
                <li><i class="fas fa-check"></i> Treadmills & ellipticals</li>
                <li><i class="fas fa-check"></i> Stationary bikes</li>
                <li><i class="fas fa-check"></i> Locker facility</li>
                <li><i class="fas fa-check"></i> Basic fitness consultation</li>
                <li><i class="fas fa-check"></i> Heart rate monitoring</li>
                <li><i class="fas fa-check"></i> Cardio classes access</li>
                <li><i class="fas fa-check"></i> Nutrition guidance</li>
            </ul>
        </div>
        <a href="#contact" class="choose-plan-btn">Choose Plan</a>
    </div>
  `;
  
  if (planTabs.length > 0) {
    const membershipCards = document.querySelector('.membership-cards');
    
    // Set initial content
    if (membershipCards) {
      // Store original content as gym only content
      
      // Add click event to tabs
      planTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          planTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Update content based on selected tab
          if (index === 0) { // Gym Only
            membershipCards.innerHTML = gymOnlyContent;
          } else if (index === 1) { // Gym + Cardio
            membershipCards.innerHTML = gymCardioContent;
          } else if (index === 2) { // Cardio Only
            membershipCards.innerHTML = cardioOnlyContent;
          }
          
          // Reinitialize choose plan buttons
          initChoosePlanButtons();
        });
      });
    }
  }
  
  // Function to initialize choose plan buttons
  function initChoosePlanButtons() {
    const choosePlanBtns = document.querySelectorAll('.choose-plan-btn');
    const membershipModal = document.getElementById('membership-modal');
    const closeMembershipModal = document.getElementById('close-membership-modal');
    
    if (choosePlanBtns.length > 0 && membershipModal && closeMembershipModal) {
      choosePlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          membershipModal.style.display = 'flex';
          membershipModal.focus();
          document.body.style.overflow = 'hidden';
          
          // Get the plan from the button's parent card
          const card = btn.closest('.membership-card');
          const planTitle = card.querySelector('h3').textContent;
          const planSelect = document.getElementById('membership-plan');
          
          // Select the corresponding option in the dropdown
          if (planSelect && planSelect.options) {
            for (let i = 0; i < planSelect.options.length; i++) {
              if (planSelect.options[i].text.includes(planTitle)) {
                planSelect.selectedIndex = i;
                break;
              }
            }
          }
        });
      });
    }
  }
  
  // Gallery lightbox (simple)
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
      const src = this.src;
      const alt = this.alt;
      const lightbox = document.createElement('div');
      lightbox.className = 'modal';
      lightbox.innerHTML = `<div class='modal-content' style='max-width:700px'><button class='modal-close' aria-label='Close'>&times;</button><img src='${src}' alt='${alt}' style='width:100%;border-radius:10px;'><div style='margin-top:1em;text-align:center;color:#DC2626;font-weight:600;'>${alt}</div></div>`;
      document.body.appendChild(lightbox);
      lightbox.querySelector('.modal-close').onclick = () => document.body.removeChild(lightbox);
      lightbox.onclick = e => { if(e.target === lightbox) document.body.removeChild(lightbox); };
      document.addEventListener('keydown', function esc(e) { if(e.key === 'Escape') { document.body.removeChild(lightbox); document.removeEventListener('keydown', esc); } });
    });
  });
});

// Inspiring gym quotes for hero section
const heroQuotes = [
  "The only bad workout is the one you didn’t do.",
  "Push yourself, because no one else is going to do it for you.",
  "Sweat is just fat crying.",
  "Success starts with self-discipline.",
  "Stronger than yesterday."
];

function setRandomHeroQuote() {
  const quoteEl = document.getElementById('hero-quote');
  if (quoteEl) {
    const idx = Math.floor(Math.random() * heroQuotes.length);
    quoteEl.textContent = heroQuotes[idx];
  }
}
setRandomHeroQuote();
