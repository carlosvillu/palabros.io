import { ReactElement } from 'react'

import styles from './index.module.css'

interface Props {
  word: string
  points: number
}

function Tag ({ word, points }: Props): ReactElement {
  return <span className={styles.container}>
    <span>{word}</span>
    <sub className={styles.sub}>{points}</sub>
  </span>
}

export default Tag
