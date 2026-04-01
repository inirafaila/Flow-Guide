---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Information Architecture Spec
## MVP وب‌اپ راهنمای تازه‌واردها و مهاجران در ارمنستان

---

## 1) هدف این سند

این سند برای نهایی‌سازی معماری اطلاعات نسخه MVP ساخته شده است؛ یعنی مشخص می‌کند محصول دقیقاً از چه بخش‌هایی تشکیل می‌شود، هر صفحه کجای ساختار قرار می‌گیرد، منوی اصلی چه شکلی است، taxonomy محتوا چیست، و routing و slugها چگونه تعریف می‌شوند.

این سند باید به سه تیم هم‌زمان کمک کند:
- **طراحی**: بداند چه صفحه‌هایی باید طراحی شوند و چه ارتباطی با هم دارند
- **توسعه**: بداند routing، page typeها و ساختار محتوا چگونه باشد
- **محتوا/عملیات**: بداند هر محتوا در کدام دسته قرار می‌گیرد و چطور به‌روزرسانی می‌شود

---

## 2) اصول تصمیم‌گیری برای IA

در این پروژه، معماری اطلاعات نباید از ساختارهای اداری یا دسته‌بندی‌های سنتی محتوا شروع شود. باید از **نیاز کاربر و ترتیب اقدام** شروع شود.

بنابراین IA این محصول بر این اصول بنا می‌شود:

1. **سناریومحور، نه سازمان‌محور**
2. **اقدام‌محور، نه مقاله‌محور**
3. **newcomer-first**
4. **mobile-first و اسکن‌پذیر**
5. **قابل رشد از guide به platform**
6. **سازگار با dashboard، search، checklist و updates**

---

## 3) تصمیم‌های کلیدی معماری

### تصمیم 1: Home باید gateway باشد، نه directory
Home صفحه معرفی ساده یا فهرست همه بخش‌ها نیست. Home در MVP یک **gateway page** است که کاربر را سریع وارد یکی از مسیرهای اصلی می‌کند.

### تصمیم 2: «تازه رسیدم» باید هم entry point باشد، هم hub
این بخش فقط یک CTA روی Home نیست. باید یک hub واقعی باشد که newcomer journey را جمع کند.

### تصمیم 3: «مدارک و اقامت» باید top-level بماند
با اینکه بخشی از journey newcomer است، اما به دلیل حساسیت بالا، حجم مراجعه زیاد، و نیاز به دسترسی مستقیم، باید در منوی اصلی top-level بماند.

### تصمیم 4: «پرداخت» و «حمل‌ونقل» در معماری جدا اما در تجربه به‌هم‌پیوسته باشند
در IA باید دو section جدا داشته باشند چون intent کاربر متفاوت است. اما cross-linking و related content باید قوی باشد.

### تصمیم 5: «کار» و «خانه» باید از الان service-ready باشند
در MVP فعلاً mostly content هستند، ولی ساختار آن‌ها باید از همین حالا امکان CTAهای خدماتی و فرم‌ها را داشته باشد.

### تصمیم 6: slugها باید انگلیسی‌محور باشند
برای توسعه، SEO، portability و سازگاری با routing، ساختار slugها در MVP باید انگلیسی‌محور باشد، حتی اگر زبان پیش‌فرض رابط فارسی باشد.

### تصمیم 7: updates باید utility layer مستقل داشته باشد
Updates باید صفحه مستقل داشته باشد، اما در منوی اصلی نباید از sections اصلی مهم‌تر دیده شود. این بخش یک utility/trust layer است، نه ورودی اصلی تجربه.

---

## 4) مدل کلی معماری محصول

معماری MVP از 5 لایه تشکیل می‌شود:

### Layer 1: Gateway Layer
برای شروع سریع و ورود به سناریوها
- Home
- Start / Onboarding

