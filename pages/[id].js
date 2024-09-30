// pages/[id]/index.js
import styles from '@styles/styles.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@components/Navbar';
import Link from 'next/link';


var ImageKit = require("imagekit");
const ImagePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
  const privateKey = process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

  const [cropImages, setCropImages] = useState([]);
  const [traceImages, setTraceImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Single index for both lists

  useEffect(() => {
    if (!id) return; // id tanımlı değilse hiçbir şey yapma

    var imagekit = new ImageKit({
      publicKey : publicKey,
      privateKey : privateKey,
      urlEndpoint : urlEndpoint
  });
  
  imagekit.listFiles({
      path: `idil/${id}/demo`,
      limit : 300
  }, function(error, result) { 
      if(error) console.log(error);
      else setTraceImages(result);
  });
  
  imagekit.listFiles({
    path: `idil/${id}/demo`,
    limit : 300
}, function(error, result) { 
    if(error) console.log(error);
    else setCropImages(result);
});
  }, [id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= Math.max(cropImages.length, traceImages.length) ? 0 : newIndex;
    });
  };



  return (
    <div className={styles.idpage}>
      <Navbar/>
      <Link href="/">
          <button className={styles.stickybutton}>Home</button>
        </Link>
      <div className={styles.middle}>
          <Image
            src={`/assets/${id}/trace.jpeg`}
            alt={id}
            width={840} // İstediğin genişliği belirt
            height={472.5} // İstediğin yüksekliği belirt
            //title={`${title1}`} // Dinamik olarak title ekle
          />
        </div>
        <div className={styles.ctas}>

      {traceImages.length > 0 ? (
        <div>
          <Image
            src={`/assets/${id}/demo/${traceImages[currentIndex % traceImages.length].name}`}
            alt={traceImages[currentIndex % traceImages.length].name}
            width={640} // İstediğin genişliği belirt
            height={360} // İstediğin yüksekliği belirt
          />
        </div>
      ) : (
        <p>No Trace Images available.</p>
      )}

      {cropImages.length > 0 ? (
        <div>
          <Image
            src={`/assets/${id}/crop/${cropImages[currentIndex % cropImages.length].name}`}
            alt={cropImages[currentIndex % cropImages.length].name}
            width={100} // İstediğin genişliği belirt
            height={100} // İstediğin yüksekliği belirt
          />
        </div>
      ) : (
        <p>No Crop Images available.</p>
      )}
      </div>
      <div className={styles.buttons}>
          <button className={styles.button} onClick={handleNext} style={{ color: "#000000", backgroundColor: "#A4F89F" }} > YES</button>
          <button className={styles.button} onClick={handleNext} style={{ color: "#000000", backgroundColor: "#D5D5D5" }} > AMBIGUOUS</button>
          <button className={styles.button} onClick={handleNext} style={{ color: "#000000", backgroundColor: "#FF644E" }} > NO</button>  
        </div>
    </div>
  );
};

export default ImagePage;
