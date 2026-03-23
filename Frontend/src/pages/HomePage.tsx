
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex-1">

      {/* Hero */}
      <div
        className="min-h-120 flex flex-col items-center justify-center text-center px-6 py-16"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(13,13,13,0.4), rgba(13,13,13,1)), url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="font-[Cinzel] text-5xl md:text-7xl tracking-widest text-white mb-5">
          WELCOME
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed mb-8">
          Experience the finest dining crafted with passion, precision, and the
          freshest ingredients from around the world.
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="border border-gold bg-gold text-dark font-[Raleway]
            text-xs tracking-widest uppercase font-bold px-10 py-3
            hover:bg-gold-light transition-colors duration-200 cursor-pointer"
        >
          VIEW MENU
        </button>
      </div>

      {/* Info strip */}
      <div className="bg-dark-2 text-center px-6 py-16">
        <h2 className="font-[Cinzel] text-2xl md:text-3xl tracking-widest text-gold mb-4">
          EXPLORE OUR MENU
        </h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          Discover our carefully curated selection of food, drinks, and brunch offerings,
          each crafted with the finest ingredients.
        </p>
      </div>
    </div>
  )
}
