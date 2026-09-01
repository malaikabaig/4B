// import { useState, useEffect, useRef, useCallback } from 'react';
// import { CATEGORIES, PRODUCTS, ADDONS } from './data/menu';
// import type { CartItem, OrderType, Product, Addon } from './types';
// import logoImg from './assets/logo.jpeg';
// import donerKebabsImg from './assets/DonerKebabs.png';
// import sandwichImg from './assets/Sandwich.png';
// import wrapsImg from './assets/Wraps.png';
// import donerBoxImg from './assets/DonerBox.png';
// import riceBowlImg from './assets/RiceBowl.png';
// import fattoushImg from './assets/Fattoush.png';
// import hummusImg from './assets/Hummus.png';
// import falafelImg from './assets/falafel.png';
// import pideImg from './assets/Pide.png';
// import kunafaImg from './assets/Kunafa.png';
// import twoPersonPlatterImg from './assets/2person.png';
// import fourPersonPlatterImg from './assets/4person.png';
// import restaurantImg1 from './imports/Screenshot_2026-08-12_at_4.44.59_AM.png';
// import restaurantImg2 from './imports/Screenshot_2026-08-12_at_4.45.08_AM.png';
// import restaurantImg3 from './imports/Screenshot_2026-08-12_at_4.45.15_AM.png';
// import restaurantImg4 from './imports/Screenshot_2026-08-12_at_4.45.24_AM.png';
// import restaurantImg5 from './imports/Screenshot_2026-08-12_at_4.45.34_AM.png';
// import restaurantImg6 from './imports/Screenshot_2026-08-12_at_4.45.44_AM.png';
// import restaurantImg7 from './imports/Screenshot_2026-08-12_at_4.46.06_AM.png';

// // ─── Logo with white-background removed ──────────────────────────────────────
// // border-radius so only the circular logo shows — white corners disappear.
// function Logo({
//   className = '',
//   size = 48,
// }: {
//   className?: string;
//   size?: number;
// }) {
//   return (
//     <div
//       className={className}
//       style={{
//         width: size,
//         height: size,
//         borderRadius: '50%',
//         overflow: 'hidden',
//         flexShrink: 0,
//         background: '#1C0D04',
//       }}
//     >
//       <img
//         src={logoImg}
//         alt="4B Foods"
//         style={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           display: 'block',
//         }}
//       />
//     </div>
//   );
// }

// // ─── Food image placeholders by category ─────────────────────────────────────
// const CATEGORY_COLORS: Record<string, string> = {
//   c1: '#7B3F00',
//   c2: '#5C4A1E',
//   c3: '#8B5E3C',
//   c4: '#6B3A2A',
//   c5: '#4A6741',
//   c6: '#3D6B4F',
//   c7: '#B8860B',
//   c8: '#8B6914',
//   c9: '#8B3A62',
//   c10: '#7E4A12',
//   c11: '#5D4A2E',
//   c12: '#6B3A2A',
// };

// const CATEGORY_IMAGES: Record<string, string> = {
//   c1: donerKebabsImg,
//   c2: wrapsImg,
//   c3: sandwichImg,
//   c4: donerBoxImg,
//   c5: riceBowlImg,
//   c6: fattoushImg,
//   c7: hummusImg,
//   c8: kunafaImg,
//   c9: falafelImg,
//   c10: pideImg,
//   c11: fattoushImg,
//   c12: twoPersonPlatterImg || fourPersonPlatterImg,
// };

// function FoodPlaceholder({
//   categoryId,
//   name,
// }: {
//   categoryId: string;
//   name: string;
// }) {
//   const color = CATEGORY_COLORS[categoryId] || '#7B3F00';
//   const image = CATEGORY_IMAGES[categoryId];
//   return (
//     <div
//       className="w-full h-full relative overflow-hidden"
//       style={{ background: `linear-gradient(135deg, ${color}cc, ${color}66)` }}
//     >
//       {image && (
//         <img src={image} alt={name} className="w-full h-full object-cover" />
//       )}
//       <div
//         className="absolute inset-0 flex items-end justify-center p-2"
//         style={{
//           background:
//             'linear-gradient(to top, rgba(28,13,4,0.55), transparent 65%)',
//         }}
//       >
//         <span className="text-white/90 text-xs font-semibold text-center px-2 leading-tight">
//           {name}
//         </span>
//       </div>
//     </div>
//   );
// }

// // ─── Announcement Bar ─────────────────────────────────────────────────────────
// function AnnouncementBar() {
//   return (
//     <div
//       className="w-full text-center py-2 px-4 text-xs font-medium tracking-wide"
//       style={{ background: '#1C0D04', color: '#C9A84C' }}
//     >
//       🚚 Home Delivery Available &nbsp;|&nbsp; 📞 Call 0319 8429752
//     </div>
//   );
// }

// // ─── Header ──────────────────────────────────────────────────────────────────
// function Header({
//   orderType,
//   onOpenOrderModal,
//   cartCount,
//   onOpenCart,
//   onSearchFocus,
// }: {
//   orderType: OrderType | null;
//   onOpenOrderModal: () => void;
//   cartCount: number;
//   onOpenCart: () => void;
//   onSearchFocus: () => void;
// }) {
//   const scrollToSection = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <header
//       className="sticky top-0 z-40 shadow-md"
//       style={{ background: '#1C0D04' }}
//     >
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
//         {/* Logo */}
//         <button
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//           className="flex items-center gap-2 flex-shrink-0"
//         >
//           <Logo size={52} />
//           <span
//             className="hidden sm:block font-bold text-lg leading-tight"
//             style={{ color: '#C9A84C' }}
//           >
//             4B
//             <br />
//             <span className="text-xs font-normal text-white/70">Foods</span>
//           </span>
//         </button>

//         {/* Order type toggle */}
//         <div className="flex items-center gap-1 bg-black/30 rounded-full p-1 flex-shrink-0">
//           {(['delivery', 'pickup'] as OrderType[]).map((t) => (
//             <button
//               key={t}
//               onClick={onOpenOrderModal}
//               className="px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all"
//               style={
//                 orderType === t
//                   ? { background: '#C9A84C', color: '#1C0D04' }
//                   : { color: '#C9A84C' }
//               }
//             >
//               {t === 'delivery' ? 'Delivery' : 'Pick-up'}
//             </button>
//           ))}
//         </div>

//         {/* Nav links */}
//         <nav className="hidden md:flex items-center gap-5 text-sm font-medium flex-1">
//           {[
//             { label: 'Home', id: 'hero' },
//             { label: 'Menu', id: 'menu-intro' },
//             { label: 'Featured', id: 'featured' },
//             { label: 'Contact', id: 'contact' },
//           ].map(({ label, id }) => (
//             <button
//               key={id}
//               onClick={() => scrollToSection(id)}
//               className="hover:opacity-80 transition-opacity"
//               style={{ color: '#C9A84C' }}
//             >
//               {label}
//             </button>
//           ))}
//         </nav>

//         {/* Location */}
//         <div className="hidden lg:flex items-center gap-1 text-xs text-white/50 flex-shrink-0">
//           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//             <path
//               fillRule="evenodd"
//               d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//               clipRule="evenodd"
//             />
//           </svg>
//           71-A Jail Road, Lahore
//         </div>

//         {/* Search */}
//         <button
//           onClick={onSearchFocus}
//           className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
//           style={{ color: '#C9A84C' }}
//           aria-label="Search"
//         >
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
//             />
//           </svg>
//         </button>

//         {/* Cart */}
//         <button
//           onClick={onOpenCart}
//           className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
//           style={{ color: '#C9A84C' }}
//           aria-label="Cart"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//             />
//           </svg>
//           {cartCount > 0 && (
//             <span
//               className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
//               style={{ background: '#C9A84C', color: '#1C0D04' }}
//             >
//               {cartCount}
//             </span>
//           )}
//         </button>
//       </div>
//     </header>
//   );
// }

// // ─── Order Modal ──────────────────────────────────────────────────────────────
// function OrderModal({
//   open,
//   onClose,
//   orderType,
//   onSelect,
// }: {
//   open: boolean;
//   onClose: () => void;
//   orderType: OrderType | null;
//   onSelect: (t: OrderType) => void;
// }) {
//   const [selected, setSelected] = useState<OrderType>(orderType ?? 'delivery');

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
//         <div className="flex justify-center mb-4">
//           <Logo size={64} />
//         </div>
//         <h2
//           className="text-xl font-bold text-center mb-1"
//           style={{ color: '#1C0D04' }}
//         >
//           Welcome to 4B Foods
//         </h2>
//         <p className="text-sm text-center text-gray-500 mb-5">
//           71-A Jail Road, Lahore
//         </p>
//         <p className="text-sm font-semibold text-center mb-4 text-gray-700">
//           How would you like to receive your order?
//         </p>
//         <div className="flex gap-3 mb-6">
//           {(['delivery', 'pickup'] as OrderType[]).map((t) => (
//             <button
//               key={t}
//               onClick={() => setSelected(t)}
//               className="flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all"
//               style={
//                 selected === t
//                   ? {
//                       borderColor: '#C9A84C',
//                       background: '#C9A84C',
//                       color: '#1C0D04',
//                     }
//                   : { borderColor: '#e5e7eb', color: '#374151' }
//               }
//             >
//               {t === 'delivery' ? '🚚 Delivery' : '🏃 Pick-up'}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={() => {
//             onSelect(selected);
//             onClose();
//           }}
//           className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
//           style={{ background: '#1C0D04', color: '#C9A84C' }}
//         >
//           Start Ordering
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Hero Carousel ────────────────────────────────────────────────────────────
// const SLIDES = [
//   {
//     img: restaurantImg1,
//     headline: 'Turkish Flavours',
//     sub: 'The 4B Way',
//     accent: 'Authentic Doner, Sandwich & More',
//   },
//   {
//     img: restaurantImg2,
//     headline: 'Discover Our Doner',
//     sub: 'Slow-Roasted to Perfection',
//     accent: 'Beef · Chicken · Mix',
//   },
//   {
//     img: restaurantImg3,
//     headline: 'Sandwich, Wraps & More',
//     sub: 'Made Fresh Every Day',
//     accent: '71-A Jail Road, Lahore',
//   },
//   {
//     img: restaurantImg4,
//     headline: 'Rice Bowls Done Right',
//     sub: 'Hearty. Flavourful. Filling.',
//     accent: 'Beef · Chicken · Mix Bowls',
//   },
//   {
//     img: restaurantImg5,
//     headline: 'Eat Well, Feel Good',
//     sub: 'Dine In or Order Home',
//     accent: 'Home Delivery Available',
//   },
// ];

// function HeroCarousel() {
//   const [current, setCurrent] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const touchStartX = useRef(0);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const next = useCallback(
//     () => setCurrent((c) => (c + 1) % SLIDES.length),
//     [],
//   );
//   const prev = useCallback(
//     () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
//     [],
//   );

//   useEffect(() => {
//     if (paused) return;
//     timerRef.current = setInterval(next, 4500);
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [paused, next]);

//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e: React.TouchEvent) => {
//     const dx = touchStartX.current - e.changedTouches[0].clientX;
//     if (Math.abs(dx) > 50) dx > 0 ? next() : prev();
//   };

//   return (
//     <div
//       id="hero"
//       className="relative w-full overflow-hidden select-none"
//       style={{ height: 'clamp(280px, 50vw, 560px)' }}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       {SLIDES.map((slide, i) => (
//         <div
//           key={i}
//           className="absolute inset-0 transition-opacity duration-700"
//           style={{
//             opacity: i === current ? 1 : 0,
//             zIndex: i === current ? 1 : 0,
//           }}
//         >
//           <img
//             src={slide.img}
//             alt={slide.headline}
//             className="w-full h-full object-cover"
//           />
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 'linear-gradient(to right, rgba(28,13,4,0.75) 0%, rgba(28,13,4,0.2) 60%, transparent 100%)',
//             }}
//           />
//           <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
//             <p
//               className="text-xs font-semibold uppercase tracking-widest mb-2"
//               style={{ color: '#C9A84C' }}
//             >
//               {slide.accent}
//             </p>
//             <h1
//               className="font-black text-white leading-tight mb-1"
//               style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
//             >
//               {slide.headline}
//             </h1>
//             <p className="text-white/80 text-lg mb-6">{slide.sub}</p>
//             <button
//               onClick={() =>
//                 document
//                   .getElementById('menu-intro')
//                   ?.scrollIntoView({ behavior: 'smooth' })
//               }
//               className="self-start px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
//               style={{ background: '#C9A84C', color: '#1C0D04' }}
//             >
//               Order Now
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Arrows */}
//       {[
//         { onClick: prev, label: '◀', side: 'left-3' },
//         { onClick: next, label: '▶', side: 'right-3' },
//       ].map(({ onClick, label, side }) => (
//         <button
//           key={side}
//           onClick={onClick}
//           className={`absolute top-1/2 -translate-y-1/2 ${side} z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110`}
//           style={{ background: 'rgba(201,168,76,0.85)', color: '#1C0D04' }}
//           aria-label={label}
//         >
//           {label}
//         </button>
//       ))}

