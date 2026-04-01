---
owner: product
status: active
last_updated: 2026-04-01
source_of_truth: true
---

# Data + Content Model Spec
## MVP وب‌اپ راهنمای تازه‌واردها و مهاجران در ارمنستان

---

## 1) هدف این سند

این سند مشخص می‌کند داده‌های اصلی محصول چگونه مدل می‌شوند، هر نوع صفحه چه فیلدهایی دارد، رابطه بین content، source، update، place، checklist و dashboard چیست، و فرانت‌اند و CMS باید روی چه contract مشترکی کار کنند.

این سند بعد از PRD و IA نوشته می‌شود و نقش آن این است که محصول از سطح «ساختار درست» به سطح «قابل پیاده‌سازی واقعی» برسد.

---

## 2) مسئله‌ای که این سند حل می‌کند

تا اینجا می‌دانیم:
- چه محصولی می‌سازیم
- چه صفحه‌هایی داریم
- معماری اطلاعات چیست
- تجربه کاربری کلی چگونه است

اما هنوز اگر تیم توسعه ساخت را شروع کند، با این ابهام‌ها روبه‌رو می‌شود:
- هر صفحه دقیقاً چه فیلدهایی دارد؟
- dashboard از کجا می‌فهمد چه چیزی را به چه کسی نشان دهد؟
- checklist چطور ساخته و فیلتر می‌شود؟
- sourceها و last verified چطور ذخیره می‌شوند؟
- places و map-linked content چطور به pageها وصل می‌شوند؟
- updates چه ساختاری دارند و به کدام صفحات متصل می‌شوند؟

این سند برای بستن همین لایه است.

---

## 3) اصول مدل‌سازی

مدل داده در این MVP باید این ویژگی‌ها را داشته باشد:

1. **ساده اما قابل گسترش**
2. **content-first ولی personalization-ready**
3. **source-aware و update-friendly**
4. **سازگار با guest mode و account mode**
5. **سازگار با search، dashboard، checklist و places**
6. **بدون پیچیدگی غیرضروری marketplace-level**

---

## 4) موجودیت‌های اصلی سیستم

مدل MVP بر پایه 8 موجودیت اصلی تعریف می‌شود:

1. User
2. User State
3. Checklist Item
4. Content Page
5. Source Record
6. Update Item
7. Place
8. Request Submission

برای MVP این 8 موجودیت کافی‌اند و نیاز به مدل‌های سنگین‌تر نیست.

---

## 5) Entity: User

### نقش
نگهداری اطلاعات پایه کاربر برای personalization و persistence

### فیلدها
- id
- language
- nationality
- location_status
- primary_goal
- has_housing
- has_sim
- has_address_registration
- has_social_card
- has_bank_account
- account_state
- created_at
- updated_at

### توضیح فیلدها
- **language**: fa / en / ru
- **nationality**: iran / russia / india / other
- **location_status**: inside_armenia / outside_armenia
- **primary_goal**: start-life / work / housing / documents
- **account_state**: guest / registered

### نکته اجرایی
در guest mode هم باید یک user-like state موقت وجود داشته باشد، حتی اگر persistent database record نداشته باشد.

---

## 6) Entity: User State

### نقش
نمایش وضعیت فعلی کاربر برای dashboard، next action و checklist filtering

### فیلدها
- user_id
- remaining_days_estimate
- remaining_days_status
- residency_stage
- housing_stage
- work_stage
- payment_readiness
- urgent_flags
- recommended_primary_action
- recommended_secondary_actions
- updated_at

### enumهای پیشنهادی
#### remaining_days_status
- safe
- watch
- urgent
- overdue-risk

#### residency_stage
- not-started
- researching
- address-pending
- social-card-pending
- residency-pending
- in-review
- completed

#### housing_stage
- no-place
- temporary-place
- searching-rental
- rental-secured

#### work_stage
- not-started
- exploring
- quick-income-track
- stable-job-track
- working

#### payment_readiness
- cash-only
- terminal-capable
- wallet-capable
- bank-ready
- bank-active

### نکته
User State می‌تواند در MVP محاسبه‌شده باشد و الزاماً نیاز نیست کاملاً persisted و پیچیده باشد.

---

## 7) Entity: Checklist Item

