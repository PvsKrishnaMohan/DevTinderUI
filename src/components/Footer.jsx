import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} -Developed by P.V.S Krishna Mohan
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
