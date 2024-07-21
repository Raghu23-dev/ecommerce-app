document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    const editProductForm = document.getElementById('editProductForm');
 
    if (addProductForm) {
        addProductForm.addEventListener('submit', validateProductForm);
    }
 
    if (editProductForm) {
        editProductForm.addEventListener('submit', validateProductForm);
    }
});
 
/**
* Validates the product form fields.
* @param {Event} event - The form submission event.
*/
function validateProductForm(event) {
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value.trim();
    const description = document.getElementById('description').value.trim();
 
    let isValid = true;
 
    // Check if all fields are filled
    if (!name || !price || !description) {
        alert('All fields are required.');
        isValid = false;
    }
 
    // Validate the price field
    if (isNaN(price) || parseFloat(price) <= 0) {
        alert('Please enter a valid price.');
        isValid = false;
    }
 
    // Prevent form submission if there are validation errors
    if (!isValid) {
        event.preventDefault();
    }
}