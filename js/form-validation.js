// Contact Form Validation for FitX Gym Website

// Helper functions for form validation
function displayError(inputElement, message) {
    // Create error message element if it doesn't exist
    let errorElement = inputElement.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
    
    // Set error message and highlight input
    errorElement.textContent = message;
    inputElement.classList.add('error');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Allow various phone formats
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact-form');
  if(!form) return;
  form.addEventListener('submit', function(e) {
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(input => {
      if(input.hasAttribute('required') && !input.value.trim()) {
        valid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    if(!valid) {
      e.preventDefault();
      // Show error message
      const errorMsg = form.querySelector('.form-error');
      if(errorMsg) errorMsg.style.display = 'block';
    }
  });

// Membership Inquiry Form Validation
const membershipForm = document.getElementById('membership-inquiry-form');

if (membershipForm) {
    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById('membership-name');
        const email = document.getElementById('membership-email');
        const phone = document.getElementById('membership-phone');
        const plan = document.getElementById('membership-plan');
        const startDate = document.getElementById('membership-start-date');
        
        // Reset previous error messages
        const errorElements = membershipForm.querySelectorAll('.error-message');
        errorElements.forEach(element => element.textContent = '');
        
        // Validate Name
        if (!name.value.trim()) {
            displayError(name, 'Name is required');
            isValid = false;
        }
        
        // Validate Email
        if (!validateEmail(email.value)) {
            displayError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        if (!validatePhone(phone.value)) {
            displayError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate Membership Plan
        if (plan.value === '') {
            displayError(plan, 'Please select a membership plan');
            isValid = false;
        }
        
        // Validate Start Date
        if (!startDate.value) {
            displayError(startDate, 'Please select a start date');
            isValid = false;
        } else {
            const selectedDate = new Date(startDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                displayError(startDate, 'Please select a future date');
                isValid = false;
            }
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your membership inquiry has been submitted successfully!';
            
            // Clear form
            membershipForm.reset();
            
            // Add success message
            const formControls = membershipForm.querySelector('.form-controls');
            formControls.appendChild(successMessage);
            
            // Remove success message after 3 seconds and close modal
            setTimeout(() => {
                successMessage.remove();
                // Close modal
                const modal = document.getElementById('membership-modal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }, 3000);
        }
    });
}
});
