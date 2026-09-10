import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { sendMessage, type ChatMessage } from '../services/groqChat'

interface DisplayMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'What tech does network monitor use?',
  'Tell me about LiteCordChat',
  'Which projects use Flutter?',
  'What is the ADBMS project?',
]

export default function ProjectChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const lastBotMessageRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  // Scroll to top of bot reply so users read from the beginning
  const scrollToLastBotMessage = useCallback(() => {
    const el = lastBotMessageRef.current
    const container = messagesContainerRef.current
    if (el && container) {
      const elTop = el.offsetTop - container.offsetTop
      container.scrollTo({ top: elTop - 12, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    // After a bot message arrives, scroll to its top so the user reads from the start
    const lastMsg = messages[messages.length - 1]
    if (lastMsg?.role === 'assistant') {
      scrollToLastBotMessage()
    } else {
      // For user messages and typing indicator, scroll to bottom
      scrollToBottom()
    }
  }, [messages, isLoading, scrollToBottom, scrollToLastBotMessage])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async (text?: string) => {
    const messageText = (text || input).trim()
    if (!messageText || isLoading) return

    setInput('')
    setError(null)

    const userMsg: DisplayMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const { reply, updatedHistory } = await sendMessage(messageText, history)
      setHistory(updatedHistory)

      const botMsg: DisplayMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: reply,
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative inline-block">
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className={`relative overflow-hidden flex items-center gap-2 rounded-full ml-1 px-5 py-3 font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
          isOpen
            ? 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            : 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Ask about my projects'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative z-10"
            >
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative z-10 flex items-center gap-2"
            >
              <MessageCircle size={18} />
              <span className="hidden text-sm sm:inline">Ask about my projects</span>
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-900/25 animate-button-shine" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-full left-0 z-50 mb-3 flex w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950 sm:w-[400px]"
            style={{ height: 'min(520px, calc(100vh - 8rem))' }}
          >


            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-gray-800/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 dark:bg-white">
                <Bot size={14} className="text-white dark:text-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Project Assistant
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Powered with AI · Ask anything
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-gray-200 p-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 dark:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-300"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chatbot-scrollbar">
              {/* Welcome message */}
              {messages.length === 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="rounded-2xl rounded-bl-sm border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                    <p>
                      👋 Hi!  I  know  all  about  Saranga's  projects. Ask  me  anything
                      — what  tech  they  use,  how  they  work,  or  which  ones
                      demonstrate  specific  skills!
                    </p>
                  </div>

                  {/* Suggestion chips */}
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSend(suggestion)}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message bubbles */}
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  ref={msg.role === 'assistant' && i === messages.length - 1 ? lastBotMessageRef : null}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-2xl rounded-br-sm bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'rounded-2xl rounded-bl-sm border border-gray-100 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}
                  >
                    <MessageContent content={msg.content} />
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl rounded-bl-sm border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center gap-1">
                      <span className="chatbot-typing-dot h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                      <span className="chatbot-typing-dot chatbot-typing-dot-2 h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                      <span className="chatbot-typing-dot chatbot-typing-dot-3 h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400"
                >
                  {error}
                </motion.div>
              )}

            </div>

            {/* Input area */}
            <div className="border-t border-gray-100 px-3 py-3 dark:border-gray-800/50">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 transition-colors focus-within:border-blue-300 focus-within:bg-white dark:border-gray-800 dark:bg-gray-900 dark:focus-within:border-blue-800 dark:focus-within:bg-gray-950">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about a project..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-white dark:placeholder-gray-600"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition-all hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 disabled:opacity-30"
                  aria-label="Send message"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Simple markdown-like renderer for bot responses.
 * Handles bold, inline code, links, and line breaks.
 */
function MessageContent({ content }: { content: string }) {
  const lines = content.split('\n')

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />

        // Header lines (### or ##)
        if (line.startsWith('###')) {
          return (
            <p key={i} className="font-semibold text-gray-900 dark:text-white">
              {line.replace(/^#{1,3}\s*/, '')}
            </p>
          )
        }

        // List items
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return (
            <p key={i} className="pl-3">
              <span className="mr-1.5 text-blue-500">•</span>
              <InlineFormatted text={line.replace(/^\s*[-*]\s*/, '')} />
            </p>
          )
        }

        return (
          <p key={i}>
            <InlineFormatted text={line} />
          </p>
        )
      })}
    </div>
  )
}

/**
 * Renders inline formatting: **bold**, `code`, [links](url)
 */
function InlineFormatted({ text }: { text: string }) {
  // Simple regex-based inline formatting
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/)

  return (
    <>
      {parts.map((part, i) => {
        // Bold
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          )
        }
        // Inline code
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="rounded bg-gray-200 px-1 py-0.5 text-xs font-mono dark:bg-gray-800"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        // Link
        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
        if (linkMatch) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300"
            >
              {linkMatch[1]}
            </a>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