### نقش
واحد اصلی اقدام در محصول

### اصل مهم
در این محصول، checklist item فقط یک checkbox ساده نیست؛ یک واحد عملیاتی است که به وضعیت کاربر، pageها، prerequisiteها و urgency وصل می‌شود.

### فیلدها
- id
- slug
- title
- short_label
- category
- description
- applies_to_rules
- prerequisite_ids
- primary_destination_slug
- secondary_destination_slugs
- urgency_level
- estimated_effort
- default_order
- is_active

### enumها
#### category
- newcomer
- documents
- housing
- work
- payments
- transport
- daily-life

#### urgency_level
- critical
- high
- medium
- low

#### estimated_effort
- 5-min
- 15-min
- 30-min
- half-day
- multi-step

### applies_to_rules
این فیلد باید rule-based باشد، مثلاً:
- if has_address_registration = false
- if nationality = iran
- if primary_goal = work
- if has_bank_account = false

### نکته اجرایی
در MVP بهتر است rule engine ساده و declarative باشد، نه custom logic پیچیده.

---

## 8) Entity: User Checklist Status

### نقش
نگهداری وضعیت هر checklist item برای هر کاربر

### فیلدها
- user_id
- checklist_item_id
- status
- updated_at
- note

### status enum
- not-started
- in-progress
- done
- revisit

### نکته
این entity از Checklist Item جداست چون Checklist Item template است ولی این یکی user-specific status نگه می‌دارد.

---

## 9) Entity: Content Page

### نقش
هسته محتوایی محصول

### اصل مهم
هر content page باید هم برای UI قابل رندر باشد، هم برای search و dashboard و related content قابل استفاده.

### فیلدهای پایه
- id
- slug
- title
- short_title
- primary_category
- page_type
- intent_type
- audience_tags
- urgency_tag
- summary
- intro
- main_cta
- related_page_slugs
- related_place_ids
- related_update_ids
- searchable
- dashboard_linkable
- map_linked
- last_verified_at
- published_at
- updated_at
- is_active

### enumها
#### page_type
- hub
- guide
- checklist
- calculator
- service-form
- utility
- update

#### intent_type
- start
- legal
- housing
- income
- payment
- movement
- setup
- safety
- adaptation

### ساختار content body برای guide pages
برای اینکه render و reuse آسان باشد، body بهتر است block-based باشد:
- quick_summary_block
- steps_block
- requirements_block
- costs_block
- timeline_block
- warnings_block
- source_block
- variance_block
- related_tools_block
- related_pages_block

### نکته
در MVP لازم نیست CMS خیلی پیچیده باشد، اما block structure از همان ابتدا ارزش دارد.

---

## 10) Entity: Source Record

### نقش
پایه trust layer

### اصل مهم
source باید first-class data باشد، نه متن آزاد ته صفحه.

### فیلدها
- id
- page_id
- source_type
- source_label
- source_url
- confidence_level
- verified_at
- notes
- is_primary

### enumها
#### source_type
- official
- near-official
- org-document
- field-experience
- community-report

#### confidence_level
- high
- medium
- low

### کاربردها
- نمایش source block در page
- نمایش last verified
- فیلتر بر اساس quality
- feed دادن به update workflows در آینده

---

## 11) Entity: Update Item

### نقش
ثبت تغییرات مهمی که روی content یا تصمیم کاربر اثر می‌گذارند

### فیلدها
- id
- slug
- title
- affected_categories
- impact_level
- summary
- detail
- related_page_slugs
- source_ids
- published_at
- effective_date
- is_active

### enumها
#### impact_level
- critical
- high
- medium
- low

### نکته
Update Item یک page کامل نیست، اما می‌تواند صفحه مستقل یا card در /updates داشته باشد.

---

## 12) Entity: Place

### نقش
مدل کردن مکان‌های کاربردی برای experiences مرتبط با location

### فیلدها
- id
- slug
- name
- place_type
- address
- latitude
- longitude
- opening_hours
- payment_methods
- appointment_required
- confidence_level
- related_service_tags
- notes
- is_active

### enumهای پیشنهادی
#### place_type
- terminal
- translator
- pharmacy
- address-service
- transport-point
- office

#### payment_methods
- cash
- card
- wallet
- terminal
- mixed

