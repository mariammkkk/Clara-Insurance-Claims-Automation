"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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
  const [pendingCount, setPendingCount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)
  const [rejectedCount, setRejectedCount] = useState(0)
  const [savingsData, setSavingsData] = useState<any[]>([])
  const [totalSavings, setTotalSavings] = useState(0)

  const [formData, setFormData] = useState({
    claim_id: "",
    patient_summary: "",
    diagnosis: "",
    icd_code: "",
    cpt_code: "",
    explanation: "",
    procedure_category: "",
    procedure_description: "",
    patient_age: "",
    insurer_email: ""
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
      console.log('Fetching cases for user_id:', userId)

      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      console.log('Fetch result:', { data, error })

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

      // Calculate revenue savings based on approved cases
      const REVENUE_PER_APPROVAL = 100

      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const approvedCases = allCases.filter(c =>
        c.status === 'approved' &&
        new Date(c.created_at) >= thirtyDaysAgo
      )

      const dailySavings: { [key: string]: number } = {}

      approvedCases.forEach(c => {
        const date = new Date(c.created_at).toLocaleDateString()
        if (!dailySavings[date]) {
          dailySavings[date] = 0
        }
        dailySavings[date] += REVENUE_PER_APPROVAL
      })

      const chartData = []
      let cumulativeSavings = 0

      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateStr = date.toLocaleDateString()
        const savings = dailySavings[dateStr] || 0
        cumulativeSavings += savings

        chartData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          savings: cumulativeSavings
        })
      }

      setSavingsData(chartData)
      setTotalSavings(cumulativeSavings)
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
      setSuccess("Analyzing case with AI...")
      const analysisResponse = await fetch('/api/analyze-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseData: {
            ...formData,
            patient_age: parseInt(formData.patient_age)
          }
        }),
      })

      const analysisResult = await analysisResponse.json()

      let diagnosisAnalysis = null
      if (analysisResult.success) {
        diagnosisAnalysis = JSON.stringify(analysisResult.analysis)
      } else {
        console.error('Analysis failed:', analysisResult.error)
        diagnosisAnalysis = `Analysis failed: ${analysisResult.error}`
      }

      // Then, insert the case with the analysis
      const { error } = await supabase
        .from('cases')
        .insert([
          {
            ...formData,
            patient_age: parseInt(formData.patient_age),
            user_id: user?.id,
            clinic_email: user?.email,
            diagnosis_analysis: diagnosisAnalysis
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
        explanation: "",
        procedure_category: "",
        procedure_description: "",
        patient_age: "",
        insurer_email: ""
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

        {/* Stats and Chart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white p-7 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-4 text-center">
                Case Distribution
              </h3>
              <div className="flex items-center gap-6">
                {/* Pie Chart on Left */}
                <div className="flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
                    {/* Approved slice */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray={`${((approvedCount / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327} ${251.327 - ((approvedCount / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327}`}
                      strokeDashoffset="0"
                    />
                    {/* Rejected slice */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="20"
                      strokeDasharray={`${((rejectedCount / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327} ${251.327 - ((rejectedCount / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327}`}
                      strokeDashoffset={`-${((approvedCount / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327}`}
                    />
                    {/* Pending slice */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray={`${((pendingCount / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327} ${251.327 - ((pendingCount / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327}`}
                      strokeDashoffset={`-${(((approvedCount + rejectedCount) / (approvedCount + rejectedCount + pendingCount || 1)) * 100) * 2.51327}`}
                    />
                  </svg>
                </div>

                {/* Stats on Right */}
                <div className="flex-1 space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Approved</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {(approvedCount + rejectedCount + pendingCount) > 0
                        ? ((approvedCount / (approvedCount + rejectedCount + pendingCount)) * 100).toFixed(0)
                        : 0}% ({approvedCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Rejected</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {(approvedCount + rejectedCount + pendingCount) > 0
                        ? ((rejectedCount / (approvedCount + rejectedCount + pendingCount)) * 100).toFixed(0)
                        : 0}% ({rejectedCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Pending</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {(approvedCount + rejectedCount + pendingCount) > 0
                        ? ((pendingCount / (approvedCount + rejectedCount + pendingCount)) * 100).toFixed(0)
                        : 0}% ({pendingCount})
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between p-2">
                      <span className="text-gray-600 font-medium">Total Cases</span>
                      <span className="text-2xl font-bold text-gray-900">{approvedCount + rejectedCount + pendingCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Saved Metric */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between">
              <h3 className="text-base font-semibold text-gray-900 mb-4 text-center">
                Estimated Revenue Saved
              </h3>
              <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
                  ${(approvedCount * 100).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 mb-4">through successful approvals</p>
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg mx-auto">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm font-semibold text-green-700">
                    {(approvedCount + rejectedCount + pendingCount) > 0
                      ? ((approvedCount / (approvedCount + rejectedCount + pendingCount)) * 100).toFixed(1)
                      : 0}% Success Rate
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Avg per Approval</p>
                  <p className="text-xl font-bold text-emerald-600">$100</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Approvals</p>
                  <p className="text-xl font-bold text-green-600">{approvedCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cumulative Savings Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cumulative Savings (Last 30 Days)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value: number) => `$${value}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
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
                    Insurer Email
                  </label>
                  <input
                    type="email"
                    name="insurer_email"
                    value={formData.insurer_email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                    placeholder="insurer@example.com"
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
