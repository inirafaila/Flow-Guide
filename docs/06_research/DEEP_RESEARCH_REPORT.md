---
owner: research
status: active
last_updated: 2026-04-01
source_of_truth: false
---

# Deep Research: Newcomer Guide Web App for Armenia

## Executive summary

Your current draft already points to the right product shape: newcomers don’t just need “information,” they need the **right sequence** (what to do first, second, third), plus **cash-first** workarounds until they have local documents and banking. The draft you shared covers core early needs (entry, short-stay rules, housing search, early work options, SSN/social card, address registration, SIM, job boards). fileciteturn0file0

The deep-research finding is that Armenia already has **many single-purpose resources** (official portals, repatriation guides, relocation/law firm explainers, community channels, transport/payment apps), but there is still a clear gap for a **scenario-based, multilingual, step-by-step newcomer product** designed specifically for Iranian, Russian, Indian, and other non-Armenian newcomers—especially one that explains *how to operate before you have residency/bank accounts* and that shows *sources + last-verified dates*.

A key legal correction based on primary sources: for Iranian nationals, the Armenia–Iran agreement highlights **visa-free stay up to 90 days within any 180-day period (rolling)**, and “exit and immediately re-enter” does **not** necessarily reset the clock in a way that allows unlimited consecutive 90-day blocks. Your product should treat day-counting as a critical calculator/guardrail, not as a footnote. citeturn4search12

A structured content inventory (MVP → full scope) is provided as a downloadable document: **[Download the content inventory](sandbox:/mnt/data/armenia_newcomer_webapp_deep_research_content_inventory_2026-03-31.md)**.

## Competitive landscape and competitor map

This is intentionally **not** a crawl of all social networks; it focuses on the most discoverable and influential competitor types and “adjacent substitutes” that newcomers currently rely on.

Official and quasi-official platforms already cover large parts of the legal/administrative journey, but they are not newcomer-friendly in UX, rarely connect steps end-to-end, and are often not optimized for migrant segments.

- The official migration services platform (appointment and service descriptions) clearly exists and is central for multiple steps (PSN/social services number and residency application). citeturn0search6turn0search2turn0search10  
- The national services gateway **entity["organization","Hartak","national services gateway, Armenia"]** provides guided pages and service entries (including offline booking entries), acting as a directory and “life events” guide layer over government services. citeturn4search22turn4search10  
- The employer/work-permit workflow is centralized via **entity["organization","workpermit.am","foreign work permit portal"]**, framed as an electronic system enabling employers to register vacancies and process foreign hires. citeturn11search3turn11search31  

Nonprofit and repatriation guides are *close substitutes* for what you want to build, but mostly target repatriates/diaspora rather than Persian/Russian/Indian newcomer flows.

- **entity["organization","Repat Armenia Foundation","repatriation nonprofit"]** publishes a repatriation guide and related practical information covering citizenship/residency, address registration, social security number, bank account opening, housing, and daily life integration. citeturn7view3turn0search23turn4search34  

Private relocation and legal-advisory sites fill gaps where government UX is hard, and they also monetize support. They are competitors for “trust and step-by-step clarity,” but usually don’t become a daily-use web app.

- Private advisory guides and services often publish fee references and step-by-step processes (e.g., residence permit state duty amounts) and “grantsoum/address registration” explainers. citeturn4search11turn4search7turn4search20  

Community channels (Telegram/Instagram/Facebook groups) act as the “real product” for many newcomers today: fast answers, but low consistency, high repetition, and mixed reliability.

- A large Persian-speaking Telegram channel focused on Iranians in Armenia exists and positions itself as a major Persian-language media/community hub. citeturn5search0turn5search9  
- Older Persian travel-guide Telegram channels also exist (primarily tourism-oriented). citeturn5search17  

Tourism/event apps are not direct competitors for “settling in,” but they compete for attention and can be integrated later (events, workshops, city discovery).

- Travel/event-oriented Armenia apps exist (e.g., event discovery and travel guidance), which could become partners or “adjacent modules.” citeturn5search2turn5search19  

**Implication for your positioning:** the market is fragmented. Your strongest differentiation is to become the **orchestrator**: one onboarding, one personalized checklist, one source-aware knowledge base, and one “human fallback” community pipe—built around the exact newcomer steps where people currently get stuck.

## High-impact newcomer workflows and content pillars

Based on observed official processes and the “substitutes” above, the web app’s content can be designed around **workflows** (jobs-to-be-done), then backed by a structured knowledge base.

### First-week workflow that should be “productized”

Your draft already describes a rough version: stable housing → address registration → PSN/social number → residency → banking. fileciteturn0file0

Deep research suggests you should represent it as a state machine with prerequisites, fees, where-to-go, and “what changes by nationality.”

- **Address registration (“grantsoum”)** is an explicit service with a stated **state fee of 1,000 AMD** on the official migration services platform. citeturn4search3turn4search10  
- The **Public Services Number / social services number** is issued by the authorized state body; the official service page exists and is tied to appointment/registration rules. citeturn0search2  
- Applying for a **temporary residence status** requires a passport plus a **notary-certified Armenian translation**, photos, application forms, and a health reference, per the official service description. citeturn4search1  
- The state duty for a **temporary residence card** is shown as **105,000 AMD** in multiple official-adjacent service pages (including the Hartak offline booking entry). citeturn4search22turn5search14  

