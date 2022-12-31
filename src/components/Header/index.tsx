import { ReactElement } from 'react'
import styles from './index.module.css'
import Hamburger from '../Icons/Hamburguer'

function Header (): ReactElement {
  return <header data-component='Header' className={styles.header}>
    <div className="Header-Left"><h1 className={styles.logo}>PALABROS.IO</h1></div>
    {false && <div className="Header-Rigth"><span className={styles.headerMenuContainer}><Hamburger /></span></div>}
  </header >
}

export default Header
