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

      setCases(data || [])
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
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Approved Today
            </h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Rejected Today
            </h3>
            <p className="text-3xl font-bold text-red-600">0</p>
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

      {/* Case Detail Modal */}
      {showDetailModal && selectedCase && (
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
      )}
    </div>
  )
}
