import { projects } from '../data/projects'
import { projectReadmes } from '../data/projectReadmes'

const GEMINI_MODEL = 'gemini-3.6-flash'

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/**
 * Build the system prompt from project data + full README content.
 * No truncation needed — Gemini supports 1M token context.
 */
function buildSystemPrompt(): string {
  const projectSummaries = projects.map((p) => {
    const readme = projectReadmes[p.github] || ''
    const readmeSection = readme
      ? `\n\nFull README:\n${readme}`
      : ''

    return `### ${p.title}
- **Description**: ${p.description || 'No description available.'}
- **Tech Stack**: ${p.tech.length > 0 ? p.tech.join(', ') : 'Not specified'}
- **GitHub**: ${p.github}${p.demo ? `\n- **Demo**: ${p.demo}` : ''}${readmeSection}`
  }).join('\n\n---\n\n')

  return `You are a friendly, knowledgeable project assistant for Pasindu Saranga's portfolio. Your job is to answer questions about Pasindu's projects based on the detailed information below.

## About Pasindu
- Software Engineering Undergraduate at NSBM Green University, Sri Lanka
- Focus: Full-stack web development, mobile apps (Flutter), desktop tools
- GitHub: https://github.com/SAR4NGA
- Available for internship opportunities

## Projects

${projectSummaries}

## Instructions
- Answer questions about the projects accurately based on the information provided above.
- Use the full README content to give rich answers about features, setup, architecture, etc.
- Be conversational, concise, and helpful. Use markdown formatting when appropriate.
- If asked about something not covered in the project data, say so honestly.
- You can compare projects, suggest which ones demonstrate certain skills, and explain technical choices.
- Keep responses focused and not too long — aim for 2-4 short paragraphs max.
- Do NOT make up information that isn't in the project data.`
}

let systemPrompt: string | null = null

function getSystemPrompt(): string {
  if (!systemPrompt) {
    systemPrompt = buildSystemPrompt()
  }
  return systemPrompt
}

/**
 * Convert our ChatMessage format to Gemini's contents format.
 * Gemini uses 'user' and 'model' roles (not 'assistant').
 */
function toGeminiContents(messages: ChatMessage[]) {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))
}

/**
 * Send a message to the Gemini API and get a response.
 * Maintains conversation context via the history parameter.
 */
export async function sendMessage(
  userMessage: string,
  history: ChatMessage[]
): Promise<{ reply: string; updatedHistory: ChatMessage[] }> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error(
      'Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.'
    )
  }

  const newHistory: ChatMessage[] = [
    ...history,
    { role: 'user', content: userMessage },
  ]

  // Gemini uses systemInstruction for system prompts (separate from contents)
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: getSystemPrompt() }],
      },
      contents: toGeminiContents(newHistory),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.9,
      },
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    if (response.status === 429) {
      throw new Error('Rate limit reached. Please wait a moment and try again.')
    }
    throw new Error(
      (errorData as { error?: { message?: string } })?.error?.message ||
        `Gemini API error: ${response.status}`
    )
  }

  const data = (await response.json()) as {
    candidates: Array<{ content: { parts: Array<{ text: string }> } }>
  }

  const reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I couldn't generate a response."

  const updatedHistory: ChatMessage[] = [
    ...newHistory,
    { role: 'assistant', content: reply },
  ]

  return { reply, updatedHistory }
}