### Layer 2: Scenario Hubs
برای نیازهای اصلی newcomer
- تازه رسیدم
- کار
- خانه
- مدارک و اقامت
- زندگی روزمره
- حمل‌ونقل
- گردش

### Layer 3: Action Pages
صفحات عملیاتی و راهنماهای دقیق
- ثبت آدرس
- سوشال کارت
- اقامت موقت
- آموزش ترمینال‌ها
- Yandex برای تازه‌کارها
- owner vs agency

### Layer 4: Personal Utility Layer
لایه شخصی و نگه‌دارنده
- Dashboard
- مسیر من
- saved items
- request placeholders

### Layer 5: Trust & Support Layer
لایه اعتماد، جستجو و بروزرسانی
- Search
- FAQ
- Updates
- source-aware patterns

---

## 5) Navigation Model نهایی

### 5.1 منوی اصلی دسکتاپ
- تازه رسیدم
- کار
- خانه
- مدارک و اقامت
- زندگی روزمره
- حمل‌ونقل
- گردش
- سوالات متداول

### CTAهای ثابت هدر
- از کجا شروع کنم
- مسیر من
- جستجو
- تغییر زبان

### 5.2 منوی موبایل
- همان ساختار بالا در همبرگری
- به‌علاوه CTAهای واضح برای:
  - شروع
  - مسیر من
  - جستجو

### 5.3 چیزهایی که top-level نمی‌شوند
این موارد در MVP در منوی اصلی top-level قرار نمی‌گیرند:
- Updates
- map
- housing request
- casino referral
- service forms
- tools archive

این‌ها از طریق:
- quick actions
- related links
- dashboard
- utility navigation
- CTAهای داخل صفحات
قابل دسترسی خواهند بود.

---

## 6) Sitemap نهایی MVP

## 6.1 Core Pages
- /
- /start
- /dashboard
- /search
- /faq
- /updates

## 6.2 Newcomer Hub
- /newcomer
- /newcomer/day-one
- /newcomer/first-week
- /newcomer/airport-to-city

## 6.3 Documents & Residency
- /documents
- /documents/stay-calculator
- /documents/address-registration
- /documents/social-card
- /documents/temporary-residency

## 6.4 Work
- /work
- /work/quick-income
- /work/yandex-starter
- /work/live-gaming

## 6.5 Housing
- /housing
- /housing/owner-vs-agency
- /housing/rental-checklist
- /housing/request
- /housing/request/success

## 6.6 Payments
- /payments
- /payments/terminals
- /payments/service-payments

## 6.7 Transport
- /transport
- /transport/public-transport-payments
- /transport/airport

## 6.8 Daily Life
- /daily-life
- /daily-life/essential-apps

## 6.9 Tourism
- /city

---

## 7) Page Hierarchy و نقش هر بخش

## 7.1 Home
**Route:** /

**Role:** gateway

**وظیفه:**
- توضیح سریع value proposition
- هدایت به 3 entry point اصلی
- شروع guided flow
- نمایش ابزارهای فوری
- نمایش trust layer و updates

## 7.2 Start / Onboarding
**Route:** /start

**Role:** guided setup

**وظیفه:**
- جمع‌آوری حداقل اطلاعات لازم
- ساخت مسیر موقت شخصی
- فرستادن کاربر به dashboard یا مسیر مناسب

## 7.3 Dashboard
**Route:** /dashboard

**Role:** personal control center

**وظیفه:**
- نمایش status
- نمایش next best action
- checklist
- alerts
- quick actions

## 7.4 Hub Pages
هر hub page سه وظیفه دارد:
1. معرفی کوتاه نیاز/موضوع
2. نمایش صفحات زیرمجموعه و اقدام‌های اصلی
3. نمایش CTAهای مرتبط

این structure برای صفحات زیر اعمال می‌شود:
- /newcomer
- /documents
- /work
- /housing
- /payments
- /transport
- /daily-life
- /city

