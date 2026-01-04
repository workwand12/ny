'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IMAGE_GUIDELINES } from '@/lib/image-utils'
import Image from 'next/image'

interface ContentField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image' | 'url'
  section: string
  value: string
}

const CONTENT_SECTIONS: Record<string, ContentField[]> = {
  hero: [
    { key: 'hero_title', label: 'Hero Title', type: 'text', section: 'hero', value: '' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', section: 'hero', value: '' },
    { key: 'hero_image', label: 'Hero Image', type: 'image', section: 'hero', value: '' },
  ],
  story: [
    { key: 'story_title', label: 'Story Title', type: 'text', section: 'story', value: '' },
    { key: 'story_text', label: 'Story Text', type: 'textarea', section: 'story', value: '' },
    { key: 'story_image', label: 'Story Image', type: 'image', section: 'story', value: '' },
  ],
  amenities: [
    { key: 'amenities_title', label: 'Amenities Title', type: 'text', section: 'amenities', value: '' },
    { key: 'amenities_subtitle', label: 'Amenities Subtitle', type: 'textarea', section: 'amenities', value: '' },
  ],
  experience: [
    { key: 'experience_title', label: 'Experience Title', type: 'text', section: 'experience', value: '' },
    { key: 'experience_subtitle', label: 'Experience Subtitle', type: 'textarea', section: 'experience', value: '' },
  ],
  gallery: [
    { key: 'gallery_title', label: 'Gallery Title', type: 'text', section: 'gallery', value: '' },
    { key: 'gallery_subtitle', label: 'Gallery Subtitle', type: 'textarea', section: 'gallery', value: '' },
  ],
  location: [
    { key: 'location_title', label: 'Location Title', type: 'text', section: 'location', value: '' },
    { key: 'location_text', label: 'Location Text', type: 'textarea', section: 'location', value: '' },
    { key: 'location_attractions', label: 'Attractions List (one per line)', type: 'textarea', section: 'location', value: '' },
  ],
  stay: [
    { key: 'stay_title', label: 'Stay Page Title', type: 'text', section: 'stay', value: '' },
    { key: 'stay_subtitle', label: 'Stay Page Subtitle', type: 'textarea', section: 'stay', value: '' },
  ],
  booking: [
    { key: 'book_now_url', label: 'Book Now URL', type: 'url', section: 'booking', value: '' },
  ],
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [content, setContent] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('admin_authenticated')
      if (auth === 'true') {
        setAuthenticated(true)
        loadContent()
      }
    }
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

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
      setToast({ message: 'Invalid password', type: 'error' })
    }
  }

  async function loadContent() {
    const res = await fetch('/api/admin/content')
    const data = await res.json()
    setContent(data)
  }

  async function saveContent(key: string, value: string, section: string) {
    setSaving({ ...saving, [key]: true })
    try {
      const res = await fetch(`/api/content/${key}`, {
        method: 'POST',
        body: JSON.stringify({ value, type: key.includes('image') ? 'image' : 'text', section }),
        headers: { 'Content-Type': 'application/json' },
      })
      
      if (res.ok) {
        setContent({ ...content, [key]: value })
        setToast({ message: `${key} saved successfully`, type: 'success' })
        // Revalidate the page
        router.refresh()
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      setToast({ message: `Failed to save ${key}`, type: 'error' })
    } finally {
      setSaving({ ...saving, [key]: false })
    }
  }

  async function handleImageUpload(key: string, section: string, file: File) {
    setUploading({ ...uploading, [key]: true })
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('section', section)

      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        throw new Error('Upload failed')
      }

      const { url } = await uploadRes.json()
      await saveContent(key, url, section)
    } catch (error) {
      setToast({ message: `Failed to upload image for ${key}`, type: 'error' })
    } finally {
      setUploading({ ...uploading, [key]: false })
    }
  }

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type })
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-off-white">
        <form onSubmit={handleLogin} className="max-w-md w-full space-y-4">
          <h1 className="text-3xl font-serif text-charcoal mb-6">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-charcoal text-off-white py-3 rounded-2xl font-medium hover:bg-slate transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 py-12 bg-off-white">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-2xl shadow-lg ${
          toast.type === 'success' ? 'bg-moss text-off-white' : 'bg-red-500 text-off-white'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-serif text-charcoal">Admin CMS</h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin_authenticated')
              setAuthenticated(false)
            }}
            className="px-4 py-2 text-slate hover:text-charcoal transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Content Sections */}
        {Object.entries(CONTENT_SECTIONS).map(([sectionKey, fields]) => (
          <div key={sectionKey} className="mb-12 bg-white p-6 rounded-2xl border border-slate/10 shadow-sm">
            <h2 className="text-2xl font-serif text-charcoal mb-6 capitalize">{sectionKey}</h2>
            
            <div className="space-y-6">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-charcoal">
                    {field.label}
                  </label>

                  {field.type === 'image' ? (
                    <ImageUploadField
                      key={field.key}
                      fieldKey={field.key}
                      section={field.section}
                      value={content[field.key] || ''}
                      uploading={uploading[field.key]}
                      onUpload={(file) => handleImageUpload(field.key, field.section, file)}
                      onSave={(value) => saveContent(field.key, value, field.section)}
                      saving={saving[field.key]}
                    />
                  ) : field.type === 'textarea' ? (
                    <div className="space-y-2">
                      <textarea
                        value={content[field.key] || ''}
                        onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss resize-none"
                        rows={4}
                      />
                      <button
                        onClick={() => saveContent(field.key, content[field.key] || '', field.section)}
                        disabled={saving[field.key]}
                        className="px-6 py-2 bg-charcoal text-off-white rounded-xl text-sm font-medium hover:bg-slate transition-colors disabled:opacity-50"
                      >
                        {saving[field.key] ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type={field.type === 'url' ? 'url' : 'text'}
                        value={content[field.key] || ''}
                        onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
                      />
                      <button
                        onClick={() => saveContent(field.key, content[field.key] || '', field.section)}
                        disabled={saving[field.key]}
                        className="px-6 py-2 bg-charcoal text-off-white rounded-xl text-sm font-medium hover:bg-slate transition-colors disabled:opacity-50"
                      >
                        {saving[field.key] ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageUploadField({
  fieldKey,
  section,
  value,
  uploading,
  onUpload,
  onSave,
  saving,
}: {
  fieldKey: string
  section: string
  value: string
  uploading: boolean
  onUpload: (file: File) => void
  onSave: (value: string) => void
  saving: boolean
}) {
  const guidelines = IMAGE_GUIDELINES[section] || IMAGE_GUIDELINES.gallery
  const [localValue, setLocalValue] = useState(value)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  function handleFileSelect(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    onUpload(file)
  }

  return (
    <div className="space-y-3">
      {/* Image Guidelines */}
      <div className="bg-slate/5 p-4 rounded-xl text-sm">
        <p className="font-medium text-charcoal mb-2">Image Guidelines:</p>
        <ul className="space-y-1 text-slate text-xs">
          <li>• Recommended size: {guidelines.recommended}</li>
          <li>• Minimum size: {guidelines.minWidth}x{guidelines.minHeight}px</li>
          <li>• {guidelines.description}</li>
          <li>• The site will automatically optimize and resize images for different screen sizes</li>
        </ul>
      </div>

      {/* Current Image Preview */}
      {localValue && (
        <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border border-slate/20">
          <img
            src={localValue}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragActive ? 'border-moss bg-moss/5' : 'border-slate/30'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          const file = e.dataTransfer.files[0]
          if (file) handleFileSelect(file)
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(file)
          }}
          className="hidden"
          id={`upload-${fieldKey}`}
        />
        <label
          htmlFor={`upload-${fieldKey}`}
          className="cursor-pointer block"
        >
          <div className="text-slate mb-2">
            {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </div>
          <div className="text-xs text-slate/60">
            PNG, JPG, WebP up to 10MB
          </div>
        </label>
      </div>

      {/* Manual URL Input */}
      <div className="space-y-2">
        <label className="block text-xs text-slate">Or enter image URL:</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 border border-slate/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss text-sm"
          />
          <button
            onClick={() => onSave(localValue)}
            disabled={saving || uploading}
            className="px-6 py-2 bg-charcoal text-off-white rounded-xl text-sm font-medium hover:bg-slate transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save URL'}
          </button>
        </div>
      </div>
    </div>
  )
}
