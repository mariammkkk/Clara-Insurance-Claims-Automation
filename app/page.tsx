"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import ShaderBackground from "@/components/shader-background"

export default function ShaderShowcase() {
  return (
    <div className="relative">
      {/* Fixed Dynamic Background Section */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground>
          <Header />
          <HeroContent />
        </ShaderBackground>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 pointer-events-none">
        {/* Spacer to keep white content below - increase this to push content lower */}
        <div style={{ height: '150vh' }} className="pointer-events-auto"></div>
        
        {/* White Content Section */}
        <div className="bg-white rounded-t-3xl shadow-2xl pointer-events-auto">
          {/* Why Section */}
          <section className="py-20 px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 text-center">Why Clara?</h2>
              <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto text-center leading-relaxed">
                Women's health care clinics have long been pitted against insurance companies since healthcare became a commoditized service. 
                A physician carefully reviews patient records, listens to symptoms, and builds an informed diagnosis only for their claim to be 
                denied by an insurer who lacks that context. Hours of phone calls and back and forth follow, delaying care and exhausting both sides.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Faster Approvals</h3>
                  <p className="text-gray-600">
                    AI-powered analysis speeds up the review process, getting patients the care they need quickly.
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Fairer Decisions</h3>
                  <p className="text-gray-600">
                    Decisions rooted in complete medical context lead to more accurate and fair outcomes.
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Real Understanding</h3>
                  <p className="text-gray-600">
                    Large datasets and generative models bridge the gap with genuine medical insight.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl border border-gray-200 text-center">
                <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Our system changes that by using large datasets and generative language models to bridge the gap between 
                  clinics and insurers, making approvals <span className="font-semibold text-teal-600">faster</span>, 
                  <span className="font-semibold text-teal-600"> fairer</span>, and 
                  <span className="font-semibold text-teal-600"> rooted in real medical understanding</span>.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 text-center">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-12 text-center">
                Interested in learning more about Clara? We'd love to hear from you.
              </p>

              <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your needs..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8 px-8">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Clara. All rights reserved. | AI-Powered Healthcare Solutions
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
