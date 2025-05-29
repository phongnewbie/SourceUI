// Add smooth hover animations
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".testimonial-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click handlers for social icons
  document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Social link clicked");
    });
  });
});
