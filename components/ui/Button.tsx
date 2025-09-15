interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }
  
  export default function Button({ 
    children, 
    variant = 'primary', 
    onClick,
    className = '',
    type = 'button',
    disabled = false
  }: ButtonProps) {
    const baseStyles = "py-3 px-6 rounded-full font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
    
    const variants = {
      primary: "bg-[var(--primary-color)] text-[var(--background-color)] hover:bg-[var(--accent-color)] shadow-lg",
      secondary: "bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--background-color)]"
    }
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
