import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/about.css";
import Gtt from "./GoToTop/Gtt";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import axios from "axios";

function About() {

  const [chefsList, setChefsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = process.env.REACT_APP_BASE_URL;

  const { section } = useParams();

  useEffect(() => {
    axios
      .get(`${url}/about`)
      .then((res) => {
        setChefsList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const shouldDisplayImageFirst = (index) => {
    return index % 2 === 0;
  };

  useEffect(() => {
    if (section && !isLoading) {
      const targetSection = document.getElementById(section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section, isLoading]);

  return (
    <div>
      <Navbar />

      <div className="about-bg mb-24">
        <div className="about-above flex flex-col justify-center items-center text-center">
          <h1 className="text-8xl">About Us</h1>
          <p className="mt-12">
            Taste our delight, meet our team, know more about us!
          </p>
        </div>
      </div>

      <div className="about-content">
        <img src="/AboutPage/p1.png" className="png1 h-52 absolute" />
        <img src="/AboutPage/p2.png" className="png2 h-52 absolute" />

        <div className="about-snippet text-center">
          <h3 className="text-1xl mt-2 tracking-widest uppercase text-slate-400">
            About restaurant
          </h3>
          <h1 className="text-5xl uppercase mt-6 tracking-wide">
            Enjoy an exceptional journey of taste
          </h1>
          <p className="mt-6">
            Welcome to Flavorly, where culinary excellence meets a feast for the
            senses.
          </p>
          <br />
          <p className="pl-56 pr-56">
            Embrace a symphony of flavors as you explore our diverse menu,
            ranging from contemporary twists on classic favorites to globally
            inspired culinary creations. At Flavorly, we believe in using only
            the freshest and finest ingredients, sourced with care to guarantee
            the highest quality in every bite. Whether you"re craving a
            comforting bowl of spinach rice or indulging in our signature veg
            spring rolls, each dish is a testament to our commitment to flavor,
            quality, and the artistry of fine dining.
          </p>
        </div>
      </div>

      <div className="about-img pt-10 pb-10">
        <div className="flex flex-wrap justify-evenly">
          <img
            src={`${url}/GalleryPage/p3.avif`}
            alt="gallery image"
            className="about-img1 a-img"
          />
          <img
            src={`${url}/GalleryPage/p10.jpg`}
            alt="gallery image"
            className="about-img2 a-img"
          />
          <img
            src={`${url}/GalleryPage/p5.jpg`}
            alt="gallery image"
            className="about-img3 a-img"
          />
        </div>
      </div>

      <div className="about-chef text-center" id="chefs">
        <div className="chef-heading text-white h-56 p-10 flex flex-col justify-center items-center">
          <h3 className="text-1xl tracking-widest uppercase flex flex-col items-center">
            About Chef
            <hr style={{ width: "170px", marginTop: "5px" }} />
          </h3>
          <h1 className="text-5xl uppercase mt-6 tracking-widest">
            Meet Our Chefs
          </h1>
          <p className="mt-6 tracking-widest">
            Get to know the amazing chefs who bring deliciousness to your table!
          </p>
        </div>

        {chefsList.map((chef, index) => (
          <div
            className={`chef ${
              shouldDisplayImageFirst(index) ? "image-first" : "details-first"
            }`}
            key={chef._id}
          >
            <img
              src={`${url}/${chef.image}`}
              className="chef-img p-14"
              alt={`Chef ${index + 1}`}
            />
            <div className="chef-info flex flex-col justify-center">
              <h1 className="pt-14 uppercase text-2xl tracking-widest font-bold">
                {chef.name}
              </h1>
              <p className="uppercase tracking-widest">{chef.designation}</p>
              <p className="chef-description mt-10 pr-14 pl-14">{chef.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="about-quality flex justify-around mb-10 mt-10">
        <div className="about-menu flex flex-col items-center w-1/3">
          <RestaurantMenuIcon
            fontSize="large"
            style={{
              color: "white",
              backgroundColor: "#dcb075",
              borderRadius: "50%",
              padding: "20px",
              height: "80px",
              width: "80px",
            }}
          />
          <h1 className="text-2xl tracking-wider">Diversified Menu</h1>
          <p className="text-center p-10">
            Savor a variety of delicious dishes from our diverse menu, each
            crafted with care and bursting with unique flavors.
          </p>
        </div>
        <div className="about-food flex flex-col items-center w-1/3">
          <RestaurantRoundedIcon
            fontSize="large"
            style={{
              color: "white",
              backgroundColor: "#dcb075",
              borderRadius: "50%",
              padding: "20px",
              height: "80px",
              width: "80px",
            }}
          />
          <h1 className="text-2xl tracking-wider">Fresh Food</h1>
          <p className="text-center p-10">
            The food we choose is always fresh and carefully checked before
            processing
          </p>
        </div>
        <div className="about-space flex flex-col items-center w-1/3">
          <TableRestaurantIcon
            fontSize="large"
            style={{
              color: "white",
              backgroundColor: "#dcb075",
              borderRadius: "50%",
              padding: "20px",
              height: "80px",
              width: "80px",
            }}
          />
          <h1 className="text-2xl tracking-wider">Luxury Space</h1>
          <p className="text-center p-10">
            Indulge in a luxurious dining experience within our exquisite space,
            where every detail is tailored for your comfort and enjoyment.
          </p>
        </div>
      </div>

      <Footer />
      <Gtt />
    </div>
  );
}

export default About;
