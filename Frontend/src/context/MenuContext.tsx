import type { ReactNode } from 'react'
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'

import {
  fetchMenus,
  createMenu,
  deleteMenu,
  fetchItems,
  createItem,
  deleteItem,
} from '../api/menuApi'

import type {
  Menu,
  Item,
  MenuContextType,
  CreateMenuPayload,
  CreateItemPayload,
} from '../types'

const MenuContext = createContext<MenuContextType | null>(null)

interface MenuProviderProps {
  children: ReactNode
}

export function MenuProvider({ children }: MenuProviderProps) {

  // ── State ───────────────────────────────────────────
  const [menus, setMenus] = useState<Menu[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [activeMenu, setActiveMenu] = useState<Menu | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // ── Load menus on startup ───────────────────────────
  useEffect(() => {
    loadMenus()
  }, [])

  // ── Load items when menu changes ────────────────────
  useEffect(() => {
    if (activeMenu) loadItems(activeMenu._id)
    else setItems([])
  }, [activeMenu])

  // ===================================================
  // 🔥 API FUNCTIONS
  // ===================================================

  async function loadMenus(): Promise<void> {
    try {
      setLoading(true)
      setError('')

      const data = await fetchMenus()

      setMenus(data)

      if (data.length > 0) {
        setActiveMenu(data[0])
      }

    } catch {
      setError('Failed to load menus. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  async function loadItems(menuId: string): Promise<void> {
    try {
      setLoading(true)

      const data = await fetchItems(menuId)

      setItems(data)

    } catch {
      setError('Failed to load items.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateMenu(formData: CreateMenuPayload): Promise<Menu> {
    try {
      const newMenu = await createMenu(formData)

      setMenus(prev => [...prev, newMenu])

      // Optional: auto-select newly created menu
      setActiveMenu(newMenu)

      return newMenu

    } catch (err) {
      setError('Failed to create menu')
      throw err
    }
  }

  async function handleDeleteMenu(id: string): Promise<void> {
    try {
      await deleteMenu(id)

      const updatedMenus = menus.filter(m => m._id !== id)
      setMenus(updatedMenus)

      if (activeMenu?._id === id) {
        setActiveMenu(updatedMenus[0] ?? null)
        setItems([])
      }

    } catch {
      setError('Failed to delete menu')
    }
  }

  async function handleCreateItem(formData: CreateItemPayload): Promise<Item> {
    try {
      const newItem = await createItem(formData)

      // Add only if it belongs to active menu
      if (newItem.menuId === activeMenu?._id) {
        setItems(prev => [...prev, newItem])
      }

      return newItem

    } catch (err) {
      setError('Failed to create item')
      throw err
    }
  }

  async function handleDeleteItem(id: string): Promise<void> {
    try {
      await deleteItem(id)

      setItems(prev => prev.filter(i => i._id !== id))

    } catch {
      setError('Failed to delete item')
    }
  }

  // ── Group items by category ─────────────────────────
  function groupedItems(): Record<string, Item[]> {
    return items.reduce<Record<string, Item[]>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {})
  }

  // ── Context value ───────────────────────────────────
  const value: MenuContextType = {
    menus,
    items,
    activeMenu,
    loading,
    error,
    setActiveMenu,
    loadMenus,
    groupedItems,
    handleCreateMenu,
    handleDeleteMenu,
    handleCreateItem,
    handleDeleteItem,
  }

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}

// ── Custom Hook ───────────────────────────────────────
export function useMenu(): MenuContextType {
  const ctx = useContext(MenuContext)

  if (!ctx) {
    throw new Error('useMenu must be used inside <MenuProvider>')
  }

  return ctx
}