### کاربردها
- search results
- quick actions
- related places block
- future map/places pages

---

## 13) Entity: Request Submission

### نقش
مدل ساده برای service-layer سبک در MVP

### request_type
- housing-request
- casino-referral

### فیلدها
- id
- request_type
- user_id_nullable
- contact_name
- contact_method
- payload_json
- status
- submitted_at

### status enum
- submitted
- reviewing
- closed

### نکته
در MVP همین مدل generic کافی است و نیازی به تفکیک پیچیده service workflow نیست.

---

## 14) رابطه بین موجودیت‌ها

### روابط اصلی
- User → has one User State
- User → has many User Checklist Status
- Checklist Item → links to one primary Content Page
- Content Page → has many Source Records
- Content Page → may link to many Update Items
- Content Page → may link to many Places
- Request Submission → may belong to User or guest

### خلاصه ساده
- **User** می‌گوید کاربر کیست
- **User State** می‌گوید الان کجاست
- **Checklist Item** می‌گوید چه کارهایی ممکن است لازم باشد
- **User Checklist Status** می‌گوید کدام را انجام داده
- **Content Page** می‌گوید هر کار را چطور انجام دهد
- **Source Record** می‌گوید چرا این اطلاعات قابل اعتمادند
- **Update Item** می‌گوید چه چیزی عوض شده
- **Place** می‌گوید این کار را کجا می‌توان انجام داد

---

## 15) Mapping بین onboarding و داده‌ها

### ورودی‌های onboarding
- language
- nationality
- location_status
- primary_goal
- has_housing
- has_sim
- has_address_registration
- has_social_card
- has_bank_account

### خروجی‌های مستقیم onboarding
- ساخت User یا temporary guest state
- ساخت یا آپدیت User State
- فیلتر اولیه checklist
- تعیین next best action
- تعیین dashboard emphasis

### مثال mapping
#### اگر:
- nationality = iran
- location_status = inside_armenia
- has_housing = true
- has_address_registration = false
- has_social_card = false

#### آنگاه:
- dashboard emphasis = documents
- next best action = address-registration
- next secondary action = social-card
- urgent widget = stay-calculator

---

## 16) منطق Next Best Action

### ورودی‌ها
- User State
- checklist rules
- urgency
- prerequisites
- primary goal

### خروجی
- recommended_primary_action
- recommended_secondary_actions

### فرم داده‌ای پیشنهادی
```json
{
  "primary_action": {
    "checklist_item_slug": "address-registration",
    "page_slug": "/documents/address-registration",
    "reason": "برای ادامه مسیر مدارک، قبل از سوشال کارت باید این مرحله را انجام بدهی"
  },
  "secondary_actions": [
    {
      "checklist_item_slug": "social-card",
      "page_slug": "/documents/social-card"
    },
    {
      "checklist_item_slug": "stay-calculator",
      "page_slug": "/documents/stay-calculator"
    }
  ]
}
```

### نکته
در MVP reason text می‌تواند template-based باشد.

---

## 17) مدل checklist filtering

### مرحله 1: فیلتر relevance
بر اساس nationality، location، goal و current flags

### مرحله 2: فیلتر prerequisites
taskهایی که پیش‌نیازشان کامل نشده پنهان یا deprioritized شوند

### مرحله 3: sort by urgency + order
اول criticalها، بعد highها، بعد default order

### قانون مهم
کاربر نباید در dashboard یک لیست بلند و گیج‌کننده ببیند. در MVP بهتر است:
- 1 primary action
- 3 تا 5 checklist item visible
- بقیه پشت «نمایش بیشتر» یا در hub page

---

## 18) Page Type Contracts

برای اینکه فرانت‌اند و CMS هماهنگ باشند، هر page type باید contract مشخص داشته باشد.

## 18.1 Hub Page Contract
### فیلدهای لازم
- title
- intro
- top_tasks
- quick_tools
- related_guides
- optional_updates
- main_cta

### مثال‌ها
- /newcomer
- /documents
- /work
- /housing

## 18.2 Guide Page Contract
### فیلدهای لازم
- title
- quick_summary
- steps
- requirements
- costs
- time
- warnings
- source_records
- last_verified
- what_may_vary
- related_pages
- related_places
- main_cta

