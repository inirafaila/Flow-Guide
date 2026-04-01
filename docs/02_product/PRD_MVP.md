---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# PRD نسخه MVP
## وب‌اپ راهنمای تازه‌واردها و مهاجران در ارمنستان

---

## 1) اطلاعات پایه سند

**نسخه:** 1.0  
**مرحله:** MVP Product Requirements Document  
**وضعیت:** Draft for execution  
**مبنای این سند:** research، design direction، product decisions، UX decision log، wireframe pack  

---

## 2) هدف سند

این سند برای ترجمه تصمیم‌های محصولی و UX فعلی پروژه به نیازمندی‌های اجرایی ساخته شده است تا تیم طراحی و توسعه بتواند بدون باز کردن دوباره تصمیم‌های کلان، وارد ساخت نسخه MVP شود.

این PRD روی نسخه‌ای متمرکز است که:
- سریع قابل ساخت باشد
- برای newcomer ارزش فوری ایجاد کند
- از feature creep جلوگیری کند
- پایه درستی برای personalization، service layer و رشد بعدی محصول بسازد

---

## 3) تعریف محصول

محصول یک **وب‌اپ onboarding شخصی برای شروع زندگی در ارمنستان** است که به کاربر تازه‌وارد کمک می‌کند:
- از کجا شروع کند
- قدم بعدی‌اش چیست
- چه مدارکی لازم دارد
- چطور بدون حساب بانکی یا اقامت هم کارهای ضروری را جلو ببرد
- چه اطلاعاتی رسمی، متغیر یا تجربه‌محور هستند

این محصول در MVP:
- marketplace کامل نیست
- super app نیست
- community-first نیست
- صرفاً یک وبلاگ یا دایرکتوری هم نیست

**تعریف درست MVP:**
یک لایه راهنمایی ساختاریافته + onboarding شخصی‌سازی‌شده سبک + داشبورد عملی برای newcomer

---

## 4) مسئله‌ای که حل می‌کنیم

مسئله اصلی کاربر کمبود اطلاعات خام نیست؛ مشکل، **پراکنده بودن، قدیمی بودن، تناقض منابع، و نبود مسیر مرحله‌به‌مرحله بر اساس وضعیت واقعی کاربر** است.

کاربر تازه‌وارد معمولاً در هفته اول با این نیازها روبه‌روست:
- ورود و شروع امن و کم‌اصطکاک
- اسکان موقت یا پایدار
- فهم مدارک و وضعیت اقامت
- شروع درآمد سریع
- یاد گرفتن پرداخت، حمل‌ونقل، اپ‌های ضروری و سازوکارهای روزمره

---

## 5) هدف نسخه MVP

### هدف اصلی
کاربر تازه‌وارد باید در کمتر از چند دقیقه:
1. بفهمد این محصول برای اوست
2. وارد مسیر مناسب خود شود
3. 3 تا 5 قدم بعدی‌اش را ببیند
4. برای حساس‌ترین کارها راهنمای عملی و قابل اعتماد دریافت کند

### Non-goals در MVP
موارد زیر در MVP هدف اصلی نیستند:
- marketplace کامل آگهی شغلی
- workflow کامل referral و fulfillment
- سیستم community و Q&A کامل
- رزرو هاستل
- پنل پارتنرها
- نقشه کامل و location platform
- search semantic پیچیده

---

## 6) کاربران هدف

### کاربر اصلی
**تازه‌وارد یا مهاجر غیرارمنی** که در روزها و هفته‌های اول نیاز فوری به راهنمایی عملی دارد.

### بازار هدف اولیه
- ایرانی‌ها
- روس‌ها
- هندی‌ها
- سایر newcomerهای غیرارمنی

### اولویت طراحی
- newcomer اولویت مطلق
- کاربران جاافتاده‌تر لایه دوم محصول و خارج از تمرکز MVP

---

## 7) ارزش پیشنهادی محصول

### Promise اصلی
**لازم نیست همه‌چیز را خودت از اول کشف کنی. اینجا می‌فهمی الان کجایی، قدم بعدی‌ات چیست، و کدام اطلاعات قابل اعتمادند.**

