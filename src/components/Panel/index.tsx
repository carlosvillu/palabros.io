import { ReactElement } from 'react'
import styles from './index.module.css'

interface Props {
  title?: string
  children: ReactElement
}

function Panel ({ title, children }: Props): ReactElement {
  return <div data-component='Panel' className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
    </div>
    <div className={styles.body}>
      {children}
    </div>
  </div>
}

export default Panel
