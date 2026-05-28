---
owner: product
status: active
last_updated: 2026-05-28
source_of_truth: true
---

# UI Handoff Spec
## MVP وب‌اپ راهنمای تازه‌واردها و مهاجران در ارمنستان

> **Launch note (2026-05-28):** This spec is the **design north star** for Figma and future work—not a literal launch checklist. **Operational MVP launch interpretation** (what ships vs deferred) lives in [`MVP_LAUNCH_CONTRACT.md`](MVP_LAUNCH_CONTRACT.md). Canonical UI states for shipped surfaces: [`UI_STATES.md`](../00_ai_context/UI_STATES.md).

---

## 1) هدف این سند

این سند برای handoff دقیق UI/UX به تیم طراحی و تیم توسعه ساخته شده است. هدفش این است که از روی PRD، IA و Data Model، مشخص شود هر صفحه کلیدی MVP دقیقاً چه ساختاری دارد، چه بلوک‌هایی در آن دیده می‌شود، hierarchy چیست، رفتار هر بخش چیست، و چه چیزهایی باید در Figma و Cursor ساخته شوند.

این سند روی 6 سطح اصلی تمرکز می‌کند:
1. Home
2. Onboarding
3. Dashboard
4. Hub Template
5. Guide Template
6. Search Results

---

## 2) اصول handoff

این UI باید این ویژگی‌ها را حفظ کند:
- newcomer-first
- calm
- clear
- trustworthy
- modern
- mobile-first
- action-first
- source-aware

### قوانین سراسری
- هر صفحه یک CTA اصلی واضح داشته باشد
- بالای fold، کاربر باید بفهمد الان چه کاری می‌تواند انجام دهد
- هشدارها کنترل‌شده باشند، نه panic-inducing
- صفحات حساس حتماً source/last verified/what may vary داشته باشند
- spacing و hierarchy از تزئین مهم‌تر است
- component reuse حداکثری باشد

---

## 3) Global UI System

## 3.1 App Shell
همه صفحات باید در یک shell مشترک اجرا شوند.

### اجزای shell
- Header
- Mobile navigation
- Desktop navigation
- Main content container
- Footer
- Optional bottom action bar در موبایل برای صفحات کلیدی

## 3.2 Header
### عناصر
- لوگو
- search trigger
- language switch
- منو
- CTA: مسیر من / شروع

### رفتار در دسکتاپ
- navigation visible
- search در دسترس
- CTA واضح سمت راست

### رفتار در موبایل
- لوگو
- search icon
- hamburger
- CTA primary کوچک ولی واضح

## 3.3 Footer
### لینک‌ها
- درباره محصول
- سوالات متداول
- بروزرسانی‌ها
- قوانین / حریم خصوصی
- گزارش اطلاعات قدیمی

## 3.4 Spacing System
- section spacing بزرگ و واضح
- card spacing متوسط
- list/item spacing کوتاه ولی readable

## 3.5 Core Reusable Components
- Primary Button
- Secondary Button
- Entry Card
- Quick Action Card
- Status Card
- Checklist Item Row
- Alert Banner
- Source Block
- Last Verified Block
- What May Vary Block
- Related Pages Block
- Update Card
- Place Card
- Section Header

---

## 4) Home Page Handoff

## 4.1 هدف صفحه
- کاربر در 5 تا 10 ثانیه بفهمد این محصول برای اوست
- سریع وارد یکی از 3 سناریوی اصلی شود
- بتواند guided start را شروع کند
- چند utility مهم را ببیند
- حس اعتماد بگیرد

## 4.2 Route
/

## 4.3 ساختار صفحه
### Block 1: Header
- لوگو
- search
- language switch
- menu
- CTA: مسیر من / شروع

### Block 2: Hero
#### محتوا
- headline اصلی
- subheadline کوتاه
- 2 CTA:
  - از کجا شروع کنم
  - مسیرهای اصلی را ببین

#### هدف UX
- value proposition فوری
- کاهش ambiguity

#### رفتار موبایل
- headline کوتاه‌تر
- CTAها stacked

