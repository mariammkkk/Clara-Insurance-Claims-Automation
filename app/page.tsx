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
        <div style={{ height: '150vh' }}></div>
        
        {/* White Content Section */}
        <div className="bg-white rounded-t-[2.5rem] shadow-2xl pointer-events-auto">
          {/* Why Section */}
          <section className="py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                  Why Clara?
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Women's health care clinics have long been pitted against insurance companies since healthcare became a commoditized service. 
                  A physician carefully reviews patient records, listens to symptoms, and builds an informed diagnosis—only for their claim to be 
                  denied by an insurer who lacks that context. Hours of phone calls and back and forth follow, delaying care and exhausting both sides.
                </p>
              </div>

              {/* Statistics Section */}
              <div className="mb-20">
                <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">The Reality of Insurance Denials</h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="group bg-gradient-to-br from-white via-white to-teal-50/30 p-8 rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center my-8">
                      <div className="text-7xl font-bold text-teal-600 mb-4">11%</div>
                      <div className="text-sm text-gray-600 font-medium">of high-risk women</div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 text-center">
                      had breast MRI denied. Medicaid patients saw denials spike from <span className="font-semibold text-teal-600">7% → 18%</span> (2020-2021).
                    </p>
                    <a 
                      href="https://pubmed.ncbi.nlm.nih.gov/39754916/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-teal-600 font-medium block text-center transition-colors"
                    >
                      Gordhandas et al.
                    </a>
                  </div>

                  {/* Card 2 */}
                  <div className="group bg-gradient-to-br from-white via-white to-blue-50/30 p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center my-8">
                      <div className="text-7xl font-bold text-blue-600 mb-4">14%</div>
                      <div className="text-sm text-gray-600 font-medium">2021</div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 text-center">
                      of denied patients <span className="font-semibold text-blue-600">never received screening</span> that year, missing critical early detection.
                    </p>
                    <a 
                      href="https://pubmed.ncbi.nlm.nih.gov/39754916/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-blue-600 font-medium block text-center transition-colors"
                    >
                      Gordhandas et al.
                    </a>
                  </div>

                  {/* Card 3 */}
                  <div className="group bg-gradient-to-br from-white via-white to-purple-50/30 p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center my-8">
                      <div className="text-7xl font-bold text-purple-600 mb-4">38%</div>
                      <div className="text-sm text-gray-600 font-medium">average appeal success rate</div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 text-center">
                      Patients with denials often <span className="font-semibold text-purple-600">paid out-of-pocket or skipped MRIs</span> entirely.
                    </p>
                    <a 
                      href="https://radiologybusiness.com/topics/medical-imaging/womens-imaging/breast-imaging/providers-chart-uptick-number-breast-mri-denials-issued-insurers" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-purple-600 font-medium block text-center transition-colors"
                    >
                      Radiology Business
                    </a>
                  </div>
                </div>
              </div>

              {/* Solution Cards */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">How Clara Helps</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-teal-300 transition-all hover:shadow-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Faster Approvals</h3>
                      <p className="text-gray-600 leading-relaxed">
                        AI-powered analysis speeds up the review process, getting patients the care they need quickly.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Fairer Decisions</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Decisions rooted in complete medical context lead to more accurate and fair outcomes.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 transition-all hover:shadow-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Real Understanding</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Large datasets and generative models bridge the gap with genuine medical insight.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing Statement */}
              <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-12 rounded-3xl border border-teal-100 shadow-lg">
                <p className="text-2xl text-gray-800 leading-relaxed text-center max-w-4xl mx-auto font-medium">
                  Clara bridges the gap between clinics and insurers using AI, making approvals{" "}
                  <span className="font-bold text-teal-600">faster</span>,{" "}
                  <span className="font-bold text-blue-600">fairer</span>, and{" "}
                  <span className="font-bold text-purple-600">rooted in real medical understanding</span>.
                </p>
              </div>
            </div>
          </section>


          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12 px-8">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-gray-400">
                © 2025 Clara. All rights reserved. | AI-Powered Healthcare Solutions
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}