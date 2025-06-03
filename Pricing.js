function toggleAccordion(button) {
  const accordionItem = button.parentElement;
  const answerContent = accordionItem.querySelector(".answer-content");
  const isActive = accordionItem.classList.contains("active");

  // Toggle current accordion item
  if (isActive) {
    accordionItem.classList.remove("active");
    answerContent.style.maxHeight = "0";
  } else {
    accordionItem.classList.add("active");
    answerContent.style.maxHeight = answerContent.scrollHeight + "px";
  }
}

// Initialize accordion - all closed by default
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".answer-content").forEach((content) => {
    content.style.maxHeight = "0";
  });
});