//       {/* Dots */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
//         {SLIDES.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrent(i)}
//             className="rounded-full transition-all"
//             style={{
//               width: i === current ? 20 : 8,
//               height: 8,
//               background: i === current ? '#C9A84C' : 'rgba(255,255,255,0.4)',
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Category Nav ─────────────────────────────────────────────────────────────
// function CategoryNav({ activeCategory }: { activeCategory: string | null }) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scrollTo = (slug: string) => {
//     document
//       .getElementById(`section-${slug}`)
//       ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   useEffect(() => {
//     if (!activeCategory || !scrollRef.current) return;
//     const btn = scrollRef.current.querySelector(
//       `[data-slug="${activeCategory}"]`,
//     ) as HTMLElement;
//     if (btn)
//       btn.scrollIntoView({
//         inline: 'center',
//         behavior: 'smooth',
//         block: 'nearest',
//       });
//   }, [activeCategory]);

//   return (
//     <div
//       className="sticky z-30 shadow-sm"
//       style={{
//         top: 64,
//         background: '#F9F5EF',
//         borderBottom: '1px solid #E8DDD0',
//       }}
//     >
//       <div
//         ref={scrollRef}
//         className="flex gap-2 overflow-x-auto px-4 py-3 max-w-7xl mx-auto"
//         style={{ scrollbarWidth: 'none' }}
//       >
//         {CATEGORIES.map((cat) => (
//           <button
//             key={cat.id}
//             data-slug={cat.slug}
//             onClick={() => scrollTo(cat.slug)}
//             className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
//             style={
//               activeCategory === cat.slug
//                 ? { background: '#C9A84C', color: '#1C0D04' }
//                 : { background: '#E8DDD0', color: '#5C4A1E' }
//             }
//           >
//             {cat.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Menu Intro ───────────────────────────────────────────────────────────────
// function MenuIntro({
//   search,
//   onSearch,
//   searchRef,
// }: {
//   search: string;
//   onSearch: (v: string) => void;
//   searchRef: React.RefObject<HTMLInputElement | null>;
// }) {
//   return (
//     <section
//       id="menu-intro"
//       className="py-10 px-4 text-center"
//       style={{ background: '#F9F5EF' }}
//     >
//       <h2
//         className="font-black text-3xl md:text-4xl mb-2"
//         style={{ color: '#1C0D04' }}
//       >
//         What Are You Craving Today?
//       </h2>
//       <p className="text-gray-500 mb-6">
//         Explore doner, wraps, sandwiches, rice bowls, kunafa, pide, ezme and
//         platters.
//       </p>
//       <div className="max-w-md mx-auto relative">
//         <svg
//           className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
//           />
//         </svg>
//         <input
//           ref={searchRef}
//           type="text"
//           value={search}
//           onChange={(e) => onSearch(e.target.value)}
//           placeholder="Search menu items..."
//           className="w-full pl-10 pr-4 py-3 rounded-full border-2 text-sm outline-none focus:border-amber-400 transition-colors"
//           style={{
//             borderColor: '#E8DDD0',
//             background: 'white',
//             color: '#1C0D04',
//           }}
//         />
//         {search && (
//           <button
//             onClick={() => onSearch('')}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             ✕
//           </button>
//         )}
//       </div>
//     </section>
//   );
// }

// // ─── Category Banner ──────────────────────────────────────────────────────────
// const BANNER_PHOTOS: Record<string, string> = CATEGORY_IMAGES;

// function CategoryBanner({
//   categoryId,
//   name,
// }: {
//   categoryId: string;
//   name: string;
// }) {
//   const photo = BANNER_PHOTOS[categoryId];
//   return (
//     <div
//       className="w-full rounded-xl overflow-hidden relative mb-5"
//       style={{ height: 180 }}
//     >
//       {photo ? (
//         <img src={photo} alt={name} className="w-full h-full object-cover" />
//       ) : (
//         <div
//           className="w-full h-full"
//           style={{ background: CATEGORY_COLORS[categoryId] }}
//         />
//       )}
//       <div
//         className="absolute inset-0 flex items-end p-4"
//         style={{
//           background:
//             'linear-gradient(to top, rgba(28,13,4,0.8) 0%, transparent 60%)',
//         }}
//       >
//         <h3 className="text-white font-black text-2xl">{name}</h3>
//       </div>
//     </div>
//   );
// }

// // ─── Product Card ─────────────────────────────────────────────────────────────
// function ProductCard({
//   product,
//   onAddToCart,
// }: {
//   product: Product;
//   onAddToCart: (p: Product) => void;
// }) {
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
//       <div className="relative h-40">
//         <FoodPlaceholder categoryId={product.category} name={product.name} />
//         {product.featured && (
//           <span
//             className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
//             style={{ background: '#C9A84C', color: '#1C0D04' }}
//           >
//             Featured
//           </span>
//         )}
//         {product.popular && (
//           <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
//             Popular
//           </span>
//         )}
//       </div>
//       <div className="p-4 flex flex-col flex-1">
//         <h4 className="font-bold text-sm mb-1" style={{ color: '#1C0D04' }}>
//           {product.name}
//         </h4>
//         <p className="text-xs text-gray-500 flex-1 mb-3 leading-snug">
//           {product.description}
//         </p>
//         <div className="flex items-center justify-between mt-auto">
//           <span className="font-black text-base" style={{ color: '#8B5E3C' }}>
//             Rs. {product.price.toLocaleString()}
//           </span>
//           <button
//             onClick={() => onAddToCart(product)}
//             className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
//             style={{ background: '#1C0D04', color: '#C9A84C' }}
//           >
//             + Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Product Modal ────────────────────────────────────────────────────────────
// function ProductModal({
//   product,
//   onClose,
//   onConfirm,
// }: {
//   product: Product | null;
//   onClose: () => void;
//   onConfirm: (item: Omit<CartItem, 'id'>) => void;
// }) {
//   const [qty, setQty] = useState(1);
//   const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
//   const [instructions, setInstructions] = useState('');

//   useEffect(() => {
//     if (product) {
//       setQty(1);
//       setSelectedAddons([]);
//       setInstructions('');
//     }
//   }, [product]);

//   if (!product) return null;

//   const availableAddons = ADDONS.filter((a) => product.addons.includes(a.id));
//   const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
//   const itemTotal = (product.price + addonsTotal) * qty;

//   const toggleAddon = (addon: Addon) => {
//     setSelectedAddons((prev) =>
//       prev.find((a) => a.id === addon.id)
//         ? prev.filter((a) => a.id !== addon.id)
//         : [...prev, addon],
//     );
//   };

//   const handleConfirm = () => {
//     onConfirm({
//       product,
//       quantity: qty,
//       selectedAddons,
//       specialInstructions: instructions,
//       itemTotal,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-md max-h-[90vh] overflow-y-auto z-10">
//         {/* Header image */}
//         <div className="relative h-48 w-full">
//           <FoodPlaceholder categoryId={product.category} name={product.name} />
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm hover:bg-black/70"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="p-5">
//           <h3 className="font-black text-xl mb-1" style={{ color: '#1C0D04' }}>
//             {product.name}
//           </h3>
//           <p className="text-sm text-gray-500 mb-4">{product.description}</p>

//           {/* Add-ons */}
//           {availableAddons.length > 0 && (
//             <div className="mb-4">
//               <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
//                 Add-ons
//               </p>
//               <div className="flex flex-col gap-2">
//                 {availableAddons.map((addon) => {
//                   const checked = !!selectedAddons.find(
//                     (a) => a.id === addon.id,
//                   );
//                   return (
//                     <label
//                       key={addon.id}
//                       className="flex items-center justify-between cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={() => toggleAddon(addon)}
//                           className="w-4 h-4 accent-amber-500"
//                         />
//                         <span className="text-sm text-gray-700">
//                           {addon.name}
//                         </span>
//                       </div>
//                       <span
//                         className="text-sm font-semibold"
//                         style={{ color: '#8B5E3C' }}
//                       >
//                         +Rs. {addon.price}
//                       </span>
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Special instructions */}
//           <div className="mb-5">
//             <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
//               Special Instructions
//             </p>
//             <textarea
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               placeholder="Any special requests?"
//               rows={2}
//               className="w-full border rounded-xl px-3 py-2 text-sm resize-none outline-none focus:border-amber-400"
//               style={{ borderColor: '#E8DDD0' }}
//             />
//           </div>

//           {/* Qty + total */}
//           <div className="flex items-center gap-4 mb-5">
//             <div
//               className="flex items-center gap-3 border rounded-full px-3 py-1"
//               style={{ borderColor: '#E8DDD0' }}
//             >
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="text-lg font-bold w-6 text-center"
//                 style={{ color: '#8B5E3C' }}
//               >
//                 −
//               </button>
//               <span className="font-bold text-sm w-4 text-center">{qty}</span>
//               <button
//                 onClick={() => setQty((q) => q + 1)}
//                 className="text-lg font-bold w-6 text-center"
//                 style={{ color: '#8B5E3C' }}
//               >
//                 +
//               </button>
//             </div>
//             <span
//               className="font-black text-lg flex-1 text-right"
//               style={{ color: '#1C0D04' }}
//             >
//               Rs. {itemTotal.toLocaleString()}
//             </span>
//           </div>

//           <button
//             onClick={handleConfirm}
//             className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
//             style={{ background: '#1C0D04', color: '#C9A84C' }}
//           >
//             Add to Cart · Rs. {itemTotal.toLocaleString()}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Cart Drawer ──────────────────────────────────────────────────────────────
// function CartDrawer({
//   open,
//   onClose,
//   items,
//   onUpdateQty,
//   onRemove,
//   onCheckout,
//   orderType,
// }: {
//   open: boolean;
//   onClose: () => void;
//   items: CartItem[];
//   onUpdateQty: (id: string, qty: number) => void;
//   onRemove: (id: string) => void;
//   onCheckout: () => void;
//   orderType: OrderType | null;
// }) {
//   const subtotal = items.reduce((s, i) => s + i.itemTotal, 0);
//   const deliveryCharge = orderType === 'delivery' && subtotal > 0 ? 100 : 0;
//   const total = subtotal + deliveryCharge;

