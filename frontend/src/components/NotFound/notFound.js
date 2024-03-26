import React from "react";

import "./NotFound.css";
function NotFoundPage() {
  // Function to handle button click and navigate to previous page
  const redirectToPreviousPage = () => {
    window.history.back(); // Go back to the previous page using window.history
  };
  return (
    <body className="bodyError">
      <div className="h-screen w-screen bg-gray-100 flex items-center fgg">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-8xl font-dark font-bold text-white">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal text-white">
              Sorry we couldn't find this page.
            </p>
            <p className="mb-8 text-white">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <button className="btnBAck" onClick={redirectToPreviousPage}>
              <span>BACK</span>
            </button>
          </div>
          <div className="max-w-lg">
            <img
              src={require("../../assets/images/pngtree-green-home-png-image_4084720-removebg-preview.png")}
              alt=""
            />
          </div>
        </div>
      </div>
    </body>
  );
}

export default NotFoundPage;
