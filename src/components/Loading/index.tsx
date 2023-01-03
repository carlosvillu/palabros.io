import { ReactElement, useEffect } from 'react'
import styles from './index.module.css'

interface Props {
  show: boolean
}

function Loading ({ show }: Props): ReactElement {
  useEffect(() => {
    if (show) { document.body.style.overflowY = 'hidden' } else {
      document.body.style.overflowY = 'unset'
    }
  }, [show])

  // @ts-expect-error
  if (!show) return false

  return <div className={styles.loader} >
    <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
  </div>
}

export default Loading
