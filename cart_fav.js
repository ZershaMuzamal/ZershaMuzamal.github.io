// Load existing cart data from localStorage, or start with an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the Cart section in the UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartItemsContainer.innerHTML = ''; // Clear previous cart content
  let total = 0;

  // Loop through each item and add it to the cart UI
  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <h4>${item.name}</h4>
      <p>Size: ${item.size}</p>
      <p>Quantity: ${item.qty}</p>
      <p>Price: $${item.price} x ${item.qty}</p>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(itemEl);
    total += item.price * item.qty;
  });

  // Update cart count and total price
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotal.textContent = total.toFixed(2);

  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Add functionality to remove buttons
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}

// Function to add item to cart
function addToCart(name, price, size = 'M') {
  // Check if the item with same name and size already exists
  const existingItem = cart.find(item => item.name === name && item.size === size);
  if (existingItem) {
    existingItem.qty += 1; // If yes, increase quantity
  } else {
    cart.push({ name, price, qty: 1, size }); // If no, add new item
  }
  updateCartUI(); // Update cart display
}

// Function to remove item from cart using its index
function removeFromCart(index) {
  cart.splice(index, 1); // Remove item at the given index
  updateCartUI(); // Refresh the cart
}

// Add-to-cart button listeners
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const productItem = button.closest('.product-item');
    const productName = productItem.querySelector('h3').textContent;
    const productPrice = parseFloat(productItem.querySelector('p').textContent.replace('$', ''));
    const sizeSelector = productItem.querySelector('.size-selector');
    const selectedSize = sizeSelector ? sizeSelector.value : 'M';

    addToCart(productName, productPrice, selectedSize);
  });
});

// Show/hide cart sidebar
document.getElementById('cart-button').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.toggle('visible');
});

// Close cart sidebar
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.remove('visible');
});

// FAVORITES LOGIC BELOW

// Grab favorite-related elements
const favoriteButtons = document.querySelectorAll('.favorite-btn');
const favoritesButton = document.getElementById('favorites-button');
const favoritesSidebar = document.getElementById('favorites-sidebar');
const favoriteItemsContainer = document.getElementById('favorite-items');
const closeFavoritesBtn = document.getElementById('close-favorites');

// Load favorites from localStorage or start fresh
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to update the Favorites UI
function updateFavoritesUI() {
  // Show number of favorite items
  favoritesButton.querySelector('span').textContent = favorites.length;

  // Clear existing favorite items in UI
  favoriteItemsContainer.innerHTML = '';

  // If no favorites, show a message
  if (favorites.length === 0) {
    favoriteItemsContainer.innerHTML = '<p style="color:#fff;">No favorites yet.</p>';
  } else {
    favorites.forEach((item, index) => {
      const favDiv = document.createElement('div');
      favDiv.classList.add('favorite-item');
      favDiv.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: $${item.price}</p>
        <button class="remove-favorite" data-index="${index}">Remove</button>
      `;
      favoriteItemsContainer.appendChild(favDiv);
    });

    // Remove favorite buttons inside sidebar
    document.querySelectorAll('.remove-favorite').forEach(button => {
      button.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        favorites.splice(idx, 1); // Remove from list
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesUI(); // Refresh sidebar
        updateFavoriteButtons(); // Update icons on product list
      });
    });
  }
}

// Toggle favorites sidebar on button click
favoritesButton.addEventListener('click', () => {
  favoritesSidebar.classList.toggle('visible');
});

// Close favorites sidebar
closeFavoritesBtn.addEventListener('click', () => {
  favoritesSidebar.classList.remove('visible');
});

// Toggle favorite status on product button click
favoriteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productItem = button.closest('.product-item');
    const id = productItem.getAttribute('data-id') || productItem.querySelector('h3').textContent.trim();
    const name = productItem.querySelector('h3').textContent.trim();
    const price = parseFloat(productItem.querySelector('p').textContent.replace('$', '').trim());

    const existingIndex = favorites.findIndex(item => item.id === id);

    if (existingIndex >= 0) {
      // If already favorited, remove it
      favorites.splice(existingIndex, 1);
      button.classList.remove('favorited');
      button.textContent = '☆';
    } else {
      // If not, add to favorites
      favorites.push({ id, name, price });
      button.classList.add('favorited');
      button.textContent = '★';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesUI(); // Refresh sidebar
  });
});

// Update favorite icons (☆/★) based on stored data
function updateFavoriteButtons() {
  favoriteButtons.forEach(button => {
    const productItem = button.closest('.product-item');
    const id = productItem.getAttribute('data-id') || productItem.querySelector('h3').textContent.trim();
    if (favorites.some(item => item.id === id)) {
      button.classList.add('favorited');
      button.textContent = '★';
    } else {
      button.classList.remove('favorited');
      button.textContent = '☆';
    }
  });
}

// Initial run: update both cart and favorite UIs when page loads
updateFavoritesUI();
updateFavoriteButtons();
updateCartUI();
