export const restaurantsData = [
  {
    id: 1,
    name: "McDonald's",
    rating: 4.3,
    deliveryTime: "35-40 mins",
    cuisines: ["Burgers", "American", "Fast Food"],
    location: "Perambur",
    offer: "₹150 OFF ABOVE ₹299",
    image: "/asset/image/Mc.avif",
    costForTwo: 350,
    isVeg: false,
    foodIn10Min: false,
    menu: [
      { id: "m1", name: "McSpicy Chicken Burger Combo", price: 299 },
      { id: "m2", name: "McVeggie Burger", price: 150 },
      { id: "m3", name: "French Fries (Large)", price: 110 }
    ]
  },
  {
    id: 2,
    name: "Subway",
    rating: 4.3,
    deliveryTime: "35-40 mins",
    cuisines: ["Sandwich", "Salads", "Wrap", "Healthy Food"],
    location: "London Street",
    offer: "₹150 OFF ABOVE ₹349",
    image: "/asset/image/subway.avif",
    costForTwo: 400,
    isVeg: true,
    foodIn10Min: true,
    menu: [
      { id: "s1", name: "Paneer Tikka Sub (6 inch)", price: 210 },
      { id: "s2", name: "Veg Shammi Sub (6 inch)", price: 190 },
      { id: "s3", name: "Cookies Box of 3", price: 120 }
    ]
  },
  {
    id: 3,
    name: "Theobroma",
    rating: 4.3,
    deliveryTime: "35-40 mins",
    cuisines: ["Desserts", "Bakery", "Beverages"],
    location: "Kellys",
    offer: "ITEMS AT ₹290",
    image: "/asset/image/waffle.avif",
    costForTwo: 500,
    isVeg: true,
    foodIn10Min: false,
    menu: [
      { id: "t1", name: "Overload Brownie", price: 120 },
      { id: "t2", name: "Pineapple Pastry", price: 90 },
      { id: "t3", name: "Red Velvet Cake (Half KG)", price: 650 }
    ]
  },
  {
    id: 4,
    name: "KFC Chicken",
    rating: 4.3,
    deliveryTime: "35-40 mins",
    cuisines: ["Chicken", "Fast Food", "Burgers"],
    location: "Vyasarpadi",
    offer: "₹150 OFF ABOVE ₹299",
    image: "/asset/image/kfc.avif",
    costForTwo: 450,
    isVeg: false,
    foodIn10Min: false,
    menu: [
      { id: "k1", name: "Ultimate Saving Bucket (12 pcs)", price: 699 },
      { id: "k2", name: "Hot & Crispy Chicken (4 pcs)", price: 399 },
      { id: "k3", name: "Chicken Zinger Burger", price: 180 }
    ]
  },
  {
    id: 5,
    name: "Sangeetha Veg Restaurant",
    rating: 4.5,
    deliveryTime: "8-10 mins",
    cuisines: ["South Indian", "North Indian", "Pure Veg"],
    location: "Perambur",
    offer: "20% OFF ABOVE ₹199",
    image: "/asset/image/idli.avif",
    costForTwo: 250,
    isVeg: true,
    foodIn10Min: true,
    menu: [
      { id: "sa1", name: "Special Ghee Podi Idli (2 pcs)", price: 90 },
      { id: "sa2", name: "Paper Masala Dosa", price: 130 },
      { id: "sa3", name: "Filter Coffee", price: 45 }
    ]
  },
  {
    id: 6,
    name: "Chinese Wok",
    rating: 3.9,
    deliveryTime: "25-30 mins",
    cuisines: ["Chinese", "Asian", "Noodles"],
    location: "Perambur",
    offer: "ITEMS AT ₹179",
    image: "/asset/image/chineese.avif",
    costForTwo: 300,
    isVeg: false,
    foodIn10Min: false,
    menu: [
      { id: "cw1", name: "Veg Hakka Noodles", price: 179 },
      { id: "cw2", name: "Chicken Fried Rice", price: 199 },
      { id: "cw3", name: "Schezwan Momos (6 pcs)", price: 140 }
    ]
  },
  {
    id: 7,
    name: "Burger King",
    rating: 4.1,
    deliveryTime: "9-12 mins",
    cuisines: ["Burgers", "Fast Food", "Beverages"],
    location: "Perambur",
    offer: "₹120 OFF ABOVE ₹249",
    image: "/asset/image/burgers.avif",
    costForTwo: 220,
    isVeg: false,
    foodIn10Min: true,
    menu: [
      { id: "bk1", name: "Crispy Veg Burger Combo", price: 179 },
      { id: "bk2", name: "Whopper Junior Chicken", price: 149 },
      { id: "bk3", name: "Chocolate Shake", price: 120 }
    ]
  },
  {
    id: 8,
    name: "Pizza Hut",
    rating: 4.2,
    deliveryTime: "30-35 mins",
    cuisines: ["Pizza", "Fast Food", "Italian"],
    location: "Kellys",
    offer: "50% OFF ABOVE ₹499",
    image: "/asset/image/pizza.avif",
    costForTwo: 600,
    isVeg: true,
    foodIn10Min: false,
    menu: [
      { id: "ph1", name: "Country Feast Pizza (Medium)", price: 450 },
      { id: "ph2", name: "Margherita Pizza (Personal)", price: 160 },
      { id: "ph3", name: "Garlic Bread Stix", price: 120 }
    ]
  },
  {
    id: 9,
    name: "Al Reem Shawarma",
    rating: 4.4,
    deliveryTime: "10 mins",
    cuisines: ["Arabian", "Shawarma", "Middle Eastern"],
    location: "Vyasarpadi",
    offer: "ITEMS AT ₹120",
    image: "/asset/image/shawerma.avif",
    costForTwo: 180,
    isVeg: false,
    foodIn10Min: true,
    menu: [
      { id: "ar1", name: "Special Plate Shawarma", price: 160 },
      { id: "ar2", name: "Roll Shawarma", price: 120 },
      { id: "ar3", name: "Kuboos Extra (2 pcs)", price: 20 }
    ]
  },
  {
    id: 10,
    name: "Madurai Parotta Shop",
    rating: 4.2,
    deliveryTime: "10-15 mins",
    cuisines: ["South Indian", "Street Food"],
    location: "Vyasarpadi",
    offer: "₹50 OFF ABOVE ₹150",
    image: "/asset/image/parotta.avif",
    costForTwo: 150,
    isVeg: false,
    foodIn10Min: true,
    menu: [
      { id: "mp1", name: "Kothu Parotta (Chicken)", price: 140 },
      { id: "mp2", name: "Madurai Bun Parotta (2 pcs)", price: 50 },
      { id: "mp3", name: "Chicken Salna (Extra)", price: 40 }
    ]
  }
];

export const mindCategories = [
  { id: 1, name: "Biryani", image: "/asset/image/biriyani.png" },
  { id: 2, name: "Chinese", image: "/asset/image/chineese.avif" },
  { id: 3, name: "Burgers", image: "/asset/image/burgers.avif" },
  { id: 4, name: "Pizza", image: "/asset/image/pizza.avif" },
  { id: 5, name: "Shawarma", image: "/asset/image/shawerma.avif" },
  { id: 6, name: "Idli", image: "/asset/image/idli.avif" },
  { id: 7, name: "Parotta", image: "/asset/image/parotta.avif" }
];
