'use client'
import { useState } from 'react'
import BackButton from '../../components/ui/BackButton'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m TradiBot. Ask me anything about Malay traditional games!',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const questionPool = [
    "Tell me about Congkak",
    "How do you play Gasing?",
    "What is Wau kite flying?",
    "Explain Batu Seremban rules",
    "How is Sepak Takraw played?",
    "What is Dam Haji?",
    "Tell me about Kabbadi",
    "What are the origins of Congkak?",
    "How do you make a traditional Gasing?",
    "What materials are used for Wau kites?",
    "How many players can play Batu Seremban?",
    "What skills does Sepak Takraw develop?",
    "Is Dam Haji similar to checkers?",
    "What are the rules of Kabbadi?",
    "Which games are played indoors?",
    "Which games require physical fitness?",
    "What games can children play?",
    "How do these games preserve culture?",
    "Which game is easiest to learn?",
    "What equipment do I need for each game?"
  ]

  const [suggestions, setSuggestions] = useState(() => {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
  })

  const getNewSuggestions = () => {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 2))
  }

  const handleSuggestion = (suggestion: string) => {
    setInputText(suggestion)
  }

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          context: 'You are a helpful assistant for TradiPlay, an app about Malay traditional games. Help users learn about games like Congkak, Gasing, Wau, Batu Seremban, Sepak Takraw, Dam Haji, and Kabbadi.'
        }),
      })

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I couldn\'t process your request.',
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      getNewSuggestions()
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting. Please try again.',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      getNewSuggestions()
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <BackButton />
          <h1 className="text-xl font-bold text-center flex-1 pr-10">TradiBot</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-[var(--primary-color)] text-black'
                    : 'bg-[var(--surface-color)] text-[var(--text-primary)]'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-black/70' : 'text-[var(--text-secondary)]'
                }`}>
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[var(--surface-color)] text-[var(--text-primary)] p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-[var(--background-color)] border-t border-gray-700">
          {/* Suggestion Buttons */}
          {!isLoading && (
            <div className="flex gap-2 mb-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestion(suggestion)}
                  className="px-3 py-2 bg-[var(--surface-color)] text-[var(--text-primary)] rounded-lg text-sm hover:bg-gray-600 transition-colors border border-gray-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about traditional games..."
              className="flex-1 p-3 bg-[var(--surface-color)] border border-gray-600 rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary-color)]"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className="px-6 py-3 bg-[var(--primary-color)] text-black rounded-lg font-medium hover:bg-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
