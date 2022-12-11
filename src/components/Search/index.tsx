import PropTypes from 'prop-types'
import { ReactElement } from 'react'

import styles from './index.module.css'

interface Props {
  onSearch: (results: string[]) => void
}

const endpoints = [
  'xaa',
  'xab',
  'xac',
  'xad',
  'xae',
  'xaf',
  'xag',
  'xah',
  'xai'
]

function Search ({ onSearch }: Props): ReactElement {
  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      pattern: { value: string }
    }

    const results = await Promise.all(endpoints.map(async endpoint => {
      // eslint-disable-next-line
      return await fetch(import.meta.env.VITE_API_HOST + 'api/search/' + endpoint + '?query=' + encodeURIComponent(target.pattern.value))
        .then(async resp => await resp.json())
    }))
    onSearch(results.flat(Infinity))
  }

  return <div className={styles.search}>
    <h2>Palabros</h2>
    <h3>Puedes usar <strong>?</strong> como comodín para burcar tu palabra</h3>
    <form className={styles.searchForm} onSubmit={handleSubmit as unknown as () => void}>
      <input className={styles.input} tabIndex={0} autoFocus type="search" enterKeyHint="search" placeholder='cruc?gr?ma' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="pattern" required />
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
