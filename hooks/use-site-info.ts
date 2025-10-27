"use client"

import { useState, useEffect } from "react"

interface SiteInfo {
  phone_number?: string
  address?: string
}

export default function useSiteInfo() {
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const res = await fetch('/api/info')
        if (!res.ok) return
        const data = await res.json()
        const arr: SiteInfo[] = data.info || []
        const first = arr[0] || {}
        if (!mounted) return
        setPhoneNumber(first.phone_number || "")
        setAddress(first.address || "")
      } catch (err) {
        console.error('useSiteInfo load error', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  return { phoneNumber, address, loading }
}
