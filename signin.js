// Add some interactive effects
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Form validation
const emailForm = document.getElementById("emailForm");
if (emailForm) {
  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
      alert(`Continuing with email: ${email}`);
    }
  });
}

// SSO Button click handler
const ssoButton = document.getElementById("ssoButton");
const emailFormElement = document.getElementById("emailForm");
const ssoFormElement = document.getElementById("ssoForm");

if (ssoButton && emailFormElement && ssoFormElement) {
  ssoButton.addEventListener("click", function () {
    // Hide email form
    emailFormElement.style.display = "none";
    // Show SSO form
    ssoFormElement.style.display = "block";
  });
}

// SSO Form submission
if (ssoFormElement) {
  ssoFormElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const domain = this.querySelector('input[type="text"]').value;
    if (domain) {
      alert(`Continuing with SSO domain: ${domain}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const mainLoginContainer = document.querySelector(
    ".login-container:not(#ssoFormContainer)"
  );
  const ssoFormContainer = document.getElementById("ssoFormContainer");
  const signupFormContainer = document.getElementById("signupFormContainer");
  const ssoButton = document.getElementById("ssoButton");
  const backToLoginButton = document.getElementById("backToLogin");
  const showSignupForm = document.getElementById("showSignupForm");
  const backToLoginFromSignup = document.getElementById(
    "backToLoginFromSignup"
  );
  const ssoButtonFromSignup = document.getElementById("ssoButtonFromSignup");

  // Function to hide all forms
  function hideAllForms() {
    mainLoginContainer.style.display = "none";
    ssoFormContainer.style.display = "none";
    signupFormContainer.style.display = "none";
  }

  // Function to switch to SSO form
  ssoButton.addEventListener("click", function () {
    hideAllForms();
    ssoFormContainer.style.display = "block";
  });

  // Function to switch to SSO form from signup
  ssoButtonFromSignup.addEventListener("click", function () {
    hideAllForms();
    ssoFormContainer.style.display = "block";
  });

  // Function to go back to main login form
  backToLoginButton.addEventListener("click", function () {
    hideAllForms();
    mainLoginContainer.style.display = "block";
  });

  // Function to show signup form
  showSignupForm.addEventListener("click", function (e) {
    e.preventDefault();
    hideAllForms();
    signupFormContainer.style.display = "block";
  });

  // Function to go back to login from signup
  backToLoginFromSignup.addEventListener("click", function (e) {
    e.preventDefault();
    hideAllForms();
    mainLoginContainer.style.display = "block";
  });

  // Add hover effects for buttons
  document
    .querySelectorAll(".btn, .primary-button, .secondary-button")
    .forEach((btn) => {
      btn.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)";
      });

      btn.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
});
