// Mock cart items
export const mockCartItems = [
  {
    id: 1,
    name: "محصول ۱",
    price: "۲,۵۰۰,۰۰۰ تومان",
    quantity: 2,
    image: "/product1.jpg"
  },
  {
    id: 2,
    name: "محصول ۲",
    price: "۱,۸۰۰,۰۰۰ تومان",
    quantity: 1,
    image: "/product2.jpg"
  }
];

// Mock orders
export const mockOrders = [
  {
    id: "ORD-1234",
    date: "۱۴۰۲/۱۲/۲۰",
    status: "تحویل شده",
    total: "۵,۸۰۰,۰۰۰ تومان",
    items: [
      { name: "محصول ۱", quantity: 2 },
      { name: "محصول ۳", quantity: 1 }
    ]
  },
  {
    id: "ORD-1235",
    date: "۱۴۰۲/۱۲/۱۵",
    status: "در حال پردازش",
    total: "۳,۲۰۰,۰۰۰ تومان",
    items: [
      { name: "محصول ۲", quantity: 1 }
    ]
  }
];

// Mock shipping methods
export const shippingMethods = [
  { id: 1, name: "پست پیشتاز", price: "۵۰,۰۰۰ تومان", days: "۲-۳" },
  { id: 2, name: "تیپاکس", price: "۸۰,۰۰۰ تومان", days: "۱-۲" },
  { id: 3, name: "پیک موتوری", price: "۱۰۰,۰۰۰ تومان", days: "همان روز" },
];

// Mock addresses
export const addresses = [
  {
    id: 1,
    title: "منزل",
    address: "تهران، خیابان ولیعصر، کوچه مهر، پلاک ۱۲",
    receiver: "علی محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹"
  },
  {
    id: 2,
    title: "محل کار",
    address: "تهران، سعادت آباد، خیابان سرو غربی، پلاک ۴۵",
    receiver: "علی محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹"
  }
]; 