# 4B Foods App.tsx — Comprehensive Responsive Design Analysis

## Overview

The App.tsx contains **23 component functions** spanning home, product browsing, cart, checkout, and info pages. Analysis reveals **moderate responsive issues** that will cause layout breaks and horizontal overflow on mobile devices (320px–480px).

---

## 1. COMPONENT FUNCTIONS & RESPONSIVE ISSUES

### ✅ 1. **Logo**

**Lines:** ~2030–2049
**Status:** ✓ RESPONSIVE

- Uses dynamic `size` prop (default 48px)
- Inline styles scale with prop
- No issues at mobile widths

---

### ⚠️ 2. **AnnouncementBar**

**Lines:** ~2069–2077
**Status:** ✓ RESPONSIVE

- `w-full text-center py-2 px-4 text-xs`
- Will wrap emoji/text at very narrow widths
- **Issue:** Text won't wrap; may overflow at <320px
- **Fix:** Add responsive font sizing: `text-xs sm:text-sm`

---

### ⚠️ 3. **Header**

**Lines:** ~2088–2302
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

- **Line 2149:** `h-16` fixed height (64px) — OK for sticky header
- **Line 2150:** `gap-4` — reasonable padding
- **Line 2205–2215:** Hidden nav with `hidden md:flex` — GOOD mobile handling
- **Line 2305–2318:** Mobile menu toggle properly implemented

**Responsive Issues:**

1. **Logo text sizing:** `text-lg` on `sm:block` hidden on mobile — GOOD
2. **Cart/search buttons:** Fixed `w-9 h-9` — works but tight at 320px
3. **Order type toggle:** `gap-1 p-1` buttons at `px-3 py-1 text-xs` — text may truncate
4. **Location button:** Hidden on `lg:` only — OK
5. **Navigation links:** `gap-5 text-sm` at desktop — no responsive sizing

**Recommended Fixes:**

- Add `sm:gap-6` to nav gap spacing
- Reduce button padding at mobile: `px-2 py-0.5` on mobile, `px-3 py-1` on sm+

---

### ✅ 4. **OrderModal**

**Lines:** ~2330–2383
**Status:** ✓ RESPONSIVE

- `max-w-sm p-6` with `w-full` — scales to screen width
- `gap-3` buttons with `flex-1` — responsive width
- Modal padding adjusts well
- No fixed widths that break mobile

---

### ⚠️ 5. **HeroCarousel**

**Lines:** ~2449–2525
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 2460:** `height: 'clamp(280px, 50vw, 560px)'` — RESPONSIVE ✓
2. **Line 2484:** Padding `px-8 md:px-16 lg:px-24` — RESPONSIVE ✓
3. **Line 2486:** Font size `fontSize: 'clamp(1.75rem, 4vw, 3.5rem)'` — RESPONSIVE ✓

**Responsive Issues:**

1. **Line 2506–2513:** Arrow buttons `w-9 h-9` at `left-3 right-3` — TOO CLOSE at 320px
   - Buttons will overlap carousel slide area at mobile
2. **Line 2485–2488:** Hero text subheading `text-white/80 text-lg mb-6` — no responsive sizing
   - `text-lg` is too large at 320px mobile

**Recommended Fixes:**

```tailwind
/* Arrow positioning */
-left-1 md:left-3 -right-1 md:right-3  /* Move further out of bounds on mobile */

/* Hero subheading */
text-sm md:text-lg
```

---

### ⚠️ 6. **CategoryNav**

**Lines:** ~2553–2611
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 2576:** `sticky top-64` uses pixel value (should be 64px header) — OK
2. **Line 2577–2578:** `gap-2 overflow-x-auto px-4 py-3 max-w-7xl` — GOOD for mobile scrolling
3. **Line 2590:** `flex-shrink-0 px-4 py-2 rounded-full text-sm` — buttons won't wrap

**Responsive Issues:**

1. **Line 2583:** `top: 64` hardcoded pixel value (should respond to header changes)
2. **Line 2577:** `max-w-7xl` centers content but doesn't account for mobile nav height changes
3. **Padding:** `px-4 py-3` OK but `px-4` is 1rem — tight at 320px

**Recommended Fixes:**

```javascript
// Dynamic top value based on header height
style={{
  top: 'var(--header-height, 64px)',  // Use CSS variable
  background: '#F9F5EF',
  borderBottom: '1px solid #E8DDD0',
}}

// Add responsive padding
className="flex gap-2 overflow-x-auto px-2 sm:px-4 py-2 sm:py-3 max-w-7xl mx-auto"
```

