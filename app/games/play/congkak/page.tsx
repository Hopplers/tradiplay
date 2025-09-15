'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../../contexts/AuthContext'
import BackButton from '../../../../components/ui/BackButton'
import Button from '../../../../components/ui/Button'
import { updateLeaderboard } from '../../../../lib/database'

export default function CongkakGame() {
  const router = useRouter()
  const { user } = useAuth()
  
  // Game state: 16 holes total
  // Holes 0-6: Player side (7 holes), Hole 7: Player storehouse
  // Holes 8-14: AI side (7 holes), Hole 15: AI storehouse
  const [board, setBoard] = useState(Array(16).fill(0))
  const [currentPlayer, setCurrentPlayer] = useState(0) // 0: Player, 1: AI
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [gameStarted, setGameStarted] = useState(false)

  // Initialize game
  const initGame = () => {
    const newBoard = Array(16).fill(0)
    // Fill each hole with 7 seeds (except storehouses at indices 7 and 15)
    for (let i = 0; i < 16; i++) {
      if (i !== 7 && i !== 15) {
        newBoard[i] = 7
      }
    }
    setBoard(newBoard)
    setCurrentPlayer(0)
    setGameOver(false)
    setWinner(null)
    setGameStarted(true)
  }

  // Check if game is over
  const checkGameOver = (currentBoard: number[]) => {
    const playerSideEmpty = currentBoard.slice(0, 7).every(seeds => seeds === 0)
    const aiSideEmpty = currentBoard.slice(8, 15).every(seeds => seeds === 0)
    
    if (playerSideEmpty || aiSideEmpty) {
      // Move remaining seeds to respective storehouses
      const finalBoard = [...currentBoard]
      
      // Player side remaining seeds
      for (let i = 0; i < 7; i++) {
        finalBoard[7] += finalBoard[i]
        finalBoard[i] = 0
      }
      
      // AI side remaining seeds
      for (let i = 8; i < 15; i++) {
        finalBoard[15] += finalBoard[i]
        finalBoard[i] = 0
      }
      
      setBoard(finalBoard)
      setGameOver(true)
      
      if (finalBoard[7] > finalBoard[15]) {
        setWinner('You Win!')
        // Update leaderboard if user is logged in
        if (user) {
          updateLeaderboard(user.id, 1) // Congkak game ID is 1
            .catch(error => console.error('Error updating leaderboard:', error))
        }
      } else if (finalBoard[15] > finalBoard[7]) {
        setWinner('AI Wins!')
      } else {
        setWinner('It\'s a Tie!')
      }
      
      return true
    }
    return false
  }

  // Player move
  const makeMove = (holeIndex: number) => {
    if (gameOver || currentPlayer !== 0 || board[holeIndex] === 0) return
    if (holeIndex < 0 || holeIndex > 6) return

    const newBoard = [...board]
    let seeds = newBoard[holeIndex]
    newBoard[holeIndex] = 0
    let currentHole = holeIndex

    // Distribute seeds
    while (seeds > 0) {
      currentHole = (currentHole + 1) % 16
      
      // Skip AI storehouse when it's player's turn
      if (currentHole === 15) {
        currentHole = 0
      }
      
      newBoard[currentHole]++
      seeds--
    }

    // Check for capture (last seed lands in empty hole on player's side)
    if (currentHole >= 0 && currentHole <= 6 && newBoard[currentHole] === 1) {
      const oppositeHole = 14 - currentHole
      if (newBoard[oppositeHole] > 0) {
        newBoard[7] += newBoard[currentHole] + newBoard[oppositeHole]
        newBoard[currentHole] = 0
        newBoard[oppositeHole] = 0
      }
    }

    setBoard(newBoard)

    if (!checkGameOver(newBoard)) {
      // If last seed lands in player's storehouse, player gets another turn
      if (currentHole === 7) {
        setCurrentPlayer(0)
      } else {
        setCurrentPlayer(1)
        // AI turn after a delay
        setTimeout(() => aiMove(newBoard), 1000)
      }
    }
  }

  // Simple AI move
  const aiMove = (currentBoard: number[]) => {
    const aiHoles = []
    for (let i = 8; i < 15; i++) {
      if (currentBoard[i] > 0) {
        aiHoles.push(i)
      }
    }

    if (aiHoles.length === 0) return

    // Pick random hole with seeds
    const selectedHole = aiHoles[Math.floor(Math.random() * aiHoles.length)]
    const newBoard = [...currentBoard]
    let seeds = newBoard[selectedHole]
    newBoard[selectedHole] = 0
    let currentHole = selectedHole

    // Distribute seeds
    while (seeds > 0) {
      currentHole = (currentHole + 1) % 16
      
      // Skip player storehouse when it's AI's turn
      if (currentHole === 7) {
        currentHole = 8
      }
      
      newBoard[currentHole]++
      seeds--
    }

    // Check for capture (AI side)
    if (currentHole >= 8 && currentHole <= 14 && newBoard[currentHole] === 1) {
      const oppositeHole = 14 - (currentHole - 8)
      if (newBoard[oppositeHole] > 0) {
        newBoard[15] += newBoard[currentHole] + newBoard[oppositeHole]
        newBoard[currentHole] = 0
        newBoard[oppositeHole] = 0
      }
    }

    setBoard(newBoard)

    if (!checkGameOver(newBoard)) {
      // If last seed lands in AI's storehouse, AI gets another turn
      if (currentHole === 15) {
        setTimeout(() => aiMove(newBoard), 1000)
      } else {
        setCurrentPlayer(0)
      }
    }
  }

  return (
    <div className="h-screen bg-[var(--background-color)] p-2 pb-24 flex flex-col">
      <header className="flex items-center mb-2">
        <BackButton />
        <h1 className="text-xl font-bold text-[var(--text-primary)] ml-4">Congkak</h1>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        {!gameStarted ? (
          <div className="text-center">
            <div className="bg-[var(--surface-color)] rounded-lg p-4 mb-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">How to Play</h2>
              <div className="text-[var(--text-secondary)] text-left space-y-1 text-sm">
                <p>• Click holes on your side (bottom)</p>
                <p>• Seeds go counter-clockwise</p>
                <p>• Land in storehouse = extra turn</p>
                <p>• Empty hole capture = take opposite</p>
                <p>• Most seeds wins!</p>
              </div>
            </div>
            <Button onClick={initGame}>Start Game</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Game Status */}
            <div className="text-center">
              {gameOver ? (
                <div className="bg-[var(--surface-color)] rounded-lg p-3">
                  <h2 className="text-lg font-bold text-[var(--primary-color)]">{winner}</h2>
                  <p className="text-[var(--text-secondary)] text-sm">
                    You: {board[7]} | AI: {board[15]}
                  </p>
                  <Button onClick={initGame} className="mt-2">Play Again</Button>
                </div>
              ) : (
                <div className="bg-[var(--surface-color)] rounded-lg p-3">
                  <p className="text-[var(--text-primary)] text-sm">
                    {currentPlayer === 0 ? "Your Turn" : "AI's Turn"}
                  </p>
                  <p className="text-[var(--text-secondary)] text-xs">
                    You: {board[7]} | AI: {board[15]}
                  </p>
                </div>
              )}
            </div>

            {/* Game Board */}
            <div className="bg-amber-800 rounded-xl p-2 shadow-2xl max-w-xs mx-auto">
              {/* AI Storehouse (top) */}
              <div className="w-full h-10 bg-amber-900 rounded-lg flex items-center justify-center border-2 border-amber-700 mb-2">
                <span className="text-white font-bold text-sm">{board[15]}</span>
              </div>

              {/* Playing Area - 2 columns */}
              <div className="flex space-x-2 justify-center mb-2">
                {/* Left Column - AI holes (7 holes: indices 8-13) */}
                <div className="flex flex-col space-y-1">
                  {board.slice(8, 15).reverse().map((seeds, index) => (
                    <div
                      key={13 - index}
                      className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center border-2 border-amber-700"
                    >
                      <span className="text-white font-bold text-xs">{seeds}</span>
                    </div>
                  ))}
                </div>

                {/* Right Column - Player holes */}
                <div className="flex flex-col space-y-1">
                  {board.slice(0, 7).map((seeds, index) => (
                    <button
                      key={index}
                      onClick={() => makeMove(index)}
                      disabled={gameOver || currentPlayer !== 0 || seeds === 0}
                      className={`w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center border-2 border-amber-700 transition-all ${
                        !gameOver && currentPlayer === 0 && seeds > 0
                          ? 'hover:bg-amber-800 active:scale-95 cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-white font-bold text-xs">{seeds}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Player Storehouse (bottom) */}
              <div className="w-full h-10 bg-amber-900 rounded-lg flex items-center justify-center border-2 border-amber-700">
                <span className="text-white font-bold text-sm">{board[7]}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