### تمایزهای اصلی
- entry pointهای سناریومحور
- onboarding کوتاه و guided
- dashboard شخصی با next best action
- محتوای منبع‌محور و تاریخ‌دار
- کمک برای cash-first survival قبل از بانک و اقامت
- درک تفاوت workflow بر اساس ملیت و وضعیت

---

## 8) اصول قطعی محصول

این تصمیم‌ها در MVP بسته تلقی می‌شوند:

- **guest-first, account-later**
- Home باید **hybrid** و newcomer-first باشد
- navigation باید **سناریومحور** باشد
- تجربه باید **mobile-first** باشد
- onboarding باید **کوتاه، guided و غیرکودکانه** باشد
- dashboard یکی از **هسته‌های محصول** است
- search و map باید در معماری دیده شوند اما scope آن‌ها کنترل شود
- تجربه محصول باید **calm / clear / trustworthy / modern** باشد
- محتوای حساس باید **source-aware + last verified + variance warning** داشته باشد
- برای ایرانی‌ها منطق اقامت باید **90 روز در 180 روز شناور** را پشتیبانی کند

---

## 9) اهداف محصولی و KPIها

### اهداف محصولی
- کاهش سردرگمی newcomer در شروع
- افزایش completion مسیرهای حیاتی
- ایجاد اعتماد محتوایی
- ایجاد استفاده تکرارشونده از dashboard / updates / checklist
- ساخت پایه مناسب برای service layer آینده

### KPIهای اولیه
- نرخ کلیک روی یکی از 3 entry point اصلی
- completion rate onboarding
- درصد کاربرانی که dashboard را می‌بینند
- CTR روی next best action
- صفحات پرترافیک و پرتکرار
- queryهای پرتکرار search
- conversion guest به account
- conversion از صفحات محتوا به فرم‌های خدماتی
- retention کوتاه‌مدت برای updates و checklist

---

## 10) Scope نسخه MVP

### 10.1 صفحات must-have
1. Home  
2. Start / Onboarding  
3. Dashboard  
4. تازه رسیدم — روز اول  
5. تازه رسیدم — هفته اول  
6. از فرودگاه تا شهر  
7. مدارک — محاسبه‌گر روزهای اقامت  
8. مدارک — ثبت آدرس  
9. مدارک — سوشال کارت  
10. مدارک — اقامت موقت  
11. خانه — owner vs agency  
12. خانه — checklist اجاره  
13. کار — شروع درآمد سریع  
14. کار — Yandex برای تازه‌کارها  
15. کار — live gaming / casino track  
16. پرداخت — آموزش ترمینال‌ها  
17. پرداخت — روش‌های پرداخت سرویس‌ها  
18. حمل‌ونقل — پرداخت حمل‌ونقل عمومی  
19. حمل‌ونقل — فرودگاه  
20. زندگی روزمره — اپ‌های ضروری  
21. سوالات متداول  
22. بروزرسانی‌ها

### 10.2 قابلیت‌های must-have
- global layout و navigation
- تغییر زبان
- guest access
- onboarding flow
- dashboard basic
- checklist engine ساده
- next best action
- content page template
- source block
- last verified block
- warning / what may vary block
- search basic
- save path prompt

### 10.3 قابلیت‌های lightweight در MVP
- map lite فقط برای چند دسته محدود
- housing request به‌صورت فرم ساده
- casino referral به‌صورت فرم ساده
- account creation prompt در نقطه ارزش

### 10.4 خارج از scope MVP
- curated job board کامل
- employer posting flow
- پنل referral کامل
- tracking workflow کامل درخواست‌ها
- semantic search پیشرفته
- سیستم review/rating
- community / events platform
- hostel booking

---

## 11) ساختار تجربه کاربری

### 11.1 Home
**هدف:**
- در 5 تا 10 ثانیه توضیح دهد محصول چیست
- کاربر را سریع وارد مسیر کند
- حس اعتماد و نظم بدهد

**بخش‌ها:**
- Header
- Hero
- سه entry point اصلی
- guided start block
- ابزارهای سریع
- سکشن محدود برای کاربران جاافتاده‌تر
- updates
- trust section
- footer

### 11.2 Onboarding
**هدف:** ساخت مسیر شخصی با حداقل سوال

