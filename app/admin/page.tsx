'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('admin_authenticated')
      if (auth === 'true') {
        setAuthenticated(true)
        loadContent()
      }
    }
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      localStorage.setItem('admin_authenticated', 'true')
      setAuthenticated(true)
      loadContent()
    } else {
      alert('Invalid password')
    }
  }

  async function loadContent() {
    const res = await fetch('/api/admin/content')
    const data = await res.json()
    setContent(data)
  }

  async function saveContent(key: string, value: string) {
    setLoading(true)
    await fetch(`/api/content/${key}`, {
      method: 'POST',
      body: JSON.stringify({ value }),
      headers: { 'Content-Type': 'application/json' },
    })
    setLoading(false)
    // Toast notification could go here
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="max-w-md w-full space-y-4">
          <h1 className="text-3xl font-serif text-charcoal mb-6">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
          />
          <button
            type="submit"
            className="w-full bg-charcoal text-off-white py-3 rounded-2xl font-medium"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-charcoal mb-8">Admin CMS</h1>
        <div className="space-y-6">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="bg-off-white p-6 rounded-2xl border border-slate/10">
              <label className="block text-sm font-medium text-charcoal mb-2">{key}</label>
              <textarea
                value={value}
                onChange={(e) => {
                  setContent({ ...content, [key]: e.target.value })
                }}
                onBlur={() => saveContent(key, content[key])}
                className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss resize-none"
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

