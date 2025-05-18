// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartItemsContainer.innerHTML = '';
  let total = 0;

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

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotal.textContent = total.toFixed(2);

  localStorage.setItem('cart', JSON.stringify(cart));

  // Remove from cart button events
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeFromCart(index);
    });
  });
}

// Add to Cart function
function addToCart(name, price, size = 'M') {
  const existingItem = cart.find(item => item.name === name && item.size === size);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1, size });
  }
  updateCartUI();
}

// Remove from Cart function
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Add to Cart Button Event Listeners
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

// Toggle Cart Sidebar
document.getElementById('cart-button').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.toggle('visible');
});

// Close Cart Sidebar
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.remove('visible');
});

const favoriteButtons = document.querySelectorAll('.favorite-btn');
const favoritesButton = document.getElementById('favorites-button');
const favoritesSidebar = document.getElementById('favorites-sidebar');
const favoriteItemsContainer = document.getElementById('favorite-items');
const closeFavoritesBtn = document.getElementById('close-favorites');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Update UI for favorites button count and sidebar content
function updateFavoritesUI() {
  // Update count on favorites toggle button
  favoritesButton.querySelector('span').textContent = favorites.length;

  // Clear current favorite items
  favoriteItemsContainer.innerHTML = '';

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

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-favorite').forEach(button => {
      button.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        favorites.splice(idx, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesUI();
        updateFavoriteButtons(); // update heart icons on product list
      });
    });
  }
}

// Toggle favorite sidebar visibility
favoritesButton.addEventListener('click', () => {
  favoritesSidebar.classList.toggle('visible');
});

// Close button for sidebar
closeFavoritesBtn.addEventListener('click', () => {
  favoritesSidebar.classList.remove('visible');
});

// Add/Remove favorite on button click
favoriteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productItem = button.closest('.product-item');
    const id = productItem.getAttribute('data-id') || productItem.querySelector('h3').textContent.trim();
    const name = productItem.querySelector('h3').textContent.trim();
    const price = parseFloat(productItem.querySelector('p').textContent.replace('$', '').trim());

    const existingIndex = favorites.findIndex(item => item.id === id);
    if (existingIndex >= 0) {
      // Remove favorite
      favorites.splice(existingIndex, 1);
      button.classList.remove('favorited');
      button.textContent = '☆';
    } else {
      // Add favorite
      favorites.push({ id, name, price });
      button.classList.add('favorited');
      button.textContent = '★';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesUI();
  });
});

// On page load - set favorites button states based on saved favorites
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

// Initial UI update
updateFavoritesUI();
updateFavoriteButtons();

// Initialize Cart UI on load
updateCartUI();