### Block 3: 3 Entry Points
سه کارت بزرگ:
- تازه رسیدم
- کار می‌خوام
- خانه می‌خوام

#### محتوای هر کارت
- آیکون
- عنوان
- توضیح یک‌خطی
- CTA

#### رفتار
- desktop: سه‌ستونه
- tablet: دو/سه‌ستونه
- mobile: stacked cards

### Block 4: Guided Start
#### محتوا
- عنوان: چند سوال کوتاه جواب بده
- یک توضیح کوتاه
- CTA: شروع

#### هدف
- گرفتن کاربر مردد و تبدیل به onboarding flow

### Block 5: Quick Tools
کارت‌های utility:
- چند روز دیگر می‌توانم بمانم؟
- چطور از فرودگاه برسم شهر؟
- چطور از ترمینال استفاده کنم؟
- اپ‌های ضروری را ببین
- سوشال کارت چطور بگیرم؟

#### رفتار
- desktop: grid
- mobile: horizontal scroll یا stack سبک

### Block 6: Updates Preview
- 1 تا 3 update card
- لینک به /updates

### Block 7: Trust Section
#### عناصر
- اطلاعات منبع‌محور
- تاریخ آخرین بررسی
- بخش‌های متغیر را مشخص می‌کنیم
- امکان گزارش مورد قدیمی

### Block 8: Secondary Layer for settled users
- ایونت‌ها / فرصت‌ها / همکاری‌ها به‌صورت محدود
- این بلوک باید پایین‌تر از newcomer content بماند

### Block 9: Footer

## 4.4 CTA hierarchy
### Primary CTA
- از کجا شروع کنم

### Secondary CTAها
- entry point cards
- quick tools
- مسیر من

## 4.5 چیزهایی که نباید در Home باشند
- متن طولانی
- 10 بخش هم‌وزن
- article wall
- marketplace-heavy blocks
- فرم‌های طولانی

## 4.6 خروجی لازم در Figma
- Desktop Home
- Mobile Home
- states for entry cards
- updates preview state
- trust section state

## 4.7 خروجی لازم در Cursor
- page layout
- hero block
- entry card component
- quick tools grid
- updates preview component
- trust section component

---

## 5) Onboarding Handoff

## 5.1 هدف صفحه
- جمع‌آوری حداقل داده لازم
- ساخت مسیر شخصی اولیه
- بدون حس فرسایشی یا کودکانه

## 5.2 Route
/start

## 5.3 ساختار flow
### Step 1: زبان
- فارسی
- English
- Русский

### Step 2: ملیت
- ایران
- روسیه
- هند
- سایر

### Step 3: الان کجا هستی؟
- داخل ارمنستانم
- هنوز نرسیدم

### Step 4: الان بیشتر دنبال چی هستی؟
- شروع زندگی
- کار
- خانه
- اقامت و مدارک

### Step 5: وضعیت فعلی
toggle/select chips:
- خانه دارم / ندارم
- سیم‌کارت دارم / ندارم
- ثبت آدرس انجام داده‌ام / نداده‌ام
- سوشال کارت دارم / ندارم
- حساب بانکی دارم / ندارم

### Step 6: Result Summary
- وضعیت تو
- 3 تا 5 قدم بعدی
- CTA: ورود به داشبورد
- CTA: ادامه بدون ثبت‌نام
- CTA: ساخت حساب برای ذخیره مسیر

## 5.4 عناصر ثابت در flow
- progress bar
- back button
- عنوان مرحله
- microcopy کوتاه
- CTA پایین صفحه

## 5.5 قوانین UX
- هر step فقط یک سؤال اصلی داشته باشد
- تعداد گزینه‌ها محدود بماند
- پاسخ‌ها tap-friendly باشند
- در موبایل one-handed usable باشد
- زمان کل flow زیر 2 دقیقه بماند

## 5.6 Result Screen Design
### بخش‌ها
- title: مسیر تو آماده شد
- summary card
- primary action card
- mini checklist preview
- CTA stack

