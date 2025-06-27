// Save and retrieve orders from localStorage
let currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || {};
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Product list with images
const productList = [
  { name: "Etosaid 90mg Tab", image: "product-images/etosaid.jpg" },
  { name: "Glucon D Plain 75gm", image: "product-images/glucon.jpg" },
  { name: "Cyclopam Tab", image: "product-images/cyclopam.jpg" },
  { name: "Cyclopam Susp 30ml", image: "product-images/cyclopam-susp.jpg" },
  { name: "Clavam Drops 10ml", image: "product-images/clavam.jpg" },
  { name: "Paraxin 500mg Cap", image: "product-images/paraxin.jpg" },
  { name: "Pilex Tab", image: "product-images/pilex.jpg" },
  { name: "Ors Pow 21.8gm", image: "product-images/ors.jpg" },
  { name: "Dolo Mf Syp 120ml", image: "product-images/dolo.jpg" },
  { name: "Macpod 100 Oral Syp 30ml", image: "product-images/macpod.jpg" },
  { name: "Vertistar Md 16 Tab", image: "product-images/vertistar16.jpg" },
  { name: "Vertistar Md 8mg Tab", image: "product-images/vertistar8.jpg" },
  { name: "Cefi O 200mg Tab", image: "product-images/cefi.jpg" },
  { name: "Tetanus Toxoid Inj 0.5ml", image: "product-images/tetanus.jpg" },
  { name: "Figaro Olive Oil 1 Ltr", image: "product-images/figaro.jpg" },
  { name: "Figava Oil 500ml", image: "product-images/figava.jpg" },
  { name: "Hytone Syp", image: "product-images/hytone.jpg" },
  { name: "Neeri Syp 100ml", image: "product-images/neeri.jpg" },
  { name: "Betnovate C Ont 30gm", image: "product-images/betnovate.jpg" },
  { name: "Dispovan 5ml", image: "product-images/dispovan.jpg" },
  { name: "Zerodol Sp Tab", image: "product-images/zerodol.jpg" },
  { name: "Hansaplast", image: "product-images/hansaplast.jpg" },
  { name: "Tide 10mg Tab", image: "product-images/tide.jpg" }
];

// Populate product dropdown if on the order page
if (document.getElementById('productSelect')) {
  const productSelect = document.getElementById('productSelect');
  productList.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });

  // Show product image when selected
  productSelect.addEventListener('change', function () {
    const selectedProduct = productList.find(p => p.name === this.value);
    if (selectedProduct) {
      document.getElementById('productImage').src = selectedProduct.image;
    }
  });
}

// Highlight active link
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active-link');
  }
});

// Order form submission
if (document.getElementById('orderForm')) {
  document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    currentOrder = Object.fromEntries(formData.entries());
    currentOrder.quantity = parseInt(currentOrder.quantity);
    localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
    if (currentOrder.paymentMethod === 'Online Payment') {
      window.location.href = 'payment.html';
    } else {
      finalizeOrder();
      document.getElementById('notification').innerText = 'Order placed successfully (COD).';
    }
  });
}

// Payment Page
if (document.getElementById('paymentDetails')) {
  document.getElementById('paymentDetails').innerText = `Pay ?${currentOrder.quantity * 100} for ${currentOrder.product}`;
  document.getElementById('payButton').addEventListener('click', function() {
    finalizeOrder();
    window.location.href = 'index.html';
  });
}

// Admin Page
if (document.getElementById('orderList')) {
  displayOrders();
}

function finalizeOrder() {
  orders.push({ ...currentOrder, status: 'Pending' });
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('currentOrder');
}

function displayOrders() {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  const container = document.getElementById('orderList');
  container.innerHTML = '';
  if (orders.length === 0) {
    container.innerText = 'No orders yet.';
    return;
  }
  orders.forEach((order, index) => {
    const div = document.createElement('div');
    div.className = 'orderCard fade-in';
    div.innerHTML = `<h3>Order #${index + 1}</h3>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Product:</strong> ${order.product}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Status:</strong> ${order.status}</p>`;
    container.appendChild(div);
  });
}
