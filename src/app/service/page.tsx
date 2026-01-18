'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { Gem, Zap, Microscope, Truck, FileText, Shield } from 'lucide-react'

const services = [
  {
    icon: Gem,
    title: 'Diamond Sorting',
    description: 'Professional diamond sorting and grading services using advanced techniques and equipment for accurate classification.',
  },
  {
    icon: Gem,
    title: 'Gems and Jewellery Certification',
    description: 'Comprehensive certification services for all types of gems and jewellery, ensuring authenticity and quality.',
  },
  {
    icon: Gem,
    title: 'CVD , HPHT & Labgrown Diamonds Testing',
    description: 'Advanced testing is performed to accurately identify whether a diamond is natural, CVD-grown, or HPHT-treated using modern gemological instruments.',
  },
  {
    icon: FileText,
    title: 'Gemstone Certification',
    description: 'Comprehensive gemstone certification with detailed analysis and official reports for all types of precious and semi-precious stones.',
  },
  {
    icon: Zap,
    title: 'Lab-Grown Testing',
    description: 'Advanced testing to identify and certify laboratory-grown diamonds and gemstones with complete disclosure.',
  },
  {
    icon: Zap,
    title: 'Uncut Diamond & Polki Certification',
    description: 'This certification verifies the authenticity and natural origin of uncut diamonds and traditional Polki diamonds. It helps determine quality, structure, and genuineness while preserving their original form and cultural value.',
  },
  {
    icon: Truck,
    title: 'Mobile Lab Service',
    description: 'On-site gemological services for businesses and collectors requiring convenient, professional certification at your location.',
  },
  {
    icon: Microscope,
    title: 'Advanced Analysis',
    description: 'State-of-the-art analytical services using spectroscopy, microscopy, and other advanced gemological instruments.',
  },
  {
    icon: Microscope,
    title: 'DIAMOND PLOTTING',
    description: 'Diamond plotting is the process of mapping a diamond’s internal and external characteristics, such as inclusions and blemishes, to identify its unique structure. This detailed analysis helps in grading, authentication, and maintaining the diamond’s identity.',
  },
  {
    icon: Shield,
    title: 'Verification Services',
    description: 'Independent verification of existing certificates and expert opinions for buyers and sellers in the gemstone market.',
  },
  {
    icon: Shield,
    title: 'Gemstone Certification',
    description: 'Comprehensive gemstone certification with detailed analysis and official reports for all types of precious and semi-precious stones.',
  },
]

export default function ServicePage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional gemological services tailored to meet your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <GlassCard className="p-8 h-full hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-600/30 transition-all">
                    <Icon size={32} className="text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16"
        >
          <GlassCard className="p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Our Services?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-amber-400 font-bold text-4xl mb-2">ISO</div>
                <p className="text-gray-400 text-sm">Certified Laboratory</p>
              </div>
              <div className="text-center">
                <div className="text-amber-400 font-bold text-4xl mb-2">24h</div>
                <p className="text-gray-400 text-sm">Express Service Available</p>
              </div>
              <div className="text-center">
                <div className="text-amber-400 font-bold text-4xl mb-2">100%</div>
                <p className="text-gray-400 text-sm">Accurate Results</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
