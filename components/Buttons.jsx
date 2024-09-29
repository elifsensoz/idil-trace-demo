import styles from '@styles/styles.module.css'

const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.button}>Button 1</button>
          <button className={styles.button}>Button 2</button>
          <button className={styles.button}>Button 3</button>  
    </div>
  )
}

export default Buttons