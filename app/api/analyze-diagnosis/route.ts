import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const caseData = body?.caseData || body

    const userInput = `
    Claim ID: ${caseData.claim_id}
    Patient Age: ${caseData.patient_age}
    Insurer Email: ${caseData.insurer_email}
    Patient Summary: ${caseData.patient_summary}
    Diagnosis: ${caseData.diagnosis}
    ICD Code: ${caseData.icd_code}
    CPT Code: ${caseData.cpt_code}
    Procedure Category: ${caseData.procedure_category}
    Procedure Description: ${caseData.procedure_description}
    Explanation: ${caseData.explanation}
    `.trim()

    const apiPayload = {
      userId: process.env.AIRIA_USER_ID || '',
      userInput,
      asyncOutput: false,
    }

    console.log('Calling AIRIA API with payload:', JSON.stringify(apiPayload, null, 2))

    const response = await fetch(
      'https://api.airia.ai/v2/PipelineExecution/dd0efd02-8d62-4b62-a37d-d3ef1d09e196',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': process.env.AIRIA_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response:', errorText)
      throw new Error(`API request failed: ${response.statusText} - ${errorText}`)
    }

    const result = await response.json()
    console.log('API Response:', JSON.stringify(result, null, 2))

    return NextResponse.json({
      success: true,
      analysis: result
    })
  } catch (error: any) {
    console.error('Analysis API error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