## 7.5 Action / Guide Pages
این‌ها صفحات عملیاتی‌اند و باید template مشترک داشته باشند.

نمونه‌ها:
- /documents/address-registration
- /documents/social-card
- /housing/owner-vs-agency
- /work/yandex-starter
- /payments/terminals

## 7.6 Utility Pages
- /search
- /faq
- /updates

---

## 8) Taxonomy نهایی محتوا

برای اینکه search، related content، dashboard و CMS با هم سازگار شوند، taxonomy باید ساده و اجرایی باشد.

### 8.1 Primary Categories
- newcomer
- documents
- work
- housing
- payments
- transport
- daily-life
- city
- support

### 8.2 Page Types
- hub
- guide
- checklist
- calculator
- service-form
- utility
- update

### 8.3 Intent Types
- start
- legal
- housing
- income
- payment
- movement
- setup
- safety
- adaptation

### 8.4 Audience Tags
- iranian
- russian
- indian
- general-newcomer
- guest
- signed-in-user

### 8.5 Urgency Tags
- critical
- high
- medium
- low

### 8.6 Trust Tags
- official
- near-official
- org-source
- field-experience
- community-report

### 8.7 Utility Tags
- calculator
- quick-action
- map-linked
- dashboard-linked
- searchable

---

## 9) Slug Convention

### قواعد کلی
- slugها انگلیسی باشند
- kebab-case استفاده شود
- کوتاه و معنی‌دار باشند
- nested routing فقط تا حد لازم انجام شود
- از slugهای خیلی فنی یا نامفهوم پرهیز شود

### الگو
- hub pages: /section
- guide pages: /section/guide-name
- tools: /section/tool-name یا /tool-name فقط اگر utility global باشد
- utility pages: /search, /faq, /updates

### مثال درست
- /documents/stay-calculator
- /housing/rental-checklist
- /work/quick-income
- /transport/public-transport-payments

### مثال نادرست
- /doc-res-flow-arm-1
- /newcomer-page-final
- /work-yandex-armenia-for-beginners-guide-2026

---

## 10) Navigation to Page Mapping

### تازه رسیدم
- /newcomer
- /newcomer/day-one
- /newcomer/first-week
- /newcomer/airport-to-city

### کار
- /work
- /work/quick-income
- /work/yandex-starter
- /work/live-gaming

### خانه
- /housing
- /housing/owner-vs-agency
- /housing/rental-checklist
- /housing/request

### مدارک و اقامت
- /documents
- /documents/stay-calculator
- /documents/address-registration
- /documents/social-card
- /documents/temporary-residency

### زندگی روزمره
- /daily-life
- /daily-life/essential-apps

### حمل‌ونقل
- /transport
- /transport/public-transport-payments
- /transport/airport

### گردش
- /city

### سوالات متداول
- /faq

---

## 11) Relation بین entry points و sections

### Entry Point 1: تازه رسیدم
این entry point کاربر را به /newcomer می‌برد و از آنجا به مسیرهای حیاتی متصل می‌کند:
- هفته اول
- فرودگاه
- ثبت آدرس
- سوشال کارت
- ترمینال‌ها
- اپ‌های ضروری

### Entry Point 2: کار می‌خوام
این entry point به /work می‌رود و سه لایه دارد:
- quick income
- Yandex starter
- live gaming

### Entry Point 3: خانه می‌خوام
این entry point به /housing می‌رود و شامل:
- owner vs agency
- rental checklist
- housing request CTA

---

## 12) Dashboard Destination Mapping

Dashboard نباید به همه صفحات لینک بدهد؛ فقط به صفحات actionable و متناسب با state کاربر باید متصل شود.

### مثال mapping
- اگر کاربر address registration ندارد → /documents/address-registration
- اگر social card ندارد → /documents/social-card
- اگر پول درآوردن فوری هدف اصلی است → /work/quick-income
- اگر حمل‌ونقل فوری لازم دارد → /transport/airport یا /transport/public-transport-payments
- اگر پرداخت اولیه مشکل دارد → /payments/terminals

