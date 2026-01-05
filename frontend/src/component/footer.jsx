import React from "react";

function Footer() {
  return (
    <footer className="row bg-secondary text-white text-center p-3 mt-3 ">
      <div className="col">© {new Date().getFullYear()} Rebel Threads</div>
    </footer>
  );
}

export default Footer;