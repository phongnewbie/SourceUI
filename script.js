// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Header scroll effect
const header = document.querySelector(".header");
let lastScroll = 0;

// window.addEventListener("scroll", () => {
//   const currentScroll = window.pageYOffset;

//   if (currentScroll <= 0) {
//     header.classList.remove("scroll-up");
//     return;
//   }

//   if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
//     // Scroll Down
//     header.classList.remove("scroll-up");
//     header.classList.add("scroll-down");
//   } else if (
//     currentScroll < lastScroll &&
//     header.classList.contains("scroll-down")
//   ) {
//     // Scroll Up
//     header.classList.remove("scroll-down");
//     header.classList.add("scroll-up");
//   }
//   lastScroll = currentScroll;
// });

// Add animation to feature cards when they come into view
const featureObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const featureObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      featureObserver.unobserve(entry.target);
    }
  });
}, featureObserverOptions);

document.querySelectorAll(".feature-card").forEach((card) => {
  featureObserver.observe(card);
});

// Three.js Cube Interaction and Dissolve Effect with Concurrent Erosion/Dissolution
const cubeContainer = document.getElementById("cube-container");

if (cubeContainer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    cubeContainer.clientWidth / cubeContainer.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Improve rendering quality
  cubeContainer.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Reduced ambient light further
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Directional light
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const pointLight1 = new THREE.PointLight(0xffffff, 0.3); // Added point light 1
  pointLight1.position.set(-10, -10, -10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 0.3); // Added point light 2
  pointLight2.position.set(10, -10, -10);
  scene.add(pointLight2);

  // Create a group to hold all blocks
  const blockGroup = new THREE.Group();
  scene.add(blockGroup); // Add the group to the scene

  const whiteMaterial = new THREE.MeshPhongMaterial({
    color: 0x6366f1, // Indigo color
    shininess: 100,
    specular: 0x333333,
    transparent: true,
    opacity: 1,
  });
  // Small block materials start fully transparent
  const purpleMaterial = new THREE.MeshPhongMaterial({
    color: 0x8b5cf6, // Purple color
    shininess: 100,
    specular: 0x333333,
    transparent: true,
    opacity: 0,
  });
  const lightPurpleMaterial = new THREE.MeshPhongMaterial({
    color: 0xec4899, // Pink color
    shininess: 100,
    specular: 0x333333,
    transparent: true,
    opacity: 0,
  });

  // --- Create the initial large white block ---
  const mainBlockGeometry = new THREE.BoxGeometry(5.5, 5.5, 5.5);
  const mainBlock = new THREE.Mesh(mainBlockGeometry, whiteMaterial);
  blockGroup.add(mainBlock);

  // --- Create smaller blocks for dissolution (initially transparent) ---
  const smallBlocks = [];
  const gridSize = 5; // Number of blocks along each axis
  const smallBlockSize = 2;
  const spacing = 0.75;

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        const position = {
          x: (x - gridSize / 2 + 0.5) * spacing,
          y: (y - gridSize / 2 + 0.5) * spacing,
          z: (z - gridSize / 2 + 0.5) * spacing,
        };
        // Clone material for each block to control opacity independently
        const material =
          (x + y + z) % 2 === 0
            ? purpleMaterial.clone()
            : lightPurpleMaterial.clone();
        const geometry = new THREE.BoxGeometry(
          smallBlockSize,
          smallBlockSize,
          smallBlockSize
        );
        const smallBlock = new THREE.Mesh(geometry, material);
        smallBlock.position.set(position.x, position.y, position.z);
        smallBlock.initialPosition = new THREE.Vector3(
          position.x,
          position.y,
          position.z
        ); // Store initial relative position
        // smallBlock.visible = true; // Keep visible but transparent
        blockGroup.add(smallBlock);
        smallBlocks.push(smallBlock);
      }
    }
  }

  const effectStartTime = Date.now() + 5000; // Start the entire effect after 5 seconds
  const totalEffectDuration = 8000; // Total time for the main block to fade and small blocks to dissolve (8 seconds)
  const mainBlockFadeDuration = 2000; // Main block fades out in the first 2 seconds of the effect

  camera.position.z = 8;
  blockGroup.rotation.set(0.3, -0.4, 0); // Initial rotation

  // Mouse Interaction variables
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0,
  };

  // Animation loop
  function animate(currentTime) {
    requestAnimationFrame(animate);

    // Automatic Rotation (Apply to the group)
    if (!isDragging) {
      // Only auto-rotate if not dragging
      blockGroup.rotation.y += 0.001; // Rotate slowly around Y axis
      blockGroup.rotation.x += 0.0005; // Rotate slowly around X axis
    }

    // Combined Erosion and Dissolution effect
    const elapsed = currentTime - effectStartTime;

    if (elapsed > 0 && elapsed < totalEffectDuration) {
      const progress = Math.min(1, elapsed / totalEffectDuration); // Overall progress of the effect (0 to 1)

      // Animate main block opacity (fades out in the first part of the effect)
      const mainBlockFadeProgress = Math.min(
        1,
        elapsed / mainBlockFadeDuration
      );
      mainBlock.material.opacity = Math.max(0, 1 - mainBlockFadeProgress);
      if (mainBlock.material.opacity <= 0) {
        mainBlock.visible = false; // Hide completely once faded
      }

      // Animate small blocks (fade in, move, rotate, fade out over the entire effect duration)
      smallBlocks.forEach((block) => {
        // Small blocks fade in during the first part of the effect
        const smallBlockFadeInProgress = Math.min(
          1,
          elapsed / mainBlockFadeDuration
        ); // Use main block fade time for small block fade in
        const fadeInOpacity = smallBlockFadeInProgress; // Opacity goes from 0 to 1

        // After fading in, they start fading out over the remaining duration
        const fadeOutProgress = Math.max(
          0,
          (elapsed - mainBlockFadeDuration) /
            (totalEffectDuration - mainBlockFadeDuration)
        );
        const fadeOutOpacity = Math.max(0, 1 - fadeOutProgress * 1.2); // Fade out slightly faster

        // Combine fade in and fade out. Opacity peaks at 1 then goes to 0.
        // It will be fadeInOpacity until elapsed reaches mainBlockFadeDuration, then it follows fadeOutOpacity
        block.material.opacity = Math.min(fadeInOpacity, fadeOutOpacity); // Simple way to handle combined fade

        if (block.material.opacity > 0 && !block.visible) block.visible = true; // Make visible if fading in

        // Move blocks outwards over the entire effect duration
        const dissolveFactor = progress * 4; // Control how fast blocks move
        const direction = new THREE.Vector3()
          .copy(block.initialPosition)
          .normalize();
        block.position.copy(direction).multiplyScalar(dissolveFactor * 3); // Move outwards

        // Random rotation over the entire effect duration
        block.rotation.x +=
          Math.sin(currentTime * 0.001 + block.id) * 0.01 * progress;
        block.rotation.y +=
          Math.cos(currentTime * 0.001 + block.id) * 0.01 * progress;

        // Hide completely after dissolved
        if (block.material.opacity <= 0) {
          block.visible = false;
        }
      });
    }

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (cubeContainer) {
      const width = cubeContainer.clientWidth;
      const height = cubeContainer.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio); // Adjust pixel ratio on resize
    }
  });

  // Mouse event handlers
  renderer.domElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    previousMousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    // Rotate the group based on mouse movement
    blockGroup.rotation.y += deltaX * 0.005; // Increased sensitivity slightly
    blockGroup.rotation.x += deltaY * 0.005; // Increased sensitivity slightly

    previousMousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
    // Render is handled by the animate loop
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  animate(); // Start the render loop
} else {
  console.error("Cube container not found!");
}

