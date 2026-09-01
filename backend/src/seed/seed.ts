import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db';
import { Admin } from '../models/Admin';
import { Category } from '../models/Category';
import { Addon } from '../models/Addon';
import { Product } from '../models/Product';

async function seed() {
  await connectDB();
  console.log('🌱  Seeding database…');

  await Promise.all([
    Admin.deleteMany({}),
    Category.deleteMany({}),
    Addon.deleteMany({}),
    Product.deleteMany({}),
  ]);

  const hash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? 'Admin@4BFoods2024',
    12,
  );
  await Admin.create({
    name: '4B Foods Admin',
    email: process.env.ADMIN_EMAIL ?? 'admin@4bfoods.com',
    password: hash,
  });
  console.log('✅  Admin created');

  const catDefs = [
    { name: 'Doner Kebabs', slug: 'doner-kebabs', order: 1 },
    { name: 'Turkish Wraps', slug: 'turkish-wraps', order: 2 },
    { name: 'Turkish Sandwiches', slug: 'turkish-sandwiches', order: 3 },
    { name: 'Doner Box', slug: 'doner-box', order: 4 },
    { name: 'Doner Rice Bowls', slug: 'doner-rice-bowls', order: 5 },
    { name: 'Fattoush Veggies', slug: 'fattoush-veggies', order: 6 },
    { name: 'Hummus', slug: 'hummus', order: 7 },
    { name: 'Turkish Kunafa', slug: 'turkish-kunafa', order: 8 },
    { name: 'Falafel', slug: 'falafel', order: 9 },
    { name: 'Turkish Pide', slug: 'turkish-pide', order: 10 },
    { name: 'Ezme', slug: 'ezme', order: 11 },
    { name: 'Platters', slug: 'platters', order: 12 },
  ];
  const cats = await Category.insertMany(catDefs);
  const c = Object.fromEntries(cats.map((cat) => [cat.slug, cat._id]));
  console.log('✅  Categories created');

  const addonDefs = [
    { name: 'Signature Sauce', price: 100 },
    { name: 'Mayo', price: 100 },
    { name: 'Spicy Sauce', price: 100 },
    { name: 'Extra Bread', price: 70 },
    { name: 'Extra Chicken', price: 250 },
    { name: 'Extra Beef', price: 390 },
    { name: 'Extra Mix', price: 350 },
    { name: 'French Fries', price: 350 },
    { name: 'Turkish Traditional Pickle', price: 360 },
  ];
  const addons = await Addon.insertMany(addonDefs);
  const [sauce1, mayo, sauce3, bread, chicken, beef, mix, fries, pickle] = addons.map(
    (addon) => addon._id,
  );
  const sauces = [sauce1, mayo, sauce3];
  const meat = [sauce1, mayo, sauce3, bread, chicken, beef, mix, fries, pickle];
  console.log('✅  Addons created');

  const products = [
    {
      name: 'Beef Doner',
      description:
        'Succulent beef doner served with crisp fresh salad, warm pita and our rich signature sauce.',
      price: 1700,
      category: c['doner-kebabs'],
      addons: meat,
      isPopular: true,
    },
    {
      name: 'Chicken Doner',
      description:
        'Tender chicken doner served with crisp salad, warm pita and our creamy signature sauce.',
      price: 1140,
      category: c['doner-kebabs'],
      addons: meat,
    },
    {
      name: 'Mix Doner (Beef & Chicken)',
      description:
        'A savory mix of beef and chicken doner served with crisp salad, warm pita, and our signature sauce.',
      price: 1390,
      category: c['doner-kebabs'],
      addons: meat,
    },

    {
      name: 'Beef Wrap',
      description:
        'Tender beef wrapped in a soft tortilla with crisp salad and our signature sauce.',
      price: 1150,
      category: c['turkish-wraps'],
      addons: meat,
      isFeatured: true,
    },
    {
      name: 'Chicken Wrap',
      description:
        'Tender chicken wrapped in a soft tortilla with crisp salad and our creamy signature sauce.',
      price: 930,
      category: c['turkish-wraps'],
      addons: meat,
    },
    {
      name: 'Mix Wrap (Beef & Chicken)',
      description:
        'A flavorful mix of beef and chicken wrapped in a soft tortilla with crisp salad and our signature sauce.',
      price: 1040,
      category: c['turkish-wraps'],
      addons: meat,
    },

    {
      name: 'Beef Sandwich',
      description:
        'Succulent beef layered in a soft, toasted sandwich with crisp salad and our rich signature sauce.',
      price: 1295,
      category: c['turkish-sandwiches'],
      addons: meat,
    },
    {
      name: 'Chicken Sandwich',
      description:
        'Tender chicken layered in a soft, toasted sandwich with crisp salad and our creamy signature sauce.',
      price: 840,
      category: c['turkish-sandwiches'],
      addons: meat,
      isPopular: true,
    },
    {
      name: 'Mix Sandwich (Beef & Chicken)',
      description:
        'A flavorful mix of beef and chicken layered in a soft, toasted sandwich with crisp salad and our signature sauce.',
      price: 1040,
      category: c['turkish-sandwiches'],
      addons: meat,
    },

    {
      name: 'Beef Doner Box',
      description:
        'Tender doner meat served over fragrant rice, paired with crispy salad, golden fries and our signature sauce.',
      price: 2100,
      category: c['doner-box'],
      addons: meat,
      isFeatured: true,
    },
    {
      name: 'Chicken Doner Box',
      description:
        'Juicy doner meat served over aromatic rice, complemented with fresh salad, golden fries and a rich signature sauce.',
      price: 1160,
      category: c['doner-box'],
      addons: meat,
    },
    {
      name: 'Mix Doner Box (Beef & Chicken)',
      description:
        'Savory doner meat layered over seasoned rice, served with crisp salad, golden fries and a smooth signature sauce.',
      price: 1740,
      category: c['doner-box'],
      addons: meat,
    },

    {
      name: 'Beef Rice Bowl',
      description:
        'Succulent doner beef layered over aromatic rice, finished with crisp salad and signature sauce.',
      price: 1040,
      category: c['doner-rice-bowls'],
      addons: [sauce1, mayo, sauce3, beef],
      isPopular: true,
    },
    {
      name: 'Chicken Rice Bowl',
      description:
        'Tender doner chicken served over fragrant rice, paired with crisp salad, golden fries and our signature sauce.',
      price: 700,
      category: c['doner-rice-bowls'],
      addons: [sauce1, mayo, sauce3, chicken],
    },
    {
      name: 'Mix Rice Bowl (Beef & Chicken)',
      description:
        'A hearty mix of tender doner beef and chicken served over aromatic rice, with crisp salad, golden fries and our signature sauce.',
      price: 930,
      category: c['doner-rice-bowls'],
      addons: [sauce1, mayo, sauce3, chicken, beef],
    },

    {
      name: 'Fattoush Veggies',
      description:
        'A refreshing mix of crispy garden vegetables tossed with herbs, toasted pita and a bright, tangy dressing.',
      price: 690,
      category: c['fattoush-veggies'],
      addons: sauces,
    },
    {
      name: 'Beef Fattoush Veggies',
      description:
        'Fresh fattoush topped with succulent beef doner, crispy vegetables, toasted pita and a zesty signature dressing.',
      price: 1160,
      category: c['fattoush-veggies'],
      addons: [sauce1, mayo, sauce3, beef],
    },
    {
      name: 'Chicken Fattoush Veggies',
      description:
        'Crisp fattoush layered with tender chicken doner, fresh vegetables, toasted pita and a light, tangy dressing.',
      price: 930,
      category: c['fattoush-veggies'],
      addons: [sauce1, mayo, sauce3, chicken],
    },
    {
      name: 'Mix Fattoush Veggies (Beef & Chicken)',
      description:
        'A flavorful blend of beef and chicken doner served over fresh fattoush with crispy vegetables, toasted pita and our zesty signature dressing.',
      price: 1040,
      category: c['fattoush-veggies'],
      addons: meat,
    },

    {
      name: 'Hummus',
      description:
        'Smooth, creamy hummus finished with a drizzle of olive oil and subtle seasoning.',
      price: 580,
      category: c['hummus'],
      addons: [bread],
    },
    {
      name: 'Beef Hummus',
      description:
        'Creamy hummus topped with succulent beef doner, finished with a touch of olive oil and seasoning.',
      price: 1040,
      category: c['hummus'],
      addons: [bread, beef],
    },
    {
      name: 'Chicken Hummus',
      description:
        'Velvety hummus topped with tender chicken doner, complemented by light seasoning and olive oil.',
      price: 810,
      category: c['hummus'],
      addons: [bread, chicken],
    },
    {
      name: 'Mix Hummus (Beef & Chicken)',
      description:
        'Creamy hummus topped with a savory mix of beef and chicken doner, finished with olive oil and delicate seasoning.',
      price: 930,
      category: c['hummus'],
      addons: [bread, chicken, beef],
    },

    {
      name: 'Pistachio Kunafa',
      description:
        'Crispy golden kunafa layered with a rich creamy filling and finished with premium crushed pistachios.',
      price: 1150,
      category: c['turkish-kunafa'],
      addons: [],
    },
    {
      name: 'Walnut Kunafa',
      description:
        'Delicate golden kunafa filled with a smooth creamy center and topped with crunchy walnuts for a warm, nutty finish.',
      price: 1150,
      category: c['turkish-kunafa'],
      addons: [],
    },
    {
      name: 'Combo Kunafa',
      description:
        'A decadent blend of pistachio and walnut over crisp golden kunafa, paired with a rich creamy filling for the best of both flavors.',
      price: 1250,
      category: c['turkish-kunafa'],
      addons: [],
    },

    {
      name: 'Falafel — 4 Pieces',
      description:
        'Crispy golden falafel with a tender, herby center, served fresh with a flavorful finish.',
      price: 460,
      category: c['falafel'],
      addons: [mayo, sauce3],
    },
    {
      name: 'Falafel — 8 Pieces',
      description:
        'Crispy golden falafel with a tender, herby center, served fresh with a flavorful finish.',
      price: 810,
      category: c['falafel'],
      addons: [mayo, sauce3],
    },
    {
      name: 'Falafel Doner',
      description:
        'Crispy falafel paired with savory doner, fresh salad and our signature sauce for a bold, satisfying combination.',
      price: 930,
      category: c['falafel'],
      addons: [sauce1, mayo, sauce3, bread],
    },
    {
      name: 'Falafel Hummus',
      description:
        'Golden falafel served with smooth, creamy hummus, finished with light seasoning and a touch of olive oil.',
      price: 810,
      category: c['falafel'],
      addons: [mayo, sauce3, bread],
    },

    {
      name: 'Cheese Pide',
      description:
        'Golden-baked Turkish pide filled with rich, melted cheese for a creamy and comforting flavour in every bite.',
      price: 1590,
      category: c['turkish-pide'],
      addons: [],
    },
    {
      name: 'Chicken Cheese Pide',
      description:
        'Tender seasoned chicken layered with melted cheese inside freshly baked Turkish pide for a rich, hearty finish.',
      price: 1990,
      category: c['turkish-pide'],
      addons: [],
    },
    {
      name: 'Full Mix Cheese Pide (Beef & Chicken)',
      description:
        'A flavorful combination of seasoned meat and tender chicken, finished with melted cheese and herbs on freshly baked pide.',
      price: 2190,
      category: c['turkish-pide'],
      addons: [],
    },
    {
      name: 'Nutella Pide',
      description:
        'Warm Turkish pide generously filled with smooth Nutella and finished with a rich, indulgent chocolatey sweetness.',
      price: 1090,
      category: c['turkish-pide'],
      addons: [],
    },

    {
      name: 'Ezme',
      description:
        'A vibrant Turkish salad of finely chopped tomatoes, peppers, herbs and spices, tossed in a bold, tangy dressing.',
      price: 440,
      category: c['ezme'],
      addons: [],
    },

    {
      name: '2 Person Platter',
      description:
        'Chicken / Beef / Mix Wrap (choose one wrap), Hummus (60 g), Ezme (60 g), Turkish Pickles (50 g), Fragrant Rice (75 g), Chicken / Beef / Mix Meat (50 g), 2 Drinks (245 ml each).',
      price: 2490,
      category: c['platters'],
      addons: [],
      isFeatured: true,
    },
    {
      name: '4 Person Platter',
      description:
        'Wrap (Chicken / Beef / Mix) choose one wrap; Turkish Sandwich/Doner (Chicken / Beef / Mix) choose any sandwich or doner kebab; Hummus (120 g); Ezme (120 g); Turkish Pickles (100 g); Fragrant Rice (150 g); Chicken / Beef / Mix Meat (100 g); Kunafa; 4 Drinks (245 ml each).',
      price: 4990,
      category: c['platters'],
      addons: [],
      isPopular: true,
    },
  ];

  await Product.insertMany(products);
  console.log(`✅  ${products.length} products created`);
  console.log('🎉  Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
