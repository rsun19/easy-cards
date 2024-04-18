import { useEffect, useState } from 'react'

const useWindowWidth = (): { lg: boolean } => {
  const [lg, setLg] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const changeWidth = (): void => {
      setLg(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', changeWidth)
    return () => { window.removeEventListener('resize', changeWidth) }
  }, [])

  return { lg }
}

export default useWindowWidth
