import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Cart from "../screen/Cart";
import Modal from "../Modal";
import {useCart} from "./ContextReducer"

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">
            FoodHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div>
                <div
                  className="btn bg-white text-black  mx-2"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart{"  "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                  {cartView ? (
                    <Modal
                      onClose={() => 
                        {
                          setCartView(false)}
                      }
                    >
                      <Cart/>
                    </Modal>
                  ) : null}
                </div>
                <div
                  className="btn bg-white text-danger  mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn bg-white text-black mx-1" to="/login">
                  Login
                </Link>

                <Link
                  className="btn bg-white text-black  mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
