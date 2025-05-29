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

const animationObserver = new IntersectionObserver((entries) => {
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
    animationObserver.observe(el);
  });

// Typing animation function
function typeCommand(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Wait for 2 seconds before starting again
      setTimeout(() => {
        element.textContent = "";
        i = 0;
        type();
      }, 2000);
    }
  }

  type();
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  const commandElements = document.querySelectorAll(".npm-command");
  commandElements.forEach((element) => {
    typeCommand(element, "npx socket optimize");
  });
});

// Package items hover effect
document.querySelectorAll(".package-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
  });
});

// Metric bars animation
function animateMetricBars() {
  const metricFills = document.querySelectorAll(".metric-fill");
  metricFills.forEach((fill, index) => {
    setTimeout(() => {
      fill.style.transition = "width 1s ease-out";
      fill.style.width = "100%";
    }, index * 100);
  });
}

// Run animation when scrolling to section
const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateMetricBars();
    }
  });
});

metricObserver.observe(document.querySelector(".dashboard-side"));

// Button click handlers
document.querySelector(".primary-btn")?.addEventListener("click", function (e) {
  e.preventDefault();
  alert("Installing Socket CLI...");
});

document
  .querySelector(".secondary-btn")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Exploring Socket Registry...");
  });

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
