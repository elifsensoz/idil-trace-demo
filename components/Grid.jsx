"use client"
import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/styles.module.css'

const gridItems = [
  {
    id: 1,
    url: 'https://ik.imagekit.io/yurybpegq/idil/menu/0bc07337743ba8a989eb940729daa1bc.gif?updatedAt=1727738066157', // GIF URL'sini buraya ekleyin
    link: '/0bc07337743ba8a989eb940729daa1bc', // Tıklanacak linki buraya ekleyin
  },
  {
    id: 2,
    url: 'https://ik.imagekit.io/yurybpegq/idil/menu/0d05fa3d5029996fc451030f8685f793.gif?updatedAt=1727738063204',
    link: '/0d05fa3d5029996fc451030f8685f793',
  },
  {
    id: 3,
    url: 'https://ik.imagekit.io/yurybpegq/idil/menu/3c2f8b46c4ae5794161da1759cd61d91.gif?updatedAt=1727738065410',
    link: '/3c2f8b46c4ae5794161da1759cd61d91',
  },
  {
    id: 4,
    url: 'https://ik.imagekit.io/yurybpegq/idil/menu/48f59dad571e07dd2b218e87d0170e9f.gif?updatedAt=1727738065783',
    link: '/48f59dad571e07dd2b218e87d0170e9f',
  },
  {
    id: 5,
    url: 'https://ik.imagekit.io/yurybpegq/idil/menu/a8341fa97ad40719aa4973384e047a8e.gif?updatedAt=1727738064176',
    link: '/a8341fa97ad40719aa4973384e047a8e',
  },
  {
    id: 6,
    url: 'https://ik.imagekit.io/yurybpegq/idil/menu/e90e92088e7e8bdf59daaec46cf76ac3.gif?updatedAt=1727738063206',
    link: '/e90e92088e7e8bdf59daaec46cf76ac3',
  },
];

const Grid = () => {
  return (
    <div className="grid-container">
      {gridItems.map((item) => (
        <Link key={item.id} href={item.link}>
          <div className="grid-item">
            <Image
              src={item.url}
              alt={`GIF ${item.id}`}
              width={300} // Genişliği buradan ayarlayın
              height={168.89} // Yüksekliği buradan ayarlayın
              className={styles.roundedimage}
            />
          </div>
        </Link>
      ))}
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px; // Hücreler arasındaki boşluk
        }
        .grid-item {
          cursor: pointer; // Tıklanabilir işareti
        }
      `}</style>
    </div>
  );
};

export default Grid;
