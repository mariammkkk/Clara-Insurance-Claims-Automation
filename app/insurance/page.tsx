"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { Network } from "vis-network"

export default function GraphPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const nodes = [
      { id: "NVDA", label: "NVIDIA\n(NVDA)", group: "company", size: 30 },

      { id: "pelosi", label: "Nancy Pelosi\nSpeaker", group: "politician" },
      { id: "paul_pelosi", label: "Paul Pelosi\nSpouse", group: "spouse" },
      { id: "exec1", label: "Tech Executive\nAnonymous", group: "executive" },
      { id: "senator1", label: "Senator A\nTech Committee", group: "politician" },
      { id: "lobbyist1", label: "Tech Lobbyist\nK Street", group: "lobbyist" },
      { id: "fund_mgr", label: "Hedge Fund Mgr\nWall Street", group: "finance" },
    ]

    const edges = [
      { from: "pelosi", to: "NVDA", value: 10, label: "$5M Buy\n2024-06-15" },
      { from: "paul_pelosi", to: "NVDA", value: 10, label: "$3M Buy\n2024-06-14" },
      { from: "senator1", to: "NVDA", value: 8, label: "$2M Buy\n2024-06-16" },
      { from: "fund_mgr", to: "NVDA", value: 7, label: "$10M Buy\n2024-06-15" },

      { from: "pelosi", to: "paul_pelosi", value: 9, label: "Family\nSame Day Trade", dashes: true },
      { from: "pelosi", to: "senator1", value: 6, label: "Meeting\n2 days prior", dashes: true },
      { from: "pelosi", to: "lobbyist1", value: 5, label: "Lunch\n1 week prior", dashes: true },
      { from: "lobbyist1", to: "exec1", value: 7, label: "Client\nRelationship", dashes: true },
      { from: "exec1", to: "NVDA", value: 4, label: "Inside Info", dashes: true },
      { from: "senator1", to: "fund_mgr", value: 6, label: "Phone Call\nSame Day", dashes: true },
      { from: "fund_mgr", to: "lobbyist1", value: 5, label: "Donor\nRelationship", dashes: true },
    ]

    const data = {
      nodes: nodes,
      edges: edges,
    }

    const options = {
      nodes: {
        shape: "dot",
        size: 20,
        font: {
          size: 12,
          color: "#000000",
        },
        borderWidth: 2,
      },
      groups: {
        company: {
          color: { border: "#000000", background: "#1F2937" },
          size: 40,
        },
        politician: {
          color: { border: "#000000", background: "#DC2626" },
        },
        spouse: {
          color: { border: "#000000", background: "#EF4444" },
        },
        executive: {
          color: { border: "#000000", background: "#991B1B" },
        },
        lobbyist: {
          color: { border: "#000000", background: "#B91C1C" },
        },
        finance: {
          color: { border: "#000000", background: "#DC2626" },
        },
      },
      edges: {
        width: 1,
        color: {
          color: "#404040",
          highlight: "#DC2626",
        },
        smooth: {
          enabled: true,
          type: "continuous",
          roundness: 0.5,
        },
        font: {
          size: 10,
          align: "middle",
          color: "#000000",
        },
        scaling: {
          min: 1,
          max: 5,
        },
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -8000,
          springConstant: 0.01,
          springLength: 200,
        },
        stabilization: {
          iterations: 2500,
        },
      },
      interaction: {
        dragNodes: true,
        dragView: true,
        zoomView: true,
      },
    }

    const network = new Network(containerRef.current, data, options)

    return () => {
      network.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 border-b border-gray-200 text-center">
        <Link href="/" className="text-2xl font-semibold text-black tracking-tight hover:text-red-600 transition-colors orpheus">
          Clara
        </Link>
      </header>
      <div ref={containerRef} className="w-full h-[calc(100vh-80px)]"></div>
      
      {/* Contact Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions about Clara or want to learn more about our AI-powered healthcare approval platform? We'd love to hear from you.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:hello@clara.ai" className="text-blue-600 hover:text-blue-700 transition-colors">
                hello@clara.ai
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">
                San Francisco, CA
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">GitHub</h3>
              <a href="https://github.com/hannanlabs/clara" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                @hannanlabs/clara
              </a>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="text-left">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us what you're interested in..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Clara. All rights reserved. | AI-Powered Healthcare Solutions
          </p>
        </div>
      </footer>
    </div>
  )
}
