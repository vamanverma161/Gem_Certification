'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gem,
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  CheckCircle,
} from 'lucide-react'

interface Gem {
  id: string
  certificateNumber: string
  gemName: string
  gemType: string
  carat: string
  color: string
  shape?: string | null
  cut?: string | null
  origin?: string | null
  treatment?: string | null
  remarks?: string | null
  status: string
  issueDate: string
  createdAt: string
}

interface FormData {
  certificateNumber: string
  gemName: string
  gemType: string
  carat: string
  color: string
  shape: string
  cut: string
  origin: string
  treatment: string
  remarks: string
  status: string
  issueDate: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [gems, setGems] = useState<Gem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingGem, setEditingGem] = useState<Gem | null>(null)
  const [formData, setFormData] = useState<FormData>({
    certificateNumber: '',
    gemName: '',
    gemType: '',
    carat: '',
    color: '',
    shape: '',
    cut: '',
    origin: '',
    treatment: '',
    remarks: '',
    status: 'Certified',
    issueDate: new Date().toISOString().split('T')[0],
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchGems()
  }, [])

  const fetchGems = async () => {
    try {
      const response = await fetch('/api/admin/gems')
      if (response.ok) {
        const data = await response.json()
        setGems(data)
      } else {
        router.push('/admin')
      }
    } catch (err) {
      console.error('Error fetching gems:', err)
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      const url = editingGem
        ? `/api/admin/gems/${editingGem.id}`
        : '/api/admin/gems'

      const response = await fetch(url, {
        method: editingGem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save gem')
        return
      }

      setSuccess(editingGem ? 'Gem updated successfully' : 'Gem added successfully')
      await fetchGems()
      resetForm()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (gem: Gem) => {
    setEditingGem(gem)
    setFormData({
      certificateNumber: gem.certificateNumber,
      gemName: gem.gemName,
      gemType: gem.gemType,
      carat: gem.carat,
      color: gem.color,
      shape: gem.shape || '',
      cut: gem.cut || '',
      origin: gem.origin || '',
      treatment: gem.treatment || '',
      remarks: gem.remarks || '',
      status: gem.status,
      issueDate: gem.issueDate.split('T')[0],
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gem?')) return

    try {
      const response = await fetch(`/api/admin/gems/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Gem deleted successfully')
        await fetchGems()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to delete gem')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin')
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }

  const resetForm = () => {
    setEditingGem(null)
    setFormData({
      certificateNumber: '',
      gemName: '',
      gemType: '',
      carat: '',
      color: '',
      shape: '',
      cut: '',
      origin: '',
      treatment: '',
      remarks: '',
      status: 'Certified',
      issueDate: new Date().toISOString().split('T')[0],
    })
    setShowForm(false)
  }

  const filteredGems = gems.filter(
    (gem) =>
      gem.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.gemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.gemType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Gem size={20} className="text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Gem Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  resetForm()
                  setShowForm(true)
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-300 hover:to-amber-500 transition-all duration-300 flex items-center gap-2"
              >
                <Plus size={18} />
                <span>Add Gem</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-2"
            >
              <CheckCircle size={20} />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gems by certificate number, name, or type..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Gem Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-black/95 border border-white/10 rounded-2xl"
              >
                <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {editingGem ? 'Edit Gem' : 'Add New Gem'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    <Trash2 size={20} className="text-white" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Certification Number *
                      </label>
                      <input
                        type="text"
                        value={formData.certificateNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, certificateNumber: e.target.value.toUpperCase() })
                        }
                        placeholder="GEM-2024-001"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Gem Name *
                      </label>
                      <input
                        type="text"
                        value={formData.gemName}
                        onChange={(e) =>
                          setFormData({ ...formData, gemName: e.target.value })
                        }
                        placeholder="Ruby"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Gem Type *
                      </label>
                      <select
                        value={formData.gemType}
                        onChange={(e) =>
                          setFormData({ ...formData, gemType: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        required
                      >
                        <option value="" className="bg-black">
                          Select Type
                        </option>
                        <option value="Natural" className="bg-black">
                          Natural
                        </option>
                        <option value="Treated" className="bg-black">
                          Treated
                        </option>
                        <option value="Lab-Grown" className="bg-black">
                          Lab-Grown
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Carat Weight *
                      </label>
                      <input
                        type="text"
                        value={formData.carat}
                        onChange={(e) =>
                          setFormData({ ...formData, carat: e.target.value })
                        }
                        placeholder="2.5"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Color *
                      </label>
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                        placeholder="Red"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Shape
                      </label>
                      <input
                        type="text"
                        value={formData.shape}
                        onChange={(e) =>
                          setFormData({ ...formData, shape: e.target.value })
                        }
                        placeholder="Oval"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cut
                      </label>
                      <input
                        type="text"
                        value={formData.cut}
                        onChange={(e) =>
                          setFormData({ ...formData, cut: e.target.value })
                        }
                        placeholder="Excellent"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Origin
                      </label>
                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) =>
                          setFormData({ ...formData, origin: e.target.value })
                        }
                        placeholder="Myanmar"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Treatment
                      </label>
                      <input
                        type="text"
                        value={formData.treatment}
                        onChange={(e) =>
                          setFormData({ ...formData, treatment: e.target.value })
                        }
                        placeholder="Heat Treated"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Issue Date *
                      </label>
                      <input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) =>
                          setFormData({ ...formData, issueDate: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                      >
                        <option value="Certified" className="bg-black">
                          Certified
                        </option>
                        <option value="Not Certified" className="bg-black">
                          Not Certified
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Remarks
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                      placeholder="Additional notes..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="mt-6 flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetForm}
                      className="flex-1 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-300 hover:to-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting
                        ? 'Saving...'
                        : editingGem
                        ? 'Update Gem'
                        : 'Add Gem'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gems List */}
        <div className="space-y-4">
          {filteredGems.length === 0 ? (
            <div className="text-center py-16">
              <Gem size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">
                {searchQuery ? 'No gems found matching your search' : 'No gems added yet'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => {
                    resetForm()
                    setShowForm(true)
                  }}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-300 hover:to-amber-500 transition-all duration-300"
                >
                  Add Your First Gem
                </button>
              )}
            </div>
          ) : (
            filteredGems.map((gem) => (
              <motion.div
                key={gem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Gem size={24} className="text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {gem.gemName}
                        </h3>
                        <p className="text-amber-400 text-sm">
                          {gem.certificateNumber}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="text-white font-medium">{gem.gemType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Carat</p>
                        <p className="text-white font-medium">{gem.carat}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Color</p>
                        <p className="text-white font-medium">{gem.color}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Shape</p>
                        <p className="text-white font-medium">
                          {gem.shape || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Origin</p>
                        <p className="text-white font-medium">
                          {gem.origin || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            gem.status === 'Certified'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {gem.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(gem)}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
                    >
                      <Edit size={18} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(gem.id)}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                    >
                      <Trash2 size={18} className="text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
