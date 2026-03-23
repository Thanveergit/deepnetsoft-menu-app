

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface NavItem {
  path:  string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { path: '/',        label: 'Home'       },
  { path: '/menu',    label: 'Menu'       },
  { path: '/create-menu',   label: 'Create Menu'      },
  { path: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // NavLink passes { isActive } to the className function
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `text-xs tracking-widest uppercase transition-colors duration-200 ${
      isActive
        ? 'text-[#C9A84C]'
        : 'text-gray-400 hover:text-[#C9A84C]'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-dark-2 border-b border-gold/20 px-6 h-16 flex items-center justify-between">

      {/* Logo */}
      <NavLink to="/" className="font-[Cinzel] text-xl tracking-widest">
        <span className="text-gold">DEEP</span>
        <span className="text-white">NET</span>
        <span className="text-gold">SOFT</span>
      </NavLink>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {NAV_ITEMS.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path} className={linkClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden border border-gold/30 text-gold px-3 py-1 text-sm cursor-pointer bg-transparent"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle navigation"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 bg-dark-2 border-b border-gold/20 flex flex-col gap-4 px-6 py-5 list-none m-0 z-40">
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
