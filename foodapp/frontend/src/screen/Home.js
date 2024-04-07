import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [search , setSearch]=useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response =  await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="true"
        
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{zIndex:'10'}}>
              <div className="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                
              </div>
            </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/2000*2000/?burger"
              className=" carousel-img d-block w-100"
              alt="https://source.unsplash.com/random/900*600/?burger"
              style={{filter:'brightness(50%)'}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/2000*2000/?pizza"
              className="carousel-img d-block w-100"
              alt="https://source.unsplash.com/random/900*600/?pizza"
              style={{filter:'brightness(50%)'}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/2000*2000/?fries"
              className="carousel-img d-block w-100"
              alt="https://source.unsplash.com/random/900*600/?fries"
              style={{filter:'brightness(50%)'}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-4 m-3 text-white">
                  {data.CategoryName}
                </div>
                <hr className="text-white" />
                {foodItem !== [] ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItems) => {
                      return (
                      
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card 
                            foodItem = {filterItems}
                            options={filterItems.options[0]}
                          > </Card>
                          </div>
                        
                      );
                    })
                ) : (
                  <div>no data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
