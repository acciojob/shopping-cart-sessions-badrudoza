// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage
function loadCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = loadCart();
  cart.push(product); // append to cart
  saveCart(cart);
  renderCart();
}

// Render the product list with Add buttons
function renderProducts() {
  products.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners to all buttons
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.dataset.id);
      addToCart(id);
    });
  });
}

// Render cart from sessionStorage
function renderCart() {
  const cart = loadCart();
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial render
renderProducts();
renderCart();
clearCartBtn.addEventListener("click", clearCart);
