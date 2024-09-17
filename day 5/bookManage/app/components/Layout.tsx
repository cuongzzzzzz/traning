import React from 'react'

type Props = {}

const Layout1 = (
    {children} : {children: React.ReactNode}
) => {
  return (
    <div className='p-5'>{children}</div>
  )
}

export default Layout1