## 5.7 حالت‌ها
- default state
- validation state
- loading transition کوتاه بین stepها
- final success state

## 5.8 خروجی لازم در Figma
- step template
- option states
- progress bar states
- result screen
- mobile step flow

## 5.9 خروجی لازم در Cursor
- step renderer
- answer state management
- progress component
- result state component

---

## 6) Dashboard Handoff

## 6.1 هدف صفحه
- کاربر در یک نگاه بداند کجاست، چه چیزی مهم‌تر است، و بعدی چه کند

## 6.2 Route
/dashboard

## 6.3 ساختار صفحه
### Block 1: Header Summary
- سلام + نام یا عنوان عمومی
- current path summary
- دکمه ویرایش اطلاعات

### Block 2: Residency Status Card
- روزهای باقی‌مانده
- وضعیت (safe / watch / urgent)
- تاریخ تقریبی
- CTA: جزئیات / محاسبه‌گر

### Block 3: Next Best Action
#### عناصر
- عنوان اقدام اصلی
- دلیل کوتاه
- CTA اصلی
- 1 تا 2 اقدام فرعی

### Block 4: Main Checklist
#### structure
sectioned list:
- ورود و هفته اول
- مدارک
- خانه
- کار
- پرداخت‌ها

#### هر row شامل
- عنوان task
- status chip
- optional urgency marker
- arrow/link

### Block 5: Alerts
نمونه:
- اقامتت در 12 روز دیگر تمام می‌شود
- برای این مرحله ترجمه رسمی نیاز داری
- این اطلاعات اخیراً تغییر کرده‌اند

### Block 6: Quick Actions
- از ترمینال چطور استفاده کنم
- اپ‌های ضروری
- نزدیک‌ترین مترجم
- فرم درخواست خانه
- فرم معرفی به کازینو

### Block 7: Updates For You
- 1 تا 3 update card مرتبط با وضعیت کاربر

### Block 8: Saved / Requests Placeholder
- صفحات ذخیره‌شده
- درخواست‌های من
- مدارک آپلودشده

## 6.4 اولویت بصری
1. status + next action
2. checklist
3. alerts
4. quick actions
5. updates
6. placeholders

## 6.5 قوانین UX
- dashboard نباید dashboard enterprise بشود
- visible checklist کوتاه باشد
- CTA اصلی خیلی واضح‌تر از بقیه باشد
- رنگ هشدار فقط در alertها و statusهای مهم استفاده شود

## 6.6 حالت‌ها
- guest temporary state
- signed-in state
- empty-ish state برای کاربر جدید
- urgent state
- after-completion state

## 6.7 خروجی لازم در Figma
- Desktop Dashboard
- Mobile Dashboard
- status card variants
- next action component
- checklist item states
- alert variants

## 6.8 خروجی لازم در Cursor
- dashboard shell
- state-driven cards
- checklist rendering
- updates feed block

---

## 7) Hub Template Handoff

## 7.1 هدف template
این template برای section hubها استفاده می‌شود و باید کاربر را از سطح category به action pageها هدایت کند.

### استفاده برای
- /newcomer
- /documents
- /work
- /housing
- /payments
- /transport
- /daily-life
- /city

## 7.2 ساختار template
### Block 1: Page Header
- عنوان section
- intro کوتاه
- CTA اصلی section

### Block 2: Top Tasks
- 2 تا 4 کارت برای کارهای مهم این بخش

### Block 3: Related Guides
- لیست یا grid از pageهای زیرمجموعه

### Block 4: Quick Tools / Useful Shortcuts
- ابزارهای مرتبط

### Block 5: Optional Updates
- اگر update مهمی برای این section وجود دارد

### Block 6: Optional Related Places
- در صورت relevance

## 7.3 تفاوت hub با home
- home gateway کل محصول است
- hub gateway یک domain خاص است

## 7.4 قوانین طراحی
- intro خیلی کوتاه
- تمرکز روی tasks، نه long content
- بیش از 4 card اصلی نداشته باشد
- CTA section-based روشن باشد

