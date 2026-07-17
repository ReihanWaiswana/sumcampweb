document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const productCards = Array.from(document.querySelectorAll(".product-card"));
  const showMoreButton = document.querySelector("[data-show-more]");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.querySelector(".contact-form form");
  const formStatus = document.querySelector(".form-status");
  const modalOverlay = document.getElementById("productModalOverlay");
  const modalClose = document.querySelector(".modal-close");
  const modalImage = document.querySelector(".modal-image");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.querySelector(".modal-price");
  const modalDescription = document.querySelector(".modal-description");
  const modalIngredients = document.getElementById("modalIngredients");
  const detailButtons = document.querySelectorAll(".product-detail-btn");
  let isExpanded = false;

  const productData = {
    "chocolate-cake": {
      image: "images/products/chocolate-cake.jpg",
      title: "Chocolate Cake",
      price: "$12.00",
      description: "A rich and soft cake with creamy chocolate frosting, perfect for celebrations and special moments.",
      ingredients: ["Dark chocolate", "Butter", "Eggs", "Milk", "Sugar"]
    },
    "red-velvet-cake": {
      image: "images/products/red-velvet.jpg",
      title: "Red Velvet Cake",
      price: "$13.00",
      description: "A soft red velvet cake with a smooth cream cheese flavor and attractive presentation.",
      ingredients: ["Cocoa powder", "Cream cheese", "Flour", "Butter", "Milk"]
    },
    "butter-croissant": {
      image: "images/products/croissant.jpg",
      title: "Butter Croissant",
      price: "$5.00",
      description: "A flaky and buttery pastry baked fresh every morning for a simple but delicious breakfast.",
      ingredients: ["Butter", "Flour", "Yeast", "Milk", "Sugar"]
    },
    "garlic-bread": {
      image: "images/products/garlic-bread.webp",
      title: "Garlic Bread",
      price: "$6.00",
      description: "Crispy bread with garlic butter and herbs, ideal as a side dish or snack.",
      ingredients: ["Bread", "Garlic", "Butter", "Parsley", "Salt"]
    }
  };

  // Toggle the mobile navigation menu.
  const closeMenu = () => {
    hamburger?.classList.remove("is-active");
    navMenu?.classList.remove("open");
  };

  // Show or hide extra product cards when the Show More button is used.
  const updateProductVisibility = () => {
    const hasExtraCards = productCards.some((card) => card.classList.contains("product-card--extra"));

    productCards.forEach((card) => {
      const isExtra = card.classList.contains("product-card--extra");
      const shouldShow = !isExtra || isExpanded;
      card.classList.toggle("is-hidden", !shouldShow);
      card.style.display = shouldShow ? "block" : "none";
    });

    if (showMoreButton) {
      showMoreButton.style.display = hasExtraCards ? "inline-flex" : "none";
      showMoreButton.textContent = isExpanded ? "Show Less" : "Show More";
    }
  };

  // Open the product detail modal with product information.
  const openModal = (card) => {
    const product = productData[card.dataset.product];

    if (!product) {
      return;
    }

    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;
    modalIngredients.innerHTML = "";

    product.ingredients.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      modalIngredients.appendChild(listItem);
    });

    modalOverlay?.classList.add("is-open");
    document.body.classList.add("modal-open");
  };

  // Close the product detail modal.
  const closeModal = () => {
    modalOverlay?.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  };

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("is-active");
      navMenu.classList.toggle("open");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 991 && hamburger && navMenu) {
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedHamburger = hamburger.contains(event.target);
      if (!clickedInsideMenu && !clickedHamburger) {
        closeMenu();
      }
    }
  });

  const handleScroll = () => {
    header?.classList.toggle("sticky", window.scrollY > 80);
    if (backToTop) {
      backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  showMoreButton?.addEventListener("click", () => {
    isExpanded = !isExpanded;
    updateProductVisibility();
  });

  detailButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const card = button.closest(".product-card");
      if (card) {
        openModal(card);
      }
    });
  });

  modalClose?.addEventListener("click", closeModal);

  modalOverlay?.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Handle the contact form without using alerts.
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formStatus) {
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
      }
      contactForm.reset();
    });
  }

  updateProductVisibility();
});
