export type Category = 'Queques' | 'Postres' | 'Panadería' | 'Salados'
export type Product = { id: string; name: string; category: Category; price: number; image: string }

export const products: Product[] = [
  { id: 'marmoliado', name: 'Queque marmoleado', category: 'Queques', price: 5000, image: 'quequeMarmoliado-web.jpg' },
  { id: 'seco', name: 'Queque seco', category: 'Queques', price: 6000, image: 'quequeseco.jpg' },
  { id: 'decorado', name: 'Queque seco decorado', category: 'Queques', price: 7000, image: 'quequesecodecorado.jpg' },
  { id: 'fresa', name: 'Mousse de fresa x5', category: 'Postres', price: 4000, image: 'postre de fresa.jpg' },
  { id: 'pack', name: 'Pack de delicias', category: 'Postres', price: 1200, image: 'packdedelicia.jpg' },
  { id: 'pure', name: 'Puré de papa especial', category: 'Salados', price: 9000, image: 'puredepapa-venta.jpg' },
  { id: 'pan', name: 'Pan casero', category: 'Panadería', price: 1000, image: 'panes.jpg' },
  { id: 'alfajores', name: 'Alfajores', category: 'Postres', price: 1000, image: 'nidos.jpg' },
  { id: 'tarta', name: 'Tarta fría / Pie de limón', category: 'Postres', price: 12000, image: 'cheeskake.jpg' },
  { id: 'melocoton', name: 'Cheesecake de melocotón', category: 'Postres', price: 12000, image: 'Cheesecake-melocoton.jpg' },
  { id: 'empanadas', name: 'Empanadas', category: 'Salados', price: 1000, image: 'empanadas.jpg' },
  { id: 'cheesecake', name: 'Cheesecake decorado', category: 'Postres', price: 12000, image: 'cheeskake-decorado.jpg' },
  { id: 'nidos', name: 'Nidos de amor', category: 'Postres', price: 1000, image: 'nidos-de-amor-web.jpg' },
  { id: 'pie', name: 'Pie de limón y chocolate', category: 'Postres', price: 12000, image: 'pie-de-limon-web.jpg' },
]

export const categories = ['Todos', 'Queques', 'Postres', 'Panadería', 'Salados'] as const
export const formatPrice = (price: number) => `₡${new Intl.NumberFormat('es-CR').format(price)}`
export const imagePath = (image: string) => `${import.meta.env.BASE_URL}images/${image}`
export const whatsapp = 'https://wa.me/50686338619'
