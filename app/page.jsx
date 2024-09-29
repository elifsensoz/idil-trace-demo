import styles from '@styles/styles.module.css'
import TracingPage from '@pages/TracingPage';
import Menu from '@pages/Menu';
import ImageGallery from '@pages/ImageGallery';

const Home = () => {
  return (
    <section className={styles.page}>
         <div className={styles.main}>
         <Menu />
         </div>
    </section>
  )
}

export default Home