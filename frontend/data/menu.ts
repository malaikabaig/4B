import type { Addon, Category, Product } from "../types"

export const ADDONS: Addon[] = [
  { id: "a1", name: "Signature Sauce", price: 100 },
  { id: "a2", name: "Mayo", price: 100 },
  { id: "a3", name: "Spicy Sauce", price: 100 },
  { id: "a4", name: "Extra Bread", price: 70 },
  { id: "a5", name: "Extra Chicken", price: 250 },
  { id: "a6", name: "Extra Beef", price: 390 },
  { id: "a7", name: "Extra Mix", price: 350 },
  { id: "a8", name: "French Fries", price: 350 },
  { id: "a9", name: "Turkish Traditional Pickle", price: 360 },
]

export const CATEGORIES: Category[] = [
  { id: "c1", name: "Doner Kebabs", slug: "doner-kebabs" },
  { id: "c2", name: "Turkish Wraps", slug: "turkish-wraps" },
  { id: "c3", name: "Turkish Sandwiches", slug: "turkish-sandwiches" },
  { id: "c4", name: "Doner Box", slug: "doner-box" },
  { id: "c5", name: "Doner Rice Bowls", slug: "doner-rice-bowls" },
  { id: "c6", name: "Fattoush Veggies", slug: "fattoush-veggies" },
  { id: "c7", name: "Hummus", slug: "hummus" },
  { id: "c8", name: "Turkish Kunafa", slug: "turkish-kunafa" },
  { id: "c9", name: "Falafel", slug: "falafel" },
  { id: "c10", name: "Turkish Pide", slug: "turkish-pide" },
  { id: "c11", name: "Ezme", slug: "ezme" },
  { id: "c12", name: "Platters", slug: "platters" },
]

const sauceAddons = ["a1", "a2", "a3"]
const meatAddons = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"]