//   return (
//     <>
//       {open && (
//         <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
//       )}
//       <div
//         className="fixed top-0 right-0 bottom-0 z-50 flex flex-col shadow-2xl transition-transform duration-300"
//         style={{
//           width: 'clamp(300px, 90vw, 420px)',
//           background: '#F9F5EF',
//           transform: open ? 'translateX(0)' : 'translateX(100%)',
//         }}
//       >
//         <div
//           className="flex items-center justify-between px-5 py-4 border-b"
//           style={{ borderColor: '#E8DDD0', background: '#1C0D04' }}
//         >
//           <h2 className="font-bold text-lg" style={{ color: '#C9A84C' }}>
//             Your Cart
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-white/70 hover:text-white text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
//           {items.length === 0 && (
//             <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-16">
//               <div className="text-5xl mb-3">🛒</div>
//               <p className="font-semibold">Your cart is empty</p>
//               <p className="text-sm mt-1">Add items from the menu</p>
//             </div>
//           )}
//           {items.map((item) => (
//             <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm">
//               <div className="flex gap-3">
//                 <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
//                   <FoodPlaceholder categoryId={item.product.category} name="" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p
//                     className="font-bold text-sm truncate"
//                     style={{ color: '#1C0D04' }}
//                   >
//                     {item.product.name}
//                   </p>
//                   {item.selectedAddons.length > 0 && (
//                     <p className="text-xs text-gray-400 truncate">
//                       {item.selectedAddons.map((a) => a.name).join(', ')}
//                     </p>
//                   )}
//                   {item.specialInstructions && (
//                     <p className="text-xs text-gray-400 italic truncate">
//                       "{item.specialInstructions}"
//                     </p>
//                   )}
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => onUpdateQty(item.id, item.quantity - 1)}
//                       className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
//                       style={{ background: '#E8DDD0', color: '#5C4A1E' }}
//                     >
//                       −
//                     </button>
//                     <span className="text-sm font-bold w-4 text-center">
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => onUpdateQty(item.id, item.quantity + 1)}
//                       className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
//                       style={{ background: '#E8DDD0', color: '#5C4A1E' }}
//                     >
//                       +
//                     </button>
//                     <span
//                       className="ml-auto font-bold text-sm"
//                       style={{ color: '#8B5E3C' }}
//                     >
//                       Rs. {item.itemTotal.toLocaleString()}
//                     </span>
//                     <button
//                       onClick={() => onRemove(item.id)}
//                       className="text-red-400 hover:text-red-600 text-xs"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {items.length > 0 && (
//           <div
//             className="px-4 py-4 border-t bg-white"
//             style={{ borderColor: '#E8DDD0' }}
//           >
//             <div className="flex justify-between text-sm text-gray-500 mb-1">
//               <span>Subtotal</span>
//               <span>Rs. {subtotal.toLocaleString()}</span>
//             </div>
//             {deliveryCharge > 0 && (
//               <div className="flex justify-between text-sm text-gray-500 mb-1">
//                 <span>Delivery</span>
//                 <span>Rs. {deliveryCharge}</span>
//               </div>
//             )}
//             <div
//               className="flex justify-between font-black text-base mb-4"
//               style={{ color: '#1C0D04' }}
//             >
//               <span>Total</span>
//               <span>Rs. {total.toLocaleString()}</span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
//               style={{ background: '#C9A84C', color: '#1C0D04' }}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// // ─── Floating Cart Bar ────────────────────────────────────────────────────────
// function FloatingCartBar({
//   items,
//   onOpenCart,
// }: {
//   items: CartItem[];
//   onOpenCart: () => void;
// }) {
//   const count = items.reduce((s, i) => s + i.quantity, 0);
//   const total = items.reduce((s, i) => s + i.itemTotal, 0);
//   if (count === 0) return null;
//   return (
//     <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 px-3">
//       <button
//         onClick={onOpenCart}
//         className="flex items-center gap-3 px-5 py-3 rounded-full shadow-xl font-bold text-sm transition-transform hover:scale-105"
//         style={{ background: '#1C0D04', color: '#C9A84C', minWidth: 220 }}
//       >
//         <span
//           className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-black"
//           style={{ background: '#C9A84C', color: '#1C0D04' }}
//         >
//           {count}
//         </span>
//         <span className="flex-1 text-center">View Cart</span>
//         <span>Rs. {total.toLocaleString()}</span>
//       </button>
//     </div>
//   );
// }

// // ─── Checkout Modal ───────────────────────────────────────────────────────────
// type CheckoutStep = 'form' | 'confirmed';
// type CheckoutFormData = {
//   name: string;
//   phone: string;
//   address: string;
//   landmark: string;
//   pickupTime: string;
//   instructions: string;
// };

// function CheckoutField({
//   id,
//   label,
//   value,
//   onChange,
//   error,
//   required = false,
//   type = 'text',
//   placeholder = '',
// }: {
//   id: keyof CheckoutFormData;
//   label: string;
//   value: string;
//   onChange: (id: keyof CheckoutFormData, value: string) => void;
//   error?: string;
//   required?: boolean;
//   type?: string;
//   placeholder?: string;
// }) {
//   return (
//     <div>
//       <label className="block text-xs font-semibold text-gray-500 mb-1">
//         {label}
//         {required && <span className="text-red-400 ml-0.5">*</span>}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(id, e.target.value)}
//         placeholder={placeholder}
//         className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-400 transition-colors"
//         style={{ borderColor: error ? '#f87171' : '#E8DDD0' }}
//       />
//       {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
//     </div>
//   );
// }

// function CheckoutModal({
//   open,
//   onClose,
//   items,
//   orderType,
//   onPlaceOrder,
// }: {
//   open: boolean;
//   onClose: () => void;
//   items: CartItem[];
//   orderType: OrderType | null;
//   onPlaceOrder: (details: Record<string, string>) => string;
// }) {
//   const [step, setStep] = useState<CheckoutStep>('form');
//   const [orderNum, setOrderNum] = useState('');
//   const [form, setForm] = useState<CheckoutFormData>({
//     name: '',
//     phone: '',
//     address: '',
//     landmark: '',
//     pickupTime: '',
//     instructions: '',
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     if (open) {
//       setStep('form');
//       setForm({
//         name: '',
//         phone: '',
//         address: '',
//         landmark: '',
//         pickupTime: '',
//         instructions: '',
//       });
//       setErrors({});
//     }
//   }, [open]);

//   const subtotal = items.reduce((s, i) => s + i.itemTotal, 0);
//   const deliveryCharge = orderType === 'delivery' ? 100 : 0;
//   const total = subtotal + deliveryCharge;

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.name.trim()) e.name = 'Name is required';
//     if (!form.phone.trim()) e.phone = 'Phone is required';
//     if (orderType === 'delivery' && !form.address.trim())
//       e.address = 'Address is required';
//     if (orderType === 'pickup' && !form.pickupTime.trim())
//       e.pickupTime = 'Pick-up time is required';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;
//     const num = onPlaceOrder(form);
//     setOrderNum(num);
//     setStep('confirmed');
//   };

//   const whatsappMessage = () => {
//     const lines = [
//       `*Order #${orderNum} — 4B Foods*`,
//       `Type: ${orderType === 'delivery' ? 'Delivery' : 'Pick-up'}`,
//       `Name: ${form.name}`,
//       `Phone: ${form.phone}`,
//       orderType === 'delivery'
//         ? `Address: ${form.address}`
//         : `Pick-up Time: ${form.pickupTime}`,
//       '',
//       '*Items:*',
//       ...items.map(
//         (i) =>
//           `• ${i.product.name} x${i.quantity} — Rs. ${i.itemTotal.toLocaleString()}`,
//       ),
//       '',
//       `Subtotal: Rs. ${subtotal.toLocaleString()}`,
//       deliveryCharge ? `Delivery: Rs. ${deliveryCharge}` : '',
//       `*Total: Rs. ${total.toLocaleString()}*`,
//     ]
//       .filter(Boolean)
//       .join('\n');
//     return `https://wa.me/923198429752?text=${encodeURIComponent(lines)}`;
//   };

//   if (!open) return null;

//   const handleFieldChange = (id: keyof CheckoutFormData, value: string) => {
//     setForm((f) => ({ ...f, [id]: value }));
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={step === 'confirmed' ? onClose : undefined}
//       />
//       <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-lg max-h-[92vh] overflow-y-auto z-10">
//         {step === 'form' && (
//           <>
//             <div
//               className="flex items-center justify-between px-5 py-4 border-b sticky top-0 bg-white"
//               style={{ borderColor: '#E8DDD0' }}
//             >
//               <h2 className="font-bold text-lg" style={{ color: '#1C0D04' }}>
//                 Checkout
//               </h2>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="p-5 flex flex-col gap-4">
//               <div
//                 className="flex gap-3 p-3 rounded-xl"
//                 style={{ background: '#F9F5EF' }}
//               >
//                 <div>
//                   <p className="text-xs text-gray-400">Order type</p>
//                   <p
//                     className="font-semibold text-sm capitalize"
//                     style={{ color: '#1C0D04' }}
//                   >
//                     {orderType === 'delivery' ? '🚚 Delivery' : '🏃 Pick-up'}
//                   </p>
//                 </div>
//                 <div className="ml-auto text-right">
//                   <p className="text-xs text-gray-400">Total</p>
//                   <p
//                     className="font-black text-sm"
//                     style={{ color: '#8B5E3C' }}
//                   >
//                     Rs. {total.toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <CheckoutField
//                 id="name"
//                 label="Full Name"
//                 value={form.name}
//                 onChange={handleFieldChange}
//                 error={errors.name}
//                 required
//                 placeholder="Your name"
//               />
//               <CheckoutField
//                 id="phone"
//                 label="Phone Number"
//                 value={form.phone}
//                 onChange={handleFieldChange}
//                 error={errors.phone}
//                 required
//                 type="tel"
//                 placeholder="03XX XXXXXXX"
//               />
//               {orderType === 'delivery' ? (
//                 <>
//                   <CheckoutField
//                     id="address"
//                     label="Complete Address"
//                     value={form.address}
//                     onChange={handleFieldChange}
//                     error={errors.address}
//                     required
//                     placeholder="House / Street / Area"
//                   />
//                   <CheckoutField
//                     id="landmark"
//                     label="Nearby Landmark"
//                     value={form.landmark}
//                     onChange={handleFieldChange}
//                     error={errors.landmark}
//                     placeholder="Near mosque, school…"
//                   />
//                 </>
//               ) : (
//                 <CheckoutField
//                   id="pickupTime"
//                   label="Preferred Pick-up Time"
//                   value={form.pickupTime}
//                   onChange={handleFieldChange}
//                   error={errors.pickupTime}
//                   required
//                   placeholder="e.g. 7:30 PM"
//                 />
//               )}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 mb-1">
//                   Special Instructions
//                 </label>
//                 <textarea
//                   value={form.instructions}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, instructions: e.target.value }))
//                   }
//                   placeholder="Any notes for the restaurant?"
//                   rows={2}
//                   className="w-full border rounded-xl px-3 py-2 text-sm resize-none outline-none focus:border-amber-400"
//                   style={{ borderColor: '#E8DDD0' }}
//                 />
//               </div>

//               {/* Order summary */}
//               <div
//                 className="rounded-xl p-3 flex flex-col gap-1"
//                 style={{ background: '#F9F5EF' }}
//               >
//                 <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
//                   Order Summary
//                 </p>
//                 {items.map((i) => (
//                   <div key={i.id} className="flex justify-between text-sm">
//                     <span className="text-gray-600">
//                       {i.product.name} ×{i.quantity}
//                     </span>
//                     <span
//                       className="font-semibold"
//                       style={{ color: '#1C0D04' }}
//                     >
//                       Rs. {i.itemTotal.toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//                 <div
//                   className="border-t mt-2 pt-2 flex justify-between font-black text-base"
//                   style={{ borderColor: '#E8DDD0', color: '#1C0D04' }}
//                 >
//                   <span>Total</span>
//                   <span>Rs. {total.toLocaleString()}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
//                 style={{ background: '#1C0D04', color: '#C9A84C' }}
//               >
//                 Place Order
//               </button>
//             </div>
//           </>
//         )}

