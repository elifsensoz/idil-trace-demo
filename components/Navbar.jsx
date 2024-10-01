'use client'
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="https://pointvos.github.io/" target="_blank" rel="noopener noreferrer">Point-VOS: Pointing Up Video Object Segmentation</Link>
      </div>
      
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background-color: #ffffff;
        }
        .logo  {
          color: white;
          font-size: 25px;
          text-decoration: none;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 20px;
        }
        .nav-links li {
          margin: 0;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
        }
        .nav-links a:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
