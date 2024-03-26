import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonShelter,
  faHammer,
  faBuildingUser,
  faMapLocationDot,
  faHouseFlag,
  faChartArea,
} from "@fortawesome/free-solid-svg-icons";

function PropertiesPage() {
  return (
    <div className="p-16">
      {/*=================================================== home Description--------------------------------================================ */}

      <div className="flex justify-center items-center flex-col">
        <div>
          <h1 className="mb-4 text-4xl font-medium">HOME Properties</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            neque ab quos, perspiciatis sit vel eveniet culpa corporis dolore
            assumenda deserunt quidem optio, veniam consequatur! Aliquid eius
            porro possimus cum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ea, inventore modi facere ullam quis suscipit sint
            fugiat eum, blanditiis necessitatibus velit dolorum laboriosam fugit
            veniam voluptate est rem fuga quod!
          </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <img
            src={require("../../assets/images/pexels-the-lazy-artist-gallery-1642125.jpg")}
            alt="fd"
            className="h-96 mr-2 w-4/5 rounded-lg"
          />
          <div className="flex flex-col justify-between h-96">
            <img
              src={require("../../assets/images/pexels-steve-johnson-2439928.jpg")}
              alt="left"
              className="h-1/2 mb-2 rounded-lg"
            />
            <img
              src={require("../../assets/images/pexels-magda-ehlers-636342.jpg")}
              alt="bottom-left"
              className="h-1/2 rounded-lg"
            />
          </div>
        </div>
      </div>
      {/*=================================================== About Description--------------------------------================================ */}

      <div className="flex justify-between my-10">
        <div className="w-1/2">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-4"></div>
            <span>FOR: SALE</span>
          </div>
          <h1 className="mb-4 text-2xl font-medium">Properties Tilte</h1>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p className="text-2xl font-semibold py-4">$455,222</p>
          <p className="mb-10">
            Est. $1,000/month{" "}
            <span className="text-blue-500 ml-4 cursor-pointer hover:text-blue-700">
              Get pre-approved
            </span>
          </p>

          <hr className="w-full border border-gray-500" />

          <h2 className="text-xl font-semibold mt-10">About This Home</h2>
          <p className="text-base text-gray-700 w-full my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            neque ab quos, perspiciatis sit vel eveniet culpa corporis dolore
            assumenda deserunt quidem optio, veniam consequatur! Aliquid eius
            porro possimus cum. Lorem ipsum dolor sit amet consectetur
          </p>
          <div className="flex justify-start justify-between w-1/2">
            <div className="flex justify-center flex-col">
              <div className="flex justify-start items-center my-2">
                <i className="text-green-500 text-xl mr-4">
                  <FontAwesomeIcon icon={faPersonShelter} />
                </i>
                <p>Rooms: 8</p>
              </div>
              <div className="flex justify-start items-center my-2">
                <i className="text-green-500 text-xl mr-4">
                  <FontAwesomeIcon icon={faHammer} />
                </i>
                <p> build in : 1999</p>
              </div>
              <div className="flex justify-start items-center my-2">
                <i className="text-green-500 text-xl mr-4">
                  <FontAwesomeIcon icon={faBuildingUser} />
                </i>
                <p>Floor: 12</p>
              </div>
            </div>
            <div className="flex justify-center flex-col">
              <div className="flex justify-start items-center my-2">
                <i className="text-green-500 text-xl mr-4">
                  <FontAwesomeIcon icon={faMapLocationDot} />
                </i>
                <p>Location: lebanon</p>
              </div>
              <div className="flex justify-start items-center my-2">
                <i className="text-green-500 text-xl mr-4">
                  <FontAwesomeIcon icon={faHouseFlag} />
                </i>
                <p>Style: Villa</p>
              </div>
              <div className="flex justify-start items-center my-2">
                <i className="text-green-500 text-xl mr-4">
                  <FontAwesomeIcon icon={faChartArea} />
                </i>
                <p>Area: 850km</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src={require("../../assets/images/pexels-magda-ehlers-636342.jpg")}
            alt="bottom-left"
            className="h-full rounded-lg w-3/5"
          />
        </div>
      </div>
      <hr className="w-full border border-gray-500" />
      {/*=================================================== Agent Description--------------------------------================================ */}
      <div className="flex justify-between">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mt-10">About The Agent</h2>
          <p className="text-base text-gray-700 w-full my-4 w-3/4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            neque ab quos, perspiciatis sit vel eveniet culpa corporis dolore
            assumenda deserunt quidem optio, veniam consequatur! Aliquid eius
            porro possimus cum. Lorem ipsum dolor sit amet consectetur
          </p>
          <h4 className="text-lg font-medium">Listed by John :</h4>
          <div className="flex justify-around items-center my-4 p-3 border-2 border-green-500 rounded-lg w-1/2">
            <img
              src={require("../../assets/images/pexels-the-lazy-artist-gallery-1642125.jpg")}
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
            <div className="ml-8 w-full">
              <p className="font-bold">John Doe</p>
              <p className="font-medium">john@gmail.com</p>
              <button className="float-right p-2 bg-green-600 border text-white border-green-500 rounded-lg mt-2 hover:bg-transparent hover:text-gray-500 transition duration-300 ease-in-out">
                view more
              </button>
            </div>
          </div>
        </div>
        {/*=================================================== Form asking--------------------------------================================ */}

        <div className="form-container w-1/2 mt-12">
          <h2 className="text-xl font-semibold my-10">
            Ask john agent a question:
          </h2>
          <form className="form">
            <div className="form-group mb-4">
              <label
                htmlFor="email"
                className="block mb-1 text-gray-500 font-semibold"
              >
                Your Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded border border-gray-400 focus:border-purple-500 focus:outline-none bg-transparent text-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="textarea"
                className="block mb-1 text-gray-500 font-semibold"
              >
                How Can We Help You?
              </label>
              <textarea
                name="textarea"
                id="textarea"
                rows={5}
                required
                className="w-full px-4 py-2 rounded border border-gray-400 focus:border-purple-500 focus:outline-none bg-transparent text-gray-600 placeholder-gray-400 resize-none"
                placeholder="Ask your question here..."
                defaultValue={""}
              />
            </div>
            <button
              type="submit"
              className="form-submit-btn flex items-center justify-center px-4 py-2 rounded border border-gray-400 bg-gray-800 text-gray-200 font-semibold hover:bg-white hover:text-gray-800 hover:border-green-500 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;
