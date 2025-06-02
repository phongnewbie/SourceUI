// Lấy tất cả các sidebar items
const sidebarItems = document.querySelectorAll(".sidebar-item");

// Lấy tất cả các tab content
const tabContents = document.querySelectorAll(".tab-content");

// Hàm để chuyển đổi nội dung
function switchContent(contentId) {
  // Ẩn tất cả các tab content
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  // Hiển thị tab content được chọn
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.classList.add("active");
  }

  // Cập nhật trạng thái active của sidebar items
  sidebarItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("data-content") === contentId) {
      item.classList.add("active");
    }
  });
}

// Thêm event listener cho mỗi sidebar item
sidebarItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const contentId = item.getAttribute("data-content");
    switchContent(contentId);
  });
});

// Khởi tạo với tab đầu tiên
document.addEventListener("DOMContentLoaded", () => {
  const firstItem = document.querySelector(".sidebar-item");
  if (firstItem) {
    const contentId = firstItem.getAttribute("data-content");
    switchContent(contentId);
  }
});

const video = document.getElementById("myVideo");
const playButton = document.getElementById("playButton");
const videoOverlay = document.getElementById("videoOverlay");

playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    videoOverlay.style.display = "none"; // Ẩn overlay khi video đang phát
  } else {
    video.pause();
    videoOverlay.style.display = "flex"; // Hiện overlay khi video tạm dừng
  }
});

// Hiện lại overlay nếu video kết thúc
video.addEventListener("ended", () => {
  videoOverlay.style.display = "flex";
});

// Hiện overlay nếu video bị tạm dừng (ví dụ: người dùng nhấn pause)
video.addEventListener("pause", () => {
  if (video.currentTime > 0 && !video.ended) {
    // Chỉ khi video không phải mới bắt đầu hoặc đã kết thúc
    videoOverlay.style.display = "flex";
  }
});

// Ẩn overlay nếu video đang phát (ví dụ: người dùng nhấn play bằng điều khiển mặc định nếu có)
video.addEventListener("play", () => {
  videoOverlay.style.display = "none";
});

// Đảm bảo video không tự động phát khi tải trang
video.pause();