//         {step === 'confirmed' && (
//           <div className="p-8 text-center">
//             <div className="text-5xl mb-4">✅</div>
//             <h2
//               className="font-black text-2xl mb-2"
//               style={{ color: '#1C0D04' }}
//             >
//               Order Received!
//             </h2>
//             <p className="text-gray-500 mb-1 text-sm">
//               Your order has been received and is awaiting restaurant
//               confirmation.
//             </p>
//             <div
//               className="my-5 py-3 px-4 rounded-xl inline-block"
//               style={{ background: '#F9F5EF' }}
//             >
//               <p className="text-xs text-gray-400">Order Number</p>
//               <p className="font-black text-xl" style={{ color: '#C9A84C' }}>
//                 #{orderNum}
//               </p>
//             </div>
//             <div className="text-sm text-gray-600 mb-1">
//               <span className="font-semibold">{form.name}</span> · {form.phone}
//             </div>
//             <div className="text-xs text-gray-400 mb-6 capitalize">
//               {orderType === 'delivery'
//                 ? `Delivery to ${form.address}`
//                 : 'Pick-up'}
//             </div>
//             <div className="flex gap-3 flex-col">
//               <a
//                 href={whatsappMessage()}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-full py-3 rounded-xl font-bold text-sm text-center block transition-opacity hover:opacity-90"
//                 style={{ background: '#25D366', color: 'white' }}
//               >
//                 📲 Send Summary on WhatsApp
//               </a>
//               <button
//                 onClick={onClose}
//                 className="w-full py-3 rounded-xl font-bold text-sm border-2 transition-colors hover:bg-gray-50"
//                 style={{ borderColor: '#E8DDD0', color: '#5C4A1E' }}
//               >
//                 Back to Menu
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Featured Section ─────────────────────────────────────────────────────────
// function FeaturedSection({
//   onAddToCart,
// }: {
//   onAddToCart: (p: Product) => void;
// }) {
//   const featured = PRODUCTS.filter((p) => p.featured || p.popular).slice(0, 6);
//   return (
//     <section
//       id="featured"
//       className="py-12 px-4"
//       style={{ background: '#1C0D04' }}
//     >
//       <div className="max-w-7xl mx-auto">
//         <h2
//           className="font-black text-2xl md:text-3xl mb-1"
//           style={{ color: '#C9A84C' }}
//         >
//           Customer Favourites
//         </h2>
//         <p className="text-white/50 text-sm mb-6">
//           Most loved dishes at 4B Foods
//         </p>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {featured.map((p) => (
//             <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── Contact Section ──────────────────────────────────────────────────────────
// function ContactSection() {
//   return (
//     <section
//       id="contact"
//       className="py-14 px-4"
//       style={{ background: '#F9F5EF' }}
//     >
//       <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//         <div>
//           <Logo size={72} className="mb-5" />
//           <h2 className="font-black text-3xl mb-2" style={{ color: '#1C0D04' }}>
//             4B Foods
//           </h2>
//           <p className="text-gray-500 mb-1">
//             🏠 71-A Jail Road, Lahore, Pakistan
//           </p>
//           <p className="text-gray-500 mb-1">📞 0319 8429752</p>
//           <p className="text-gray-500 mb-6">🚚 Home Delivery Available</p>
//           <div className="flex flex-wrap gap-3">
//             <a
//               href="tel:03198429752"
//               className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-80"
//               style={{ background: '#1C0D04', color: '#C9A84C' }}
//             >
//               📞 Call Now
//             </a>
//             <a
//               href="https://wa.me/923198429752"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-80"
//               style={{ background: '#25D366', color: 'white' }}
//             >
//               💬 WhatsApp
//             </a>
//             <a
//               href="https://maps.google.com/?q=71-A+Jail+Road+Lahore"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-5 py-2 rounded-full font-bold text-sm border-2 transition-colors hover:bg-gray-100"
//               style={{ borderColor: '#E8DDD0', color: '#5C4A1E' }}
//             >
//               📍 Get Directions
//             </a>
//           </div>
//         </div>
//         {/* Map embed placeholder */}
//         <div
//           className="rounded-2xl overflow-hidden shadow-md"
//           style={{ height: 280, background: '#E8DDD0' }}
//         >
//           <iframe
//             title="4B Foods Location"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-placeholder&q=71-A+Jail+Road,+Lahore,+Pakistan"
//           />
//           {/* Fallback if iframe blocked */}
//           <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
//             <a
//               href="https://maps.google.com/?q=71-A+Jail+Road+Lahore"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-semibold underline"
//             >
//               📍 Open in Google Maps
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── Footer ───────────────────────────────────────────────────────────────────
// function Footer() {
//   const scrollTo = (slug: string) => {
//     document
//       .getElementById(`section-${slug}`)
//       ?.scrollIntoView({ behavior: 'smooth' });
//   };
//   return (
//     <footer className="px-4 pt-12 pb-6" style={{ background: '#1C0D04' }}>
//       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
//         <div>
//           <div className="flex items-center gap-3 mb-3">
//             <Logo size={52} />
//             <span className="font-black text-lg" style={{ color: '#C9A84C' }}>
//               4B Foods
//             </span>
//           </div>
//           <p className="text-white/50 text-sm leading-relaxed">
//             Turkish Doner, Wraps, Sandwiches,
//             <br />
//             Rice Bowls, Kunafa, Pide & Platters.
//             <br />
//             71-A Jail Road, Lahore, Pakistan
//           </p>
//         </div>
//         <div>
//           <p className="font-bold text-sm mb-3" style={{ color: '#C9A84C' }}>
//             Menu
//           </p>
//           <div className="flex flex-col gap-1">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => scrollTo(cat.slug)}
//                 className="text-left text-white/50 hover:text-white/80 text-sm transition-colors"
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div>
//           <p className="font-bold text-sm mb-3" style={{ color: '#C9A84C' }}>
//             Contact
//           </p>
//           <div className="flex flex-col gap-1 text-white/50 text-sm">
//             <span>📞 0319 8429752</span>
//             <span>📍 71-A Jail Road, Lahore</span>
//             <span>🚚 Home Delivery Available</span>
//           </div>
//           <div className="flex gap-2 mt-4">
//             <a href="tel:03198429752" className="text-2xl" aria-label="Call">
//               📞
//             </a>
//             <a
//               href="https://wa.me/923198429752"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-2xl"
//               aria-label="WhatsApp"
//             >
//               💬
//             </a>
//           </div>
//         </div>
//       </div>
//       <div
//         className="border-t pt-4 text-center text-white/30 text-xs"
//         style={{ borderColor: '#2C1A0C' }}
//       >
//         © {new Date().getFullYear()} 4B Foods. All rights reserved.
//       </div>
//     </footer>
//   );
// }

// // ─── Main App ─────────────────────────────────────────────────────────────────
// let cartIdCounter = 0;

// export default function App() {
//   const [orderType, setOrderType] = useState<OrderType | null>(null);
//   const [orderModalOpen, setOrderModalOpen] = useState(true);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [productModal, setProductModal] = useState<Product | null>(null);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [search, setSearch] = useState('');
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const searchRef = useRef<HTMLInputElement | null>(null);
//   const sectionRefs = useRef<Record<string, IntersectionObserver>>({});

//   // IntersectionObserver for active category
//   useEffect(() => {
//     const observers: IntersectionObserver[] = [];
//     CATEGORIES.forEach((cat) => {
//       const el = document.getElementById(`section-${cat.slug}`);
//       if (!el) return;
//       const obs = new IntersectionObserver(
//         ([entry]) => {
//           if (entry.isIntersecting) setActiveCategory(cat.slug);
//         },
//         { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
//       );
//       obs.observe(el);
//       observers.push(obs);
//       sectionRefs.current[cat.slug] = obs;
//     });
//     return () => observers.forEach((o) => o.disconnect());
//   }, []);

//   const addToCart = (item: Omit<CartItem, 'id'>) => {
//     const id = `cart-${++cartIdCounter}`;
//     setCart((prev) => [...prev, { ...item, id }]);
//   };

//   const updateQty = (id: string, qty: number) => {
//     if (qty <= 0) {
//       setCart((prev) => prev.filter((i) => i.id !== id));
//     } else {
//       setCart((prev) =>
//         prev.map((i) => {
//           if (i.id !== id) return i;
//           const addonsTotal = i.selectedAddons.reduce((s, a) => s + a.price, 0);
//           return {
//             ...i,
//             quantity: qty,
//             itemTotal: (i.product.price + addonsTotal) * qty,
//           };
//         }),
//       );
//     }
//   };

//   const placeOrder = (_details: Record<string, string>): string => {
//     const num = `4B${Date.now().toString().slice(-6)}`;
//     setCart([]);
//     setCartOpen(false);
//     return num;
//   };

//   const filteredProducts = search.trim()
//     ? PRODUCTS.filter(
//         (p) =>
//           p.name.toLowerCase().includes(search.toLowerCase()) ||
//           CATEGORIES.find((c) => c.id === p.category)
//             ?.name.toLowerCase()
//             .includes(search.toLowerCase()),
//       )
//     : [];

//   const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

//   return (
//     <div
//       className="min-h-screen"
//       style={{ background: '#F9F5EF', color: '#1C0D04' }}
//     >
//       <AnnouncementBar />
//       <Header
//         orderType={orderType}
//         onOpenOrderModal={() => setOrderModalOpen(true)}
//         cartCount={cartCount}
//         onOpenCart={() => setCartOpen(true)}
//         onSearchFocus={() => {
//           document
//             .getElementById('menu-intro')
//             ?.scrollIntoView({ behavior: 'smooth' });
//           setTimeout(() => searchRef.current?.focus(), 400);
//         }}
//       />
//       <HeroCarousel />

//       <MenuIntro search={search} onSearch={setSearch} searchRef={searchRef} />

