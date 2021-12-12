import { useEffect, useRef } from "react"

const useDidUpdateEffect = (fn: () => any, inputs: Array<any>): void => {
	const didMountRef = useRef(false)
  
	useEffect(() => {
	  if (didMountRef.current)
		return fn()
	  else
		didMountRef.current = true
	}, inputs)
}

export default useDidUpdateEffect