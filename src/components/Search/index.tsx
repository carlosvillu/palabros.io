import PropTypes from 'prop-types'
import { ReactElement, useRef } from 'react'

import styles from './index.module.css'

interface Props {
  onSearch: (results: string[]) => void
}

function Search ({ onSearch }: Props): ReactElement {
  const words = useRef<string | null>()

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      pattern: { value: string }
    }

    if (words.current === undefined) {
      words.current = await fetch('https://palabros.io/words.txt').then(async resp => await resp.text())
    }

    if (typeof words.current !== 'string') return

    const pattern = target.pattern.value
      .replaceAll('?', '.')
      .replaceAll(' ', '.')

    const matches = words.current.matchAll(new RegExp('\n' + pattern + '\n', 'g'))
    const solution = [...matches].map(match => match[0]).map(match => match.replace('\n', ''))
    onSearch(solution)
  }
  return <div className={styles.search}>
    <h2>Palabros</h2>
    <h3>Puedes usar <strong>?</strong> como comodín para burcar tu palabra</h3>
    <form className={styles.searchForm} onSubmit={handleSubmit as unknown as () => void}>
      <input className={styles.input} tabIndex={0} autoFocus type="search" enterKeyHint="search" placeholder='p.la..ota' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="pattern" required />
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <input className={styles.filterItem} tabIndex={1} type='search' enterKeyHint="search" placeholder='Starts' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="start" />
          <input className={styles.filterItem} tabIndex={2} type='search' enterKeyHint="search" placeholder='Ends' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="ends" />
          <input className={styles.filterItem} tabIndex={3} type='search' enterKeyHint="search" placeholder='Contains' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="contains" />
          <input className={styles.filterItem} tabIndex={4} type='search' enterKeyHint="search" placeholder='Length' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="length" />
        </div>
        <button className={styles.cta} type='submit'>Search</button>
      </div>
    </form>
  </div>
}

Search.propTypes = {
  onSearch: PropTypes.func
}

export default Search
