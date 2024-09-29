import styles from '@styles/styles.module.css'
import Link from 'next/link';


const Menu = () => {
  return (
    <div>
      <h2>Navigate to Image Pages</h2>
      <ul>
        <li>
          <Link href="/0bc07337743ba8a989eb940729daa1bc">Image 1</Link>
        </li>
        <li>
          <Link href="/0d05fa3d5029996fc451030f8685f793">Image 2</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  )
}

export default Menu