### A critical legal guardrail you should bake into UX

Your app should include a “stay calculator” for each nationality and show sources.

For Iranian nationals, the Armenia–Iran agreement text indicates:
- multiple entries are allowed, and
- visa-free stay is **maximum 90 days within any 180-day period** (rolling). citeturn4search12  

That makes “border run resets” a risky assumption. The product should show a **rolling-window counter** and a warning that leaving and re-entering doesn’t necessarily restart the allowance. citeturn4search12

### Content pillars that map directly to newcomer anxieties

A single “all articles” wiki is not enough—these pillars should be first-class navigation objects tied to workflows:

- Legal status & documents (PSN, address registration, residency types, work-permit flows). citeturn0search2turn4search3turn4search1turn11search39  
- Housing & avoiding agency traps (your “owner vs agency” insight is a major value-add; it should become decision-support and red-flag checklists). fileciteturn0file0  
- Getting income quickly (courier/taxi; and “live gaming”/casino studio roles as an alternative path). citeturn6search0turn12search16turn12search19  
- Payments before banking (terminals, wallets, what can be paid with cash, what can’t). citeturn2search15turn11search2turn11search10  
- Transport and mobility (especially public transport payment, which changed materially in 2025). citeturn3search2turn3search17turn3search0  

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["Yerevan public transport card Telcell terminal","Telcell self-service terminal Armenia","Yerevan City supermarket bonus card","YerevanRide scooter app Armenia"],"num_per_query":1}

## Transport and mobility content that must be explicit

Yerevan mobility is a high-friction area for newcomers because payment rules and media (paper vs card vs wallet) changed recently, and the “how do I pay” question hits immediately at arrival.

### Yerevan public transport payment

Key facts your app can safely encode with dates:

- A one-trip public transport fare of **150 AMD** took effect starting Feb 1, 2025 (valid through 2025 per the municipality notice). citeturn3search2turn1search3  
- In 2025 reporting, cash payments were being removed/limited as the unified ticketing system rolled out and the city moved to transport cards, wallets, and bank cards. citeturn0search18turn3search10turn3search24  
- Paper QR tickets were reported as **no longer accepted** on Yerevan transport as of Aug 1, 2025, with payment shifting to transport card / Telcell mobile app / bank card. citeturn3search17turn0search32  
- A transport card “guarantee amount” of **500 AMD**, refundable upon return at Telcell service points, was described in the city’s transition explanations. citeturn3search8turn3search25  

Because these rules affect everyone (tourists included), your UX should provide:
- “I have no local SIM / no local bank card—what do I do?” branch
- “I have a bank card—can I tap in?” branch (and note that acceptance can vary by card network and local configuration). citeturn3search24turn3search17  

### Airport-to-city transport specifics

Your app should treat the airport as a special case where payment methods and fares differ.

- The airport bus route N100 fare is listed as **500 AMD**, with schedule guidance, on the airport transport page. citeturn3search7  
- The airport page lists an “Elitebus” N201 service at **300 AMD**, with the note that payment is made in cash in AMD. citeturn3search7turn3search19  
- Telcell’s own blog states that cashless payment applies broadly and that the **airport is the only place where you can still buy a paper QR ticket** (for the airport bus), while also describing buying via Telcell Wallet or Telcell Terminal and/or paying by bank card on the airport bus. citeturn3search3  

These three sources together justify a very practical in-app screen: “From the airport: 2 choices, 2 fares, 2 payment modes.”

### Micromobility and bikes/scooters

Micromobility is a newcomer accelerant (especially for courier work), but needs “how to pay without a bank card.”

- The YerevanRide FAQ explicitly says they allow paying with cash via TelCell terminal for those without credit cards, and provides local pass pricing examples. citeturn2search12  
- VisitYerevan also highlights micromobility app options as “must-have apps,” signaling mainstream adoption. citeturn2search26  

## Payments, banking, and “cash-first” survival tips

This pillar should be built around the reality that many newcomers arrive with cash and/or foreign cards that may not work smoothly everywhere, and that banking is compliance-heavy.

### Key payment rails a newcomer will encounter

- Telcell self-service terminals explicitly support payments to hundreds of service providers (utilities, telecom, state payments, and more). citeturn2search15  
- Idram positions itself as a major payment system and wallet supporting broad bill payments and transfers. citeturn11search2turn11search10turn11search6  

Your app should include “cash-to-digital” instructions:
- Find a terminal location or service point
- What categories can be paid (mobile top-ups, utilities, transport top-ups, etc.)
- What identity requirements exist (if any), and which steps can be done anonymously/cash-first (especially transport, scooters, and basic bill payments). citeturn2search15turn11search38  

### Banking: don’t hardcode a single rule—model it as “varies by bank”

Your draft suggests “must have residency to open a bank account.” In practice, requirements vary by bank and by the client’s risk profile.

Evidence that bank KYC differs:

