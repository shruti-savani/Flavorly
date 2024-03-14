import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import Gtt from "./GoToTop/Gtt";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <nav className="box1 nav-bar">
        <Navbar isHomePage={true} />

        <div className="nav2 text-white">
          <h1 className="uppercase">
            Taste the Extraordinary<br></br>Crafted Cuisine, Delivered with Love
          </h1>
          <p className="tracking-widest">
            Where Every Dish Tells a Delicious Story. Unleashing Culinary Magic
            at Your Fingertips.
          </p>
          <div className="nav-menu-button">
            <Button
              variant="contained"
              style={{
                backgroundColor: "rgb(255, 136, 39)",
                borderColor: "rgb(255, 136, 39)",
                marginTop: "40px",
                borderRadius: "100rem",
              }}
              href="/menu"
            >
              Discover menu
            </Button>
          </div>
        </div>
      </nav>

      <div className="box2">
        <h1 className="text-6xl uppercase p-10 ">Our Mission</h1>
        <div className="mission-content flex p-5">
          <p className="pr-18 pl-20">
            At Flavorly, our mission is to redefine the culinary experience by
            bringing together a symphony of flavors that tantalize the taste
            buds and create unforgettable dining moments. We believe in the
            transformative power of food to evoke emotions, connect people, and
            make every meal a celebration. Through Flavorly, we aim to be more
            than just an online restaurant – we aspire to be a culinary
            destination where diversity, innovation, and quality converge on
            every plate. Our commitment begins with sourcing the finest,
            freshest ingredients from local producers, ensuring that each dish
            is a testament to the richness of regional flavors. We strive to
            celebrate the cultural tapestry of cuisine, offering a diverse menu
            that caters to various tastes and dietary preferences. Whether you
            crave a comforting classic or an adventurous fusion dish, Flavorly
            is your passport to a world of culinary exploration.
          </p>
          <p className="pr-18 pl-20">
            At the heart of our mission is the dedication to sustainability and
            responsible dining. We recognize the impact of our choices on the
            environment and strive to minimize our footprint. From supporting
            local farmers to minimizing food waste, Flavorly is committed to
            ethical and eco-friendly practices. Our mission extends beyond the
            plate, aiming to contribute positively to the communities we serve
            and the planet we call home. Flavorly is more than a place to order
            food; it"s a platform for food enthusiasts, a community that
            appreciates the artistry of gastronomy. Through our interactive
            platform, we encourage a dialogue between chefs and customers,
            fostering a shared appreciation for the culinary craft. Our mission
            is to create a dynamic space where food becomes an experience, and
            every meal tells a story.In essence, Flavorly"s mission is to
            redefine the way you experience food – to make each bite a journey,
            each dish a celebration, and every dining moment a memorable
            occasion. Join us on this flavorful adventure, where passion meets
            plate.
          </p>
        </div>
      </div>

      <div className="box3 relative" id="menu-categories">
      <h3 className=" home-menu-heading text-center text-1xl pt-4 tracking-widest uppercase text-white font-semibold">view our menu</h3>
      <h2 className="text-center text-6xl pt-5 pb-5 tracking-wider font-semibold">Simple. Classic. Delicious.</h2>
        <div className="flex justify-center">
          <div className="home-menu-below h-96 w-4/5 rounded-3xl absolute bg-white mt-32"></div>
        </div>
        <div className="box3-menu-categories flex flex-wrap justify-center pb-5">
          <Link to="/menu/starter" style={{ marginRight: "30px" }}>
            <Card className="card starter">
              <CardMedia
                component="img"
                image="HomePage/starter.jpg"
                className="menu-card-img"
              ></CardMedia>
            </Card>
            <h1
              className="menu-names h-12 uppercase text-center flex justify-center items-center rounded-3xl text-white font-bold"
              style={{
                fontFamily: "Montserrat",
                letterSpacing: "5px",
                fontSize: "1.2rem",
                textShadow: "#000000 1px 1px 2px",
                marginLeft: "15px",
                marginBottom: "15px",
                marginRight: "15px",
                marginTop: "30px",
                zIndex: 3,
                position: "relative",
              }}
            >
              Starters
            </h1>
          </Link>
          <Link to="/menu/maincourse" style={{ marginRight: "30px" }}>
            <Card className="card maincourse">
              <CardMedia
                component="img"
                image="HomePage/maincourse.avif"
                className="menu-card-img"
              ></CardMedia>
            </Card>
            <h1
              className="menu-names h-12 uppercase text-center flex justify-center items-center rounded-3xl text-white font-bold"
              style={{
                fontFamily: "Montserrat",
                letterSpacing: "5px",
                fontSize: "1.2rem",
                textShadow: "#000000 1px 1px 2px",
                marginLeft: "15px",
                marginBottom: "15px",
                marginRight: "15px",
                marginTop: "30px",
                zIndex: 3,
                position: "relative",
              }}
            >
              Main Course
            </h1>
          </Link>
          <Link to="/menu/drinks" style={{ marginRight: "30px" }}>
            <Card className="card drinks">
              <CardMedia
                component="img"
                image="HomePage/drinks.avif"
                className="menu-card-img"
              ></CardMedia>
            </Card>
            <h1
              className="menu-names h-12 uppercase text-center flex justify-center items-center rounded-3xl text-white font-bold"
              style={{
                fontFamily: "Montserrat",
                letterSpacing: "5px",
                fontSize: "1.2rem",
                textShadow: "#000000 1px 1px 2px",
                marginLeft: "15px",
                marginBottom: "15px",
                marginRight: "15px",
                marginTop: "30px",
                zIndex: 3,
                position: "relative",
              }}
            >
              Drinks
            </h1>
          </Link>
          <Link to="/menu/dessert">
            <Card className="card dessert">
              <CardMedia
                component="img"
                image="HomePage/dessert.avif"
                className="menu-card-img"
              ></CardMedia>
            </Card>
            <h1
              className="menu-names h-12 uppercase text-center flex justify-center items-center rounded-3xl text-white font-bold"
              style={{
                fontFamily: "Montserrat",
                letterSpacing: "5px",
                fontSize: "1.2rem",
                textShadow: "#000000 1px 1px 2px",
                marginLeft: "15px",
                marginBottom: "15px",
                marginRight: "15px",
                marginTop: "30px",
                zIndex: 3,
                position: "relative",
              }}
            >
              Desserts
            </h1>
          </Link>
        </div>
      </div>

      <div className="box4 flex justify-center">
        <Card className="box4-card">
          <CardMedia
            component="img"
            image="HomePage/box4-1.jpg"
            className="box4-img"
          ></CardMedia>
        </Card>
        <div className="box4-content">
          <h3 className="text-center text-1xl mt-2 tracking-widest uppercase">
            About restaurant
          </h3>
          <h1 className="text-center text-5xl uppercase mt-6 tracking-wide">
            Enjoy an exceptional journey of taste
          </h1>
          <p className="text-center mt-6">
            Welcome to Flavorly, where culinary excellence meets a feast for the
            senses.
          </p>
          <br />
          <p className="text-center">
            Embrace a symphony of flavors as you explore our diverse menu,
            ranging from contemporary twists on classic favorites to globally
            inspired culinary creations. At Flavorly, we believe in using only
            the freshest and finest ingredients, sourced with care to guarantee
            the highest quality in every bite. Whether you"re craving a
            comforting bowl of spinach rice or indulging in our signature veg
            spring rolls, each dish is a testament to our commitment to flavor,
            quality, and the artistry of fine dining.
          </p>
          <div className="flex justify-center">
            <Button
              href="/about"
              variant="contained"
              style={{
                marginTop: "40px",
                backgroundColor: "rgb(184, 117, 63)",
                width: "200px",
                borderRadius: "100rem",
              }}
            >
              Read more about us
            </Button>
          </div>
        </div>
        <Card className="box4-card">
          <CardMedia
            component="img"
            image="HomePage/box4-2.jpg"
            className="box4-img"
          ></CardMedia>
        </Card>
      </div>

      <div className="box5">
        <div className="box5-head">
          <h4 className="text-center text-2xl pt-8 pl-20 pr-20 pb-8 text-white">
            Experience comfort and flavor like never before, when you dine with
            us!
          </h4>
        </div>
        <div className="box5-content m-20 flex flex-wrap justify-center">
          <div className="box5-img-container relative">
            <img className="box5-img" src="HomePage/wifi.jpg" alt="wifi" />
            <div className="box5-img-above">
              <p className="box5-img-text text-center">Free Wifi</p>
            </div>
          </div>

          <div className="box5-img-container relative">
            <img className="box5-img" src="HomePage/relax.jpg" alt="relax" />
            <div className="box5-img-above">
              <p className="box5-img-text text-center">Relaxing Atmosphere</p>
            </div>
          </div>

          <div className="box5-img-container relative">
            <img className="box5-img" src="HomePage/enjoy.jpg" alt="enjoy" />
            <div className="box5-img-above">
              <p className="box5-img-text text-center">Delicious Food</p>
            </div>
          </div>
        </div>
      </div>

      <div className="box6 flex justify-center items-center">
        <div className="box6-content p-3 bg-white flex">
          <img
            src="HomePage/box6-1.jpg"
            className="box6-img"
            alt="cooking img"
          />
          <div className="box6-text">
            <div className="flex justify-center">
              <img src="HomePage/chef.png" className="h-20" alt="chef-icon" />
            </div>
            <h4 className="box6-title text-center text-4xl pt-5 font-bold uppercase">
              Meet the Chefs
            </h4>
            <p className="chef-snippet mt-5">
              Get to know the amazing chefs who bring deliciousness to your
              table! Click below to meet our talented chefs and discover the
              passion, skill, and innovation that go into crafting each
              unforgettable dish.
            </p>
            <Button
              href="/about/chefs"
              variant="contained"
              style={{
                marginTop: "30px",
                backgroundColor: "rgb(206, 125, 85)",
                borderRadius: "100rem",
              }}
            >
              Learn More
            </Button>
          </div>
          <img
            src="HomePage/box6-2.jpg"
            className="box6-img"
            alt="cooking img"
          />
        </div>
      </div>

      <div className="box7 flex flex-col items-center justify-center">
        <p className="tracking-widest font-semibold text-slate-500 uppercase">
          great moments!
        </p>
        <hr className="mt-1 text-black w-52 "></hr>
        <h1 className="tracking-widest text-5xl mb-10 uppercase mt-2 font-semibold text-center">
          View Our Gallery
        </h1>
        <div className="flex flex-wrap justify-center">
          <a href="/gallery">
            <img
              src="HomePage/box7-1.jpg"
              alt="gallery image"
              className="box7-img"
            />
          </a>
          <a href="/gallery">
            <img
              src="HomePage/box7-2.jpg"
              alt="gallery image"
              className="box7-img"
            />
          </a>
          <a href="/gallery">
            <img
              src="HomePage/box7-3.jpg"
              alt="gallery image"
              className="box7-img"
            />
          </a>
          <a href="/gallery">
            <img
              src="HomePage/box7-4.jpg"
              alt="gallery image"
              className="box7-img"
            />
          </a>
        </div>
        <Button
          href="/gallery"
          variant="contained"
          style={{
            marginTop: "40px",
            backgroundColor: "brown",
            marginBottom: "20px",
            borderRadius: "100rem",
          }}
        >
          View Our Gallery
        </Button>
      </div>

      <div className="box8 flex justify-center flex-wrap">
        <div className="box8-1 w-3/6 p-10">
          <p className="box8-title uppercase tracking-wider font-semibold pb-3">
            Online reservation
          </p>
          <h1 className="text-5xl uppercase tracking-wide mb-10">
            Book a table
          </h1>
          <p className="mt-2 tracking-widest mb-10">
            Planning a meal with friends or a special date? Choose us for the
            perfect dining experience. Reserve your table today and make your
            moments memorable!
          </p>
          <p className="box8-title uppercase tracking-wider font-semibold pb-3 mt-3">
            Booking information
          </p>
          <p className="mt-2 tracking-widest">
            Mail: flavorly24@gmail.com
            <br />
            Call to reserve a table: (+91) 9876543210
          </p>
          <Button
            href="/reservation"
            variant="outlined"
            style={{
              marginTop: "50px",
              color: "#ffc48a",
              border: "1px solid #ffc48a",
              fontSize: "18px",
              borderRadius: "100rem",
            }}
          >
            Book a table online
          </Button>
        </div>
        <div className="box8-2 w-3/6 p-10">
          <p className="box8-title uppercase tracking-wider font-semibold pb-3">
            Address restaurant
          </p>
          <h1 className="text-5xl uppercase tracking-wide mb-10">
            visit Us At
          </h1>
          <p className="mt-2 tracking-widest mb-10">
            201, Flavorly Family restaurant, Safal Square, Udhana - Magdalla Rd,
            Vesu, Surat, Gujarat 395007
          </p>
          <p className="box8-title uppercase tracking-wider font-semibold pb-3">
            Open Hour Time
          </p>
          <p className="mt-2 tracking-widest mb-10">
            Mon - Fri : 9:00am - 22:00pm,
            <br />
            Sat - Sun: 11:00am - 23:00pm,
            <br />
            Holidays: Closed
          </p>
        </div>
      </div>

      <div className="box9 text-center flex justify-center items-center">
        <div className="box9-above bg-white p-10">
          <h1 className="text-4xl tracking-wider uppercase font-semibold">
            Had a Great time and enjoyed?
          </h1>
          <p className="box9-p1 mt-2 tracking-widest font-semibold">
            Your thoughts matter: Share your feedback, shape our flavorful
            journey!
          </p>
          <p className="box9-p2 mt-9 tracking-wider">
            Click below to give your feedback
          </p>
          <Button
            href="/feedback"
            variant="contained"
            style={{ marginTop: "9px", borderRadius: "100rem" }}
            color="success"
          >
            Give Feedback
          </Button>
        </div>
      </div>

      <div className="box10">
        <Footer />
      </div>

      <Gtt />
    </div>
  );
}

export default Home;