### قانون
هر checklist item فقط باید به **یک primary destination** متصل باشد.

---

## 13) Search Architecture

### هدف
search باید نتیجه را بر اساس نوع محتوا گروه‌بندی کند، نه فقط لیست خام صفحه‌ها را نمایش دهد.

### Result Groups در MVP
- راهنماها
- ابزارها
- سرویس‌ها
- لوکیشن‌های مرتبط
- سوالات پرتکرار

### مثال
Search query: Yerevan Ride
نتایج باید ترجیحاً شامل این‌ها باشند:
- صفحه یا راهنمای مرتبط
- روش پرداخت مربوطه
- ترمینال‌های مرتبط
- اگر وجود داشت، quick action یا صفحه مرتبط برای onboarding

### Rule
search در MVP **cross-category** است ولی **typed** باقی می‌ماند.

---

## 14) Map Architecture

### Scope در MVP
map یک لایه secondary است و فقط برای چند use case محدود وارد IA می‌شود.

### در MVP map به‌صورت page family مستقل top-level نمی‌آید.
به‌جای آن، از داخل صفحات و quick actions به تجربه map-linked هدایت می‌شود.

### دسته‌های map-linked
- translators
- address registration offices
- terminals
- pharmacies

### پیشنهاد routing در MVP
به‌جای ساخت section کامل /map، از routingهای utility این‌طور استفاده شود:
- /search?type=place&category=terminals
- /search?type=place&category=translators

یا در صورت نیاز توسعه:
- /places/terminals
- /places/translators
- /places/pharmacies

### تصمیم نهایی
برای MVP، **places** بهتر از **map** است چون task-orientedتر و content-friendlyتر است.

---

## 15) Content Template Mapping

### 15.1 Hub Template
مناسب برای:
- /newcomer
- /documents
- /work
- /housing
- /payments
- /transport
- /daily-life

**بلوک‌ها:**
- intro
- top tasks
- related guides
- quick tools
- alerts/updates if needed
- CTA

### 15.2 Guide Template
مناسب برای action pages

**بلوک‌ها:**
- quick summary
- step-by-step
- requirements
- cost/time
- warnings
- source block
- last verified
- what may vary
- CTA
- related pages

### 15.3 Utility Template
مناسب برای:
- /search
- /faq
- /updates

### 15.4 Service Form Template
مناسب برای:
- /housing/request
- later service flows

---

## 16) Breadcrumb Logic

Breadcrumbها در MVP باید ساده و قابل فهم باشند.

### الگو
- خانه > مدارک و اقامت > ثبت آدرس
- خانه > کار > Yandex برای تازه‌کارها
- خانه > تازه رسیدم > هفته اول

### قانون
breadcrumb باید بر اساس section parent باشد، نه بر اساس user journey personal path.

---

## 17) Related Content Logic

هر صفحه باید related content داشته باشد، اما relatedها باید بر اساس **اقدام بعدی واقعی** انتخاب شوند، نه صرفاً شباهت موضوعی.

### نوع relationها
- prerequisite
- next step
- related tool
- related place
- related update

### مثال
صفحه ثبت آدرس:
- prerequisite: اسکان/آدرس معتبر
- next step: سوشال کارت
- related tool: stay calculator
- related update: تغییرات اداری اخیر در صورت وجود

---

## 18) Quick Actions Architecture

Quick actions باید از چند نقطه در محصول قابل فراخوانی باشند:
- Home
- Dashboard
- hub pages
- برخی guide pages

### quick actionهای MVP
- از کجا شروع کنم
- چند روز دیگر می‌توانم بمانم؟
- چطور از فرودگاه برسم شهر؟
- چطور از ترمینال استفاده کنم؟
- اپ‌های ضروری را ببین