## 18.3 Calculator Page Contract
### فیلدهای لازم
- title
- intro
- input_schema
- calculation_logic_ref
- result_states
- warnings
- source_records
- related_pages

### مثال
- /documents/stay-calculator

## 18.4 Utility Page Contract
### فیلدهای لازم
- title
- body/content
- grouped_items
- optional_filters

### مثال‌ها
- /search
- /faq
- /updates

## 18.5 Service Form Page Contract
### فیلدهای لازم
- title
- intro
- form_schema
- privacy_note
- success_state
- followup_expectation

---

## 19) CMS Model پیشنهادی

برای MVP، CMS لازم نیست enterprise-level باشد، اما باید این را پشتیبانی کند:

### Collectionها
- pages
- checklist_items
- updates
- places
- sources
- request_submissions

### ویژگی‌های ضروری CMS
- editable slugs
- category/type tagging
- source linking
- last verified field
- relations بین page و place/update/source
- draft/published state

### ویژگی‌های غیرضروری در MVP
- localization workflow پیچیده
- approval flow چندمرحله‌ای
- versioning سنگین
- role system پیچیده

---

## 20) Search Index Model

Search در MVP باید از چند entity تغذیه شود:
- Content Page
- Place
- FAQ entries یا utility content

### فیلدهای indexable برای Content Page
- title
- short_title
- summary
- intro
- audience_tags
- related_service_keywords
- searchable aliases

### فیلدهای indexable برای Place
- name
- address
- place_type
- related_service_tags

### قانون
نتایج search باید typed group برگردانند، نه یک لیست flat.

---

## 21) مدل داده برای Places-lite

برای MVP، Places نیاز به مدل سبک دارد.

### فیلدهای کافی در MVP
- id
- name
- type
- address
- payment_methods
- appointment_required
- related_service_tags

### فیلدهای optional
- coordinates
- opening_hours
- confidence_level

### دلیل
تا وقتی map کامل نداریم، همین مدل هم برای quick actions و search و related blocks کافی است.

---

## 22) مدل داده برای Updates

Updates باید دو سطح داشته باشند:

### سطح 1: overview card
- title
- summary
- impact_level
- category
- published_at

### سطح 2: detail
- what changed
- who is affected
- linked pages
- source records

### استفاده در UI
- صفحه /updates
- کارت در Home
- card در Dashboard
- inline notice در pageهای مرتبط

---

## 23) Guest Mode Data Model

### اصل مهم
حتی اگر کاربر ثبت‌نام نکرده باشد، سیستم باید بتواند state موقت بسازد.

### مدل پیشنهادی
- guest_session_id
- temporary_user_state
- temporary_checklist_state
- expiry window

### آنچه باید موقت ذخیره شود
- onboarding answers
- next best action
- checklist statusهای پایه
- dashboard emphasis

### آنچه لازم نیست در guest mode ذخیره شود
- request history پیچیده
- file uploads
- long-term reminders

---

## 24) Account Mode Extensions

وقتی کاربر ثبت‌نام می‌کند، همین data model باید بدون بازنویسی کل معماری ادامه پیدا کند.

### قابلیت‌های اضافه پس از account creation
- persistent checklist status
- saved pages
- request submissions tied to user
- future reminders
- future uploads

### اصل طراحی
guest و account باید دو مدل جدا نباشند؛ account فقط extension همان state model است.

---

## 25) مثال محتوایی برای یک Guide Page

### نمونه: /documents/address-registration

```json
{
  "slug": "/documents/address-registration",
  "title": "ثبت آدرس در ارمنستان",
  "primary_category": "documents",
  "page_type": "guide",
  "intent_type": "legal",
  "audience_tags": ["general-newcomer", "iranian", "russian", "indian"],
  "urgency_tag": "high",
  "quick_summary": "اگر محل سکونت مشخص داری، این مرحله معمولاً قبل از برخی مراحل بعدی مدارک لازم می‌شود.",
  "steps": [
    "آدرس معتبرت را آماده کن",
    "مدارک لازم را بررسی کن",
    "به دفتر مربوطه مراجعه یا نوبت را بررسی کن",
    "رسید یا مدرک ثبت را نگه دار"
  ],
  "requirements": [
    "مدرک هویتی",
    "اطلاعات محل سکونت",
    "مدارک تکمیلی در صورت نیاز"
  ],
  "costs": [
    {"label": "هزینه دولتی", "value": "1000 AMD"}
  ],
  "warnings": [
    "بسته به ملیت یا نوع اقامت، جزئیات ممکن است فرق کند"
  ],
  "source_records": [
    "src_001",
    "src_002"
  ],
  "related_pages": [
    "/documents/social-card",
    "/newcomer/first-week"
  ]
}
```