**سوال‌ها:**
- زبان
- ملیت
- داخل ارمنستان هست / نیست
- هدف اصلی
- وضعیت خانه / سیم‌کارت / ثبت آدرس / سوشال کارت / حساب بانکی

**خروجی:**
- خلاصه وضعیت
- 3 تا 5 قدم بعدی
- ورود به dashboard
- ادامه بدون ثبت‌نام
- ساخت حساب برای ذخیره مسیر

### 11.3 Dashboard
**هدف:** نمایش وضعیت کاربر در یک نگاه

**ماژول‌ها:**
- summary
- کارت وضعیت اقامت
- next best action
- checklist اصلی
- هشدارها
- quick actions
- updates for you
- saved/request placeholders

---

## 12) منطق محصول و personalization

### 12.1 ورودی‌های اصلی personalization
- nationality
- location status
- primary goal
- has housing
- has sim
- has address registration
- has social card
- has bank account

### 12.2 خروجی‌های personalization
- dashboard emphasis
- checklist filtering
- next best action
- urgency flags
- related quick actions
- relevant updates

### 12.3 اصول personalization
- کاربر نباید تمام taskها را ببیند
- فقط taskهای مرتبط و actionable نشان داده شوند
- یک CTA اصلی در هر لحظه واضح باشد
- توضیح کامل در لایه دوم باشد، نه در ورودی اولیه

---

## 13) Next Best Action Logic

### تعریف
سیستم باید بر اساس وضعیت کاربر، فقط **یک اقدام اصلی** و حداکثر **دو اقدام فرعی** نمایش دهد.

### نمونه‌ها
- اگر کاربر خانه ندارد: اقدام اصلی = پیدا کردن اسکان موقت/پایدار
- اگر خانه دارد ولی ثبت آدرس ندارد: اقدام اصلی = ثبت آدرس
- اگر ثبت آدرس دارد ولی سوشال کارت ندارد: اقدام اصلی = گرفتن سوشال کارت
- اگر نیاز مالی فوری دارد: اقدام اصلی = شروع درآمد سریع
- اگر در نزدیکی پایان اقامت است: اقدام اصلی = بررسی اقامت / محاسبه‌گر / اقدام حقوقی

### معیارهای تصمیم‌گیری
- urgency
- prerequisite completion
- declared goal
- legal risk
- survival need

---

## 14) Checklist Logic

### ساختار checklist
بخش‌بندی‌شده بر اساس:
- ورود و هفته اول
- مدارک
- خانه
- کار
- پرداخت‌ها

### وضعیت هر آیتم
- انجام نشده
- در حال انجام
- کامل شده
- نیاز به بررسی مجدد

### قوانین
- آیتم‌ها باید conditional باشند
- prerequisiteها رعایت شوند
- کاربر باید بتواند وضعیت را تغییر دهد
- هر checklist item به یک content page یا action متصل باشد

---

## 15) Search

### نقش
search باید یک قابلیت مرکزی ولی ساده و قابل کنترل در MVP باشد.

### Scope در MVP
**keyword-first search** با structured results

### نوع نتایج
- صفحات راهنما
- سرویس‌ها
- روش‌های پرداخت
- لوکیشن‌های مرتبط
- سوالات متداول
- اقدام بعدی

### Non-goal
- semantic retrieval پیچیده
- موتور دانش پیشرفته

---

## 16) Map

### نقش
map باید task-oriented باشد، نه decorative.

### Scope در MVP
**map lite** برای دسته‌های محدود:
- translators
- address registration
- terminals
- pharmacies

### داده هر مکان
- نام
- دسته
- آدرس
- ساعات کاری
- روش پرداخت
- نیاز به نوبت
- سطح اعتماد

---

## 17) Content System Requirements

### هر صفحه عملیاتی باید این بلوک‌ها را داشته باشد
1. quick summary  
2. step-by-step  
3. requirements / documents  
4. cost / fee  
5. time / duration  
6. source block  
7. last verified  
8. what may vary  
9. main CTA  
10. related pages / tools

### انواع صفحات
- guide page
- checklist-driven page
- service profile page
- update page
- calculator page

