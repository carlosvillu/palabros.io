import { ReactElement } from 'react'
import './index.css'
import Hamburger from '../Icons/Hamburguer'

function Header (): ReactElement {
  return <header className="Header debug">
    <div className="Header-Left"><h1 className="Header-Logo-Container">P</h1></div>
    <div className="Header-Rigth"><span className="Header-Menu-Container debug"><Hamburger /></span></div>
  </header >
}

export default Header