## 7.5 خروجی لازم در Figma
- one reusable hub template
- examples for newcomer + documents + work

## 7.6 خروجی لازم در Cursor
- reusable hub page component
- top tasks block
- related guides list component

---

## 8) Guide Template Handoff

## 8.1 هدف template
صفحات عملیاتی و حساس را به شکلی نشان دهد که کاربر اول action را بفهمد، بعد detail را ببیند، و در نهایت به منبع اعتماد کند.

### استفاده برای
- /documents/address-registration
- /documents/social-card
- /documents/temporary-residency
- /housing/owner-vs-agency
- /work/yandex-starter
- /payments/terminals
- /transport/public-transport-payments

## 8.2 ساختار template
### Block 1: Page Header
- عنوان
- subtitle کوتاه یا quick summary
- optional status/urgency badge

### Block 2: Quick Summary Card
- این صفحه به چه درد می‌خورد
- چه زمانی به آن نیاز داری
- یک CTA اصلی

### Block 3: Step-by-Step
- مراحل شماره‌دار
- هر step کوتاه و actionable

### Block 4: Requirements / Documents
- لیست مدارک یا نیازمندی‌ها

### Block 5: Costs / Time
- هزینه‌ها
- زمان تقریبی
- effort level

### Block 6: Warnings / Common Mistakes
- خطاهای رایج
- red flags

### Block 7: Source + Last Verified
- source block
- تاریخ آخرین بررسی

### Block 8: What May Vary
- بسته به ملیت
- بسته به شعبه
- بسته به تغییرات اخیر

### Block 9: Related Pages / Tools / Places
- next step
- related tool
- related place

### Block 10: Bottom CTA
- برگشت به مسیر مرتبط یا ادامه مرحله بعد

## 8.3 قوانین UX
- اول action، بعد explanation
- متن‌های بلند به بلوک‌های digestible شکسته شوند
- source block پایین صفحه ولی clearly visible باشد
- related block واقعاً actionable باشد

## 8.4 حالت‌های guide template
- standard guide
- guide with place cards
- guide with calculator CTA
- guide with urgent alert

## 8.5 خروجی لازم در Figma
- reusable guide template
- alert variants
- source block variants
- related content block

## 8.6 خروجی لازم در Cursor
- content block renderer
- source block component
- warning block component
- related links/places component

---

## 9) Search Results Handoff

## 9.1 هدف صفحه
کاربر مستقیم چیزی را سرچ می‌کند و باید سریع بفهمد بهترین نتیجه چیست، نه اینکه با لیست خام گم شود.

## 9.2 Route
/search

## 9.3 ساختار صفحه
### Block 1: Search Header
- search input prominent
- query shown
- optional clear action

### Block 2: Best Match / Primary Recommendation
- اگر query واضح باشد، یک کارت اصلی در بالا نشان داده شود

### Block 3: Grouped Results
گروه‌ها:
- راهنماها
- ابزارها
- سرویس‌ها
- مکان‌های مرتبط
- سوالات متداول

### Block 4: Suggested Next Actions
اگر مناسب باشد:
- از کجا شروع کنم
- این ابزار را ببین
- این صفحه مرتبط است

## 9.4 قوانین UX
- نتایج flat و بی‌ساختار نباشند
- title + short explanation + type label وجود داشته باشد
- best match خیلی واضح باشد
- mobile search experience بسیار سریع و کم‌اصطکاک باشد

## 9.5 حالت‌ها
- populated results
- no results
- typo/fallback suggestion
- grouped results with best match

## 9.6 خروجی لازم در Figma
- search default state
- search result state
- no result state
- mobile search sheet/page

## 9.7 خروجی لازم در Cursor
- search page shell
- grouped result renderer
- best match card
- no results component

---

## 10) Component Priority for Design System

این کامپوننت‌ها باید اول طراحی شوند:
1. Header
2. Primary / Secondary Button
3. Entry Card
4. Quick Action Card
5. Status Card
6. Next Action Card
7. Checklist Item Row
8. Alert Banner
9. Source Block
10. Update Card
11. Related Pages Block
12. Search Result Row
13. Place Card
14. Section Header