### اصول محتوا
- action before explanation
- summary before detail
- source-aware
- update-friendly
- قابل استفاده در موبایل

---

## 18) Trust & Governance Requirements

### برای موضوعات حساس باید الزامی باشد
- تاریخ آخرین بررسی
- منبع یا نوع منبع
- confidence level
- هشدار درباره موارد متغیر

### confidence levels پیشنهادی
- رسمی
- نزدیک به رسمی
- سند سازمانی / بانکی
- تجربه میدانی
- گزارش جامعه

### موضوعات حساس
- اقامت و روزشمار
- ثبت آدرس
- سوشال کارت
- بانک
- پرداخت‌ها
- حمل‌ونقل

---

## 19) داده‌ها و موجودیت‌های اصلی

### User
- id
- language
- nationality
- location_status
- primary_goal
- current_flags
- account_state

### UserState
- remaining_days_estimate
- residency_stage
- housing_stage
- work_stage
- payment_readiness
- urgent_flags

### ChecklistItem
- id
- title
- category
- applies_to_rules
- prerequisite_ids
- status
- related_page_slug
- urgency_level

### ContentPage
- slug
- title
- category
- quick_summary
- action_steps
- requirements
- costs
- warnings
- related_tools
- related_locations
- last_verified_at

### SourceRecord
- page_id
- source_type
- source_label
- source_url
- confidence_level
- verified_at
- notes

### UpdateItem
- id
- title
- affected_category
- impact_level
- summary
- published_at

### Place
- id
- name
- type
- address
- coordinates
- opening_hours
- payment_methods
- appointment_required
- confidence_level

---

## 20) Guest vs Account Logic

### Guest Mode
کاربر باید بتواند بدون ثبت‌نام:
- Home را ببیند
- onboarding را کامل کند
- dashboard موقت را ببیند
- صفحات محتوا را مصرف کند
- search را استفاده کند

### Triggerهای ساخت حساب
وقتی کاربر بخواهد:
- مسیرش را ذخیره کند
- dashboard persistent داشته باشد
- یادآوری بگیرد
- درخواست خانه یا referral ارسال کند
- مدارک آپلود کند

### تصمیم اجرایی
در MVP **dashboard موقت در guest mode وجود دارد** و save prompt بعداً ظاهر می‌شود.

---

## 21) قابلیت‌های خدماتی سبک در MVP

### 21.1 Housing Request
**Scope:** فرم ساده + success state

**فیلدها:**
- نوع ملک
- تعداد اتاق خواب
- محله
- بودجه
- مدت اجاره
- زمان ورود
- تعداد ساکنان
- حیوان خانگی
- توضیحات
- راه تماس

**Non-goal:** workflow کامل partner routing

### 21.2 Casino Referral
**Scope:** فرم ساده + اطلاعات پایه track

**فیلدها:**
- نام
- سن
- زبان‌ها
- سابقه
- وضعیت اقامت
- راه تماس
- فایل رزومه
- توضیح تکمیلی

**Non-goal:** referral panel کامل

---

## 22) نیازمندی‌های طراحی

### Product Feel
- calm
- clear
- trustworthy
- modern

### UX guardrails
- کاربر باید سریع نقطه شروع را ببیند
- هیچ صفحه مهمی بدون CTA واضح نباشد
- هشدارها باید کنترل‌شده باشند
- UI نباید از محتوا مهم‌تر شود
- mobile usability اولویت دارد

### Visual direction
- primary: teal / blue-green
- accent: amber محدود
- cards با گوشه نرم
- spacing کافی
- hierarchy واضح
- readability بالا

---

## 23) نیازمندی‌های فنی سطح بالا

### Front-end
- responsive / mobile-first
- component-based layout
- reusable content template
- checklist component
- source / update blocks
- onboarding state handling
- dashboard rendering based on user state

### Content / CMS layer
حداقل باید امکان این را بدهد:
- مدیریت pageها
- ویرایش source و last verified
- ثبت updateها
- برچسب‌گذاری content و category
- اتصال pageها به checklist و quick actions

### Search layer
- keyword indexing
- typed result groups

### Analytics
- event tracking برای onboarding، dashboard، CTAها، search، save prompts

