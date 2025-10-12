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
        <div className="relative rounded-t-3xl shadow-2xl pointer-events-auto overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 animate-gradient-shift" />
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />

          {/* Why Section */}
          <section className="relative py-20 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
                  Why Clara?
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
                Women's health care clinics have long been pitted against insurance companies since healthcare became a commoditized service. 
                A physician carefully reviews patient records, listens to symptoms, and builds an informed diagnosis only for their claim to be 
                denied by an insurer who lacks that context. Hours of phone calls and back and forth follow, delaying care and exhausting both sides.
              </p>
              </div>

              {/* Statistics Section - New! */}
              <div className="mb-16 animate-slide-up">
                <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">The Reality: Women Face Higher Denial Rates</h3>
                
                {/* Scrolling carousel container */}
<div className="relative overflow-hidden py-4">
                  {/* Animated scrolling wrapper */}
                  <div className="flex gap-6 animate-scroll-horizontal hover:pause-animation">
                    {/* First set of cards */}
                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-red-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-red-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-red-600 mb-2">11%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">High-Risk Women Denied</div>
                        <div className="text-xs text-gray-600 mb-3">Of women with gBRCA1/2 had breast MRI denied</div>
                        <div className="pt-3 border-t border-red-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Gordhandas et al., <em>Gynecologic Oncology</em>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-orange-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-orange-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-4xl font-black text-orange-600 mb-2">7% <span className="text-3xl font-normal">to</span> 18%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Medicaid Denial Surge</div>
                        <div className="text-xs text-gray-600 mb-3">Denial rate jumped from 7% (2020) to 18% (2021)</div>
                        <div className="pt-3 border-t border-orange-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Gordhandas et al., <em>Gynecologic Oncology</em>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-rose-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-rose-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-red-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-rose-600 mb-2">14%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Didn't Get Screening</div>
                        <div className="text-xs text-gray-600 mb-3">Of those denied in 2020, 14% never received MRI that year</div>
                        <div className="pt-3 border-t border-rose-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Gordhandas et al., <em>Gynecologic Oncology</em>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-purple-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-purple-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-4xl font-black text-purple-600 mb-2">6% <span className="text-3xl font-normal">to</span> 9%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Commercial Insurer Denials</div>
                        <div className="text-xs text-gray-600 mb-3">Commercial insurance denials increased from 6% to 9%</div>
                        <div className="pt-3 border-t border-purple-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Radiology Business / Women's Imaging
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-blue-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-blue-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-blue-600 mb-2">94%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Prior Auth Delays Care</div>
                        <div className="text-xs text-gray-600 mb-3">Of physicians report prior authorization delays care</div>
                        <div className="pt-3 border-t border-blue-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: AMA Prior Authorization Survey
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-pink-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-pink-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-pink-600 mb-2">82%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Patients Abandon Treatment</div>
                        <div className="text-xs text-gray-600 mb-3">Report prior auth causes patients to abandon care</div>
                        <div className="pt-3 border-t border-pink-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: AMA Prior Authorization Survey
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-indigo-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-indigo-600 mb-2">29%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Serious Adverse Events</div>
                        <div className="text-xs text-gray-600 mb-3">Prior auth led to hospitalization or serious harm</div>
                        <div className="pt-3 border-t border-indigo-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: AMA / Media Coverage
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-amber-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-amber-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-amber-600 mb-2">27%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Often Denied</div>
                        <div className="text-xs text-gray-600 mb-3">Of physicians say prior auths are often/always denied</div>
                        <div className="pt-3 border-t border-amber-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: AMA / AHA Reporting
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-teal-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-teal-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-teal-600 mb-2">41</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Weekly Prior Auths</div>
                        <div className="text-xs text-gray-600 mb-3">Average prior authorizations handled per week</div>
                        <div className="pt-3 border-t border-teal-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: AMA Survey & Medical Economics
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-cyan-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-cyan-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-cyan-600 mb-2">13hrs</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Weekly Time Burden</div>
                        <div className="text-xs text-gray-600 mb-3">Physicians spend 12-13 hours/week on prior auth</div>
                        <div className="pt-3 border-t border-cyan-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: AMA Survey & Medical Economics
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-emerald-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-emerald-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-emerald-600 mb-2">93%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Care Delayed</div>
                        <div className="text-xs text-gray-600 mb-3">Of physicians report prior auth causes care delays</div>
                        <div className="pt-3 border-t border-emerald-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: AMA / AHA
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-violet-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-violet-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-violet-600 mb-2">24%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Serious Harm</div>
                        <div className="text-xs text-gray-600 mb-3">Prior auth caused permanent damage or hospitalization</div>
                        <div className="pt-3 border-t border-violet-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: CMA / AMA Survey Results
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Duplicate cards for seamless loop */}
                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-red-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-red-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-red-600 mb-2">11%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">High-Risk Women Denied</div>
                        <div className="text-xs text-gray-600 mb-3">Of women with gBRCA1/2 had breast MRI denied</div>
                        <div className="pt-3 border-t border-red-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Gordhandas et al., <em>Gynecologic Oncology</em>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-orange-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-orange-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-4xl font-black text-orange-600 mb-2">7% <span className="text-3xl font-normal">to</span> 18%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Medicaid Denial Surge</div>
                        <div className="text-xs text-gray-600 mb-3">Denial rate jumped from 7% (2020) to 18% (2021)</div>
                        <div className="pt-3 border-t border-orange-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Gordhandas et al., <em>Gynecologic Oncology</em>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-rose-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-rose-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-red-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-5xl font-black text-rose-600 mb-2">14%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Didn't Get Screening</div>
                        <div className="text-xs text-gray-600 mb-3">Of those denied in 2020, 14% never received MRI that year</div>
                        <div className="pt-3 border-t border-rose-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Gordhandas et al., <em>Gynecologic Oncology</em>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative backdrop-blur-xl bg-white/70 p-6 rounded-2xl border-2 border-purple-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-purple-400 flex-shrink-0 w-80">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="text-4xl font-black text-purple-600 mb-2">6% <span className="text-3xl font-normal">to</span> 9%</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">Commercial Insurer Denials</div>
                        <div className="text-xs text-gray-600 mb-3">Commercial insurance denials increased from 6% to 9%</div>
                        <div className="pt-3 border-t border-purple-200">
                          <p className="text-xs text-gray-500 italic leading-tight">
                            Source: Radiology Business / Women's Imaging
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="group relative text-center p-8 backdrop-blur-xl bg-white/80 rounded-3xl border-2 border-teal-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-teal-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Approvals</h3>
                    <p className="text-gray-700 leading-relaxed">
                      AI-powered analysis speeds up the review process, getting patients the care they need quickly without endless delays.
                    </p>
                  </div>
                </div>

                <div className="group relative text-center p-8 backdrop-blur-xl bg-white/80 rounded-3xl border-2 border-blue-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-blue-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Fairer Decisions</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Decisions rooted in complete medical context lead to more accurate and fair outcomes, reducing gender disparities.
                    </p>
                  </div>
                </div>

                <div className="group relative text-center p-8 backdrop-blur-xl bg-white/80 rounded-3xl border-2 border-purple-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-purple-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Understanding</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Large datasets and generative models bridge the gap with genuine medical insight and clinical context.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-teal-50/80 to-blue-50/80 p-12 rounded-3xl border-2 border-teal-200 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-100/20 via-blue-100/20 to-purple-100/20 rounded-3xl animate-pulse-slow" />
                <div className="relative">
                  <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed max-w-4xl mx-auto text-center font-semibold">
                  Our system changes that by using large datasets and generative language models to bridge the gap between 
                    clinics and insurers, making approvals <span className="font-black text-teal-600">faster</span>, 
                    <span className="font-black text-blue-600"> fairer</span>, and 
                    <span className="font-black text-purple-600"> rooted in real medical understanding</span>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="relative py-20 px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
                  Get in Touch
                </h2>
                <p className="text-xl text-gray-700 font-medium">
                Interested in learning more about Clara? We'd love to hear from you.
              </p>
              </div>

              <div className="relative backdrop-blur-xl bg-white/80 p-10 rounded-3xl shadow-2xl border-2 border-gray-200 hover:border-teal-300 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-blue-50/30 rounded-3xl opacity-0 hover:opacity-100 transition-opacity" />
                <form className="relative space-y-6">
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-teal-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 bg-white/50 backdrop-blur hover:bg-white hover:shadow-lg"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-teal-600">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 resize-none bg-white/50 backdrop-blur hover:bg-white hover:shadow-lg"
                      placeholder="Tell us about your needs..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="relative w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 hover:from-teal-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 text-white py-12 px-8">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }} />
            <div className="relative max-w-5xl mx-auto text-center">
              <p className="text-gray-400 text-base font-medium">
                © 2025 Clara. All rights reserved. | AI-Powered Healthcare Solutions
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Bridging the gap between clinics and insurers with intelligent automation
              </p>
            </div>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 20s ease infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-scroll-horizontal {
          animation: scroll-horizontal 20s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
