import styles from '@styles/styles.module.css'
import Trace from '@components/Trace';
import Slider from '@components/Slider'
import Buttons from '@components/Buttons';

const TracingPage = () => {
  return (
      <main className={styles.main}>
      <div className={styles.middle}>
      <Trace/>
        </div>
        <div className={styles.ctas}>
        <Slider/>
        </div>
        <div className={styles.middle}>   
        <Buttons/>      
        </div>
      </main>

    
  )
}

export default TracingPage