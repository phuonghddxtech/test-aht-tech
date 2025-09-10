export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary?: boolean
}

export interface Option {
  uid: string
  skuCode: string
  displayName: string
  price: number // in cents
  isSelected?: boolean
}

export interface OptionType {
  optionTypeId: number
  displayName: string
  options: Option[]
  selectedOptionUid?: string
}

export interface Product {
  uid: string
  name: string
  slug: string
  description: string
  images: ProductImage[]
}

export interface ProductData {
  product: Product
  optionTypes: OptionType[]
}

export interface CartItem {
  productUid: string
  quantity: number
  selectedOptions: Record<number, string> // optionTypeId -> optionUid
  totalPrice: number
}
