'use client'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  variant?: 'default' | 'auth'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, variant = 'default', className = '', ...props }, ref) => {
    const baseStyles = "w-full resize-none overflow-hidden text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border-none transition text-base font-normal leading-normal"
    
    const variants = {
      default: "p-3 bg-gray-800 border border-gray-700 rounded-full placeholder-[var(--text-secondary)]",
      auth: "h-14 rounded-xl bg-[var(--input-background)] placeholder:text-[var(--text-secondary)]"
    }

    const paddingClass = icon 
      ? (variant === 'auth' ? 'pl-12 pr-4' : 'pl-12 pr-4')
      : (variant === 'auth' ? 'px-4' : 'px-4')

    return (
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${variants[variant]} ${paddingClass} ${className}`}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input