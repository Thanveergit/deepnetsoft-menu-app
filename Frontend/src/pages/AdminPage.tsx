

import { useState, useEffect } from 'react'
import { useMenu } from '../context/MenuContext'
import { useToast } from '../hooks/useToast'
import { fetchItems } from '../api/menuApi'
import Toast from '../components/Toast'
import type { Item, MenuFormState, ItemFormState } from '../types'

// ── Shared Tailwind class strings ─────────────────────────────
const inputCls =
  'w-full bg-[#222222] border border-[#C9A84C]/20 text-white text-sm px-3 py-2.5 font-[Raleway] outline-none focus:border-[#C9A84C] transition-colors rounded-none'
const labelCls =
  'block text-xs tracking-widest uppercase text-gray-500 mb-1.5'

export default function AdminPage() {
  const {
    menus,
    handleCreateMenu,
    handleDeleteMenu,
    handleCreateItem,
    handleDeleteItem,
  } = useMenu()

  const { toastMsg, toastVisible, showToast } = useToast()

  // ── Form state ────────────────────────────────────────────
  const [menuForm, setMenuForm] = useState<MenuFormState>({
    name: '', description: '',
  })
  const [itemForm, setItemForm] = useState<ItemFormState>({
    menuId: '', category: '', name: '', price: '', description: '',
  })
  const [menuLoading, setMenuLoading] = useState(false)
  const [itemLoading, setItemLoading] = useState(false)
  const [expandedId,  setExpandedId]  = useState<string | null>(null)

  // ── Submit: Create Menu ───────────────────────────────────
  const submitMenu = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!menuForm.name.trim()) { showToast('Menu name is required'); return }
    try {
      setMenuLoading(true)
      await handleCreateMenu({ name: menuForm.name.trim(), description: menuForm.description.trim() })
      showToast(`Menu "${menuForm.name}" created!`)
      setMenuForm({ name: '', description: '' })
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      showToast(msg ?? 'Failed to create menu')
    } finally {
      setMenuLoading(false)
    }
  }

  // ── Submit: Add Item ──────────────────────────────────────
  const submitItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { menuId, category, name, price } = itemForm
    if (!menuId)                     { showToast('Please select a menu');    return }
    if (!category.trim())            { showToast('Category is required');    return }
    if (!name.trim())                { showToast('Item name is required');   return }
    if (!price || Number(price) <= 0){ showToast('Enter a valid price');     return }
    try {
      setItemLoading(true)
      await handleCreateItem({
        menuId,
        category:    category.trim(),
        name:        name.trim(),
        price:       Number(price),
        description: itemForm.description.trim(),
      })
      showToast(`"${name}" added!`)
      setItemForm(prev => ({ ...prev, category: '', name: '', price: '', description: '' }))
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      showToast(msg ?? 'Failed to add item')
    } finally {
      setItemLoading(false)
    }
  }

  const removeMenu = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}" and all its items?`)) return
    try {
      await handleDeleteMenu(id)
      showToast('Menu deleted')
    } catch { showToast('Failed to delete menu') }
  }

  const removeItem = async (id: string, name: string) => {
    try {
      await handleDeleteItem(id)
      showToast(`"${name}" removed`)
    } catch { showToast('Failed to delete item') }
  }

  return (
    <div className="flex-1 bg-dark">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">

        <h2 className="font-[Cinzel] text-3xl tracking-widest text-gold mb-1">
          ADMIN PANEL
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Create and manage your restaurant menus and items.
        </p>

        {/* ── Create Menu ─────────────────────────────────── */}
        <div className="bg-dark-3 border border-gold/20 p-6 mb-6">
          <h3 className="font-[Cinzel] text-base tracking-wide text-white border-b border-gold/10 pb-3 mb-5">
            Create New Menu
          </h3>
          <form onSubmit={submitMenu}>
            <div className="mb-4">
              <label className={labelCls}>Menu Name</label>
              <input
                className={inputCls}
                placeholder="e.g. Drinks, Food, Brunch"
                value={menuForm.name}
                onChange={e => setMenuForm({ ...menuForm, name: e.target.value })}
              />
            </div>
            <div className="mb-5">
              <label className={labelCls}>Description</label>
              <textarea
                className={`${inputCls} resize-none min-h-20`}
                placeholder="Brief description of this menu..."
                value={menuForm.description}
                onChange={e => setMenuForm({ ...menuForm, description: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={menuLoading}
              className="bg-gold border border-gold text-dark text-xs
                tracking-widest uppercase font-bold px-6 py-2.5
                hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
            >
              {menuLoading ? 'CREATING...' : '+ CREATE MENU'}
            </button>
          </form>
        </div>

        {/* ── Add Item ────────────────────────────────────── */}
        <div className="bg-dark-3 border border-gold/20 p-6 mb-6">
          <h3 className="font-[Cinzel] text-base tracking-wide text-white border-b border-gold/10 pb-3 mb-5">
            Add Item to Menu
          </h3>
          <form onSubmit={submitItem}>

            <div className="mb-4">
              <label className={labelCls}>Select Menu</label>
              <select
                className={inputCls}
                value={itemForm.menuId}
                onChange={e => setItemForm({ ...itemForm, menuId: e.target.value })}
              >
                <option value="">— Choose a menu —</option>
                {menus.map(m => (
                  <option key={m._id} value={m._id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className={labelCls}>Category</label>
              <input
                className={inputCls}
                placeholder="e.g. Appetizers, Salads, Cocktails"
                value={itemForm.category}
                onChange={e => setItemForm({ ...itemForm, category: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>Item Name</label>
                <input
                  className={inputCls}
                  placeholder="e.g. Fire Cracker Salmon"
                  value={itemForm.name}
                  onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls}>Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={inputCls}
                  placeholder="16.00"
                  value={itemForm.price}
                  onChange={e => setItemForm({ ...itemForm, price: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className={labelCls}>Description (optional)</label>
              <input
                className={inputCls}
                placeholder="Brief description of the dish..."
                value={itemForm.description}
                onChange={e => setItemForm({ ...itemForm, description: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={itemLoading}
              className="bg-gold border border-gold text-dark text-xs
                tracking-widest uppercase font-bold px-6 py-2.5
                hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
            >
              {itemLoading ? 'ADDING...' : '+ ADD ITEM'}
            </button>
          </form>
        </div>

        {/* ── Existing Menus List ──────────────────────────── */}
        <div className="bg-dark-3 border border-gold/20 p-6">
          <h3 className="font-[Cinzel] text-base tracking-wide text-white border-b border-gold/10 pb-3 mb-5">
            Existing Menus
          </h3>

          {menus.length === 0 && (
            <p className="text-gray-500 text-sm">No menus yet. Create one above.</p>
          )}

          {menus.map(menu => {
            const isExpanded = expandedId === menu._id
            return (
              <div key={menu._id} className="mb-3">
                {/* Menu row */}
                <div className="bg-dark-4 border border-gold/10 px-4 py-3
                  flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h4 className="font-[Cinzel] text-sm text-gold">{menu.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {menu.description || 'No description'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : menu._id)}
                      className="border border-gold/30 text-gold text-xs px-3 py-1.5
                        hover:border-gold transition-colors cursor-pointer bg-transparent"
                    >
                      Items {isExpanded ? '▲' : '▾'}
                    </button>
                    <button
                      onClick={() => removeMenu(menu._id, menu.name)}
                      className="border border-red-700/40 text-red-500 text-xs px-3 py-1.5
                        hover:border-red-500 transition-colors cursor-pointer bg-transparent"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Expandable items list */}
                {isExpanded && (
                  <AdminItemsList
                    menuId={menu._id}
                    onDelete={removeItem}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Toast message={toastMsg} show={toastVisible} />
    </div>
  )
}

// ── Sub-component: AdminItemsList ─────────────────────────────
interface AdminItemsListProps {
  menuId:   string
  onDelete: (id: string, name: string) => Promise<void>
}

function AdminItemsList({ menuId, onDelete }: AdminItemsListProps) {
  const [localItems, setLocalItems] = useState<Item[]>([])
  const [loaded,     setLoaded]     = useState(false)

  useEffect(() => {
  const load = async () => {
    try {
      const data = await fetchItems(menuId)
      setLocalItems(data)
    } catch (err) {
      console.error("Failed to load items")
    } finally {
      setLoaded(true)
    }
  }

  load()
}, [menuId])

  if (!loaded) return (
    <div className="border-l-2 border-gold/10 pl-4 py-3 bg-black/20">
      <p className="text-xs text-gray-600 animate-pulse">Loading items...</p>
    </div>
  )

  // Group by category for display
  const grouped = localItems.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const handleDelete = async (item: Item) => {
    await onDelete(item._id, item.name)
    setLocalItems(prev => prev.filter(i => i._id !== item._id))
  }

  return (
    <div className="border-l-2 border-gold/10 pl-4 bg-black/20">
      {localItems.length === 0 && (
        <p className="text-xs text-gray-600 py-3 px-2">No items yet.</p>
      )}
      {Object.entries(grouped).map(([cat, catItems]) => (
        <div key={cat} className="px-2 py-2">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">{cat}</p>
          {catItems.map(item => (
            <div
              key={item._id}
              className="flex justify-between items-center py-1.5 border-b border-white/4 last:border-0"
            >
              <span className="text-sm text-gray-300">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-gold text-sm font-semibold">${item.price}</span>
                <button
                  onClick={() => handleDelete(item)}
                  className="text-red-500/50 hover:text-red-400 text-sm leading-none px-1 transition-colors cursor-pointer bg-transparent border-0"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
