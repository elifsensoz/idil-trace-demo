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
        <li>
          <Link href="/3c2f8b46c4ae5794161da1759cd61d91">Image 3</Link>
        </li>
        <li>
          <Link href="/48f59dad571e07dd2b218e87d0170e9f">Image 4</Link>
        </li>
        <li>
          <Link href="/a8341fa97ad40719aa4973384e047a8e">Image 5</Link>
        </li>
        <li>
          <Link href="/e90e92088e7e8bdf59daaec46cf76ac3">Image 6</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  )
}

export default Menu