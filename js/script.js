let favourites=[];
let productItem=[]


// Fetches products from http://localhost:3000/products
function getProducts() {
    return fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            const productsList = document.getElementById('products');
            productsList.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `
            <div class="d-flex justify-content-between">
              <div>
                <h5>${product.title}</h5>
                <p>${product.description}</p>
                <p><strong>Price:</strong> £${product.price}</p>
                <p><strong>Rating:</strong> ${product.rating}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
                <p><strong>Category:</strong> ${product.category}</p>
              </div>
              <button class="btn btn-dark" onclick="addSaveForLater(${product.id})">Add to Save for Later</button>
            </div>
          `;
                productsList.appendChild(li);
            });
            return products;
        });
}

// Fetch saveforlater items from http://localhost:3000/saveforlater
function getSaveForLater() {
    return fetch('http://localhost:3000/saveforlater')
        .then(response => response.json())
        .then(saveForLater => {
            const saveForLaterList = document.getElementById('saveforlaterList');
            saveForLaterList.innerHTML = '';
            saveForLater.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `
            <div class="d-flex justify-content-between">
              <div>
                <h5>${item.title}</h5>
                <p>${item.description}</p>
                <p><strong>Price:</strong> £${item.price}</p>
                <p><strong>Rating:</strong> ${item.rating}</p>
                <p><strong>Stock:</strong> ${item.stock}</p>
                <p><strong>Category:</strong> ${item.category}</p>
              </div>
              <button class="btn btn-dark" onclick="removeSaveForLater(${item.id})">Remove from Save for Later</button>
            </div>
          `;
                saveForLaterList.appendChild(li);
            });
            return saveForLater;
        });
}

// Add items to saveforlater
function addSaveForLater(productID) {
    fetch(`http://localhost:3000/products/${productID}`)
      .then(response => response.json())
      .then(product => {
        return fetch('http://localhost:3000/saveforlater', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        });
      })
      .then(() => {
        return getSaveForLater(); 
      })
      .catch(error => console.error('Error adding to save for later:', error));
  }

// Remove from saveforlater
function removeSaveForLater(itemID) {
  fetch(`http://localhost:3000/saveforlater/${itemID}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to delete product from save for later');
  })
  .then(() => {
    return getSaveForLater();
  })
  .catch(error => console.error('Error deleting from save for later:', error));
}


// Load products and save for later items when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getProducts();
    getSaveForLater();
});