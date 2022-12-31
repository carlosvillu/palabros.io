/* eslint @typescript-eslint/restrict-plus-operands: 0 */

import { ReactElement } from 'react'
import { ALPHABET, fromPathToFilter } from '../../js/strings'
import List from '../List'
import Panel from '../Panel'
import styles from './index.module.css'

const MAX_LENGTH = 3

function SEOSection (): ReactElement {
  const filters = fromPathToFilter(window.location.pathname)

  return <div data-component='SEOSection'>
    <Panel title='Palabras por longitud'>
      <List items={Array.from({ length: 24 })}>{(_, index) => {
        return <a href={`/palabras-de-${index + 1}-letras-de-largo`} className={styles.link}>
          Palabras de <span className={styles.letter}>{index + 1}</span> letras para resolver crucigramas
        </a>
      }}</List>

    </Panel>
    <Panel title="Lista de palabras" hidden={filters.start.length === MAX_LENGTH}>
      <List items={ALPHABET}>{(letter) => {
        const slug = filters.start + letter
        return <a href={`/palabras-que-empiezan-por-${slug}`} className={styles.link}>
          Palabras que empiezan por <span className={styles.letter}>{slug}</span> para crucigramas
        </a>
      }}</List>
    </Panel>
  </div>
}

export default SEOSection
