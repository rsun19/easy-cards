import { useEffect, useState } from 'react'

const useWindowWidth = (): { lg: boolean | null } => {
  const [lg, setLg] = useState<boolean | null>(null)

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
