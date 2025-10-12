"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ClinicsDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [cases, setCases] = useState<any[]>([])
  const [selectedCase, setSelectedCase] = useState<any>(null)

  const [formData, setFormData] = useState({
    claim_id: "",
    patient_summary: "",
    diagnosis: "",
    icd_code: "",
    cpt_code: "",
    decision: "",
    explanation: "",
    procedure_category: "",
    procedure_description: "",
    patient_age: ""
  })

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/clinics")
        return
      }

      setUser(user)
      await fetchCases(user.id)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const fetchCases = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setCases(data || [])
    } catch (err) {
      console.error('Error fetching cases:', err)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/clinics")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitCase = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const { error } = await supabase
        .from('cases')
        .insert([
          {
            ...formData,
            patient_age: parseInt(formData.patient_age),
            user_id: user?.id
          }
        ])

      if (error) throw error

      setSuccess("Case submitted successfully!")
      setFormData({
        claim_id: "",
        patient_summary: "",
        diagnosis: "",
        icd_code: "",
        cpt_code: "",
        decision: "",
        explanation: "",
        procedure_category: "",
        procedure_description: "",
        patient_age: ""
      })

      // Refresh cases list
      await fetchCases(user?.id)

      setTimeout(() => {
        setShowModal(false)
        setSuccess("")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting the case")
    } finally {
      setSubmitting(false)
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
            className="text-2xl font-semibold text-black tracking-tight hover:text-teal-600 transition-colors orpheus"
          >
            Clara
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm text-gray-700 hover:text-teal-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Clinics Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-teal-600">0</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Approved
            </h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Rejected
            </h3>
            <p className="text-3xl font-bold text-red-600">0</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Requests
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              + New Case
            </button>
          </div>

          {cases.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No requests yet. Submit your first approval request to get started.
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
                  className="p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer"
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
                    </div>
                    <div className="ml-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">
                        {caseItem.decision || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Case Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Submit New Case
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitCase} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Claim ID
                  </label>
                  <input
                    type="text"
                    name="claim_id"
                    value={formData.claim_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Age
                  </label>
                  <input
                    type="number"
                    name="patient_age"
                    value={formData.patient_age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Summary
                  </label>
                  <textarea
                    name="patient_summary"
                    value={formData.patient_summary}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ICD Code
                  </label>
                  <input
                    type="text"
                    name="icd_code"
                    value={formData.icd_code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPT Code
                  </label>
                  <input
                    type="text"
                    name="cpt_code"
                    value={formData.cpt_code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Procedure Category
                  </label>
                  <input
                    type="text"
                    name="procedure_category"
                    value={formData.procedure_category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Procedure Description
                  </label>
                  <textarea
                    name="procedure_description"
                    value={formData.procedure_description}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Decision
                  </label>
                  <input
                    type="text"
                    name="decision"
                    value={formData.decision}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation
                  </label>
                  <textarea
                    name="explanation"
                    value={formData.explanation}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Case"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Case Detail Modal */}
      {showDetailModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Case Details - {selectedCase.claim_id}
                </h2>
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
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Decision</h3>
                    <p className="text-gray-900">{selectedCase.decision}</p>
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

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    setSelectedCase(null)
                  }}
                  className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
