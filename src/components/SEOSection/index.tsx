import { ReactElement } from 'react'
import { ALPHABET, fromPathToFilter } from '../../js/strings'
import styles from './index.module.css'

function SEOSection (): ReactElement {
  const filters = fromPathToFilter(window.location.pathname)
  return <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>Palabras por longitud</h2>
    </div>
    <ol className={styles.list}>
      {Array.from({ length: 24 }).map((_, index) => {
        return <li key={index} className={styles.item}>
          <a href={`/palabras-de-${index + 1}-letras-de-largo`} className={styles.link}>
            Palabras de <span className={styles.letter}>{index + 1}</span> letras de largo
          </a>
        </li>
      })}
    </ol>

    <div className={styles.header}>
      <h2 className={styles.title}>Lista de palabras</h2>
    </div>
    <ol className={styles.list}>
      {ALPHABET.map(letter => {
        return <li key={filters.start + letter} className={styles.item}>
          <a href={`/palabras-que-empiezan-por-${filters.start + letter}`} className={styles.link}>
            Palabras que empiezan por <span className={styles.letter}>{filters.start + letter}</span>
          </a>
        </li>
      })}
    </ol>
  </div>
}

export default SEOSection
