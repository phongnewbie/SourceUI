// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                      position: absolute;
                      width: ${size}px;
                      height: ${size}px;
                      left: ${x}px;
                      top: ${y}px;
                      background: rgba(255, 255, 255, 0.5);
                      border-radius: 50%;
                      transform: scale(0);
                      animation: ripple 0.6s linear;
                      pointer-events: none;
                  `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
          @keyframes ripple {
              to {
                  transform: scale(4);
                  opacity: 0;
              }
          }
      `;
document.head.appendChild(style);

// Smooth scroll animations
function showDocs() {
  alert("Redirecting to GitHub documentation...");
}

// Add interactive hover effects
document.querySelectorAll(".step").forEach((step) => {
  step.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  step.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".animate-fade-in, .animate-slide-up")
  .forEach((el) => {
    observer.observe(el);
  });

const commandText = "npm i react";
const commandElement = document.querySelector(".npm-command");
const cursor = document.querySelector(".typing-cursor");

function typeCommand() {
  commandElement.textContent = "";
  cursor.style.display = "inline-block";

  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < commandText.length) {
      commandElement.textContent += commandText[i];
      i++;
    } else {
      clearInterval(typeInterval);
      // Restart after delay
      setTimeout(() => {
        typeCommand();
      }, 3000);
    }
  }, 100);
}

// Start typing animation
setTimeout(typeCommand, 1000);

// Thêm hiệu ứng hover cho benefit cards
document.querySelectorAll(".benefit-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });
});

// Smooth scroll cho button
document.querySelector(".action-btn").addEventListener("click", function (e) {
  e.preventDefault();
  // Có thể thêm logic chuyển trang hoặc scroll ở đây
  alert("Redirecting to Safe NPM setup...");
});
