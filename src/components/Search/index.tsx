/* eslint @typescript-eslint/strict-boolean-expressions:0 */
/* eslint @typescript-eslint/restrict-plus-operands:0 */

import PropTypes from 'prop-types'
import { ReactElement, useReducer, useEffect, useState } from 'react'
import { search } from '../../js/http'
import { fromPathToFilter, Filter, fromFilterToPath, fromFilterToTitle } from '../../js/strings'

import styles from './index.module.css'

interface Props {
  onSearch: (results: string[]) => void
}

function Search ({ onSearch }: Props): ReactElement {
  const [loadingState, setLoadingState] = useState(false)
  const [fields, dispatch] = useReducer((state: Filter, update: object) => ({ ...state, ...update }), fromPathToFilter(window.location.pathname))

  useEffect(() => {
    function doEffect (): void {
      const filter = fromPathToFilter(window.location.pathname)
      if (!Object.values(filter).some(filter => filter !== '')) return
      document.body.style.overflowY = 'hidden'
      setLoadingState(true)
      // eslint-disable-next-line
      search(filter).then(results => {
        document.body.style.overflowY = 'unset'
        setLoadingState(false)
        onSearch(results)
      }).catch(() => {
        document.body.style.overflowY = 'unset'
        setLoadingState(false)
        onSearch([])
      })
    }
    doEffect()
  }, [])

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      pattern: { value: string }
      start: { value: string }
      ends: { value: string }
      contains: { value: string }
      length: { value: string }
    }

    const filter = {
      pattern: target.pattern?.value,
      start: target.start?.value,
      ends: target.ends?.value,
      contains: target.contains?.value,
      length: target.length?.value
    }

    const nextPathName = fromFilterToPath(filter)
    window.location.pathname = nextPathName
  }

  return <div data-component='Search' className={styles.search}>
    {loadingState && <div className={styles.loader} >
      <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
    </div>}
    <h1 className={styles.title}>{fromFilterToTitle(fromPathToFilter(window.location.pathname))}</h1>
    <h3>Puedes usar <strong>?</strong> como comodín para burcar tu palabra</h3>
    <form className={styles.searchForm} onSubmit={handleSubmit as unknown as () => void}>
      <input className={styles.input} value={fields.pattern} onChange={evt => dispatch({ pattern: evt.target.value })} tabIndex={0} autoFocus type="search" enterKeyHint="search" placeholder='cruc?gr?ma' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="pattern" />
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <input className={styles.filterItem} value={fields.start} onChange={evt => dispatch({ start: evt.target.value })} tabIndex={1} type='text' enterKeyHint="search" placeholder='Starts' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="start" />
          <input className={styles.filterItem} value={fields.ends} onChange={evt => dispatch({ ends: evt.target.value })} tabIndex={2} type='text' enterKeyHint="search" placeholder='Ends' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="ends" />
          <input className={styles.filterItem} value={fields.contains} onChange={evt => dispatch({ contains: evt.target.value })} tabIndex={3} type='text' enterKeyHint="search" placeholder='Contains' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="contains" />
          <input className={styles.filterItem} value={fields.length} onChange={evt => dispatch({ length: evt.target.value })} tabIndex={4} type='number' enterKeyHint="search" placeholder='Length' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="length" />
        </div>
        <button className={styles.cta} type='submit'>Search</button>
        <button className={styles.reset} onClick={(evt) => {
          evt.preventDefault()
          window.location.href = '/'
        }}>Limpiar</button>
      </div>
    </form>
  </div>
}

Search.propTypes = {
  onSearch: PropTypes.func
}

export default Search
