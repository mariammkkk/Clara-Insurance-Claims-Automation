"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function InsuranceDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cases, setCases] = useState<any[]>([])
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)
  const [rejectedCount, setRejectedCount] = useState(0)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/insurance")
        return
      }

      setUser(user)
      await fetchCases(user.email)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const fetchCases = async (insurerEmail: string) => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('insurer_email', insurerEmail)
        .order('created_at', { ascending: false })

      if (error) throw error

      const allCases = data || []
      setCases(allCases)

      // Calculate counts by status
      const pending = allCases.filter(c => c.status === 'pending').length
      const approved = allCases.filter(c => c.status === 'approved').length
      const rejected = allCases.filter(c => c.status === 'rejected').length

      setPendingCount(pending)
      setApprovedCount(approved)
      setRejectedCount(rejected)
    } catch (err) {
      console.error('Error fetching cases:', err)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/insurance")
  }

  const handleStatusUpdate = async (caseId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('cases')
        .update({ status: newStatus })
        .eq('id', caseId)

      if (error) throw error

      // Refresh cases list
      await fetchCases(user?.email)

      // Close modal
      setShowDetailModal(false)
      setSelectedCase(null)
    } catch (err) {
      console.error('Error updating case status:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-semibold text-black tracking-tight hover:text-blue-600 transition-colors orpheus"
          >
            Clara
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Insurance Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pending Review
            </h3>
            <p className="text-3xl font-bold text-blue-600">{pendingCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Approved
            </h3>
            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Rejected
            </h3>
            <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Requests for Review
          </h2>

          {cases.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No pending requests at this time. Check back later for new submissions.
            </p>
          ) : (
            <div className="space-y-3">
              {cases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  onClick={() => {
                    setSelectedCase(caseItem)
                    setShowDetailModal(true)
                  }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Claim ID: {caseItem.claim_id}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {caseItem.diagnosis} - {caseItem.procedure_category}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Patient Age: {caseItem.patient_age} | ICD: {caseItem.icd_code} | CPT: {caseItem.cpt_code}
                      </p>
                      <p className="text-xs text-blue-600 mt-2 font-medium">
                        From: {caseItem.clinic_email}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        caseItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                        caseItem.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {caseItem.status?.charAt(0).toUpperCase() + caseItem.status?.slice(1) || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showDetailModal && selectedCase && (() => {
        let aiAnalysis = null
        let analysisError = null
        try {
          if (selectedCase.diagnosis_analysis) {
            if (selectedCase.diagnosis_analysis.startsWith('Analysis failed:')) {
              analysisError = selectedCase.diagnosis_analysis
            } else {
              const outerParsed = JSON.parse(selectedCase.diagnosis_analysis)
              const resultContent: any = (outerParsed && outerParsed.result) ? outerParsed.result : outerParsed

              if (typeof resultContent === 'string') {
                const lines = resultContent.split(/\n+/)
                let confidence: string | number | undefined
                let summary: string | undefined
                let decision: string | undefined

                for (const line of lines) {
                  const cleaned = line.replace(/^\(\d+\)\s*/, '').trim()
                  const [labelRaw, ...rest] = cleaned.split(':')
                  const label = (labelRaw || '').toLowerCase()
                  const value = rest.join(':').trim()

                  if (label.startsWith('confidence')) {
                    const num = parseFloat(value)
                    confidence = isNaN(num) ? value : num
                  } else if (label.startsWith('summary')) {
                    summary = value
                  } else if (label.startsWith('decision')) {
                    decision = value
                  }
                }

                aiAnalysis = {
                  finalDecision: decision || 'N/A',
                  confidenceScore: confidence ?? 'N/A',
                  summaryReasoning: summary || 'N/A'
                }
              } else if (typeof resultContent === 'object' && resultContent !== null) {
                aiAnalysis = {
                  finalDecision: resultContent.final_decision || resultContent.decision || 'N/A',
                  confidenceScore: resultContent.confidence || resultContent.confidence_score || 'N/A',
                  summaryReasoning: resultContent.summary_reasoning || resultContent.summary_reason || 'N/A'
                }
              } else {
                analysisError = 'Unrecognized AI analysis format'
              }
            }
          }
        } catch (err) {
          console.error('Error parsing diagnosis_analysis:', err)
          analysisError = 'Unable to parse AI analysis'
        }

        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Case Details - {selectedCase.claim_id}
                    </h2>
                    <p className="text-sm text-blue-600 mt-1">
                      Submitted by: {selectedCase.clinic_email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDetailModal(false)
                      setSelectedCase(null)
                    }}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {aiAnalysis && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      AI Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Final Decision</p>
                        <p className="text-sm font-semibold text-gray-900">{aiAnalysis.finalDecision}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Confidence Score</p>
                        <p className="text-sm font-semibold text-gray-900">{aiAnalysis.confidenceScore}</p>
                      </div>
                      <div className="md:col-span-1">
                        <p className="text-xs font-medium text-gray-600 mb-1">Summary Reasoning</p>
                        <p className="text-sm text-gray-900">{aiAnalysis.summaryReasoning}</p>
                      </div>
                    </div>
                  </div>
                )}

                {analysisError && (
                  <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <h3 className="text-sm font-semibold text-yellow-800 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      AI Analysis Unavailable
                    </h3>
                    <p className="text-xs text-yellow-700">{analysisError}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Claim ID</h3>
                    <p className="text-gray-900">{selectedCase.claim_id}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Patient Age</h3>
                    <p className="text-gray-900">{selectedCase.patient_age}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Diagnosis</h3>
                    <p className="text-gray-900">{selectedCase.diagnosis}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">ICD Code</h3>
                    <p className="text-gray-900">{selectedCase.icd_code}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">CPT Code</h3>
                    <p className="text-gray-900">{selectedCase.cpt_code}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Procedure Category</h3>
                    <p className="text-gray-900">{selectedCase.procedure_category}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      selectedCase.status === 'approved' ? 'bg-green-100 text-green-800' :
                      selectedCase.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedCase.status?.charAt(0).toUpperCase() + selectedCase.status?.slice(1) || 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Patient Summary</h3>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                      {selectedCase.patient_summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Procedure Description</h3>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                      {selectedCase.procedure_description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Explanation</h3>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                      {selectedCase.explanation}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Submitted</h3>
                    <p className="text-gray-900">
                      {new Date(selectedCase.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    setSelectedCase(null)
                  }}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedCase.id, 'approved')}
                  disabled={selectedCase.status === 'approved'}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedCase.status === 'approved' ? 'Approved' : 'Approve'}
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedCase.id, 'rejected')}
                  disabled={selectedCase.status === 'rejected'}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedCase.status === 'rejected' ? 'Rejected' : 'Reject'}
                </button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
