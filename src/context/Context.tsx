'use client'
import React, { useState, createContext, useContext, ReactNode } from 'react'

// Interface Article
export interface Article {
  title: string
  urlToImage: string
  publishedAt: string
  author: string
  content: string
  description: string
  source: {
    id: string | null
    name: string
  }
  url: string
  nameURL: string
}

// Interface pour le contexte
interface AppContextType {
  displayedArticles: Article[]
  setdisplayedArticles: React.Dispatch<React.SetStateAction<Article[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  savedArticles: { [key: string]: Article[] }
  setSavedArticles: React.Dispatch<
    React.SetStateAction<{ [key: string]: Article[] }>
  >
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [displayedArticles, setdisplayedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [savedArticles, setSavedArticles] = useState<{
    [key: string]: Article[]
  }>({})

  const value = {
    displayedArticles,
    setdisplayedArticles,
    loading,
    setLoading,
    error,
    setError,
    savedArticles,
    setSavedArticles,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
