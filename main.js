//  Select the container where we want to display the product cards on the page
const productsContainer = document.getElementById("products-container");

//  Get the list of products from localStorage (or use an empty array if nothing is saved yet)
const products = JSON.parse(localStorage.getItem("newProject_products")) || [];

//  Check if there are any products to show
if (products.length === 0) {
  // If no products, show a simple message in the container
  productsContainer.innerHTML = "<p>No products available. Go to the Restock page to add some!</p>";
} else {
  // If products exist, loop through each product and create a display card
  products.forEach(product => {
    // Create a <div> element to hold the product card
    const productCard = document.createElement("div");
    productCard.className = "border rounded-lg p-4 shadow-md bg-white";

    // Fill in the product details using HTML (image, name, description, price, stock, button)
    productCard.innerHTML = `
      <div class="h-40 w-full bg-gray-100 flex justify-center items-center overflow-hidden rounded mb-3">
        <img src="${product.imageUrl}" alt="${product.name}" class="h-full object-contain">
      </div>
      <h3 class="text-lg font-bold">${product.name}</h3>
      <p class="text-sm text-gray-600 mb-2">${product.description}</p>
      <div class="flex justify-between items-center mb-2">
        <span class="font-semibold text-blue-600">$${product.price.toFixed(2)}</span>
        <span class="text-sm text-gray-500">Stock: ${product.stock}</span>
      </div>
      <button class="add-to-cart bg-black w-full text-white py-1 px-4 rounded hover:bg-gray-800 transition" data-id="${product.productId}">
        Add to Cart
      </button>
    `;

    // Add the product card into the container on the page
    productsContainer.appendChild(productCard);
  });
}

//  Add a single event listener to the products container to handle all "Add to Cart" button clicks
productsContainer.addEventListener("click", (e) => {
  // Check if the clicked element is a button with class "add-to-cart"
  if (e.target.classList.contains("add-to-cart")) {
    const productId = e.target.getAttribute("data-id");  // Get the product's ID from the button's data attribute

    // Find the product object from the products list
    const selectedProduct = products.find(p => p.productId === productId);

    // Get the current cart from localStorage (or start with an empty array if none exists yet)
    let cart = JSON.parse(localStorage.getItem("newProject_cart")) || [];

    // Check if this product is already in the cart
    const existingProductIndex = cart.findIndex(p => p.productId === selectedProduct.productId);

    if (existingProductIndex !== -1) {
      //  If already in the cart, increase the quantity by 1
      cart[existingProductIndex].quantity += 1;
    } else {
      //  If not in the cart yet, add it with quantity set to 1
      cart.push({ ...selectedProduct, quantity: 1 });
    }

    // Save the updated cart back into localStorage
    localStorage.setItem("newProject_cart", JSON.stringify(cart));

    // Optionally show a success message (uncomment if you want)
    // alert("Product added to cart!");

    // Show the checkout button if the cart has any items
    const checkoutBtn = document.getElementById("checkout-popup-btn");
    if (cart.length > 0) {
      checkoutBtn.classList.remove("hidden");
    }
  }
});

//  When the page loads, check if there are items in the cart — if yes, show the checkout button
window.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkout-popup-btn");
  const cart = JSON.parse(localStorage.getItem("newProject_cart")) || [];

  if (cart.length > 0) {
    checkoutBtn.classList.remove("hidden");
  }
});

// document.addEventListener("DOMContentLoaded", () => {
// const cartCountBadge = document.getElementById('cart-count');       // Badge showing total item count
//         // Update and show the badge with the total item count
//         cartCountBadge.classList.remove('hidden');  // Make sure badge is visible
//         cartCountBadge.textContent = totalItemCount;  // Set the number on the badge
//     })