/* eslint @typescript-eslint/strict-boolean-expressions:0 */
/* eslint @typescript-eslint/restrict-plus-operands:0 */

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
      start: { value: string }
      ends: { value: string }
      contains: { value: string }
      length: { value: string }
    }

    const params = []
    if (target.pattern?.value) params.push('query=' + target.pattern.value)
    if (target.start?.value) params.push('start=' + target.start.value)
    if (target.ends?.value) params.push('ends=' + target.ends.value)
    if (target.contains?.value) params.push('contains=' + target.contains.value)
    if (target.length?.value) params.push('length=' + target.length.value)

    const results = await fetch(import.meta.env.VITE_API_HOST + 'search?' + params.join('&'))
      .then(async resp => await resp.json())
    onSearch(results.flat(Infinity))
  }

  return <div className={styles.search}>
    <h2>Palabros</h2>
    <h3>Puedes usar <strong>?</strong> como comodín para burcar tu palabra</h3>
    <form className={styles.searchForm} onSubmit={handleSubmit as unknown as () => void}>
      <input className={styles.input} tabIndex={0} autoFocus type="search" enterKeyHint="search" placeholder='cruc?gr?ma' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="pattern" />
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <input className={styles.filterItem} tabIndex={1} type='text' enterKeyHint="search" placeholder='Starts' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="start" />
          <input className={styles.filterItem} tabIndex={2} type='text' enterKeyHint="search" placeholder='Ends' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="ends" />
          <input className={styles.filterItem} tabIndex={3} type='text' enterKeyHint="search" placeholder='Contains' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="contains" />
          <input className={styles.filterItem} tabIndex={4} type='number' enterKeyHint="search" placeholder='Length' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="length" />
        </div>
        <button className={styles.cta} type='submit'>Search</button>
        <button className={styles.reset} type='reset'>Limpiar</button>
      </div>
    </form>
  </div>
}

Search.propTypes = {
  onSearch: PropTypes.func
}

export default Search
