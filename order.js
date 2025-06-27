updated_order_js = """
// Save and retrieve orders from localStorage
let currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || {};
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Product list
const productList = [
  "Etosaid 90mg Tab",
  "Glucon D Plain 75gm",
  "Cyclopam Tab",
  "Cyclopam Susp 30ml",
  "Clavam Drops 10ml",
  "Paraxin 500mg Cap",
  "Pilex Tab",
  "Ors Pow 21.8gm",
  "Dolo Mf Syp 120ml",
  "Macpod 100 Oral Syp 30ml",
  "Vertistar Md 16 Tab",
  "Vertistar Md 8mg Tab",
  "Cefi O 200mg Tab",
  "Tetanus Toxoid Inj 0.5ml",
  "Figaro Olive Oil 1 Ltr",
  "Figava Oil 500ml",
  "Hytone Syp",
  "Neeri Syp 100ml",
  "Betnovate C Ont 30gm",
  "Dispovan 5ml",
  "Zerodol Sp Tab",
  "Hansaplast",
  "Tide 10mg Tab"
];

// Populate product dropdown if on the order page
if (document.getElementById('productSelect')) {
  const productSelect = document.getElementById('productSelect');
  productList.forEach(product => {
    const option = document.createElement('option');
    option.value = product;
    option.textContent = product;
    productSelect.appendChild(option);
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
  document.getElementById('paymentDetails').innerText = `Pay ₹${currentOrder.quantity * 100} for ${currentOrder.product}`;
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
"""

# Save the updated order.js file
order_js_path = '/mnt/data/order.js'
with open(order_js_path, 'w') as file:
    file.write(updated_order_js)

order_js_path
