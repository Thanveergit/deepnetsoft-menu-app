
export interface ApiResponse<T> {
  success:  boolean
  data:    T
  message?: string
}


export interface Menu {
  _id:         string   
  name:        string
  description: string
  createdAt:   string   
  updatedAt:   string
}


export interface Item {
  _id:         string
  menuId:      string
  category:    string
  name:        string
  price:       number
  description: string
  createdAt:   string
  updatedAt:   string
}



export interface CreateMenuPayload {
  name:        string
  description: string
}

export interface CreateItemPayload {
  menuId:      string
  category:    string
  name:        string
  price:       number
  description: string
}


export interface MenuFormState {
  name:        string
  description: string
}

export interface ItemFormState {
  menuId:      string
  category:    string
  name:        string
  price:       string   
  description: string
}


export interface MenuContextType {
  menus:             Menu[]
  items:             Item[]
  activeMenu:        Menu | null
  loading:           boolean
  error:             string
  setActiveMenu:     (menu: Menu) => void
  loadMenus:         () => Promise<void>
  groupedItems:      () => Record<string, Item[]>
  handleCreateMenu:  (data: CreateMenuPayload) => Promise<Menu>
  handleDeleteMenu:  (id: string) => Promise<void>
  handleCreateItem:  (data: CreateItemPayload) => Promise<Item>
  handleDeleteItem:  (id: string) => Promise<void>
}
