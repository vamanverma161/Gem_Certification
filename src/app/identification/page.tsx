'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { Sparkles } from 'lucide-react'

const instruments = [
  {
    name: 'Polariscope',
    description: 'A polariscope is used to determine if a gemstone is isotropic or anisotropic. It works by transmitting polarized light through the gemstone, allowing gemologists to observe optical properties and interference patterns that help identify the stone\'s crystal structure and distinguish between natural and synthetic materials.',
  },
  {
    name: 'Dichroscope',
    description: 'The dichroscope is used to observe pleochroism in gemstones, which is the property of showing different colors when viewed from different directions. This instrument is essential for identifying doubly refractive gemstones and can help distinguish between stones that may appear similar to the naked eye.',
  },
  {
    name: 'Refractometer',
    description: 'A refractometer measures the refractive index of gemstones, which is a critical identification factor. Each gemstone type has a characteristic refractive index range. This instrument also helps identify birefringence in anisotropic stones, providing valuable data for accurate gemstone identification.',
  },
  {
    name: 'Spectroscope',
    description: 'The spectroscope separates light into its component wavelengths, allowing gemologists to observe the absorption spectrum of a gemstone. Different elements and chemical structures create characteristic absorption patterns, making spectroscopy a powerful tool for identifying gemstones and detecting treatments.',
  },
  {
    name: 'Color Filter',
    description: 'The Chelsea color filter is a dichroic filter that transmits only certain wavelengths of light. It helps gemologists distinguish between similarly colored stones, such as distinguishing natural emerald from green glass or certain imitations, based on how the gemstone appears when viewed through the filter.',
  },
  {
    name: 'Microscope',
    description: 'Gemological microscopes provide magnification from 10x to over 60x, allowing detailed examination of internal and external features. Microscopy reveals inclusions, surface characteristics, treatment evidence, and growth patterns that are crucial for natural vs. synthetic identification and origin determination.',
  },
  {
    name: 'Luminescence',
    description: 'Luminescence testing involves exposing gemstones to ultraviolet (UV) light to observe fluorescence and phosphorescence responses. Different gemstone varieties and sources exhibit characteristic luminescence colors and intensities, which can help identify stones and in some cases determine geographic origin.',
  },
  {
    name: 'FTIR Spectroscopy',
    description: 'Fourier Transform Infrared (FTIR) spectroscopy analyzes molecular vibrations in gemstones, providing information about chemical composition and treatments. This advanced technique is particularly useful for identifying polymer fillings in emeralds, heat treatment in sapphires, and detecting synthetic diamonds.',
  },
  {
    name: 'Raman Spectroscopy',
    description: 'Raman spectroscopy uses laser light to analyze molecular vibrations in gemstones, providing a molecular fingerprint. This non-destructive technique is highly effective for identifying inclusions, detecting treatments, and distinguishing between natural and synthetic gemstones based on their unique spectral signatures.',
  },
]

export default function IdentificationPage() {
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
              Gems Identification
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Advanced instruments for precise gemstone identification
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <GlassCard className="p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Sparkles size={24} className="text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">State-of-the-Art Equipment</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Our laboratory is equipped with the most advanced gemological instruments available today.
              Each instrument plays a crucial role in the systematic identification and analysis of
              gemstones, ensuring accurate and reliable results.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our certified gemologists combine decades of experience with cutting-edge technology to
              provide comprehensive gemstone identification services. From traditional optical instruments
              to sophisticated spectroscopic analysis, we use every tool available to deliver precise
              and trustworthy results.
            </p>
          </GlassCard>
        </motion.div>

        {/* Instruments List */}
        <div className="space-y-8">
          {instruments.map((instrument, index) => (
            <motion.div
              key={instrument.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6`}
            >
              <div className="flex-1">
                <GlassCard className="p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={28} className="text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{instrument.name}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{instrument.description}</p>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-16"
        >
          <GlassCard className="p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Professional Identification Services</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Trust our expert gemologists and advanced equipment for accurate identification of your
              precious gemstones
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
            >
              Get Your Gems Identified
            </a>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
