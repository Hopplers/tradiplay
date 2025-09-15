import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    console.log('Received message:', message)

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    console.log('Making request to Gemini API...')
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${context}\n\nUser question: ${message}`
          }]
        }]
      })
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API error:', errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    console.log('Gemini response:', data)
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return NextResponse.json({
        response: data.candidates[0].content.parts[0].text
      })
    } else {
      console.error('Invalid response structure:', data)
      return NextResponse.json({
        response: 'I apologize, but I encountered an issue processing your request. Please try asking about a specific traditional game like Congkak or Gasing.'
      })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      response: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.'
    })
  }
}
