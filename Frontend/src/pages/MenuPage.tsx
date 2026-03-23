

import { useMenu } from '../context/MenuContext'
import type { Menu, Item } from '../types'

const OPENING_HOURS = [
  { days: 'Monday – Thursday', time: '12PM – 12AM' },
  { days: 'Friday – Saturday', time: '12PM – 01AM' },
  { days: 'Sunday',            time: '12PM – 11PM' },
]

export default function MenuPage() {
  const { menus, activeMenu, setActiveMenu, loading, error, groupedItems } = useMenu()

  // Record<string, Item[]> → { "Appetizers": [...], "Salads": [...] }
  const categories: Record<string, Item[]> = groupedItems()

  return (
    <div className="flex-1 bg-dark-2">

      {/* Hero */}
      <div
        className="min-h-69 flex flex-col items-center justify-center text-center px-6 py-14"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(13,13,13,0.4), rgba(20,20,20,1)), url(https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=80)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="font-[Cinzel] text-5xl md:text-6xl tracking-widest text-white mb-3">
          MENU
        </h1>
        <p className="text-gray-400 text-sm max-w-md leading-relaxed">
          Please take a look at our menu featuring food, drinks, and brunch.
          Place an order via the "Order Online" button below.
        </p>
      </div>

      {/* Tab buttons — one per menu in database */}
      <div className="px-6 py-6 flex flex-wrap gap-2 justify-center border-b border-gold/10">
        {menus.map((menu: Menu) => (
          <button
            key={menu._id}
            onClick={() => setActiveMenu(menu)}
            className={`
              px-6 py-2 text-xs tracking-widest uppercase font-[Raleway]
              border transition-all duration-200 cursor-pointer
              ${activeMenu?._id === menu._id
                ? 'bg-gold border-gold text-dark font-bold'
                : 'border-gold/20 text-gray-400 hover:border-gold hover:text-gold bg-transparent'
              }
            `}
          >
            {menu.name}
          </button>
        ))}

        {menus.length === 0 && !loading && (
          <p className="text-gray-500 text-sm py-2">
            No menus yet.{' '}
            <a href="/admin" className="text-gold underline">Create one in Admin</a>.
          </p>
        )}
      </div>

      {/* Content area */}
      <div className="px-4 md:px-6 py-8 max-w-4xl mx-auto">

        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <p className="text-center text-gray-500 py-16 tracking-widest animate-pulse">
            LOADING...
          </p>
        )}

        {/* Empty state */}
        {!loading && activeMenu && Object.keys(categories).length === 0 && (
          <div className="text-center py-16">
            <h3 className="font-[Cinzel] text-xl text-white mb-2">No Items Yet</h3>
            <p className="text-gray-500 text-sm">
              Add items from the{' '}
              <a href="/admin" className="text-gold underline">Admin panel</a>.
            </p>
          </div>
        )}

        {/* Category blocks */}
        {!loading && Object.entries(categories).map(([categoryName, categoryItems]) => (
          <div
            key={categoryName}
            className="bg-dark-3 border border-gold/20 mb-5 p-5 md:p-6
              flex flex-col md:flex-row gap-5"
          >
            {/* Category label (red box on left) */}
            <div className="shrink-0 md:w-36">
              <div className="bg-red-700 px-3 py-2 text-center">
                <h3 className="font-[Cinzel] text-xs text-white tracking-widest uppercase">
                  {categoryName}
                </h3>
              </div>
            </div>

            {/* Items list */}
            <div className="flex-1">
              {categoryItems.map((item: Item) => (
                <div
                  key={item._id}
                  className="flex items-start gap-2 py-3 border-b border-white/5 last:border-0"
                >
                  {/* Name + description */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-[Cinzel] text-sm tracking-wide text-white uppercase">
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-sm">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Dotted separator line */}
                  <div className="dot-separator" />

                  {/* Price */}
                  <span className="text-gold font-semibold text-sm whitespace-nowrap">
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Opening Hours */}
        <div className="bg-dark-3 border border-gold/20 p-5 md:p-6 mt-4
          flex flex-col md:flex-row items-start md:items-center gap-6 flex-wrap">
          <h3 className="font-[Cinzel] text-lg md:text-xl tracking-widest text-white md:min-w-45">
            OPENING HOURS
          </h3>
          <div className="flex flex-wrap gap-6 md:gap-10">
            {OPENING_HOURS.map(({ days, time }) => (
              <div key={days} className="text-center">
                <p className="text-xs tracking-widest uppercase text-gold font-semibold">
                  {days}
                </p>
                <p className="text-sm text-gray-400 mt-1">{time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
