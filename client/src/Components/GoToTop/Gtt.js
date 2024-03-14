import React, { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function Gtt() {
  const [goToTopVisible, setGoToTopVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollThreshold = 200;

    setGoToTopVisible(scrollTop > scrollThreshold);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      <button
        className={`scroll-to-top-button ${goToTopVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        <ArrowUpwardIcon />
      </button>
    </div>
  );
}

export default Gtt;