export const PRODUCTS: Product[] = [
  // Doner Kebabs
  {
    id: "p1",
    name: "Beef Doner",
    description: "Succulent beef doner served with crisp fresh salad, warm pita and our rich signature sauce.",
    price: 1700,
    category: "c1",
    addons: meatAddons,
    popular: true,
  },
  {
    id: "p2",
    name: "Chicken Doner",
    description: "Tender chicken doner served with crisp salad, warm pita and our creamy signature sauce.",
    price: 1140,
    category: "c1",
    addons: meatAddons,
  },
  {
    id: "p3",
    name: "Mix Doner (Beef & Chicken)",
    description: "A savory mix of beef and chicken doner served with crisp salad, warm pita, and our signature sauce.",
    price: 1390,
    category: "c1",
    addons: meatAddons,
  },

  // Turkish Wraps
  {
    id: "p4",
    name: "Beef Wrap",
    description: "Tender beef wrapped in a soft tortilla with crisp salad and our signature sauce.",
    price: 1150,
    category: "c2",
    addons: meatAddons,
    featured: true,
  },
  {
    id: "p5",
    name: "Chicken Wrap",
    description: "Tender chicken wrapped in a soft tortilla with crisp salad and our creamy signature sauce.",
    price: 930,
    category: "c2",
    addons: meatAddons,
  },
  {
    id: "p6",
    name: "Mix Wrap (Beef & Chicken)",
    description: "A flavorful mix of beef and chicken wrapped in a soft tortilla with crisp salad and our signature sauce.",
    price: 1040,
    category: "c2",
    addons: meatAddons,
  },

  // Turkish Sandwiches
  {
    id: "p7",
    name: "Beef Sandwich",
    description: "Succulent beef layered in a soft, toasted sandwich with crisp salad and our rich signature sauce.",
    price: 1295,
    category: "c3",
    addons: meatAddons,
  },
  {
    id: "p8",
    name: "Chicken Sandwich",
    description: "Tender chicken layered in a soft, toasted sandwich with crisp salad and our creamy signature sauce.",
    price: 840,
    category: "c3",
    addons: meatAddons,
    popular: true,
  },
  {
    id: "p9",
    name: "Mix Sandwich (Beef & Chicken)",
    description: "A flavorful mix of beef and chicken layered in a soft, toasted sandwich with crisp salad and our signature sauce.",
    price: 1040,
    category: "c3",
    addons: meatAddons,
  },

  // Doner Box
  {
    id: "p10",
    name: "Beef Doner Box",
    description: "Tender doner meat served over fragrant rice, paired with crispy salad, golden fries and our signature sauce.",
    price: 2100,
    category: "c4",
    addons: meatAddons,
    featured: true,
  },
  {
    id: "p11",
    name: "Chicken Doner Box",
    description: "Juicy doner meat served over aromatic rice, complemented with fresh salad, golden fries and a rich signature sauce.",
    price: 1160,
    category: "c4",
    addons: meatAddons,
  },
  {
    id: "p12",
    name: "Mix Doner Box (Beef & Chicken)",
    description: "Savory doner meat layered over seasoned rice, served with crisp salad, golden fries and a smooth signature sauce.",
    price: 1740,
    category: "c4",
    addons: meatAddons,
  },

  // Doner Rice Bowls
  {
    id: "p13",
    name: "Beef Rice Bowl",
    description: "Succulent doner beef layered over aromatic rice, finished with crisp salad and signature sauce.",
    price: 1040,
    category: "c5",
    addons: ["a1", "a2", "a3", "a6"],
    popular: true,
  },
  {
    id: "p14",
    name: "Chicken Rice Bowl",
    description: "Tender doner chicken served over fragrant rice, paired with crisp salad, golden fries and our signature sauce.",
    price: 700,
    category: "c5",
    addons: ["a1", "a2", "a3", "a5"],
  },
  {
    id: "p15",
    name: "Mix Rice Bowl (Beef & Chicken)",
    description: "A hearty mix of tender doner beef and chicken served over aromatic rice, with crisp salad, golden fries and our signature sauce.",
    price: 930,
    category: "c5",
    addons: ["a1", "a2", "a3", "a5", "a6"],
  },

  // Fattoush Veggies
  {
    id: "p16",
    name: "Fattoush Veggies",
    description: "A refreshing mix of crispy garden vegetables tossed with herbs, toasted pita and a bright, tangy dressing.",
    price: 690,
    category: "c6",
    addons: sauceAddons,
  },
  {
    id: "p17",
    name: "Beef Fattoush Veggies",
    description: "Fresh fattoush topped with succulent beef doner, crispy vegetables, toasted pita and a zesty signature dressing.",
    price: 1160,
    category: "c6",
    addons: ["a1", "a2", "a3", "a6"],
  },
  {
    id: "p18",
    name: "Chicken Fattoush Veggies",
    description: "Crisp fattoush layered with tender chicken doner, fresh vegetables, toasted pita and a light, tangy dressing.",
    price: 930,
    category: "c6",
    addons: ["a1", "a2", "a3", "a5"],
  },
  {
    id: "p19",
    name: "Mix Fattoush Veggies (Beef & Chicken)",
    description: "A flavorful blend of beef and chicken doner served over fresh fattoush with crispy vegetables, toasted pita and our zesty signature dressing.",
    price: 1040,
    category: "c6",
    addons: meatAddons,
  },

  // Hummus
  {
    id: "p20",
    name: "Hummus",
    description: "Smooth, creamy hummus finished with a drizzle of olive oil and subtle seasoning.",
    price: 580,
    category: "c7",
    addons: ["a4"],
  },
  {
    id: "p21",
    name: "Beef Hummus",
    description: "Creamy hummus topped with succulent beef doner, finished with a touch of olive oil and seasoning.",
    price: 1040,
    category: "c7",
    addons: ["a4", "a6"],
  },
  {
    id: "p22",
    name: "Chicken Hummus",
    description: "Velvety hummus topped with tender chicken doner, complemented by light seasoning and olive oil.",
    price: 810,
    category: "c7",
    addons: ["a4", "a5"],
  },
  {
    id: "p23",
    name: "Mix Hummus (Beef & Chicken)",
    description: "Creamy hummus topped with a savory mix of beef and chicken doner, finished with olive oil and delicate seasoning.",
    price: 930,
    category: "c7",
    addons: ["a4", "a5", "a6"],
  },

  // Turkish Kunafa
  {
    id: "p24",
    name: "Pistachio Kunafa",
    description: "Crispy golden kunafa layered with a rich creamy filling and finished with premium crushed pistachios.",
    price: 1150,
    category: "c8",
    addons: [],
  },
  {
    id: "p25",
    name: "Walnut Kunafa",
    description: "Delicate golden kunafa filled with a smooth creamy center and topped with crunchy walnuts for a warm, nutty finish.",
    price: 1150,
    category: "c8",
    addons: [],
  },
  {
    id: "p26",
    name: "Combo Kunafa",
    description: "A decadent blend of pistachio and walnut over crisp golden kunafa, paired with a rich creamy filling for the best of both flavors.",
    price: 1250,
    category: "c8",
    addons: [],
  },

  // Falafel
  {
    id: "p27",
    name: "Falafel — 4 Pieces",
    description: "Crispy golden falafel with a tender, herby center, served fresh with a flavorful finish.",
    price: 460,
    category: "c9",
    addons: ["a2", "a3"],
  },
  {
    id: "p28",
    name: "Falafel — 8 Pieces",
    description: "Crispy golden falafel with a tender, herby center, served fresh with a flavorful finish.",
    price: 810,
    category: "c9",
    addons: ["a2", "a3"],
  },
  {
    id: "p29",
    name: "Falafel Doner",
    description: "Crispy falafel paired with savory doner, fresh salad and our signature sauce for a bold, satisfying combination.",
    price: 930,
    category: "c9",
    addons: ["a1", "a2", "a3", "a4"],
  },
  {
    id: "p30",
    name: "Falafel Hummus",
    description: "Golden falafel served with smooth, creamy hummus, finished with light seasoning and a touch of olive oil.",
    price: 810,
    category: "c9",
    addons: ["a2", "a3", "a4"],
  },

  // Turkish Pide
  {
    id: "p31",
    name: "Cheese Pide",
    description: "Golden-baked Turkish pide filled with rich, melted cheese for a creamy and comforting flavour in every bite.",
    price: 1590,
    category: "c10",
    addons: [],
  },
  {
    id: "p32",
    name: "Chicken Cheese Pide",
    description: "Tender seasoned chicken layered with melted cheese inside freshly baked Turkish pide for a rich, hearty finish.",
    price: 1990,
    category: "c10",
    addons: [],
  },
  {
    id: "p33",
    name: "Full Mix Cheese Pide (Beef & Chicken)",
    description: "A flavorful combination of seasoned meat and tender chicken, finished with melted cheese and herbs on freshly baked pide.",
    price: 2190,
    category: "c10",
    addons: [],
  },
  {
    id: "p34",
    name: "Nutella Pide",
    description: "Warm Turkish pide generously filled with smooth Nutella and finished with a rich, indulgent chocolatey sweetness.",
    price: 1090,
    category: "c10",
    addons: [],
  },

  // Ezme
  {
    id: "p35",
    name: "Ezme",
    description: "A vibrant Turkish salad of finely chopped tomatoes, peppers, herbs and spices, tossed in a bold, tangy dressing.",
    price: 440,
    category: "c11",
    addons: [],
  },

  // Platters
  {
    id: "p36",
    name: "2 Person Platter",
    description: "Chicken / Beef / Mix Wrap (choose one wrap), Hummus (60 g), Ezme (60 g), Turkish Pickles (50 g), Fragrant Rice (75 g), Chicken / Beef / Mix Meat (50 g), 2 Drinks (245 ml each).",
    price: 2490,
    category: "c12",
    addons: [],
    featured: true,
  },
  {
    id: "p37",
    name: "4 Person Platter",
    description: "Wrap (Chicken / Beef / Mix) choose one wrap; Turkish Sandwich/Doner (Chicken / Beef / Mix) choose any sandwich or doner kebab; Hummus (120 g); Ezme (120 g); Turkish Pickles (100 g); Fragrant Rice (150 g); Chicken / Beef / Mix Meat (100 g); Kunafa; 4 Drinks (245 ml each).",
    price: 4990,
    category: "c12",
    addons: [],
    popular: true,
  },
]
