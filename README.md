Project Overview

This is a front-end-only clone of the Amazon e-commerce website, built to demonstrate core JavaScript, HTML, and CSS skills. The project simulates a functional user experience, from Browse products and adding them to a cart to placing an order and viewing past orders.

While the shopping cart and order history are stored locally in the browser for user persistence, the order placement process simulates a real-world transaction by sending the cart data to an external backend API. This demonstrates an understanding of front-end and back-end integration.

Note: This project is for educational purposes only. It is not affiliated with, endorsed by, or sponsored by Amazon Inc. or any of its subsidiaries. As a static website, it does not collect any personal or sensitive user data. All data, including the shopping cart and order history, is stored locally in your browser and is not sent to a server for long-term storage or tracking.

Features

Product Browse: Browse a grid of products with images, names, prices, and ratings.

Search Functionality: A robust search bar allows users to find products by name or keywords. The search is case-insensitive and uses whole-word matching to provide accurate results.

Shopping Cart: Add products to a shopping cart with a customizable quantity selector.

Persistent Cart: Cart data is saved in the browser's localStorage so it persists even if the user closes the browser.

Quantity Management: Update or delete items directly from the cart summary page.

Checkout Process: A simulated checkout page displays an order summary, including item costs, shipping, and tax.

Order Placement: A "Place your order" button sends the cart data to a backend API to simulate a successful transaction. Upon confirmation, the cart is cleared, and the order details are saved to local history.

Order History: The orders page displays a history of all placed orders, including individual products, quantities, and delivery dates.

Disclaimer Popup: A disclaimer popup appears once per browser session to inform users that the site is a non-commercial, educational project.

Responsive Design: The website is designed to work on both desktop and mobile devices.

Clone the repository:

git clone www.github.com/DarKnight594/Shopping_Project
