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
  const [isActive, setIsActive] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Single index for both lists
  const [startTime, setStartTime] = useState(null);     // Zamanlayıcı başlangıcı
  const [elapsedTime, setElapsedTime] = useState(0);    // Geçen süre
  const [totalTime, setTotalTime] = useState(null);     // Toplam süre

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
    if (!startTime) {
      setStartTime(Date.now());
    }
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      // Eğer yeni index her iki dizinin uzunluğunu aşarsa
      if (newIndex >= Math.max(cropImages.length, traceImages.length)) {
        setIsActive(false);  // isActive bayrağını false yap
        setTotalTime(Math.floor((Date.now() - startTime) / 1000)); 
        return prevIndex;    // Indexi sabit tut (arttırma)
      } else {
        return newIndex;     // Yeni indexi döndür
      }
    });
  };

  useEffect(() => {
    let timer;
    if (startTime && isActive) {
      // Eğer zamanlayıcı başlatılmışsa her saniye geçen süreyi güncelle
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));  // Saniye cinsinden hesapla
      }, 1000);
    }

    return () => clearInterval(timer);  // Bileşen temizlenirken zamanlayıcıyı temizle
  }, [startTime, isActive]);



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
      
      {isActive && (<div className={styles.buttons}>
          <button className={styles.button} onClick={handleNext} style={{ color: "#000000", backgroundColor: "#A4F89F" }} > YES</button>
          <button className={styles.button} onClick={handleNext} style={{ color: "#000000", backgroundColor: "#D5D5D5" }} > AMBIGUOUS</button>
          <button className={styles.button} onClick={handleNext} style={{ color: "#000000", backgroundColor: "#FF644E" }} > NO</button>  
        </div> )}
        {!isActive && (<div className={styles.buttons}>
          <p> Annotation is done! Total Time: {totalTime} seconds</p>
          </div> )}
    </div>
  );
};

export default ImagePage;
