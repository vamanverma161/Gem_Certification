'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { Search, CheckCircle, XCircle, FileText } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface GemCertification {
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
  issueDate: Date
}

export default function ReportPage() {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GemCertification | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!certificateNumber.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a certificate number',
      })
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/gems/${encodeURIComponent(certificateNumber)}`)

      if (!response.ok) {
        throw new Error('Certificate not found or invalid')
      }

      const data = await response.json()
      setResult(data)
      toast({
        title: 'Success',
        description: 'Certificate verified successfully',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Certificate not found or invalid')
      toast({
        variant: 'destructive',
        title: 'Not Found',
        description: 'Certificate not found or invalid',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Gems Report
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Verify your gemstone certificate authenticity
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <GlassCard className="p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <FileText size={24} className="text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Certificate Verification</h2>
                <p className="text-gray-400 text-sm">Enter your certificate number to verify authenticity</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex gap-4 flex-col sm:flex-row">
              <input
                type="text"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="Enter Certificate Number"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Verify
                  </>
                )}
              </button>
            </form>

            {/* Sample Certificate Numbers */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm mb-2">Try these sample certificates:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['GEM-2024-001', 'GEM-2024-002', 'GEM-2024-003'].map((cert) => (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => setCertificateNumber(cert)}
                    className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-amber-500/50 transition-all"
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard className="p-8 sm:p-12 border-amber-500/30">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <CheckCircle size={32} className="text-green-500" />
                  <h3 className="text-2xl font-bold text-white">Certificate Verified</h3>
                </div>

                <div className="grid gap-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Certificate Number</p>
                      <p className="text-white font-semibold">{result.certificateNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Gem Name</p>
                      <p className="text-white font-semibold">{result.gemName}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Gem Type</p>
                      <p className="text-white font-semibold">{result.gemType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Carat Weight</p>
                      <p className="text-white font-semibold">{result.carat}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Color</p>
                      <p className="text-white font-semibold">{result.color}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Shape</p>
                      <p className="text-white font-semibold">{result.shape || '-'}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Cut</p>
                      <p className="text-white font-semibold">{result.cut || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Origin</p>
                      <p className="text-white font-semibold">{result.origin || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Treatment</p>
                      <p className="text-white font-semibold">{result.treatment || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        result.status === 'Certified'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {result.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm mb-1">Issue Date</p>
                    <p className="text-white font-semibold">
                      {new Date(result.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {result.remarks && (
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Remarks</p>
                      <p className="text-white font-semibold">{result.remarks}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-gray-500 text-sm">
                    This certificate has been verified by GEM CERT Laboratory
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard className="p-8 sm:p-12 border-red-500/30">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <XCircle size={32} className="text-red-500" />
                  <h3 className="text-2xl font-bold text-white">Certificate Not Found</h3>
                </div>
                <p className="text-gray-400 text-center">{error}</p>
                <p className="text-gray-500 text-sm text-center mt-4">
                  Please check the certificate number and try again, or contact our support team
                  for assistance.
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
