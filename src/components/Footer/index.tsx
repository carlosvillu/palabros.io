import { ReactElement } from 'react'
import styles from './index.module.css'

const now = new Date()

function Footer (): ReactElement {
  return <footer data-component='Footer' className={styles.footer}>
    <span className={styles.logo}>PALABROS.IO</span>
    <ol className={styles.links} hidden>
      <li className={styles.link}><a>Resolver crucigrama el País</a></li>
      <li className={styles.link}><a>Resolver crucigrama del domingo</a></li>
      <li className={styles.link}><a>Resolver crucigrama la vanguardia</a></li>
    </ol>
    <a className={styles.mail} href="mailto: hola@palabros.io">¿Quieres contactar? Escribenos a hola@palabros.io</a>
    <span>{`Hecho con ❤️  en Málaga en ${now.getUTCFullYear()}`}</span>
  </footer >
}

export default Footer
