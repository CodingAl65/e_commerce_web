//   Select the form and the success message area from the page
const restockForm = document.getElementById("restock-form");
const successMessage = document.getElementById("success-message");

//  When the form is submitted...
restockForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // Stop the page from refreshing

  //  Get all the values the user entered
  const name = document.getElementById("product-name").value;
  const description = document.getElementById("product-description").value;
  const price = parseFloat(document.getElementById("product-price").value); // Convert string to number
  const stock = parseInt(document.getElementById("product-stock").value);   // Convert string to number
  const imageFile = document.getElementById("product-image").files[0];      // Get the uploaded file

  //  Check if an image file was selected
  if (!imageFile) {
    alert("Please upload an image."); // Show an alert if no image is uploaded
    return; // Stop the code from continuing
  }

  //  Convert the image file to a base64 string (text version of the image)
  const imageUrl = await convertImageToBase64(imageFile);

  //  Create a product object with all the data
  const newProduct = {
    productId: "prod_" + Date.now(), // Unique ID using current time
    name: name,
    description: description,
    price: price,
    stock: stock,
    imageUrl: imageUrl
  };

  //  Get the list of existing products (or start fresh if empty)
  const existingProducts = JSON.parse(localStorage.getItem("newProject_products")) || [];

  //  Add the new product to the list
  existingProducts.push(newProduct);

  //  Save the updated product list back to localStorage
  localStorage.setItem("newProject_products", JSON.stringify(existingProducts));


  //  Show a success message and reset the form
  successMessage.classList.remove("hidden"); // Make the message visible
  restockForm.reset(); // Clear the form

  
});


//  Function that turns an image file into base64 text (used for saving in localStorage)
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // Tool to read the file
    reader.onload = () => resolve(reader.result); // When done, return the base64 string
    reader.onerror = reject; // If there's an error, reject the promise
    reader.readAsDataURL(file); // Start reading the file as base64
  });
}


// document.addEventListener("DOMContentLoaded", () => {
//     const cartCountBadge = document.getElementById('cart-count');       // Badge showing total item count
//     // Update and show the badge with the total item count
//     cartCountBadge.classList.remove('hidden');  // Make sure badge is visible
//     cartCountBadge.textContent = totalItemCount;  // Set the number on the badge
//         })