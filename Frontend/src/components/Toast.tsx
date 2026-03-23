

interface ToastProps {
  message: string
  show:    boolean
}

export default function Toast({ message, show }: ToastProps) {
  return (
    <div
      className={`
        fixed bottom-8 right-8 z-50
        bg-dark-3 border border-gold
        text-gold text-sm px-5 py-3 tracking-wide
        transition-opacity duration-300 pointer-events-none
        ${show ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {message}
    </div>
  )
}