---

## 11) State Variants موردنیاز

### Buttons
- default
- hover
- pressed
- disabled

### Cards
- default
- highlighted
- urgent
- selected

### Checklist Item
- not-started
- in-progress
- done
- revisit

### Alerts
- info
- warning
- critical
- update

### Source Block
- single source
- multiple sources
- low-variance note
- high-variance note

---

## 12) Responsive Behavior Rules

### Desktop
- multi-column layouts در home/dashboard/hubs
- side-by-side sections where useful

### Tablet
- reduce columns
- preserve hierarchy

### Mobile
- stacked sections
- short headers
- large tappable cards
- CTAها full-width یا high-visibility
- optional sticky bottom action on critical pages

---

## 13) Microcopy Guidance

### لحن
- مطمئن‌کننده
- واضح
- کوتاه
- حرفه‌ای
- بدون شوخی اضافی

### نمونه‌ها
- الان بهترین قدم برای تو این است
- اگر هنوز سیم‌کارت نگرفته‌ای، از اینجا شروع کن
- این مرحله معمولاً قبل از مرحله بعدی انجام می‌شود
- ممکن است این بخش بسته به ملیت یا شعبه کمی فرق داشته باشد
- این اطلاعات آخرین بار در این تاریخ بررسی شده‌اند

---

## 14) Accessibility Basics

- contrast مناسب
- tap target کافی در موبایل
- hierarchy واضح تیترها
- labelهای خوانا برای statusها
- reliance نکردن صرف به رنگ

---

## 15) چیزی که نباید در handoff فراموش شود

- Home نباید شلوغ شود
- Onboarding نباید طولانی یا بچگانه شود
- Dashboard نباید enterprise dashboard شود
- Guide pages نباید article wall شوند
- Search نباید flat result list شود
- Source layer نباید صرفاً footnote تزئینی باشد

---

## 16) ترتیب طراحی در Figma

### موج اول
1. Home
2. Onboarding
3. Dashboard

### موج دوم
4. Hub Template
5. Guide Template
6. Search Results

### موج سوم
7. component library extraction
8. mobile states
9. edge states

---

## 17) ترتیب ساخت در Cursor

### Stage 1
- app shell
- header/footer/nav
- basic button/card system

### Stage 2
- Home
- Start/Onboarding
- Dashboard shell

### Stage 3
- Hub page template
- Guide page template
- Search page

### Stage 4
- state variants
- updates blocks
- source blocks
- places/related content blocks

---

## 18) خروجی نهایی مورد انتظار از این handoff

بعد از این سند، تیم طراحی و تیم توسعه باید بتوانند بدون ابهام بدانند:
- چه صفحه‌هایی اولویت دارند
- هر صفحه دقیقاً از چه بلوک‌هایی ساخته می‌شود
- چه componentهایی reusable هستند
- چه stateهایی باید طراحی و پیاده‌سازی شوند
- hierarchy تجربه چگونه است

---

## 19) جمع‌بندی نهایی

این UI handoff باید کمک کند MVP نه فقط «درست از نظر استراتژی»، بلکه **شفاف، قابل طراحی، و قابل ساخت** شود.

این سند handoff برای نسخه اول محصول کافی است چون روی همان سطوحی تمرکز کرده که بیشترین impact را دارند:
- شروع سریع
- مسیردهی درست
- dashboard مفید
- page templateهای قابل‌اعتماد
- search قابل‌فهم
- سیستم کامپوننتی قابل reuse

---

## 20) قدم بعدی پیشنهادی

بعد از این سند، منطقی‌ترین گام بعدی یکی از این دو است:

1. **Development Breakdown / Ticket Plan**
2. **Figma-ready Screen Checklist**

اگر بخواهیم از نگاه ساخت جلو برویم، اولی منطقی‌تر است.
اگر بخواهیم از نگاه طراحی جلو برویم، دومی.

