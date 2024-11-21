export type RealtyDetailsType = {
  id: number
  internet: string
  garage_or_parking: string
  balcony: string
  heating_type: string
  air_conditioning: string
  floor_number: number
  total_floors: number
  pet_friendly: boolean
  furnished: boolean
  description: string
  created_at: string
  updated_at: string
}
export type RealtyType = {
  id: number
  title: string
  description: string
  location: string
  price: string
  number_of_rooms: number
  available: boolean
  rating: number
  register_date: string
  available_date: string
  real_estate_image: string
  category: number
  author: number
  class_realty: string
  details?: RealtyDetailsType
  square_footage: number
  favorite?:Array<number>
  views?:Array<number>
  reservations?:Array<number>
}

export interface CreateRealtyType {
  author: number
  title: string
  description: string
  location: string
  price: number
  number_of_rooms: number
  category: number // ID категории
  available: boolean
  available_date?: string
  real_estate_image?: File // Для загрузки изображения
  class_realty: 'standard' | 'economy' | 'comfort' | 'premium' | 'luxury' | 'super_luxury'; // Выбор класса недвижимости
  square_footage: number // Площадь в квадратных метрах
  details?: CreateRealtyDetailType // Данные о деталях недвижимости
  realtyFiles?: RealtyFileType[] // Массив файлов недвижимости
}

export interface CreateRealtyDetailType {
  internet?: string
  garage_or_parking?: string
  balcony?: string
  heating_type?: string
  air_conditioning?: boolean
  floor_number: number // Номер этажа
  total_floors: number // Общее количество этажей
  pet_friendly?: boolean
  furnished?: boolean
  description?: string
}

export interface RealtyFileType {
  file_name?: string // Имя файла
  path: File // Файл
}


export type RealtyCategoryArgs = {
  name: string
}
export type RealtyRequestType = {
  data: Array<RealtyType>
  total_pages: number
  current_page: number
}
type itemFilterType = {
  name: string
  value: Array<string | number | boolean>
}
export type FilterType = {
  available_dates: itemFilterType[]
  categories: itemFilterType[]
  class_realty: itemFilterType[]
  locations: itemFilterType[]
  number_of_rooms: itemFilterType[]
  square_footage: itemFilterType[]
  available: itemFilterType[]
}
export type bookingType = {
  realty: number
  start_date: string
  // start_date: Date
  // end_date: Date
  end_date: string
  user: number
}



