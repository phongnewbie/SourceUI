// Add tab switching functionality
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active class from all tabs
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    // Add active class to clicked tab
    this.classList.add("active");
  });
});

// Add hover effects for alert items
document.querySelectorAll(".alert-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#f6f8fa";
  });

  item.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "white";
  });
});
