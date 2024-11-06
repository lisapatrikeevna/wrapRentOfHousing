export type RealtyDetailsType={
  id: number
  internet:string
  garage_or_parking:string
  balcony:string
  heating_type:string
  air_conditioning:string
  floor_number:number
  total_floors:number
  pet_friendly:boolean
  furnished:boolean
  description:string
  created_at:string
  updated_at:string
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
  real_estate_image:string
  category:number
  author:number
  class_realty:string
  details?:RealtyDetailsType
  square_footage:number
}

export type RealtyCategoryArgs = {
  name: string
}
export type RealtyRequestType={
  data:Array<RealtyType>
  total_pages:number
  current_page:number
}
type itemFilterType={
  name:string
  value:Array<string|number|boolean>
}
export type FilterType={
  available_dates:itemFilterType[]
  categories:itemFilterType[]
  class_realty:itemFilterType[]
  locations:itemFilterType[]
  number_of_rooms:itemFilterType[]
  square_footage:itemFilterType[]
  available:itemFilterType[]
}




