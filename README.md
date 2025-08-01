This is a front-end-only clone of the Amazon e-commerce website, built to demonstrate core JavaScript, HTML, and CSS skills. The project simulates a fully functional user experience, from Browse products and adding them to a cart to placing an order and viewing past orders.

The application leverages client-side storage to persist user data, providing a seamless experience across page loads and browser sessions.

Features:-

Product Browse: Browse a grid of products with images, names, prices, and ratings.

Search Functionality: A robust search bar allows users to find products by name or keywords. The search is case-insensitive and uses whole-word matching to provide accurate results.

Shopping Cart: Add products to a shopping cart with a customizable quantity selector.

Persistent Cart: Cart data is saved in the browser's localStorage so it persists even if the user closes the browser.

Quantity Management: Update or delete items directly from the cart summary page.

Checkout Process: A simulated checkout page displays an order summary, including item costs, shipping, and tax.

Order Placement: A "Place your order" button simulates a successful transaction with an external backend API. Upon confirmation, the cart is cleared, and the order details are saved to local history.

Order History: The orders page displays a history of all placed orders, including individual products, quantities, and delivery dates.

Responsive Design: The website is designed to work on both desktop and mobile devices.

How to Run the Project

Clone the repository:

Bash

git clone https://github.com/DarKnight594/Amazon_Project

Open the project folder:

Bash

cd Amazon_Project

Open amazon.html in your web browser. A live server extension for VS Code is recommended for the best development experience.

The project runs entirely on the front end, relying on the browser's capabilities and localStorage for data persistence.
