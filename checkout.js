// Function to add a product to the cart
function addToCart(product) {
    // Get the current cart from localStorage (or start with an empty array if none exists)
    let cart = JSON.parse(localStorage.getItem("newProject_cart")) || [];

    // Check if this product is already in the cart (by its id)
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // If found, increase its quantity by 1
        cart[existingProductIndex].quantity += 1;
    } else {
        // If not found, add it to the cart with quantity set to 1
        cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to localStorage (convert to string format)
    localStorage.setItem("newProject_cart", JSON.stringify(cart));
}

//  When the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
    // Get the HTML elements where we will display the cart and totals
    const cartItemsContainer = document.getElementById("cart-items");   // Container for cart items
    const cartTotalElement = document.getElementById("cart-total");     // Total price display
    const checkoutForm = document.getElementById("checkout-form");      // Checkout form element
    const cartCountBadge = document.getElementById('cart-count');       // Badge showing total item count

    // Get the cart data from localStorage (or start with empty array)
    const cart = JSON.parse(localStorage.getItem("newProject_cart")) || [];

    let total = 0;  // Initialize total price

    // Check if the cart is empty
    if (cart.length === 0) {
        // If empty, show a message
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        // If there are items, loop through each one
        cart.forEach(item => {
            // Calculate the total price for this item (price × quantity)
            const itemTotal = item.price * item.quantity;
            total += itemTotal;  // Add to overall total

            // Create a new HTML block for this item
            const cartItem = document.createElement("div");
            cartItem.className = "flex items-center space-x-4 border p-4 rounded";

            // Fill the HTML block with item details
            cartItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="w-24 h-24 object-cover rounded" />
                <div class="flex-1">
                    <h4 class="text-lg font-bold">${item.name}</h4>
                    <p class="text-sm text-gray-600">Price: $${item.price.toFixed(2)}</p>
                    <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
                    <p class="text-sm text-gray-800 font-semibold">Total: $${itemTotal.toFixed(2)}</p>
                </div>
            `;

            // Add this item block to the main cart container on the page
            cartItemsContainer.appendChild(cartItem);
        });

        // Calculate the total number of items (sum of all quantities)
        const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Update and show the badge with the total item count
        cartCountBadge.classList.remove('hidden');  // Make sure badge is visible
        cartCountBadge.textContent = totalItemCount;  // Set the number on the badge
    }

    // Show the total price on the page
    cartTotalElement.textContent = total.toFixed(2);

    // Handle the checkout form when it’s submitted
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();  // Stop the page from reloading on submit

        // Get input values and remove extra spaces
        const name = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();

        // Check if any field is empty
        if (!name || !email || !address) {
            alert("Please fill out all fields.");
            return;  // Stop if any field is missing
        }

        // Check if the cart is empty
        const cart = JSON.parse(localStorage.getItem("newProject_cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;  // Stop if cart is empty
        }

        // Create a transaction record
        const transaction = {
            id: `TXN-${Date.now()}`,  // Unique transaction ID based on current time
            items: cart,  // All the cart items
            totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),  // Total price
            date: new Date().toISOString(),  // Current date and time
            customer: { name, email, address }  // Customer details
        };

        const customer = { name, email, address }

        // Get the existing list of customer (or start fresh)
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers.push(customer)
        transactions.push(transaction);  // Add the new transaction

        // Save the updated list back to localStorage
        localStorage.setItem("transactions", JSON.stringify(transactions));

        // Show a thank-you message
        alert(`✅ Thank you, ${name}, for your purchase!`);

        // Clear the cart and reset the page
        localStorage.removeItem("newProject_cart");
        checkoutForm.reset();
        cartItemsContainer.innerHTML = "<p>Your cart is now empty.</p>";
        cartTotalElement.textContent = "0.00";


        
        // Redirect back to the homepage (index.html)
        window.location.href = "index.html";
    });
});


