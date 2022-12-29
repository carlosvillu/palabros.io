import { ReactElement } from 'react'
import styles from './index.module.css'

interface Props {
  children: (item: unknown, index: number) => ReactElement
  items: unknown[]
}

function List ({ children, items }: Props): ReactElement {
  return <ol data-component='List' className={styles.list}>{items.map((item, index) => {
    return <li className={styles.items} key={index}>{children(item, index)}</li>
  })}</ol>
}

export default List