---

### ✅ 7. **MenuIntro**

**Lines:** ~2623–2670
**Status:** ✓ RESPONSIVE

- `py-10 px-4 text-center` — responsive
- `max-w-md mx-auto` — centers well at all widths
- Search input with `w-full` — scales correctly
- No fixed widths that break mobile

---

### ⚠️ 8. **FoodPlaceholder**

**Lines:** ~1987–2026
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Issue:**

- Relies on parent container for sizing via `w-full h-full`
- No intrinsic responsive behavior
- When parent has fixed height, placeholder breaks aspect ratio

**Parent Issues (see ProductCard):**

---

### ⚠️ 9. **CategoryBanner**

**Lines:** ~2705–2737
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 2713:** `style={{ height: 180 }}` — **HARDCODED PIXEL HEIGHT** ❌
   - Will look wrong at mobile (too tall for 320px width)
   - Breaks aspect ratio expectations

**Responsive Issues:**

1. No responsive height scaling
2. Title `text-2xl` might overflow at mobile widths with responsive padding loss

**Recommended Fix:**

```javascript
// Replace fixed 180px with responsive clamp
style={{
  height: 'clamp(140px, 35vw, 180px)',  // Scales down on mobile
  background: CATEGORY_COLORS[categoryId]
}}

// Add responsive heading size
<h3 className="text-white font-black text-lg sm:text-2xl">
```

---

### ⚠️ 10. **ProductCard**

**Lines:** ~2754–2799
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 2758:** `h-40` — 160px fixed height
   - OK for grid, but consider aspect ratio at mobile
2. **Line 2764–2767:** Badges `absolute top-2 left-2` — positioned correctly
3. **Line 2769:** `p-4` padding — 1rem OK at mobile
4. **Line 2771:** `text-sm` — reasonable
5. **Line 2776:** `text-xs` — readable but tight

**Responsive Issues:**

1. **Grid layout issues** — see line 4688 in App main render:
   - `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
   - At 320px: 2 columns × gap-4 = `2 × (160px/2 - 8px) = ~152px` per column
   - **TOO WIDE** — with 16px gap each side = ~120px card width
   - Card padding `p-4 = 1rem` on both sides leaves only ~88px for image/text
   - Image `h-40 = 160px` is taller than the card width!

**Recommended Fix:**

```tailwind
/* ProductCard container */
grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4

/* ProductCard internals */
div className="relative h-24 sm:h-32 md:h-40"  /* Responsive image height */
div className="p-3 sm:p-4 flex flex-col flex-1"
h4 className="font-bold text-xs sm:text-sm"
p className="text-xs"
span className="font-black text-sm sm:text-base"
button className="text-xs"
```

---

### ⚠️ 11. **ProductModal**

**Lines:** ~2833–2980
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 2841:** `sm:max-w-md max-h-[90vh]` — responsive width ✓
2. **Line 2845:** `h-48` image height — 192px at all sizes

**Responsive Issues:**

1. **Line 2845:** `h-48` fixed height (192px) — TOO LARGE at 320px mobile
   - On iPhone SE (375px): 192px header leaves only 183px for content
   - Max 90vh may not help enough
   - Squeezes form fields below image

2. **Line 2859:** `text-xl` heading — OK
3. **Line 2861:** `text-sm` description — OK
4. **Line 2877–2891:** Addon checkboxes `flex items-center justify-between` — may wrap text at 320px
5. **Line 2898:** Textarea `rows={2}` — OK
6. **Line 2913–2934:** Quantity controls `w-6 h-6` buttons — tight spacing at mobile

**Recommended Fixes:**

```javascript
// Image height responsive
<div className="relative h-32 sm:h-40 md:h-48 w-full">

// Heading responsive
<h3 className="font-black text-lg sm:text-xl mb-1">

// Addon label wrapping
<label key={addon.id}
  className="flex items-start justify-between cursor-pointer gap-2"
>

// Quantity controls
<div className="flex items-center gap-2 border rounded-full px-2 py-1">
  <button className="text-lg font-bold w-5 text-center">−</button>
  <span className="font-bold text-xs w-3 text-center">{qty}</span>
  <button className="text-lg font-bold w-5 text-center">+</button>
