import PropTypes from 'prop-types'
import { ReactElement } from 'react'

import styles from './index.module.css'

interface Props {
  onSearch: (results: string[]) => void
}

function Search ({ onSearch }: Props): ReactElement {
  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      pattern: { value: string }
    }

    // eslint-disable-next-line
    const {data} = await fetch(import.meta.env.VITE_API_HOST + 'api/search?query=' + encodeURIComponent(target.pattern.value))
      .then(async resp => await resp.json())
    onSearch(data.words)
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
