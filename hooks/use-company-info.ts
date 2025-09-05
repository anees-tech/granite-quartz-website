"use client"

import { useState, useEffect } from 'react'
import { getCompanyInfo, type CompanyInfo } from '@/lib/firebase'

export function useCompanyInfo() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getCompanyInfo()
        setCompanyInfo(data)
      } catch (err) {
        console.error('Error fetching company info:', err)
        setError('Failed to load company information')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyInfo()
  }, [])

  return {
    companyInfo,
    loading,
    error,
    refresh: () => {
      setLoading(true)
      getCompanyInfo().then(setCompanyInfo).finally(() => setLoading(false))
    }
  }
}
