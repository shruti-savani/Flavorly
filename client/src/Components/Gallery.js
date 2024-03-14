import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import "../styles/gallery.css"
import Gtt from "./GoToTop/Gtt"
import Footer from "./Footer"
import axios from 'axios'

function Gallery() {

  const url = process.env.REACT_APP_BASE_URL;

  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    axios.get(`${url}/gallery`)
      .then((res) => {setGalleryPhotos(res.data)})
      .catch((err) => {console.log(err)})
  },[])

  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Navbar/>
      <div className="bg" style={{backgroundImage: `url(${url}/GalleryPage/bg.avif)`}}>
        <div className="bg-above flex flex-col justify-center items-center text-center">
            <h1 className="text-8xl">Our Gallery</h1>
            <p className="mt-12">Explore the visual feast of flavorly"s ambiance and cuisine!</p>
        </div>
      </div>
      <div className="gallery-container">
        {galleryPhotos.map((photo) => (
            <div className="gallery-item" key={photo._id} onClick={() => openImage(photo.image)}>
                <img src={`${url}/${photo.image}`} alt={photo.title}/>
            </div>
        ))}
      </div>
      <Footer/>
      <Gtt/>

      {selectedImage && (
        <div className="image-zoom-overlay" onClick={closeImage}>
          <div className="image-zoom">
            <img src={`${url}/${selectedImage}`} alt="Zoomed In" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
