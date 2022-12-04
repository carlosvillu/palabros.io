import { ReactElement } from 'react'
import styles from './index.module.css'
import Hamburger from '../Icons/Hamburguer'

function Header (): ReactElement {
  return <header className={styles.header}>
    <div className="Header-Left"><h1 className="Header-Logo-Container">P</h1></div>
    <div className="Header-Rigth"><span className={styles.headerMenuContainer}><Hamburger /></span></div>
  </header >
}

export default Header