//       {/* Search results */}
//       {search.trim() ? (
//         <section className="max-w-7xl mx-auto px-4 pb-12">
//           <p className="text-sm text-gray-400 mb-4">
//             {filteredProducts.length} result
//             {filteredProducts.length !== 1 ? 's' : ''} for &ldquo;{search}
//             &rdquo;
//           </p>
//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {filteredProducts.map((p) => (
//                 <ProductCard
//                   key={p.id}
//                   product={p}
//                   onAddToCart={setProductModal}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 text-gray-400">
//               <div className="text-4xl mb-3">🔍</div>
//               <p className="font-semibold">No items found</p>
//             </div>
//           )}
//         </section>
//       ) : (
//         <>
//           <CategoryNav activeCategory={activeCategory} />
//           {/* Menu sections */}
//           <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-14">
//             {CATEGORIES.map((cat) => {
//               const products = PRODUCTS.filter((p) => p.category === cat.id);
//               return (
//                 <section key={cat.id} id={`section-${cat.slug}`}>
//                   <CategoryBanner categoryId={cat.id} name={cat.name} />
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {products.map((p) => (
//                       <ProductCard
//                         key={p.id}
//                         product={p}
//                         onAddToCart={setProductModal}
//                       />
//                     ))}
//                   </div>
//                 </section>
//               );
//             })}
//           </div>
//           <FeaturedSection onAddToCart={setProductModal} />
//         </>
//       )}

//       <ContactSection />
//       <Footer />

//       {/* Floating cart */}
//       <FloatingCartBar items={cart} onOpenCart={() => setCartOpen(true)} />

//       {/* Modals */}
//       <OrderModal
//         open={orderModalOpen}
//         onClose={() => setOrderModalOpen(false)}
//         orderType={orderType}
//         onSelect={setOrderType}
//       />
//       <ProductModal
//         product={productModal}
//         onClose={() => setProductModal(null)}
//         onConfirm={addToCart}
//       />
//       <CartDrawer
//         open={cartOpen}
//         onClose={() => setCartOpen(false)}
//         items={cart}
//         onUpdateQty={updateQty}
//         onRemove={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
//         onCheckout={() => {
//           setCartOpen(false);
//           setCheckoutOpen(true);
//         }}
//         orderType={orderType}
//       />
//       <CheckoutModal
//         open={checkoutOpen}
//         onClose={() => {
//           setCheckoutOpen(false);
//         }}
//         items={cart}
//         orderType={orderType}
//         onPlaceOrder={placeOrder}
//       />
//     </div>
//   );
// }

import { useState, useEffect, useRef, useCallback } from 'react';
import type { CartItem, OrderType, Product, Addon, Category } from './types';
import { createOrder, getMenuData } from './services/api';
import logoImg from './assets/logo.jpeg';
import donerKebabsImg from './assets/DonerKebabs.png';
import sandwichImg from './assets/Sandwich.png';
import wrapsImg from './assets/Wraps.png';
import donerBoxImg from './assets/DonerBox.png';
import riceBowlImg from './assets/RiceBowl.png';
import fattoushImg from './assets/Fattoush.png';
import hummusImg from './assets/Hummus.png';
import falafelImg from './assets/falafel.png';
import pideImg from './assets/Pide.png';
import kunafaImg from './assets/Kunafa.png';
import twoPersonPlatterImg from './assets/2person.png';
import fourPersonPlatterImg from './assets/4person.png';
import restaurantImg1 from './imports/Screenshot_2026-08-12_at_4.44.59_AM.png';
import restaurantImg2 from './imports/Screenshot_2026-08-12_at_4.45.08_AM.png';
import restaurantImg3 from './imports/Screenshot_2026-08-12_at_4.45.15_AM.png';
import restaurantImg4 from './imports/Screenshot_2026-08-12_at_4.45.24_AM.png';
import restaurantImg5 from './imports/Screenshot_2026-08-12_at_4.45.34_AM.png';
import restaurantImg6 from './imports/Screenshot_2026-08-12_at_4.45.44_AM.png';
import restaurantImg7 from './imports/Screenshot_2026-08-12_at_4.46.06_AM.png';

// ─── Pages & hash routing ─────────────────────────────────────────────────────
type PageName =
  | 'home'
  | 'about'
  | 'visit'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'confirmation';

const PAGE_NAMES: PageName[] = [
  'home',
  'about',
  'visit',
  'contact',
  'cart',
  'checkout',
  'confirmation',
];

function parseHash(): PageName {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return (PAGE_NAMES as string[]).includes(hash) ? (hash as PageName) : 'home';
}

// Restaurant info shared by About / Visit / Contact pages
const RESTAURANT_INFO = {
  name: '4B Foods',
  address: '71-A Jail Road, Lahore, Pakistan',
  phone: '0319 8429752',
  phoneHref: 'tel:03198429752',
  whatsapp: 'https://wa.me/923198429752',
  mapsUrl: 'https://maps.google.com/?q=71-A+Jail+Road+Lahore',
  mapsEmbed:
    'https://maps.google.com/maps?q=71-A%20Jail%20Road%2C%20Lahore%2C%20Pakistan&z=15&output=embed',
  hours: [
    { days: 'Monday – Thursday', time: '12:00 PM – 11:00 PM' },
    { days: 'Friday – Sunday', time: '12:00 PM – 12:00 AM' },
  ],
  deliveryAreas:
    'Jail Road, Gulberg, Shadman, Garden Town, Model Town & nearby areas',
};

// ─── Logo with white-background removed ──────────────────────────────────────
// border-radius so only the circular logo shows — white corners disappear.
function Logo({
  className = '',
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        background: '#1C0D04',
      }}
    >
      <img
        src={logoImg}
        alt="4B Foods"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}

// ─── Food image placeholders by category ─────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'doner-kebabs': '#7B3F00',
  'turkish-wraps': '#5C4A1E',
  'turkish-sandwiches': '#8B5E3C',
  'doner-box': '#6B3A2A',
  'doner-rice-bowls': '#4A6741',
  'fattoush-veggies': '#3D6B4F',
  hummus: '#B8860B',
  'turkish-kunafa': '#8B6914',
  falafel: '#8B3A62',
  'turkish-pide': '#7E4A12',
  ezme: '#5D4A2E',
  platters: '#6B3A2A',
};

const CATEGORY_IMAGES: Record<string, string> = {
  'doner-kebabs': donerKebabsImg,
  'turkish-wraps': wrapsImg,
  'turkish-sandwiches': sandwichImg,
  'doner-box': donerBoxImg,
  'doner-rice-bowls': riceBowlImg,
  'fattoush-veggies': fattoushImg,
  hummus: hummusImg,
  'turkish-kunafa': kunafaImg,
  falafel: falafelImg,
  'turkish-pide': pideImg,
  ezme: fattoushImg,
  platters: twoPersonPlatterImg || fourPersonPlatterImg,
};

function FoodPlaceholder({
  categoryId,
  name,
}: {
  categoryId: string;
  name: string;
}) {
  const color = CATEGORY_COLORS[categoryId] || '#7B3F00';
  const image = CATEGORY_IMAGES[categoryId];
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}cc, ${color}66)` }}
    >
      {image && (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      )}
      <div
        className="absolute inset-0 flex items-end justify-center p-2"
        style={{
          background:
            'linear-gradient(to top, rgba(28,13,4,0.55), transparent 65%)',
        }}
      >
        <span className="text-white/90 text-xs font-semibold text-center px-2 leading-tight">
          {name}
        </span>
      </div>
    </div>
  );
}

// ─── Announcement Bar ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div
      className="w-full text-center py-2 px-4 text-xs font-medium tracking-wide"
      style={{ background: '#1C0D04', color: '#C9A84C' }}
    >
      🚚 Home Delivery Available &nbsp;|&nbsp; 📞 Call 0319 8429752
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
const NAV_LINKS: Array<{ label: string; page: PageName }> = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Visit Us', page: 'visit' },
  { label: 'Contact Us', page: 'contact' },
];

function Header({
  orderType,
  onOpenOrderModal,
  cartCount,
  onOpenCart,
  onSearchFocus,
  currentPage,
  onNavigate,
}: {
  orderType: OrderType | null;
  onOpenOrderModal: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onSearchFocus: () => void;
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (page: PageName) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header
      className="sticky top-0 z-40 shadow-md"
      style={{ background: '#1C0D04' }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center gap-2 sm:gap-4">
        {/* Logo */}
        <button
          onClick={() => {
            goTo('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Logo size={52} />
          <span
            className="hidden sm:block font-bold text-lg leading-tight"
            style={{ color: '#C9A84C' }}
          >
            4B
            <br />
            <span className="text-xs font-normal text-white/70">Foods</span>
          </span>
        </button>

        {/* Order type toggle */}
        <div className="flex items-center gap-1 bg-black/30 rounded-full p-1 flex-shrink-0">
          {(['delivery', 'pickup'] as OrderType[]).map((t) => (
            <button
              key={t}
              onClick={onOpenOrderModal}
              className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all whitespace-nowrap"
              style={
                orderType === t
                  ? { background: '#C9A84C', color: '#1C0D04' }
                  : { color: '#C9A84C' }
              }
            >
              {t === 'delivery' ? 'Delivery' : 'Pick-up'}
            </button>
          ))}
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium flex-1">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => goTo(page)}
              className="hover:opacity-80 transition-opacity pb-0.5"
              style={{
                color: currentPage === page ? '#FFFFFF' : '#C9A84C',
                borderBottom:
                  currentPage === page
                    ? '2px solid #C9A84C'
                    : '2px solid transparent',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Spacer on mobile (nav hidden) */}
        <div className="flex-1 md:hidden" />

        {/* Location */}
        <button
          onClick={() => goTo('visit')}
          className="hidden lg:flex items-center gap-1 text-xs text-white/50 hover:text-white/80 transition-colors flex-shrink-0"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          71-A Jail Road, Lahore
        </button>

        {/* Search */}
        <button
          onClick={onSearchFocus}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          style={{ color: '#C9A84C' }}
          aria-label="Search"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
            />
          </svg>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          style={{ color: '#C9A84C' }}
          aria-label="Cart"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: '#C9A84C', color: '#1C0D04' }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          style={{ color: '#C9A84C' }}
          aria-label="Menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          className="md:hidden border-t"
          style={{ background: '#1C0D04', borderColor: '#2C1A0C' }}
        >
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => goTo(page)}
              className="block w-full text-left px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
              style={{
                color: currentPage === page ? '#FFFFFF' : '#C9A84C',
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({
  open,
  onClose,
  orderType,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  orderType: OrderType | null;
  onSelect: (t: OrderType) => void;
}) {
  const [selected, setSelected] = useState<OrderType>(orderType ?? 'delivery');

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
        <div className="flex justify-center mb-4">
          <Logo size={64} />
        </div>
        <h2
          className="text-xl font-bold text-center mb-1"
          style={{ color: '#1C0D04' }}
        >
          Welcome to 4B Foods
        </h2>
        <p className="text-sm text-center text-gray-500 mb-5">
          71-A Jail Road, Lahore
        </p>
        <p className="text-sm font-semibold text-center mb-4 text-gray-700">
          How would you like to receive your order?
        </p>
        <div className="flex gap-3 mb-6">
          {(['delivery', 'pickup'] as OrderType[]).map((t) => (
            <button
              key={t}
              onClick={() => setSelected(t)}
              className="flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all"
              style={
                selected === t
                  ? {
                      borderColor: '#C9A84C',
                      background: '#C9A84C',
                      color: '#1C0D04',
                    }
                  : { borderColor: '#e5e7eb', color: '#374151' }
              }
            >
              {t === 'delivery' ? '🚚 Delivery' : '🏃 Pick-up'}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            onSelect(selected);
            onClose();
          }}
          className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
          style={{ background: '#1C0D04', color: '#C9A84C' }}
        >
          Start Ordering
        </button>
      </div>
    </div>
  );
}

// ─── Hero Carousel ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    img: restaurantImg1,
    headline: 'Turkish Flavours',
    sub: 'The 4B Way',
    accent: 'Authentic Doner, Sandwich & More',
  },
  {
    img: restaurantImg2,
    headline: 'Discover Our Doner',
    sub: 'Slow-Roasted to Perfection',
    accent: 'Beef · Chicken · Mix',
  },
  {
    img: restaurantImg3,
    headline: 'Sandwich, Wraps & More',
    sub: 'Made Fresh Every Day',
    accent: '71-A Jail Road, Lahore',
  },
  {
    img: restaurantImg4,
    headline: 'Rice Bowls Done Right',
    sub: 'Hearty. Flavourful. Filling.',
    accent: 'Beef · Chicken · Mix Bowls',
  },
  {
    img: restaurantImg5,
    headline: 'Eat Well, Feel Good',
    sub: 'Dine In or Order Home',
    accent: 'Home Delivery Available',
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? next() : prev();
  };

  return (
    <div
      id="hero"
      className="relative w-full overflow-hidden select-none"
      style={{ height: 'clamp(280px, 50vw, 560px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={slide.img}
            alt={slide.headline}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(28,13,4,0.75) 0%, rgba(28,13,4,0.2) 60%, transparent 100%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#C9A84C' }}
            >
              {slide.accent}
            </p>
            <h1
              className="font-black text-white leading-tight mb-1"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            >
              {slide.headline}
            </h1>
            <p className="text-white/80 text-lg mb-6">{slide.sub}</p>
            <button
              onClick={() =>
                document
                  .getElementById('menu-intro')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="self-start px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: '#C9A84C', color: '#1C0D04' }}
            >
              Order Now
            </button>
          </div>
        </div>
      ))}

      {/* Arrows */}
      {[
        { onClick: prev, label: '◀', side: 'left-3' },
        { onClick: next, label: '▶', side: 'right-3' },
      ].map(({ onClick, label, side }) => (
        <button
          key={side}
          onClick={onClick}
          className={`absolute top-1/2 -translate-y-1/2 ${side} z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110`}
          style={{ background: 'rgba(201,168,76,0.85)', color: '#1C0D04' }}
          aria-label={label}
        >
          {label}
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 20 : 8,
              height: 8,
              background: i === current ? '#C9A84C' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Category Nav ─────────────────────────────────────────────────────────────
function CategoryNav({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (slug: string) => {
    document
      .getElementById(`section-${slug}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!activeCategory || !scrollRef.current) return;
    const btn = scrollRef.current.querySelector(
      `[data-slug="${activeCategory}"]`,
    ) as HTMLElement;
    if (btn)
      btn.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
        block: 'nearest',
      });
  }, [activeCategory]);

  return (
    <div
      className="sticky z-30 shadow-sm"
      style={{
        top: 64,
        background: '#F9F5EF',
        borderBottom: '1px solid #E8DDD0',
      }}
    >
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 py-3 max-w-7xl mx-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            data-slug={cat.slug}
            onClick={() => scrollTo(cat.slug)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
            style={
              activeCategory === cat.slug
                ? { background: '#C9A84C', color: '#1C0D04' }
                : { background: '#E8DDD0', color: '#5C4A1E' }
            }
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Menu Intro ───────────────────────────────────────────────────────────────
function MenuIntro({
  search,
  onSearch,
  searchRef,
}: {
  search: string;
  onSearch: (v: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <section
      id="menu-intro"
      className="py-10 px-4 text-center"
      style={{ background: '#F9F5EF' }}
    >
      <h2
        className="font-black text-3xl md:text-4xl mb-2"
        style={{ color: '#1C0D04' }}
      >
        What Are You Craving Today?
      </h2>
      <p className="text-gray-500 mb-6">
        Explore doner, wraps, sandwiches, rice bowls, kunafa, pide, ezme and
        platters.
      </p>
      <div className="max-w-md mx-auto relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
          />
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search menu items..."
          className="w-full pl-10 pr-4 py-3 rounded-full border-2 text-sm outline-none focus:border-amber-400 transition-colors"
          style={{
            borderColor: '#E8DDD0',
            background: 'white',
            color: '#1C0D04',
          }}
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </section>
  );
}

// ─── Category Banner ──────────────────────────────────────────────────────────
const BANNER_PHOTOS: Record<string, string> = CATEGORY_IMAGES;

function CategoryBanner({
  categoryId,
  name,
}: {
  categoryId: string;
  name: string;
}) {
  const photo = BANNER_PHOTOS[categoryId];
  return (
    <div
      className="w-full rounded-xl overflow-hidden relative mb-5"
      style={{ height: 'clamp(120px, 25vw, 180px)' }}
    >
      {photo ? (
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div
          className="w-full h-full"
          style={{ background: CATEGORY_COLORS[categoryId] }}
        />
      )}
      <div
        className="absolute inset-0 flex items-end p-3 sm:p-4"
        style={{
          background:
            'linear-gradient(to top, rgba(28,13,4,0.8) 0%, transparent 60%)',
        }}
      >
        <h3 className="text-white font-black text-lg sm:text-2xl">{name}</h3>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-40">
        <FoodPlaceholder categoryId={product.category} name={product.name} />
        {product.featured && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: '#C9A84C', color: '#1C0D04' }}
          >
            Featured
          </span>
        )}
        {product.popular && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
            Popular
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-sm mb-1" style={{ color: '#1C0D04' }}>
          {product.name}
        </h4>
        <p className="text-xs text-gray-500 flex-1 mb-3 leading-snug">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-black text-base" style={{ color: '#8B5E3C' }}>
            Rs. {product.price.toLocaleString()}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
            style={{ background: '#1C0D04', color: '#C9A84C' }}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Product Modal ────────────────────────────────────────────────────────────
function ProductModal({
  product,
  addons,
  onClose,
  onConfirm,
}: {
  product: Product | null;
  addons: Addon[];
  onClose: () => void;
  onConfirm: (item: Omit<CartItem, 'id'>) => void;
}) {
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (product) {
      setQty(1);
      setSelectedAddons([]);
      setInstructions('');
    }
  }, [product]);

  if (!product) return null;

  const availableAddons = addons.filter((a) => product.addons.includes(a.id));
  const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const itemTotal = (product.price + addonsTotal) * qty;

  const toggleAddon = (addon: Addon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon],
    );
  };

  const handleConfirm = () => {
    onConfirm({
      product,
      quantity: qty,
      selectedAddons,
      specialInstructions: instructions,
      itemTotal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-md max-h-[90vh] overflow-y-auto z-10">
        {/* Header image */}
        <div
          className="relative w-full"
          style={{ height: 'clamp(160px, 40vw, 192px)' }}
        >
          <FoodPlaceholder categoryId={product.category} name={product.name} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm hover:bg-black/70"
          >
            ✕
          </button>
        </div>
        <div className="p-3 sm:p-5">
          <h3
            className="font-black text-lg sm:text-xl mb-1"
            style={{ color: '#1C0D04' }}
          >
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            {product.description}
          </p>

          {/* Add-ons */}
          {availableAddons.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Add-ons
              </p>
              <div className="flex flex-col gap-2">
                {availableAddons.map((addon) => {
                  const checked = !!selectedAddons.find(
                    (a) => a.id === addon.id,
                  );
                  return (
                    <label
                      key={addon.id}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(addon)}
                          className="w-4 h-4 accent-amber-500"
                        />
                        <span className="text-sm text-gray-700">
                          {addon.name}
                        </span>
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: '#8B5E3C' }}
                      >
                        +Rs. {addon.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Special Instructions
            </p>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Any special requests?"
              rows={2}
              className="w-full border rounded-xl px-3 py-2 text-sm resize-none outline-none focus:border-amber-400"
              style={{ borderColor: '#E8DDD0' }}
            />
          </div>

          {/* Qty + total */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="flex items-center gap-3 border rounded-full px-3 py-1"
              style={{ borderColor: '#E8DDD0' }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-lg font-bold w-6 text-center"
                style={{ color: '#8B5E3C' }}
              >
                −
              </button>
              <span className="font-bold text-sm w-4 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="text-lg font-bold w-6 text-center"
                style={{ color: '#8B5E3C' }}
              >
                +
              </button>
            </div>
            <span
              className="font-black text-lg flex-1 text-right"
              style={{ color: '#1C0D04' }}
            >
              Rs. {itemTotal.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#1C0D04', color: '#C9A84C' }}
          >
            Add to Cart · Rs. {itemTotal.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Floating Cart Bar ────────────────────────────────────────────────────────
function FloatingCartBar({
  items,
  onOpenCart,
}: {
  items: CartItem[];
  onOpenCart: () => void;
}) {
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.itemTotal, 0);
  if (count === 0) return null;
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 px-2 sm:px-3 w-[calc(100%-16px)] max-w-xs">
      <button
        onClick={onOpenCart}
        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 rounded-full shadow-xl font-bold text-xs sm:text-sm transition-transform hover:scale-105 w-full"
        style={{ background: '#1C0D04', color: '#C9A84C' }}
      >
        <span
          className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-black flex-shrink-0"
          style={{ background: '#C9A84C', color: '#1C0D04' }}
        >
          {count}
        </span>
        <span className="flex-1 text-center truncate">View Cart</span>
        <span className="truncate">Rs. {total.toLocaleString()}</span>
      </button>
    </div>
  );
}

// ─── Checkout form field ──────────────────────────────────────────────────────
type CheckoutFormData = {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  pickupTime: string;
  instructions: string;
};

function CheckoutField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  type = 'text',
  placeholder = '',
}: {
  id: keyof CheckoutFormData;
  label: string;
  value: string;
  onChange: (id: keyof CheckoutFormData, value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-400 transition-colors"
        style={{ borderColor: error ? '#f87171' : '#E8DDD0' }}
      />
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

// ─── Featured Section ─────────────────────────────────────────────────────────
function FeaturedSection({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (p: Product) => void;
}) {
  const featured = products.filter((p) => p.featured || p.popular).slice(0, 6);
  return (
    <section
      id="featured"
      className="py-8 sm:py-12 px-3 sm:px-4"
      style={{ background: '#1C0D04' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="font-black text-xl sm:text-2xl md:text-3xl mb-1"
          style={{ color: '#C9A84C' }}
        >
          Customer Favourites
        </h2>
        <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6">
          Most loved dishes at 4B Foods
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-8 sm:py-14 px-3 sm:px-4"
      style={{ background: '#F9F5EF' }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
        <div>
          <Logo size={60} className="mb-3 sm:mb-5" />
          <h2
            className="font-black text-2xl sm:text-3xl mb-2"
            style={{ color: '#1C0D04' }}
          >
            4B Foods
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">
            🏠 71-A Jail Road, Lahore, Pakistan
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">
            📞 0319 8429752
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            🚚 Home Delivery Available
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            <a
              href="tel:03198429752"
              className="px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-opacity hover:opacity-80 text-center"
              style={{ background: '#1C0D04', color: '#C9A84C' }}
            >
              📞 Call Now
            </a>
            <a
              href="https://wa.me/923198429752"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-opacity hover:opacity-80 text-center"
              style={{ background: '#25D366', color: 'white' }}
            >
              💬 WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=71-A+Jail+Road+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full font-bold text-sm border-2 transition-colors hover:bg-gray-100"
              style={{ borderColor: '#E8DDD0', color: '#5C4A1E' }}
            >
              📍 Get Directions
            </a>
          </div>
        </div>
        {/* Map embed */}
        <div
          className="rounded-2xl overflow-hidden shadow-md"
          style={{ height: 280, background: '#E8DDD0' }}
        >
          <iframe
            title="4B Foods Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={RESTAURANT_INFO.mapsEmbed}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({
  categories,
  onNavigate,
  onNavigateCategory,
}: {
  categories: Category[];
  onNavigate: (page: PageName) => void;
  onNavigateCategory: (slug: string) => void;
}) {
  return (
    <footer className="px-4 pt-12 pb-6" style={{ background: '#1C0D04' }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Logo size={52} />
            <span className="font-black text-lg" style={{ color: '#C9A84C' }}>
              4B Foods
            </span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            Turkish Doner, Wraps, Sandwiches,
            <br />
            Rice Bowls, Kunafa, Pide & Platters.
            <br />
            71-A Jail Road, Lahore, Pakistan
          </p>
        </div>
        <div>
          <p className="font-bold text-sm mb-3" style={{ color: '#C9A84C' }}>
            Pages
          </p>
          <div className="flex flex-col gap-1">
            {[...NAV_LINKS, { label: 'Cart', page: 'cart' as PageName }].map(
              ({ label, page }) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className="text-left text-white/50 hover:text-white/80 text-sm transition-colors"
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>
        <div>
          <p className="font-bold text-sm mb-3" style={{ color: '#C9A84C' }}>
            Menu
          </p>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigateCategory(cat.slug)}
                className="text-left text-white/50 hover:text-white/80 text-sm transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-sm mb-3" style={{ color: '#C9A84C' }}>
            Contact
          </p>
          <div className="flex flex-col gap-1 text-white/50 text-sm">
            <span>📞 0319 8429752</span>
            <span>📍 71-A Jail Road, Lahore</span>
            <span>🚚 Home Delivery Available</span>
          </div>
          <div className="flex gap-2 mt-4">
            <a href="tel:03198429752" className="text-2xl" aria-label="Call">
              📞
            </a>
            <a
              href="https://wa.me/923198429752"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl"
              aria-label="WhatsApp"
            >
              💬
            </a>
          </div>
        </div>
      </div>
      <div
        className="border-t pt-4 text-center text-white/30 text-xs"
        style={{ borderColor: '#2C1A0C' }}
      >
        © {new Date().getFullYear()} 4B Foods. All rights reserved.
      </div>
    </footer>
  );
}

// ─── Page Hero (shared banner for inner pages) ───────────────────────────────
function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(160px, 40vw, 220px)', background: '#1C0D04' }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-40"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 sm:px-4">
        <h1
          className="font-black text-white mb-2"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)' }}
        >
          {title}
        </h1>
        <p
          className="text-xs sm:text-sm md:text-base font-medium px-2"
          style={{ color: '#C9A84C' }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ─── About Us Page ────────────────────────────────────────────────────────────
function AboutPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  const values = [
    {
      icon: '🔥',
      title: 'Authentic Recipes',
      text: 'Our doner is slow-roasted the traditional Turkish way — marinated overnight and carved fresh off the spit throughout the day.',
    },
    {
      icon: '🥬',
      title: 'Fresh Every Day',
      text: 'Vegetables are chopped every morning, bread is baked fresh, and our sauces are prepared in-house daily. Nothing sits overnight.',
    },
    {
      icon: '🥩',
      title: 'Quality Ingredients',
      text: 'We use 100% halal beef and chicken, premium pistachios and walnuts for our kunafa, and real cheese in every pide.',
    },
    {
      icon: '🤝',
      title: 'Honest Food, Fair Prices',
      text: 'Generous portions at prices that make authentic Turkish food an everyday meal, not a once-a-year treat.',
    },
  ];

  return (
    <div style={{ background: '#F9F5EF' }}>
      <PageHero
        title="About 4B Foods"
        subtitle="Authentic Turkish Flavours in the Heart of Lahore"
        image={restaurantImg6}
      />

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: '#8B5E3C' }}
            >
              Our Story
            </p>
            <h2
              className="font-black text-2xl md:text-3xl mb-4"
              style={{ color: '#1C0D04' }}
            >
              From Istanbul&rsquo;s Streets to Jail Road, Lahore
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              4B Foods was born from a simple craving — the taste of real
              Turkish doner, the kind you find sizzling on street corners in
              Istanbul, was nowhere to be found in Lahore. So we decided to
              bring it here ourselves.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We studied the craft the traditional way: the overnight marinade,
              the careful stacking of the spit, the slow vertical roast, and the
              thin, crisp-edged carving that makes doner what it is. Then we
              paired it with warm pita, fresh salads and our signature sauces
              made in-house every single day.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Today, from our kitchen at 71-A Jail Road, we serve doner kebabs,
              wraps, sandwiches, rice bowls, fattoush, hummus, falafel,
              freshly-baked pide and pistachio kunafa — every plate made to
              order, every day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img
              src={restaurantImg1}
              alt="4B Foods restaurant"
              className="rounded-2xl object-cover w-full h-44 shadow-md"
            />
            <img
              src={restaurantImg2}
              alt="4B Foods doner"
              className="rounded-2xl object-cover w-full h-44 shadow-md mt-6"
            />
            <img
              src={restaurantImg4}
              alt="4B Foods rice bowls"
              className="rounded-2xl object-cover w-full h-44 shadow-md"
            />
            <img
              src={restaurantImg5}
              alt="4B Foods dining"
              className="rounded-2xl object-cover w-full h-44 shadow-md mt-6"
            />
          </div>
        </div>

        {/* What makes us different */}
        <div className="text-center mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#8B5E3C' }}
          >
            What Makes 4B Different
          </p>
          <h2
            className="font-black text-2xl md:text-3xl"
            style={{ color: '#1C0D04' }}
          >
            The 4B Way
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: '#1C0D04' }}
              >
                {v.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Food philosophy */}
        <div
          className="rounded-2xl p-8 md:p-10 text-center"
          style={{ background: '#1C0D04' }}
        >
          <div className="flex justify-center mb-4">
            <Logo size={64} />
          </div>
          <p
            className="font-black text-xl md:text-2xl mb-3"
            style={{ color: '#C9A84C' }}
          >
            &ldquo;Good food doesn&rsquo;t need shortcuts.&rdquo;
          </p>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl mx-auto mb-6">
            That&rsquo;s our food philosophy. We would rather roast for hours
            than rush a spit, and chop salads twice a day than serve them
            wilted. If it isn&rsquo;t something we would proudly serve our own
            family, it doesn&rsquo;t leave our kitchen.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#C9A84C', color: '#1C0D04' }}
          >
            Explore Our Menu
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Visit Us Page ────────────────────────────────────────────────────────────
function VisitPage() {
  return (
    <div style={{ background: '#F9F5EF' }}>
      <PageHero
        title="Visit Us"
        subtitle="71-A Jail Road, Lahore — Dine In, Pick Up or Get It Delivered"
        image={restaurantImg3}
      />

      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-14">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-10">
          {/* Info column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Address */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3
                className="font-bold text-sm sm:text-base mb-2 flex items-center gap-2"
                style={{ color: '#1C0D04' }}
              >
                📍 Our Location
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                {RESTAURANT_INFO.address}
              </p>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-opacity hover:opacity-90"
                style={{ background: '#1C0D04', color: '#C9A84C' }}
              >
                🧭 Get Directions
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3
                className="font-bold text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-2"
                style={{ color: '#1C0D04' }}
              >
                🕐 Opening Hours
              </h3>
              <div className="flex flex-col gap-1 sm:gap-2">
                {RESTAURANT_INFO.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex justify-between text-xs sm:text-sm border-b pb-1 sm:pb-2 last:border-0"
                    style={{ borderColor: '#E8DDD0' }}
                  >
                    <span className="text-gray-500">{h.days}</span>
                    <span
                      className="font-semibold"
                      style={{ color: '#1C0D04' }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3
                className="font-bold text-sm sm:text-base mb-2 flex items-center gap-2"
                style={{ color: '#1C0D04' }}
              >
                📞 Call to Order
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Phone orders and table reservations are welcome.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="px-3 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-opacity hover:opacity-90 text-center"
                  style={{ background: '#1C0D04', color: '#C9A84C' }}
                >
                  📞 {RESTAURANT_INFO.phone}
                </a>
                <a
                  href={RESTAURANT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-opacity hover:opacity-90 text-center"
                  style={{ background: '#25D366', color: 'white' }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>

            {/* Delivery & pickup */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                <h3
                  className="font-bold text-sm sm:text-base mb-2"
                  style={{ color: '#1C0D04' }}
                >
                  🚚 Delivery Area
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We deliver to {RESTAURANT_INFO.deliveryAreas}. Delivery charge
                  Rs. 100 per order.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                <h3
                  className="font-bold text-sm sm:text-base mb-2"
                  style={{ color: '#1C0D04' }}
                >
                  🏃 Pick-Up
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Order online or by phone and pick up at the counter — your
                  food is usually ready in 15–20 minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Map column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div
              className="rounded-2xl overflow-hidden shadow-md flex-1"
              style={{
                minHeight: 'clamp(200px, 50vw, 320px)',
                background: '#E8DDD0',
              }}
            >
              <iframe
                title="4B Foods Location Map"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 'clamp(200px, 50vw, 320px)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={RESTAURANT_INFO.mapsEmbed}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {[restaurantImg1, restaurantImg5, restaurantImg7].map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`4B Foods restaurant photo ${i + 1}`}
                    className="rounded-xl object-cover w-full aspect-square shadow-sm"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Contact Us Page ──────────────────────────────────────────────────────────
function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleSend = () => {
    if (!name.trim() || !message.trim()) {
      setFormError('Please fill in your name and message.');
      return;
    }
    setFormError('');
    const text = [
      `*Inquiry — 4B Foods Website*`,
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : '',
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(
      `https://wa.me/923198429752?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div style={{ background: '#F9F5EF' }}>
      <PageHero
        title="Contact Us"
        subtitle="Questions, feedback or large orders — we would love to hear from you"
        image={restaurantImg2}
      />

      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <a
            href={RESTAURANT_INFO.phoneHref}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">📞</div>
            <h3
              className="font-bold text-base mb-1"
              style={{ color: '#1C0D04' }}
            >
              Call Us
            </h3>
            <p className="text-sm font-semibold" style={{ color: '#8B5E3C' }}>
              {RESTAURANT_INFO.phone}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Orders &amp; reservations
            </p>
          </a>
          <a
            href={RESTAURANT_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">💬</div>
            <h3
              className="font-bold text-base mb-1"
              style={{ color: '#1C0D04' }}
            >
              WhatsApp
            </h3>
            <p className="text-sm font-semibold" style={{ color: '#25D366' }}>
              0319 8429752
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Fastest way to reach us
            </p>
          </a>
          <a
            href={RESTAURANT_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">📍</div>
            <h3
              className="font-bold text-base mb-1"
              style={{ color: '#1C0D04' }}
            >
              Visit Us
            </h3>
            <p className="text-sm font-semibold" style={{ color: '#8B5E3C' }}>
              71-A Jail Road, Lahore
            </p>
            <p className="text-xs text-gray-400 mt-1">Dine in or pick up</p>
          </a>
        </div>

        {/* Contact form */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2
              className="font-black text-2xl mb-3"
              style={{ color: '#1C0D04' }}
            >
              Send Us a Message
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Have a question about the menu, want to place a bulk order for an
              event, or share feedback about your last visit? Fill in the form
              and it will reach us directly on WhatsApp.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              For urgent matters — like an order already on its way — please
              call us instead so we can help right away.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-400 transition-colors"
                style={{ borderColor: '#E8DDD0' }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03XX XXXXXXX"
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-400 transition-colors"
                style={{ borderColor: '#E8DDD0' }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows={4}
                className="w-full border rounded-xl px-3 py-2 text-sm resize-none outline-none focus:border-amber-400"
                style={{ borderColor: '#E8DDD0' }}
              />
            </div>
            {formError && <p className="text-red-400 text-xs">{formError}</p>}
            <button
              onClick={handleSend}
              className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: '#25D366', color: 'white' }}
            >
              📲 Send via WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────
function CartPage({
  items,
  orderType,
  onUpdateQty,
  onRemove,
  onNavigate,
  onOpenOrderModal,
}: {
  items: CartItem[];
  orderType: OrderType | null;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (page: PageName) => void;
  onOpenOrderModal: () => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.itemTotal, 0);
  const deliveryCharge = orderType === 'delivery' && subtotal > 0 ? 100 : 0;
  const total = subtotal + deliveryCharge;

  return (
    <div style={{ background: '#F9F5EF' }}>
      <PageHero
        title="Your Cart"
        subtitle="Review your order before checkout"
      />

      <section className="max-w-5xl mx-auto px-4 py-10">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🛒</div>
            <p className="font-bold text-lg mb-1" style={{ color: '#1C0D04' }}>
              Your cart is empty
            </p>
            <p className="text-sm mb-6">
              Head over to the menu and add something delicious.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: '#1C0D04', color: '#C9A84C' }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <FoodPlaceholder
                      categoryId={item.product.category}
                      name=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="font-bold text-sm"
                        style={{ color: '#1C0D04' }}
                      >
                        {item.product.name}
                      </p>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-400 hover:text-red-600 text-xs flex-shrink-0"
                        aria-label="Remove item"
                      >
                        ✕ Remove
                      </button>
                    </div>
                    {item.selectedAddons.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        + {item.selectedAddons.map((a) => a.name).join(', ')}
                      </p>
                    )}
                    {item.specialInstructions && (
                      <p className="text-xs text-gray-400 italic mt-0.5">
                        "{item.specialInstructions}"
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: '#E8DDD0', color: '#5C4A1E' }}
                      >
                        −
                      </button>
                      <span className="text-sm font-bold w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: '#E8DDD0', color: '#5C4A1E' }}
                      >
                        +
                      </button>
                      <span
                        className="ml-auto font-bold text-sm"
                        style={{ color: '#8B5E3C' }}
                      >
                        Rs. {item.itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => onNavigate('home')}
                className="self-start text-sm font-semibold mt-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8B5E3C' }}
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-5 shadow-sm lg:sticky lg:top-24">
              <h3
                className="font-bold text-base mb-4"
                style={{ color: '#1C0D04' }}
              >
                Order Summary
              </h3>
              <div
                className="flex items-center justify-between gap-2 p-3 rounded-xl mb-4"
                style={{ background: '#F9F5EF' }}
              >
                <div>
                  <p className="text-xs text-gray-400">Order type</p>
                  <p
                    className="font-semibold text-sm capitalize"
                    style={{ color: '#1C0D04' }}
                  >
                    {orderType === 'delivery'
                      ? '🚚 Delivery'
                      : orderType === 'pickup'
                        ? '🏃 Pick-up'
                        : 'Not selected'}
                  </p>
                </div>
                <button
                  onClick={onOpenOrderModal}
                  className="text-xs font-semibold underline"
                  style={{ color: '#8B5E3C' }}
                >
                  Change
                </button>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              {deliveryCharge > 0 && (
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Delivery</span>
                  <span>Rs. {deliveryCharge}</span>
                </div>
              )}
              <div
                className="flex justify-between font-black text-base border-t mt-2 pt-3 mb-4"
                style={{ borderColor: '#E8DDD0', color: '#1C0D04' }}
              >
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: '#C9A84C', color: '#1C0D04' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────────────
function CheckoutPage({
  items,
  orderType,
  onPlaceOrder,
  onNavigate,
}: {
  items: CartItem[];
  orderType: OrderType | null;
  onPlaceOrder: (details: CheckoutFormData) => Promise<void>;
  onNavigate: (page: PageName) => void;
}) {
  const [form, setForm] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    pickupTime: '',
    instructions: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const subtotal = items.reduce((s, i) => s + i.itemTotal, 0);
  const deliveryCharge = orderType === 'delivery' ? 100 : 0;
  const total = subtotal + deliveryCharge;

  const handleFieldChange = (id: keyof CheckoutFormData, value: string) => {
    setForm((f) => ({ ...f, [id]: value }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (orderType === 'delivery' && !form.address.trim())
      e.address = 'Address is required';
    if (orderType === 'pickup' && !form.pickupTime.trim())
      e.pickupTime = 'Pick-up time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || submitting) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await onPlaceOrder(form);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Could not place your order. Please try again.',
      );
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ background: '#F9F5EF' }}>
        <PageHero title="Checkout" subtitle="Almost there" />
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">🛒</div>
          <p className="font-bold text-lg mb-1" style={{ color: '#1C0D04' }}>
            Nothing to check out yet
          </p>
          <p className="text-sm mb-6">Add items from the menu first.</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#1C0D04', color: '#C9A84C' }}
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F9F5EF' }}>
      <PageHero
        title="Checkout"
        subtitle="Enter your details and confirm your order"
      />

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div
              className="flex gap-3 p-3 rounded-xl"
              style={{ background: '#F9F5EF' }}
            >
              <div>
                <p className="text-xs text-gray-400">Order type</p>
                <p
                  className="font-semibold text-sm capitalize"
                  style={{ color: '#1C0D04' }}
                >
                  {orderType === 'delivery' ? '🚚 Delivery' : '🏃 Pick-up'}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="font-black text-sm" style={{ color: '#8B5E3C' }}>
                  Rs. {total.toLocaleString()}
                </p>
              </div>
            </div>

            <CheckoutField
              id="name"
              label="Full Name"
              value={form.name}
              onChange={handleFieldChange}
              error={errors.name}
              required
              placeholder="Your name"
            />
            <CheckoutField
              id="phone"
              label="Phone Number"
              value={form.phone}
              onChange={handleFieldChange}
              error={errors.phone}
              required
              type="tel"
              placeholder="03XX XXXXXXX"
            />
            {orderType === 'delivery' ? (
              <>
                <CheckoutField
                  id="address"
                  label="Complete Address"
                  value={form.address}
                  onChange={handleFieldChange}
                  error={errors.address}
                  required
                  placeholder="House / Street / Area"
                />
                <CheckoutField
                  id="landmark"
                  label="Nearby Landmark"
                  value={form.landmark}
                  onChange={handleFieldChange}
                  error={errors.landmark}
                  placeholder="Near mosque, school…"
                />
              </>
            ) : (
              <CheckoutField
                id="pickupTime"
                label="Preferred Pick-up Time"
                value={form.pickupTime}
                onChange={handleFieldChange}
                error={errors.pickupTime}
                required
                placeholder="e.g. 7:30 PM"
              />
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Special Instructions
              </label>
              <textarea
                value={form.instructions}
                onChange={(e) =>
                  setForm((f) => ({ ...f, instructions: e.target.value }))
                }
                placeholder="Any notes for the restaurant?"
                rows={2}
                className="w-full border rounded-xl px-3 py-2 text-sm resize-none outline-none focus:border-amber-400"
                style={{ borderColor: '#E8DDD0' }}
              />
            </div>

            {submitError && (
              <p className="text-sm text-red-500 text-center">{submitError}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#1C0D04', color: '#C9A84C' }}
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl p-5 shadow-sm lg:sticky lg:top-24">
            <h3
              className="font-bold text-base mb-3"
              style={{ color: '#1C0D04' }}
            >
              Order Summary
            </h3>
            <div className="flex flex-col gap-1 mb-2">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {i.product.name} ×{i.quantity}
                  </span>
                  <span className="font-semibold" style={{ color: '#1C0D04' }}>
                    Rs. {i.itemTotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="flex justify-between text-sm text-gray-500 border-t pt-2 mb-1"
              style={{ borderColor: '#E8DDD0' }}
            >
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            {deliveryCharge > 0 && (
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Delivery</span>
                <span>Rs. {deliveryCharge}</span>
              </div>
            )}
            <div
              className="flex justify-between font-black text-base border-t mt-2 pt-2 mb-4"
              style={{ borderColor: '#E8DDD0', color: '#1C0D04' }}
            >
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => onNavigate('cart')}
              className="w-full py-2 rounded-xl font-semibold text-sm border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E8DDD0', color: '#5C4A1E' }}
            >
              ← Back to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Order Confirmation Page ──────────────────────────────────────────────────
type PlacedOrder = {
  orderNumber: string;
  orderType: OrderType;
  details: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
};

function ConfirmationPage({
  order,
  onNavigate,
}: {
  order: PlacedOrder | null;
  onNavigate: (page: PageName) => void;
}) {
  if (!order) {
    return (
      <div style={{ background: '#F9F5EF' }}>
        <PageHero title="Order Confirmation" subtitle="4B Foods" />
        <div className="text-center py-20 text-gray-400">
          <p className="font-bold text-lg mb-4" style={{ color: '#1C0D04' }}>
            No recent order found
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#1C0D04', color: '#C9A84C' }}
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const whatsappMessage = () => {
    const lines = [
      `*Order #${order.orderNumber} — 4B Foods*`,
      `Type: ${order.orderType === 'delivery' ? 'Delivery' : 'Pick-up'}`,
      `Name: ${order.details.name}`,
      `Phone: ${order.details.phone}`,
      order.orderType === 'delivery'
        ? `Address: ${order.details.address}`
        : `Pick-up Time: ${order.details.pickupTime}`,
      '',
      '*Items:*',
      ...order.items.map(
        (i) =>
          `• ${i.product.name} x${i.quantity} — Rs. ${i.itemTotal.toLocaleString()}`,
      ),
      '',
      `Subtotal: Rs. ${order.subtotal.toLocaleString()}`,
      order.deliveryCharge ? `Delivery: Rs. ${order.deliveryCharge}` : '',
      `*Total: Rs. ${order.total.toLocaleString()}*`,
    ]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/923198429752?text=${encodeURIComponent(lines)}`;
  };

  return (
    <div style={{ background: '#F9F5EF' }}>
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-black text-3xl mb-2" style={{ color: '#1C0D04' }}>
            Order Received!
          </h1>
          <p className="text-gray-500 mb-1 text-sm">
            Your order has been received and is awaiting restaurant
            confirmation. We will call you shortly to confirm.
          </p>
          <div
            className="my-6 py-3 px-6 rounded-xl inline-block"
            style={{ background: '#F9F5EF' }}
          >
            <p className="text-xs text-gray-400">Order Number</p>
            <p className="font-black text-2xl" style={{ color: '#C9A84C' }}>
              #{order.orderNumber}
            </p>
          </div>

          <div className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">{order.details.name}</span> ·{' '}
            {order.details.phone}
          </div>
          <div className="text-xs text-gray-400 mb-6">
            {order.orderType === 'delivery'
              ? `🚚 Delivery to ${order.details.address}`
              : `🏃 Pick-up at ${order.details.pickupTime || 'the counter'} — 71-A Jail Road, Lahore`}
          </div>

          {/* Items recap */}
          <div
            className="rounded-xl p-4 text-left mb-6"
            style={{ background: '#F9F5EF' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Your Order
            </p>
            {order.items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  {i.product.name} ×{i.quantity}
                </span>
                <span className="font-semibold" style={{ color: '#1C0D04' }}>
                  Rs. {i.itemTotal.toLocaleString()}
                </span>
              </div>
            ))}
            {order.deliveryCharge > 0 && (
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Delivery</span>
                <span>Rs. {order.deliveryCharge}</span>
              </div>
            )}
            <div
              className="border-t mt-2 pt-2 flex justify-between font-black text-base"
              style={{ borderColor: '#E8DDD0', color: '#1C0D04' }}
            >
              <span>Total</span>
              <span>Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <a
              href={whatsappMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-bold text-sm text-center block transition-opacity hover:opacity-90"
              style={{ background: '#25D366', color: 'white' }}
            >
              📲 Send Summary on WhatsApp
            </a>
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-3 rounded-xl font-bold text-sm border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: '#E8DDD0', color: '#5C4A1E' }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
let cartIdCounter = 0;

export default function App() {
  const [page, setPage] = useState<PageName>(() => parseHash());
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(true);
  const [productModal, setProductModal] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const sectionRefs = useRef<Record<string, IntersectionObserver>>({});

  // Hash-based routing: #/about, #/visit, #/contact, #/cart, #/checkout, …
  const navigate = useCallback((next: PageName) => {
    window.location.hash = next === 'home' ? '/' : `/${next}`;
    // Set state directly too so the page switches in the same render batch
    // (hashchange fires asynchronously).
    setPage(next);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setPage(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToCategory = useCallback(
    (slug: string) => {
      navigate('home');
      setTimeout(() => {
        document
          .getElementById(`section-${slug}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    },
    [navigate],
  );

  const focusMenuSearch = useCallback(() => {
    navigate('home');
    setTimeout(() => {
      document
        .getElementById('menu-intro')
        ?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => searchRef.current?.focus(), 400);
    }, 150);
  }, [navigate]);

  // Load customer-facing menu from the existing Node/Express API.
  useEffect(() => {
    let cancelled = false;

    const loadMenu = async () => {
      try {
        setMenuLoading(true);
        setMenuError('');

        const data = await getMenuData();
        if (cancelled) return;

        setCategories(data.categories);
        setProducts(data.products);
        setAddons(data.addons);
      } catch (error) {
        if (cancelled) return;
        setMenuError(
          error instanceof Error ? error.message : 'Could not load the menu.',
        );
      } finally {
        if (!cancelled) setMenuLoading(false);
      }
    };

    void loadMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  // IntersectionObserver for active category (menu sections exist on home only)
  useEffect(() => {
    if (page !== 'home') return;
    const observers: IntersectionObserver[] = [];
    categories.forEach((cat) => {
      const el = document.getElementById(`section-${cat.slug}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(cat.slug);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
      sectionRefs.current[cat.slug] = obs;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories, page]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `cart-${++cartIdCounter}`;
    setCart((prev) => [...prev, { ...item, id }]);
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => {
          if (i.id !== id) return i;
          const addonsTotal = i.selectedAddons.reduce((s, a) => s + a.price, 0);
          return {
            ...i,
            quantity: qty,
            itemTotal: (i.product.price + addonsTotal) * qty,
          };
        }),
      );
    }
  };

  const placeOrder = async (details: CheckoutFormData): Promise<void> => {
    if (!orderType) {
      throw new Error('Please select delivery or pick-up first.');
    }

    const result = await createOrder({
      orderType,
      customerName: details.name,
      phone: details.phone,
      address: details.address || undefined,
      landmark: details.landmark || undefined,
      pickupTime: details.pickupTime || undefined,
      specialInstructions: details.instructions || undefined,
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedAddonIds: item.selectedAddons.map((addon) => addon.id),
        specialInstructions: item.specialInstructions || undefined,
      })),
    });

    const subtotal = cart.reduce((s, i) => s + i.itemTotal, 0);
    const deliveryCharge = orderType === 'delivery' ? 100 : 0;
    setLastOrder({
      orderNumber: result.orderNumber,
      orderType,
      details,
      items: cart.map((item) => ({ ...item })),
      subtotal,
      deliveryCharge,
      total: subtotal + deliveryCharge,
    });
    setCart([]);
    navigate('confirmation');
  };

  const filteredProducts = search.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          categories
            .find((c) => c.id === p.category)
            ?.name.toLowerCase()
            .includes(search.toLowerCase()),
      )
    : [];

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      className="min-h-screen"
      style={{ background: '#F9F5EF', color: '#1C0D04' }}
    >
      <AnnouncementBar />
      <Header
        orderType={orderType}
        onOpenOrderModal={() => setOrderModalOpen(true)}
        cartCount={cartCount}
        onOpenCart={() => navigate('cart')}
        onSearchFocus={focusMenuSearch}
        currentPage={page}
        onNavigate={navigate}
      />

      {page === 'home' && (
        <>
          <HeroCarousel />

          <MenuIntro
            search={search}
            onSearch={setSearch}
            searchRef={searchRef}
          />

          {/* Menu loading/error state */}
          {menuLoading && (
            <section className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500">
              Loading menu…
            </section>
          )}

          {menuError && (
            <section className="max-w-7xl mx-auto px-4 py-10 text-center">
              <p className="text-red-500 font-semibold">{menuError}</p>
              <p className="text-sm text-gray-500 mt-1">
                Make sure the backend is running on port 5000.
              </p>
            </section>
          )}

          {/* Search results */}
          {!menuLoading &&
            !menuError &&
            (search.trim() ? (
              <section className="max-w-7xl mx-auto px-4 pb-12">
                <p className="text-sm text-gray-400 mb-4">
                  {filteredProducts.length} result
                  {filteredProducts.length !== 1 ? 's' : ''} for &ldquo;{search}
                  &rdquo;
                </p>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onAddToCart={setProductModal}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="font-semibold">No items found</p>
                  </div>
                )}
              </section>
            ) : (
              <>
                <CategoryNav
                  categories={categories}
                  activeCategory={activeCategory}
                />
                {/* Menu sections */}
                <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-14">
                  {categories.map((cat) => {
                    const categoryProducts = products.filter(
                      (p) => p.category === cat.id,
                    );
                    return (
                      <section key={cat.id} id={`section-${cat.slug}`}>
                        <CategoryBanner categoryId={cat.id} name={cat.name} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                          {categoryProducts.map((p) => (
                            <ProductCard
                              key={p.id}
                              product={p}
                              onAddToCart={setProductModal}
                            />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
                <FeaturedSection
                  products={products}
                  onAddToCart={setProductModal}
                />
              </>
            ))}

          <ContactSection />
        </>
      )}

      {page === 'about' && <AboutPage onNavigate={navigate} />}
      {page === 'visit' && <VisitPage />}
      {page === 'contact' && <ContactPage />}
      {page === 'cart' && (
        <CartPage
          items={cart}
          orderType={orderType}
          onUpdateQty={updateQty}
          onRemove={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
          onNavigate={navigate}
          onOpenOrderModal={() => setOrderModalOpen(true)}
        />
      )}
      {page === 'checkout' && (
        <CheckoutPage
          items={cart}
          orderType={orderType}
          onPlaceOrder={placeOrder}
          onNavigate={navigate}
        />
      )}
      {page === 'confirmation' && (
        <ConfirmationPage order={lastOrder} onNavigate={navigate} />
      )}

      <Footer
        categories={categories}
        onNavigate={navigate}
        onNavigateCategory={navigateToCategory}
      />

      {/* Floating cart */}
      {page !== 'cart' && page !== 'checkout' && page !== 'confirmation' && (
        <FloatingCartBar items={cart} onOpenCart={() => navigate('cart')} />
      )}

      {/* Modals */}
      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        orderType={orderType}
        onSelect={setOrderType}
      />
      <ProductModal
        product={productModal}
        addons={addons}
        onClose={() => setProductModal(null)}
        onConfirm={addToCart}
      />
    </div>
  );
}