---

## 24) Analytics Events پیشنهادی

- home_entry_point_clicked
- onboarding_started
- onboarding_completed
- dashboard_viewed
- next_action_clicked
- checklist_item_updated
- content_page_viewed
- source_block_opened
- update_clicked
- search_used
- save_path_prompt_seen
- signup_started
- signup_completed
- housing_request_started
- housing_request_submitted
- casino_referral_started
- casino_referral_submitted

---

## 25) اولویت‌بندی ساخت

### فاز 1
- layout
- navigation
- design tokens سبک
- content template
- source/update components

### فاز 2
- Home
- onboarding
- dashboard shell

### فاز 3
- 8 صفحه هسته‌ای محتوا:
  - هفته اول
  - فرودگاه
  - اقامت‌سنج
  - ثبت آدرس
  - سوشال کارت
  - اقامت موقت
  - owner vs agency
  - ترمینال‌ها

### فاز 4
- Yandex
- live gaming
- پرداخت حمل‌ونقل عمومی
- اپ‌های ضروری
- updates

### فاز 5
- search basic
- map lite
- save/account prompts
- lightweight service forms

---

## 26) ریسک‌ها و محدودیت‌ها

### ریسک 1: فرسودگی scope
راه‌حل: strict MVP boundaries و later list شفاف

### ریسک 2: قدیمی شدن محتوای حساس
راه‌حل: source model + last verified + updates layer

### ریسک 3: ساخت dashboard پیچیده‌تر از نیاز MVP
راه‌حل: dashboard basic با منطق محدود و reliable

### ریسک 4: فشار برای تبدیل زودهنگام به marketplace
راه‌حل: service layer فقط در حد lightweight form

### ریسک 5: ambiguity در برخی مسیرها بر اساس ملیت و شعبه
راه‌حل: variance block + confidence labels + source links

---

## 27) Open Decisions باقی‌مانده

### P1
- taxonomy و slug structure نهایی
- content CMS انتخابی
- سطح persistence در guest mode
- نحوه مدیریت multi-language content
- اولویت دقیق search در برابر map در release 0.1

### P2
- reminder system طراحی شود یا بعداً
- login method اولیه چه باشد
- upload documents در MVP باشد یا نه

---

## 28) Definition of Done برای MVP

MVP زمانی قابل قبول است که:
- کاربر بتواند بدون ثبت‌نام وارد شود
- onboarding کامل شود و dashboard موقت بسازد
- dashboard حداقل next action + checklist + status card را نشان دهد
- صفحات حیاتی محتوا live باشند
- صفحات حساس source-aware و last-verified باشند
- search basic کار کند
- map lite برای دسته‌های اصلی کار کند یا placeholder معتبر داشته باشد
- analytics اصلی نصب شده باشد
- تجربه موبایل usable و پایدار باشد

---

## 29) خروجی‌های مستقیم برای Figma

این صفحات باید اول طراحی شوند:
1. Home
2. Onboarding flow
3. Dashboard
4. Content page template
5. Checklist-driven page
6. Search results page

---

## 30) خروجی‌های مستقیم برای Cursor

این ماژول‌ها باید اول ساخته شوند:
1. app shell
2. navigation system
3. onboarding state
4. dashboard shell
5. content rendering system
6. checklist engine
7. source/update components

---

## 31) جمع‌بندی نهایی

این MVP باید یک **content + guidance product با personalization سبک ولی واقعی** باشد.

موفقیت نسخه اول در این نیست که همه‌چیز را حل کند؛ موفقیت در این است که برای newcomer:
- نقطه شروع روشن بسازد
- اضطراب را کم کند
- قدم بعدی را واضح کند
- روی حساس‌ترین موضوعات راهنمای قابل اعتماد بدهد
- پایه رشد بعدی محصول را درست بچیند

---

## 32) پیشنهاد مرحله بعد

مرحله بعد بعد از این PRD:
1. **Information Architecture Spec نهایی** با taxonomy و slug map
2. **Data + content model spec** برای تیم توسعه
3. **UI handoff spec** برای Home / Onboarding / Dashboard / Content template
4. **Development breakdown** به ticketهای اجرایی

