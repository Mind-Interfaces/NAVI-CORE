import { useEffect } from 'react'

const useOnClickOutside = (
  ref: React.MutableRefObject<any>,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    // Nothing to do - don't attach listener
    if (!handler) return

    const listener = (event: MouseEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('click', listener)

    // Cleanup
    return () => document.removeEventListener('click', listener)
  }, [ref, handler])
}

export default useOnClickOutside