---

## 26) مثال برای Checklist Item

```json
{
  "slug": "address-registration",
  "title": "آدرست را ثبت کن",
  "category": "documents",
  "applies_to_rules": [
    "has_housing = true",
    "has_address_registration = false"
  ],
  "prerequisite_ids": [],
  "primary_destination_slug": "/documents/address-registration",
  "urgency_level": "high",
  "estimated_effort": "half-day"
}
```

---

## 27) مثال برای Place

```json
{
  "id": "place_001",
  "name": "Telcell Terminal - Example",
  "place_type": "terminal",
  "address": "Yerevan, ...",
  "payment_methods": ["cash", "terminal"],
  "appointment_required": false,
  "related_service_tags": ["mobile-topup", "transport", "wallet-topup"]
}
```

---

## 28) Example API/Frontend Contract دید سطح بالا

فرانت‌اند برای dashboard در MVP بهتر است یک payload خلاصه بگیرد:

```json
{
  "user_summary": {
    "language": "fa",
    "nationality": "iran",
    "primary_goal": "documents"
  },
  "status_card": {
    "remaining_days_estimate": 24,
    "remaining_days_status": "watch"
  },
  "primary_action": {
    "title": "آدرست را ثبت کن",
    "page_slug": "/documents/address-registration"
  },
  "checklist": [
    {"slug": "address-registration", "status": "not-started"},
    {"slug": "social-card", "status": "not-started"},
    {"slug": "stay-calculator", "status": "in-progress"}
  ],
  "quick_actions": [
    {"title": "چند روز دیگر می‌توانم بمانم؟", "slug": "/documents/stay-calculator"},
    {"title": "چطور از ترمینال استفاده کنم؟", "slug": "/payments/terminals"}
  ],
  "related_updates": []
}
```

---

## 29) Definition of Done برای این مدل

این data/content model زمانی قابل قبول است که:
- برای همه page typeهای MVP contract روشن داشته باشد
- dashboard بتواند از آن تغذیه شود
- checklist filtering را پشتیبانی کند
- source/last verified را first-class نگه دارد
- search basic را تغذیه کند
- places-lite و updates-lite را پشتیبانی کند
- guest و account mode را بدون معماری جداگانه پوشش دهد

---

## 30) تصمیم‌های نهایی این سند

### قطعی
- content block-based model مناسب‌تر از body متن آزاد است
- source یک entity مستقل است
- checklist template و user checklist status باید جدا باشند
- guest mode باید state موقت واقعی داشته باشد
- request submission در MVP generic model داشته باشد
- places-lite کافی است و نیازی به map platform کامل نیست
- updateها باید قابل اتصال به pageها باشند
- page contracts باید برای front-end و CMS مشترک باشند

---

## 31) نتیجه نهایی

با این سند، پروژه دیگر فقط «صفحه‌ها و ایده‌ها» نیست؛ حالا مشخص است:
- داده‌ها چه شکلی‌اند
- صفحه‌ها چگونه تغذیه می‌شوند
- personalization چطور کار می‌کند
- dashboard و checklist از چه منطقی استفاده می‌کنند
- trust layer چطور مدل می‌شود
- CMS و front-end باید روی چه قرارداد مشترکی کار کنند

این همان لایه‌ای است که اجرای MVP را از ambiguity خارج می‌کند.

---

## 32) قدم بعدی پیشنهادی

بعد از این سند، منطقی‌ترین مرحله بعد:

**UI Handoff Spec**

برای این 6 سطح اصلی:
1. Home
2. Onboarding
3. Dashboard
4. Hub Template
5. Guide Template
6. Search Results

چون حالا هم PRD داریم، هم IA، هم data/content model؛ و زمان آن رسیده که handoff طراحی و ساخت UI دقیق و سیستماتیک شود.

