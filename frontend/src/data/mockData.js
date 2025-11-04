// Mock data for cake configurator

export const cakeTypes = [
  {
    id: 'bento',
    name: 'Bento Cake',
    description: 'Small, cute single-serving cake',
    basePrice: 25,
    servings: 1,
    image: 'https://images.unsplash.com/photo-1653469742883-c47111ae3bc4'
  },
  {
    id: 'italian-round',
    name: 'Italian Round Cake',
    description: 'Classic round layered cake',
    basePrice: 45,
    servings: 8,
    image: 'https://images.unsplash.com/photo-1592962826124-56f6e78c6f18'
  },
  {
    id: 'italian-square',
    name: 'Italian Square Cake',
    description: 'Modern square layered cake',
    basePrice: 50,
    servings: 12,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d'
  },
  {
    id: 'italian-rectangular',
    name: 'Italian Rectangular Cake',
    description: 'Perfect for larger gatherings',
    basePrice: 65,
    servings: 20,
    image: 'https://images.unsplash.com/photo-1623428454614-abaf00244e52'
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    description: 'Individual servings, endless variety',
    basePrice: 30,
    servings: 6,
    image: 'https://images.unsplash.com/photo-1572978577765-462b91a7f9e1'
  }
];

export const frostingOptions = [
  { id: 'vanilla-buttercream', name: 'Vanilla Buttercream', price: 0, color: '#FFF8DC' },
  { id: 'chocolate-ganache', name: 'Chocolate Ganache', price: 5, color: '#3E2723' },
  { id: 'cream-cheese', name: 'Cream Cheese', price: 3, color: '#FFFACD' },
  { id: 'swiss-meringue', name: 'Swiss Meringue', price: 8, color: '#FFFFFF' },
  { id: 'whipped-cream', name: 'Whipped Cream', price: 2, color: '#FFF5EE' },
  { id: 'fondant', name: 'Fondant', price: 10, color: '#FFE4E1' },
  { id: 'salted-caramel', name: 'Salted Caramel', price: 7, color: '#D2691E' },
  { id: 'matcha', name: 'Matcha Green Tea', price: 6, color: '#98D8C8' }
];

export const fillingOptions = [
  { id: 'vanilla-cream', name: 'Vanilla Cream', price: 0 },
  { id: 'chocolate-mousse', name: 'Chocolate Mousse', price: 4 },
  { id: 'strawberry-jam', name: 'Strawberry Jam', price: 3 },
  { id: 'lemon-curd', name: 'Lemon Curd', price: 5 },
  { id: 'raspberry-compote', name: 'Raspberry Compote', price: 4 },
  { id: 'salted-caramel', name: 'Salted Caramel', price: 5 },
  { id: 'hazelnut-praline', name: 'Hazelnut Praline', price: 6 },
  { id: 'passion-fruit', name: 'Passion Fruit', price: 5 }
];

export const layerOptions = [
  { id: '1', name: '1 Layer', servingsMultiplier: 1, priceMultiplier: 1 },
  { id: '2', name: '2 Layers', servingsMultiplier: 2, priceMultiplier: 1.8 },
  { id: '3', name: '3 Layers', servingsMultiplier: 3, priceMultiplier: 2.5 },
  { id: '4', name: '4 Layers', servingsMultiplier: 4, priceMultiplier: 3.2 }
];

export const decorOptions = [
  { id: 'fresh-berries', name: 'Fresh Berries', price: 8, image: '🫐' },
  { id: 'edible-flowers', name: 'Edible Flowers', price: 12, image: '🌸' },
  { id: 'chocolate-shavings', name: 'Chocolate Shavings', price: 5, image: '🍫' },
  { id: 'gold-leaf', name: 'Gold Leaf', price: 25, image: '✨' },
  { id: 'macarons', name: 'Macarons', price: 15, image: '🍪' },
  { id: 'fresh-fruit', name: 'Fresh Fruit', price: 10, image: '🍓' },
  { id: 'sprinkles', name: 'Premium Sprinkles', price: 3, image: '✨' },
  { id: 'chocolate-drip', name: 'Chocolate Drip', price: 8, image: '💧' },
  { id: 'meringue-kisses', name: 'Meringue Kisses', price: 7, image: '☁️' },
  { id: 'candied-nuts', name: 'Candied Nuts', price: 6, image: '🥜' }
];

export const textOptions = [
  { id: 'none', name: 'No Text', price: 0 },
  { id: 'simple', name: 'Simple Text', price: 5 },
  { id: 'elaborate', name: 'Elaborate Text', price: 10 }
];

// Mock saved configurations
export const mockConfigurations = [
  {
    id: '1',
    userId: 'user123',
    cakeType: 'italian-round',
    frosting: 'chocolate-ganache',
    filling: 'chocolate-mousse',
    layers: '3',
    decor: ['fresh-berries', 'chocolate-shavings'],
    text: 'Happy Birthday',
    customText: 'Happy Birthday Sarah!',
    totalPrice: 89,
    servings: 24,
    createdAt: '2025-01-15T10:30:00Z',
    status: 'pending'
  },
  {
    id: '2',
    userId: 'user456',
    cakeType: 'bento',
    frosting: 'vanilla-buttercream',
    filling: 'strawberry-jam',
    layers: '1',
    decor: ['edible-flowers'],
    text: 'simple',
    customText: 'Love',
    totalPrice: 42,
    servings: 1,
    createdAt: '2025-01-14T15:20:00Z',
    status: 'completed'
  }
];
