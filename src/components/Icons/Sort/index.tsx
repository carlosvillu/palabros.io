import React, { ReactElement } from 'react'

function Icon (): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path>
    </svg>
  )
}

export default Icon
