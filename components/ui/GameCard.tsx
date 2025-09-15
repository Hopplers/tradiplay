interface GameCardProps {
    title: string
    description?: string
    imageUrl: string
    onClick?: () => void
  }
  
  export default function GameCard({ title, description, imageUrl, onClick }: GameCardProps) {
    return (
      <div 
        className="flex flex-col gap-3 min-w-[15rem] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={onClick}
      >
        <div 
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        <div>
          <h3 className="text-[var(--text-primary)] text-lg font-medium">{title}</h3>
          {description && (
            <p className="text-[var(--text-secondary)] text-sm">{description}</p>
          )}
        </div>
      </div>
    )
  }