// Add animation on scroll for cards
const cardObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, cardObserverOptions);

document.querySelectorAll(".package-card, .protection-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  cardObserver.observe(card);
});

// Animate metric bars on load
setTimeout(() => {
  document.querySelectorAll(".metric-fill").forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 200);
  });
}, 500);

const alertData = {
  "Supply chain risk": [
    "Known malware",
    "Possible typosquat attack",
    "NPM Shrinkwrap",
    "Git dependency",
    "HTTP dependency",
    "Suspicious Stars on GitHub",
    "Protestware or potentially unwanted behavior",
    "Unstable ownership",
    "AI-detected potential malware",
    "Obfuscated code",
    '<a href="#">20 more alerts &rarr;</a>',
  ],
  Vulnerability: ["Critical CVE", "High CVE", "Medium CVE", "Low CVE"],
  Quality: [
    "Bad dependency semver",
    "Wildcard dependency",
    "Unpopular package",
    "Minified code",
  ],
  Maintenance: [
    "Socket optimized override available",
    "Deprecated",
    "Unmaintained",
  ],
  License: [
    "Explicitly Unlicensed Item",
    "License Policy Violation",
    "Misc. License Issues",
    "Non-permissive License",
    "Ambiguous License Classifier",
    "Copyleft License",
    "Unidentified License",
    "No License Found",
    "License exception",
  ],
};

const tabs = document.querySelectorAll(".supply-tabs .tab");
const alertsList = document.getElementById("supply-alerts");

function renderAlerts(tabName) {
  alertsList.innerHTML = "";
  alertData[tabName].forEach((item) => {
    if (item.startsWith("<a")) {
      const li = document.createElement("li");
      li.className = "more-alerts";
      li.innerHTML = item;
      alertsList.appendChild(li);
    } else {
      const li = document.createElement("li");
      li.innerHTML = `<span class="check">✔</span> ${item}`;
      alertsList.appendChild(li);
    }
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    renderAlerts(this.textContent.trim());
  });
});

// Hiển thị mặc định tab đầu tiên
renderAlerts("Supply chain risk");
document.querySelectorAll(".card-link").forEach((button) => {
  button.addEventListener("click", function (e) {
    console.log("Clicked:", this.textContent.trim());
    // In a real app, this would track the click or navigate to the actual page
  });
});