- A major bank’s document list indicates that for non-citizens, proof of residence address (e.g., utility receipt or place-of-residence reference) and additional diligence (e.g., statements, employment references) may be requested. citeturn15view1turn15view0  
- Another bank’s “foreign passport” onboarding instruction explicitly lists “residence permit in Armenia” among required scanned documents for that flow. citeturn15view2  
- A large bank offers an explicit non-resident account opening flow page (questionnaire + scanned documents), implying non-residents can begin the process, but may still face additional-document requests. citeturn13search1  
- A repatriation-oriented banking note concludes that a non-resident generally cannot open a bank card *completely remotely* without prior in-person identification, but online services open up after the first visit. citeturn13search23  

**Product implication:** implement banking as:
- “Bank profiles” (what they usually ask for; which nationalities they are smoother for; what can be done remotely vs in-branch)
- “Document pack generator” (proof of address, proof of income, purpose statement, translations)
- “Confidence labels” (“official docs,” “bank PDF,” “community report”).

### Loyalty/discount ecosystems as “quality of life” content

This is not fluff—it becomes real savings for newcomers.

- The Yerevan City site includes bonus-card terms and FAQ pages indicating a structured loyalty program exists. citeturn2search1turn2search0  
- A bank campaign document explicitly references Yerevan City bonuses credited to a cumulative card under a joint campaign, illustrating real bank–retail discount mechanics newcomers can leverage. citeturn10view2  

This should be an in-app module: “Discounts & bonus cards,” tagged by eligibility (resident vs non-resident), required payment method (cash, bank card, wallet), and current validity dates.

### Emergency numbers and safety essentials

You can build immediate trust by giving accurate, official contact info.

- The police site lists a hotline number 112. citeturn11search4  
- Yerevan’s hotline page lists emergency numbers (101/911/112, police 102, ambulance 103, gas 104). citeturn11search28  
- Armenpress reported a unified emergency number 112 planned to activate Feb 15 (year 2026) as part of Ministry of Internal Affairs services consolidation. citeturn11search8  

## Work and income modules that are both “quick win” and “sticky”

Your app should strongly separate:
- “Start earning in 48 hours”
- “Sustainable job & legal status path”

### Courier work: operational details that matter

Yandex’s Armenia delivery page markets courier earning potential and flexibility (choose hours, area, and delivery mode including foot, scooter, bike, moped, car). citeturn6search0

For operational depth (which your users are literally asking for), Yandex Pro’s knowledge base documents:
- “slots mode” (how to book, cancel rules, penalties for no-shows, and how to start a scheduled slot), citeturn6search1  
- enabling bike/kick-scooter delivery mode in the profile options. citeturn6search2  

These sources support building high-value, highly structured content:
- slot booking walkthrough (screens + pitfalls)
- “break-even” calculator: rent cost vs average order earnings (your idea), with configurable assumptions
- “first-week courier learning plan” (start on foot → switch to scooter/motor only once the flow is mastered).

### Live casino / gaming studio roles as a parallel newcomer track

This is not just anecdotal: large employers openly recruit for Yerevan-based “game presenter” and “shuffler” roles, often with training and entry-level pathways.

- A shuffler role is listed as Yerevan-based on a major live-gaming careers site. citeturn12search1  
- A game presenter vacancy explicitly includes “documentation and receiving the right to work in the Republic of Armenia” among company advantages, indicating that at least some employers operationalize work-right support. citeturn12search16  
- The Evolution Armenia careers page describes game presenter roles in Yerevan with “no experience needed” and training signals. citeturn12search19  

**Product implication:** create a “Work track: Live gaming” with:
- language requirements by “line” (RU/EN/others)
- audition/interview guidance (presentation, shifts)
- what documents are handled by employer vs what fees remain state duties (and link state fee references). citeturn4search22turn5search14  

## Content governance, trust, and localization

A newcomer web app fails or wins on trust. The deep research repeatedly shows why:

- government portals are authoritative but hard to navigate and not newcomer-oriented, citeturn0search6turn0search2turn4search3  
- community channels are fast but can normalize incorrect assumptions (especially around immigration day-count rules), citeturn5search0turn4search12  
- banks vary substantially, even within the same year, and publish changing compliance docs. citeturn15view1turn15view2turn13search1  

Your product should implement governance as a feature:

- Every “actionable” page must show: **last verified date, source links, and variance warnings** (“depends on branch,” “depends on nationality,” “requires notarized translation,” etc.). citeturn4search1turn15view1turn15view2  
- Sensitive flows (immigration day counts, residency, banking) should include a “show me the source” button and a “what changed recently” log.
- Localization needs to be workflow-aware, not just translation: Iranian newcomers have one set of first-week constraints (visa-free day-count rules + banking constraints), while EAEU citizens have different employment/residency considerations in some processes (as reflected in third-party legal explainers). citeturn9view0turn12search26  

## Research deliverable file

A structured content inventory and competitor landscape document has been generated for your product planning:

**[Download the content inventory](sandbox:/mnt/data/armenia_newcomer_webapp_deep_research_content_inventory_2026-03-31.md)**