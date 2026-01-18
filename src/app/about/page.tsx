"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Award, Users, Clock, Target, Shield } from "lucide-react";

export default function AboutPage() {
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
              About GEM CERT
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your trusted partner in gemstone certification and identification
          </p>
        </motion.div>

        {/* Company Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <GlassCard className="p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Company Profile
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                At IGC Lab's, we are committed to excellence in gemstone
                analysis and certification. As a premier gemological laboratory,
                we specialize in the testing, grading, and authentication of
                diamonds, colored gemstones, and jewelry. Our team of highly
                trained gemologists utilizes advanced technology and
                industry-approved methodologies to provide precise and reliable
                results.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                With a dedication to integrity, accuracy, and transparency, we
                serve jewelers, exporters, retailers, and individuals seeking
                trustworthy gemstone evaluations. Our state-of-the-art facility
                is equipped with cutting-edge instruments to detect treatments,
                synthetic origins, and quality parameters that define a
                gemstone’s true value.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you need diamond grading, gemstone identification, or
                verification of authenticity, IGC Lab's is your trusted partner
                in gemology. We take pride in delivering detailed reports that
                empower our clients with confidence and knowledge about their
                precious investments.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                <br />
                Expertise. Precision. Trust. 
                Let us help you uncover the true
                beauty and authenticity of your gemstones. Location: Building No
                3120 , Lane No 35 Bedaonpura Karolbagh Delhi - 110005 Contact
                Us: 9953070803 , 8010019074 Mail : Igcgemcenter@gmail.com
                Website: https://internationalgemologicalcenter.com
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <GlassCard className="p-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
              15+
            </div>
            <p className="text-gray-400 text-sm">Years Experience</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
              50K+
            </div>
            <p className="text-gray-400 text-sm">Certificates Issued</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
              25+
            </div>
            <p className="text-gray-400 text-sm">Expert Gemologists</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
              99%
            </div>
            <p className="text-gray-400 text-sm">Client Satisfaction</p>
          </GlassCard>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <GlassCard className="p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Target size={24} className="text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To provide accurate, reliable, and trustworthy gemstone
                certification services that empower our clients to make informed
                decisions with confidence. We are committed to maintaining the
                highest standards of integrity, professionalism, and excellence
                in every certification we issue.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <GlassCard className="p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Award size={24} className="text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To be the global leader in gemstone certification, setting the
                standard for accuracy, reliability, and customer service. We
                envision a future where every gemstone transaction is backed by
                trusted certification, ensuring transparency and confidence
                throughout the industry.
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <GlassCard className="p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-amber-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Integrity</h4>
                <p className="text-gray-400 text-sm">
                  Honest and ethical in all our dealings
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Excellence</h4>
                <p className="text-gray-400 text-sm">
                  Committed to the highest quality standards
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Users className="w-7 h-7 text-amber-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Expertise</h4>
                <p className="text-gray-400 text-sm">
                  Skilled professionals you can trust
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-amber-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Efficiency</h4>
                <p className="text-gray-400 text-sm">
                  Timely and reliable service delivery
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
