
import React, { useEffect, useState } from "react"

export default function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState('')
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            }, delay);
            return () => {
            clearTimeout(handler);
        }
    }, [value, delay])
    return debouncedValue
}