"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ChevronDown,
  BookOpen,
  Eye,
  Microscope,
  Gem,
  Zap,
  Globe,
} from "lucide-react";

const gemologyTopics = [
  {
    id: 1,
    title: "What is Gemology?",
    icon: BookOpen,
    content:
      "Gemology is the science dealing with natural and artificial gemstone materials. It is classified as a geoscience and is a branch of mineralogy. Gemologists identify and evaluate gemstones based on their physical properties such as specific gravity, refractive index, and optical characteristics. This scientific approach ensures accurate identification and classification of gemstones.",
  },
  {
    id: 2,
    title: "Gemstone Identification",
    icon: Eye,
    content:
      "Gemstone identification is a systematic process that involves multiple tests and observations. Professional gemologists use various instruments including refractometers, polariscopes, dichroscopes, and microscopes to determine a gemstone's identity. The process also considers properties like hardness, specific gravity, and spectroscopic analysis to distinguish natural from synthetic stones and identify treatments.",
  },
  {
    id: 3,
    title: "The Four C's of Diamonds",
    icon: Microscope,
    content:
      "The Four C's are the universal standard for evaluating diamond quality: Cut (how well the diamond reflects light), Color (from colorless to light yellow), Clarity (presence of internal or external flaws), and Carat Weight (the diamond's size). Each factor contributes to the overall value and appearance of a diamond, with cut being the most important factor affecting brilliance and fire.",
  },
  {
    id: 4,
    title: "Natural vs Lab-Grown Gemstones",
    icon: Gem,
    content:
      "Natural gemstones form over millions of years through geological processes deep within the Earth. Lab-grown (synthetic) gemstones have the same chemical, physical, and optical properties as their natural counterparts but are created in controlled laboratory environments. Both types require expert identification, and full disclosure is essential for ethical trading. Advanced techniques like spectroscopy can distinguish between the two.",
  },
  {
    id: 5,
    title: "Gemstone Treatments",
    icon: Zap,
    content:
      "Many gemstones undergo treatments to enhance their appearance or durability. Common treatments include heat treatment, irradiation, fracture filling, diffusion, and dyeing. While these treatments can improve a gem's marketability, they must be fully disclosed to consumers. Certified laboratories identify and document any treatments found in gemstones during the certification process.",
  },
  {
    id: 6,
    title: "Gemstone Origins and Sources",
    icon: Globe,
    content:
      "Gemstones are mined in various locations around the world, each region producing stones with unique characteristics. For example, Burma is famous for pigeon's blood rubies, Colombia for emeralds, and South Africa for diamonds. Understanding a gemstone's origin can provide insight into its quality and value, as certain sources are known for producing superior specimens of specific gemstone varieties.",
  },
];

export default function GemologyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);

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
              Gemology
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Understanding the science of gemstones
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
            <h2 className="text-2xl font-bold text-white mb-4">
              Gemology – The Science of Gemstones
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Gemology is the scientific study of gemstones, focusing on their
              properties, origins, classifications, and identification methods.
              It is a specialized field within mineralogy that involves
              analyzing precious and semi-precious stones to determine their
              authenticity, quality, and characteristics.
            </p>

            <h3 className="text-xl font-semibold text-gold mb-3">
              The Importance of Gemology
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Gemology plays a crucial role in the jewelry and gemstone industry
              by distinguishing between natural, synthetic, and treated
              gemstones. Through advanced testing techniques, gemologists ensure
              transparency, trust, and accurate valuation for buyers and
              sellers.
            </p>

            <h3 className="text-xl font-semibold text-gold mb-3">
              Key Aspects of Gemology
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>
                <strong>Identification:</strong> Determining gemstone type using
                physical and optical properties.
              </li>
              <li>
                <strong>Classification:</strong> Grouping gems by mineral
                composition, crystal structure, and color.
              </li>
              <li>
                <strong>Grading:</strong> Evaluating quality using the 4Cs and
                other gemstone-specific criteria.
              </li>
              <li>
                <strong>Treatment Detection:</strong> Identifying enhancements
                like heat or irradiation.
              </li>
              <li>
                <strong>Synthetic vs Natural:</strong> Differentiating
                lab-created stones from natural ones.
              </li>
              <li>
                <strong>Origin Analysis:</strong> Determining gemstone
                provenance and mining location.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gold mb-3">
              Tools & Techniques Used
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Microscopes for inclusion and surface analysis</li>
              <li>Refractometers to measure refractive index</li>
              <li>Spectroscopes for light absorption analysis</li>
              <li>UV lights to test fluorescence</li>
              <li>Diamond testers for authenticity verification</li>
            </ul>

            <h3 className="text-xl font-semibold text-gold mb-3">Conclusion</h3>
            <p className="text-gray-300 leading-relaxed">
              Gemology is an essential discipline that preserves the integrity
              and value of gemstones in the global market. Understanding
              gemology empowers jewelers, collectors, and buyers to make
              informed and confident decisions.
            </p>
          </GlassCard>
        </motion.div>

        {/* Accordion Topics */}
        <div className="space-y-4">
          {gemologyTopics.map((topic, index) => {
            const Icon = topic.icon;
            const isOpen = openTopic === topic.id;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                <GlassCard>
                  <button
                    onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                    className="w-full p-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-amber-400" />
                      </div>
                      <span className="text-lg font-semibold text-white">
                        {topic.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={24}
                        className="text-gray-400 flex-shrink-0"
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-gray-300 leading-relaxed">
                            {topic.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <GlassCard className="p-8 inline-block">
            <h3 className="text-xl font-bold text-white mb-4">
              Ready to Get Your Gemstone Certified?
            </h3>
            <p className="text-gray-400 mb-6">
              Contact us today for professional gemological services
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
            >
              Contact Us
            </a>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