### قانون
quick actionها utility-level هستند و نباید taxonomy اصلی سایت را شلوغ کنند.

---

## 19) Updates Architecture

### نقش
Updates یک trust layer است، نه section اصلی journey.

### route
- /updates

### از کجا دیده شود
- Home
- Dashboard
- guide pages مرتبط
- alerts/notice blocks

### نوع updateها
- حمل‌ونقل
- پرداخت
- اقامت و مدارک
- بانک
- سرویس‌ها

---

## 20) FAQ Architecture

### route
- /faq

### نقش
پوشش سوالات پرتکرار cross-category که لزوماً page کامل مستقل نمی‌خواهند.

### موضوع‌های مناسب FAQ
- آیا بدون حساب بانکی می‌توانم فلان کار را انجام دهم؟
- اگر هنوز اقامت ندارم چه کنم؟
- اگر از فرودگاه رسیدم سریع‌ترین راه چیست؟

### قانون
FAQ جایگزین guide page نیست؛ فقط مکمل آن است.

---

## 21) ساختار پیشنهادی برای Places

اگر تیم بخواهد location content را از MVP کمی واقعی‌تر کند، architecture پیشنهادی این است:

- /places
- /places/terminals
- /places/translators
- /places/pharmacies
- /places/address-services

اما این family فعلاً در MVP top-level نمی‌شود.

---

## 22) IA برای CMS و محتوا

هر content item باید حداقل این metadataها را داشته باشد:
- title
- slug
- primary category
- page type
- audience tags
- urgency
- trust level
- searchable yes/no
- dashboard-linkable yes/no
- map-linked yes/no
- last verified
- related pages
- related updates

---

## 23) اولویت طراحی براساس IA

این صفحات باید اول در Figma طراحی شوند:
1. Home
2. Start / Onboarding
3. Dashboard
4. Hub template
5. Guide template
6. Search page

### نکته مهم
اگر hub template و guide template درست بسته شوند، بخش زیادی از product surface با component reuse قابل طراحی و ساخت خواهد بود.

---

## 24) اولویت توسعه براساس IA

### Stage 1
- routing shell
- main nav
- utility nav
- template system

### Stage 2
- Home
- Start
- Dashboard

### Stage 3
- Hub pages
- Guide pages
- FAQ
- Updates

### Stage 4
- Search basic
- places-lite
- lightweight forms

---

## 25) تصمیم‌های نهایی این سند

### قطعی
- Home = gateway
- Start = guided setup
- Dashboard = personal utility layer
- Newcomer = hub
- Documents = top-level
- Work/Housing = service-ready structure
- Payments/Transport = separate sections with strong cross-links
- Slugs = English-first
- Updates = utility page
- Map = not top-level in MVP
- Places = better content model than pure map in MVP

---

## 26) جمع‌بندی نهایی

معماری اطلاعات MVP باید کاری کند که محصول:
- از نگاه newcomer ساده و قابل‌فهم باشد
- از نگاه توسعه‌دهنده buildable باشد
- از نگاه طراح قابل سیستم‌سازی باشد
- از نگاه محتوا update-friendly باشد

ساختار نهایی این MVP بر پایه **gateway → scenario hubs → actionable pages → personal layer → trust layer** تعریف می‌شود.

این معماری هم با نیاز امروز محصول هم‌راستا است، هم بدون اینکه MVP را شلوغ کند، فضا را برای رشد بعدی به service layer و platform باز می‌گذارد.

---

## 27) قدم بعدی پیشنهادی

بعد از این سند، منطقی‌ترین خروجی بعدی:

**Data + Content Model Spec**

چون حالا که IA بسته شده، باید دقیقاً تعریف شود:
- هر page type چه فیلدهایی دارد
- checklist و dashboard از چه data structure استفاده می‌کنند
- source/update/place/content چگونه به هم وصل می‌شوند
- CMS و front-end چه contractی با هم دارند

