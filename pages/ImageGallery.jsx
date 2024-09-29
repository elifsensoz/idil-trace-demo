"use client"
// components/ImageGallery.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/images');
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return <p>Loading images...</p>;
  }

  const currentImage = images[currentIndex];

  return (
    <div>
      <Link href={`/detail/${currentImage.key}`}>
        <Image
          src={`/assets/traces/${currentImage.name}`}
          alt={currentImage.key}
          width={300}
          height={200}
        />
      </Link>
      <button onClick={nextImage}>Sonraki Resim</button>
    </div>
  );
};

export default ImageGallery;
