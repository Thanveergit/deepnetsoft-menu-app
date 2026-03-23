
import { Route,Routes } from 'react-router-dom'
import  { MenuProvider } from './context/MenuContext'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import AdminPage from './pages/AdminPage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App'

function App() {
 

  return (
    <MenuProvider>
      <div className="flex flex-col min-h-screen bg-dark text-white font-[Raleway]">
        <Navbar/>

        <main>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/menu' element={<MenuPage/>}/>
            <Route path='/create-menu' element={<AdminPage/>}/>
            <Route path='*' element={<HomePage/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </MenuProvider>
    
  )
}

export default App
