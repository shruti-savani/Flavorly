import React from "react"
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

function Footer() {
  return (
    <div className="footer-box">
      <div className="footer1 flex">
        <div className="footer-contact w-2/6 p-10">
          <h1 className="uppercase tracking-widest text-2xl pb-5">Location</h1>
          <div className="mt-5">
              <ul>
                  <li>Booking contact</li>
                      <p className="mt-2 mb-2 tracking-widest">
                      Mail: flavorly24@gmail.com
                      <br />
                      Call to reserve a table: (+91) 9876543210
                      </p>
                  <li>Address</li>
                  <p className="mt-2 tracking-widest">
                      201, Flavorly Family restaurant, Safal Square, Udhana - Magdalla Rd,
                      Vesu, Surat, Gujarat 395007
                  </p>
              </ul>
          </div>
        </div>
        <div className="footer-center w-2/6 p-10">
          <h1 className="text-8xl">Flavorly</h1>
          <p className="tracking-widest mt-3">Taste the extraordinary crafted Cuisine, delivered with love</p>
          <div className="flex justify-evenly mt-10">
              <a href="https://instagram.com"><InstagramIcon/></a>
              <a href="https://facebook.com"><FacebookIcon/></a>
              <a href="https://twitter.com"><TwitterIcon/></a>
              <a href="mailto: flavorly24@gmail.com"><EmailRoundedIcon/></a>
          </div>
        </div>
        <div className="footer-opentime w-2/6 p-10">
          <h1 className="uppercase tracking-widest text-2xl pb-5">Opening hour time</h1>
          <p className="mt-5 tracking-widest mb-10">
              Mon - Fri : 9:00am - 22:00pm,<br/> 
              Sat - Sun: 11:00am - 23:00pm,<br/> 
              Holidays: Closed
          </p>
        </div>
      </div>
      <div className="footer2 cr text-center p-10 flex flex-col items-center">
        <hr/>
        <p className="pt-8">Copyright &copy; 2024 Flavorly. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
