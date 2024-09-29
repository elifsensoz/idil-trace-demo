// pages/[id]/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ImagePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL
  console.log('Current ID:', id);

  const [cropImages, setCropImages] = useState([]);
  const [traceImages, setTraceImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Single index for both lists

  useEffect(() => {
    if (!id) return; // id tanımlı değilse hiçbir şey yapma
  
    const fetchImages = async (directory) => {
      const response = await fetch(`/api/images?dir=${encodeURIComponent(directory)}`);
      if (!response.ok) {
        throw new Error(`Error fetching images from ${directory}`);
      }
      return await response.json();
    };
  
    const fetchAllImages = async () => {
      try {
        const [cropData, traceData] = await Promise.all([
          fetchImages(`${id}/crop`),
          fetchImages(`${id}/demo`),
        ]);
  
        setCropImages(cropData);
        setTraceImages(traceData);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
  
    fetchAllImages();
  }, [id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= Math.max(cropImages.length, traceImages.length) ? 0 : newIndex;
    });
  };

  return (
    <div>
      <h2>Crop Images</h2>
      {cropImages.length > 0 ? (
        <div>
          <img
            //src = "/assets/0bc07337743ba8a989eb940729daa1bc/crop/000015_0.png"
            src={`/assets/${id}/crop/${cropImages[currentIndex % cropImages.length].name}`}
            //src={cropImages[currentIndex % cropImages.length].url}
            alt={cropImages[currentIndex % cropImages.length].name}
          />
          <p>{cropImages[currentIndex % cropImages.length].name}</p>
        </div>
      ) : (
        <p>No Crop Images available.</p>
      )}

      <h2>Trace Images</h2>
      {traceImages.length > 0 ? (
        <div>
          <img
            src={`/assets/${id}/demo/${traceImages[currentIndex % traceImages.length].name}`}
            alt={traceImages[currentIndex % traceImages.length].name}
          />
          <p>{traceImages[currentIndex % traceImages.length].name}</p>
        </div>
      ) : (
        <p>No Trace Images available.</p>
      )}

      <button onClick={handleNext}>Next Image</button>
    </div>
  );
};

export default ImagePage;
