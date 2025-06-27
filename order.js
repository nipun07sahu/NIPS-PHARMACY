// Save and retrieve orders from localStorage
let currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || {};
let orders = JSON.parse(localStorage.getItem('orders')) || [];

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