</div>
```

---

### ⚠️ 12. **FloatingCartBar**

**Lines:** ~2990–3018
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 3003:** `minWidth: 220` — **HARDCODED WIDTH** ❌
   - At 320px: 220px = 68% of viewport width
   - Leaves only 50px for padding on `px-3` each side = 34px total
   - **CAUSES HORIZONTAL OVERFLOW**

2. **Line 3002:** `gap-3` — OK but tight at 320px
3. **Line 3005–3013:** Text + count badge — layout breaks at narrow widths

**Responsive Issues:**

1. **Line 3003:** `minWidth: 220` overrides `w-full` on mobile
2. **Line 3010:** Count badge `w-7 h-7` — tight spacing
3. **Line 3011:** "View Cart" text truncates at 320px

**Recommended Fix:**

```javascript
style={{
  background: '#1C0D04',
  color: '#C9A84C',
  minWidth: 'min(220px, calc(100vw - 3rem))'  /* Responsive, accounts for padding */
}}

/* Responsive text */
<span className="flex-1 text-center text-xs sm:text-sm">View Cart</span>
<span className="text-xs sm:text-sm">Rs. {total.toLocaleString()}</span>
```

---

### ✅ 13. **CheckoutField**

**Lines:** ~3037–3065
**Status:** ✓ RESPONSIVE

- `w-full border rounded-xl px-3 py-2 text-sm` — scales correctly
- Label `text-xs font-semibold` — readable
- Error message responsive
- No fixed widths

---

### ⚠️ 14. **FeaturedSection**

**Lines:** ~3074–3099
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 3091:** Grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4`
   - Same issue as ProductCard grid (see #10)
   - At 320px: 6 columns attempted but breakpoint doesn't break to 2 until mobile
   - **Actually uses `grid-cols-2` at mobile — OK**

2. **Line 3087–3089:** Heading `text-2xl md:text-3xl` — responsive ✓
3. **Line 3090:** Subtitle `text-sm` — OK

**Status:** Actually GOOD, ProductCard grid is inherited

---

### ⚠️ 15. **ContactSection** (Legacy)

**Lines:** ~3108–3179
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 3113:** `grid md:grid-cols-2 gap-10` — responsive ✓
2. **Line 3122:** `font-black text-3xl` — might be too large at mobile 320px
3. **Line 3141:** Map `style={{ height: 280 }}` — **HARDCODED HEIGHT** ❌
   - 280px tall at all sizes
   - At 320px height phone: 280px = most of the screen
   - Makes page very long

**Responsive Issues:**

1. **Line 3141:** `height: 280` — should be responsive
2. **Line 3122:** Heading `text-3xl` — should scale down to `text-xl` on mobile
3. **Line 3127–3140:** Button group `flex flex-wrap gap-3` — OK but buttons may wrap at 320px

**Recommended Fixes:**

```javascript
// Map height responsive
style={{
  height: 'clamp(200px, 50vh, 280px)',  // Scales down on mobile
  background: '#E8DDD0'
}}

// Heading responsive
<h2 className="font-black text-2xl sm:text-3xl">

// Button responsive
<a className="px-3 sm:px-5 py-2 text-xs sm:text-sm">
```

---

### ✅ 16. **Footer**

**Lines:** ~3194–3240
**Status:** ✓ RESPONSIVE

- `grid md:grid-cols-4 gap-8` — stacks on mobile ✓
- `px-4 pt-12 pb-6` — responsive padding
- Links are text-sm — readable
- Emoji icons scale fine

---

### ⚠️ 17. **PageHero** (Inner pages)

**Lines:** ~3249–3273
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 3253:** `style={{ height: 220 }}` — **HARDCODED PIXEL HEIGHT** ❌
   - 220px at all screen sizes
   - At 320px device: significant screen real estate
   - No responsive scaling

2. **Line 3256:** Heading `fontSize: 'clamp(1.75rem, 4vw, 2.75rem)'` — RESPONSIVE ✓
3. **Line 3263:** Subtitle `text-sm md:text-base` — responsive ✓

**Responsive Issues:**

1. **Line 3253:** Fixed 220px height
2. **Background image opacity:** `opacity-40` — OK
3. **Text centering:** `text-center px-4` — OK

**Recommended Fix:**

```javascript
style={{
  height: 'clamp(160px, 40vw, 220px)',  // Responsive height
  background: '#1C0D04'
}}
```

---

### ⚠️ 18. **AboutPage**

**Lines:** ~3292–3505
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 3330:** `max-w-4xl` with `grid md:grid-cols-2 gap-10` — responsive ✓
2. **Line 3370:** Values grid `grid sm:grid-cols-2 gap-4` — responsive ✓
3. **Line 3399:** Philosophy quote box `p-8 md:p-10` — responsive padding ✓
4. **Line 3376:** Image sizes `h-44` — hardcoded but consistent

**Responsive Issues:**

1. **Line 3353–3366:** Image gallery grid:

   ```jsx
   <div className="grid grid-cols-2 gap-3">
     <img className="rounded-2xl object-cover w-full h-44 shadow-md" />
   ```

   - Grid cols are fixed to 2 at all sizes (no breakpoint)
   - `h-44` (176px) fixed height at all sizes
   - Works at desktop but images square at mobile

2. **Line 3334:** Heading `text-2xl md:text-3xl` — could go smaller at 320px
3. **Line 3379:** Section heading `text-2xl md:text-3xl` — same issue

**Recommended Fixes:**

```javascript
/* Image gallery */
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
  <img
    className="rounded-2xl object-cover w-full h-32 sm:h-44 shadow-md"
  />
</div>

/* Headings */
<h2 className="font-black text-xl sm:text-2xl md:text-3xl">

/* Values grid */
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
```

---

### ⚠️ 19. **VisitPage**

**Lines:** ~3517–3651
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 3527:** `grid lg:grid-cols-2 gap-8` — responsive ✓
2. **Line 3625:** Map container `style={{ minHeight: 320 }}` — min height OK
3. **Line 3562–3628:** Info cards `rounded-2xl p-6 shadow-sm` — responsive padding ✓

**Responsive Issues:**

1. **Line 3625:** Map `minHeight: 320` — too tall at mobile
   - On 320px device: 320px = almost full screen for map alone
   - Makes page very long

2. **Line 3635–3639:** Image gallery at bottom:
   ```jsx
   <div className="grid grid-cols-3 gap-3">
     <img className="rounded-xl object-cover w-full h-40 shadow-sm" />
   ```

   - `grid-cols-3` fixed at all sizes
   - `h-40` (160px) fixed at all sizes
   - At 320px: 3 cols = 106px each - 3px gap = ~101px wide, but 160px tall!
   - **IMAGE RATIO BROKEN** — images are taller than wide

**Recommended Fixes:**

```javascript
/* Map */
style={{
  minHeight: 'clamp(240px, 50vh, 320px)',  // Responsive
  background: '#E8DDD0'
}}

/* Image gallery */
<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
  <img
    className="rounded-xl object-cover w-full h-24 sm:h-32 md:h-40 shadow-sm"
  />
</div>
```

---

### ✅ 20. **ContactPage**

**Lines:** ~3661–3776
**Status:** ✓ RESPONSIVE

- Info cards `grid md:grid-cols-3 gap-4` — responsive ✓
- Form grid `grid md:grid-cols-2 gap-8` — responsive ✓
- Form inputs `w-full` — scale correctly
- Textarea responsive
- No fixed widths

---

### ⚠️ 21. **CartPage**

**Lines:** ~3790–3914
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 3845:** `grid lg:grid-cols-3 gap-6` — responsive ✓
2. **Line 3849:** `flex gap-3` — reasonable
3. **Line 3851:** Cart item card `p-4 shadow-sm flex gap-4`
4. **Line 3853:** Image `w-20 h-20` — 80px square (tight at mobile but works)

**Responsive Issues:**

1. **Line 3853:** Image `w-20 h-20` is fixed
   - At 320px: 80px + gap + remaining space for text = squeeze
   - Text truncates: `text-sm` might wrap to 2-3 lines

2. **Line 3872:** Quantity buttons `w-7 h-7` — tight spacing at mobile
3. **Line 3880:** Summary sidebar `lg:sticky lg:top-24` — may not work at all sizes

**Recommended Fixes:**

```javascript
/* Cart item image */
<div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl">

/* Quantity controls */
<button className="w-6 sm:w-7 h-6 sm:h-7">

/* Headings */
<p className="font-bold text-xs sm:text-sm">

/* Summary sidebar - add responsive top */
<div className="bg-white rounded-2xl p-5 shadow-sm lg:sticky"
  style={{ top: 'clamp(80px, 5vh, 120px)' }}>
```

---

### ⚠️ 22. **CheckoutPage**

**Lines:** ~3938–4087
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 4007:** `grid lg:grid-cols-3 gap-6` — responsive ✓
2. **Line 4009:** Form card `p-6 shadow-sm` — responsive padding ✓
3. **Line 4071:** Summary sidebar `lg:sticky lg:top-24` — same as CartPage

**Responsive Issues:**

1. **Line 4071:** Sticky top value `top-24` (96px) — may be too far down on mobile with collapsed header
2. **Line 4077:** `grid flex-col gap-1` — becomes single column on mobile (OK)
3. **Line 4032:** Form fields all responsive — OK

**Recommended Fixes:**

```javascript
/* Summary sidebar - responsive top value */
<div className="bg-white rounded-2xl p-5 shadow-sm lg:sticky lg:top-24"
  style={{ top: 'clamp(70px, 10vh, 96px)' }}>
```

---

### ⚠️ 23. **ConfirmationPage**

**Lines:** ~4101–4177
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 4124:** `max-w-2xl` — centers and constrains width ✓
2. **Line 4126:** Card `p-8 text-center` — padding OK
3. **Line 4140:** Order number `text-2xl` — might be too large at mobile

**Responsive Issues:**

1. **Line 4140:** Heading `font-black text-3xl` — no responsive sizing (should be smaller at mobile)
2. **Line 4126:** Card padding `p-8` — 2rem padding at mobile 320px is aggressive
3. **Line 4151:** Items recap `p-4` — OK
4. **Line 4173:** Buttons `text-sm` — OK

**Recommended Fixes:**

```javascript
/* Card */
<div className="bg-white rounded-2xl shadow-sm p-4 sm:p-8 text-center">

/* Heading */
<h1 className="font-black text-2xl sm:text-3xl mb-2">

/* Order number display */
<p className="font-black text-xl sm:text-2xl">
```

---

### ⚠️ 24. **App** (Main component)

**Lines:** ~4180–4410
**Status:** ⚠️ PARTIALLY RESPONSIVE
**Fixed Issues:**

1. **Line 4240:** Product grid `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
   - Same as ProductCard (already analyzed — see #10)
2. **Line 4370:** Search results grid same format — OK

**Responsive Issues:**

1. All product grids use same potentially problematic spacing
2. Category section rendering `gap-14` — OK for desktop but very loose on mobile

**Recommended Fixes:**

```javascript
/* All product grids */
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">

/* Category sections */
<div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-8 sm:gap-14">
```

---

## 2. GLOBAL LAYOUT ISSUES

### Issue #1: Fixed Pixel Heights Breaking Mobile Aspect Ratios

**Components Affected:** CategoryBanner (#9), PageHero (#17), HeroCarousel (#5), FloatingCartBar (#12), VisitPage (#19)
**Severity:** HIGH
**Problem:** Multiple components use fixed pixel heights that don't scale:

- `CategoryBanner`: `height: 180` (line 2713)
- `PageHero`: `height: 220` (line 3253)
- `VisitPage` map: `minHeight: 320` (line 3625)
- `FloatingCartBar`: `minWidth: 220` (line 3003)

**Impact at 320px:**

- Category banners look disproportionate
- Inner page headers consume >25% of viewport
- Map takes >60% of viewport on VisitPage
- Cart button causes horizontal overflow

---

### Issue #2: Product Grid Layout Breaks at Mobile

**Components Affected:** ProductCard (#10), FeaturedSection (#14), App main render (#24)
**Severity:** MEDIUM
**Problem:** Grid uses `grid-cols-2` at mobile, but combined with `gap-4` (1rem) and content padding:

```
320px viewport width
- 2rem padding (px-4 on container) = 288px
- 1rem gap (gap-4) in middle = 272px available
- 2 columns = 136px per column
- Card has p-4 (1rem) on both sides = 104px
- Image height h-40 (160px) > card width (104px)
```

**Result:** Images appear oversized relative to card width; text truncates

---

### Issue #3: Hardcoded Padding at Mobile Widths

**Severity:** MEDIUM
**Problem:** Fixed `px-4` or `px-8` padding at 320px viewport:

- 320px - 2rem padding = 288px content width
- Many sections use `max-w-7xl` which centers poorly at this width
- Buttons with `px-5 py-2` on 320px create tall text

**Components:** CategoryNav (#6), MenuIntro (#7), ContactSection (#15)

---

### Issue #4: Text Overflow & Truncation

**Severity:** MEDIUM
**Components:**

- Header: Navigation labels `text-sm` may truncate at 320px
- AnnouncementBar (#2): Emoji + text wraps poorly
- ProductCard (#10): Title `text-sm` truncates with `truncate` class
- CartPage (#21): Item names wrap to 2+ lines

---

### Issue #5: Sticky Positioning Issues

**Severity:** LOW-MEDIUM
**Components:** CategoryNav (#6), CartPage (#21), CheckoutPage (#22)
**Problem:**

- CategoryNav: `top: 64` assumes fixed 64px header, but mobile header might collapse
- CartPage/CheckoutPage: `lg:top-24` doesn't account for header height on smaller screens

---

## 3. SECTIONS WITH HORIZONTAL OVERFLOW RISK

### HIGH RISK:

1. **FloatingCartBar** (#12) — `minWidth: 220` at 320px → 68% of viewport
   - **Fix:** Change to responsive width with `calc(100vw - 3rem)`

2. **ProductCard Grid** (#10) — At 320px with gap-4:
   - Each card becomes ~100px wide with padding
   - Image h-40 (160px) > width — needs responsive height

3. **AnnouncementBar** (#2) — Fixed text with emoji:
   - `text-xs` may not wrap properly
   - **Fix:** Add `sm:text-sm` breakpoint

---

### MEDIUM RISK:

4. **Header Navigation** (#3) — Nav links `gap-5 text-sm`:
   - At 320px with hidden nav on mobile, OK
   - But Order Type toggle buttons may squeeze

5. **Modal Dialogs** (#4, #11) — `max-w-sm` is 384px:
   - At 320px: needs `p-4` instead of `p-6` or `w-[calc(100vw-2rem)]`

6. **CartPage Image Gallery** (#19) — `grid-cols-3 h-40`:
   - At 320px: 3 cols = 100px each, but 160px tall
   - Images have wrong aspect ratio

---

## 4. ADMIN DASHBOARD COMPONENTS

**Status:** Not found in App.tsx

- File references `admin/AdminApp.tsx` but it's not included in this analysis
- Recommend similar responsive audit for admin dashboard

---

## SUMMARY: COMPONENTS REQUIRING FIXES

| Component        | Issue                              | Severity | Line(s)   | Fix Type               |
| ---------------- | ---------------------------------- | -------- | --------- | ---------------------- |
| HeroCarousel     | Arrow buttons too close at mobile  | MEDIUM   | 2506–2513 | Adjust positioning     |
| CategoryNav      | Fixed pixel `top` value            | LOW      | 2583      | Use CSS variable       |
| CategoryBanner   | Fixed 180px height                 | HIGH     | 2713      | Use clamp()            |
| ProductCard      | h-40 image too tall for grid width | HIGH     | 2758      | Responsive height      |
| FloatingCartBar  | minWidth causes overflow           | HIGH     | 3003      | Responsive width       |
| ProductModal     | h-48 image reduces form space      | MEDIUM   | 2845      | Responsive height      |
| ContactSection   | height: 280 on map                 | MEDIUM   | 3141      | Use clamp()            |
| PageHero         | Fixed 220px height                 | MEDIUM   | 3253      | Use clamp()            |
| AboutPage        | Image gallery aspect ratio         | MEDIUM   | 3353–3366 | Responsive sizes       |
| VisitPage        | Map minHeight: 320 too tall        | MEDIUM   | 3625      | Use clamp()            |
| VisitPage        | Image grid cols-3 wrong ratio      | MEDIUM   | 3635–3639 | Responsive cols        |
| CartPage         | Image w-20 h-20 tight at mobile    | MEDIUM   | 3853      | Add responsive classes |
| CheckoutPage     | Sticky top not mobile-responsive   | LOW      | 4071      | Use CSS variable       |
| ConfirmationPage | No heading responsive sizing       | LOW      | 4140      | Add responsive font    |

---

## RECOMMENDED MOBILE BREAKPOINTS

**320px (iPhone SE):** Ensure no horizontal scroll, text readable  
**375px (iPhone 6/7/8):** Allow slightly more breathing room  
**425px (iPad mini):** Small tablet, more space for grids  
**768px (iPad):** Desktop-like layout with 2-column grids  
**1024px+:** Full desktop with 4-6 column grids

### Apply these consistently:

```tailwind
/* Container padding */
px-3 sm:px-4 md:px-6 lg:px-8

/* Grid columns */
grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4

/* Font sizes */
text-xs sm:text-sm md:text-base lg:text-lg

/* Image heights */
h-24 sm:h-32 md:h-40 lg:h-48

/* Fixed dimensions */
Never use fixed height/width — use clamp() instead
```

---

## END OF ANALYSIS
