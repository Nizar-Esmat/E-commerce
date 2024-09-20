import React from 'react';

function Footer(props) {
    return (
        <div>
            <footer>
                <div class="footer-container">
                    <div class="footer-column">
                        <h3>About Us</h3>
                        <p>We provide the best solutions for your business needs. Our mission is to deliver high-quality
                            products and services.</p>
                    </div>

                    <div class="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Projects</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3>Contact</h3>
                        <p>Email: info@example.com</p>
                        <p>Phone: +123 456 7890</p>
                        <p>Location: 123 Main St, City, Country</p>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;