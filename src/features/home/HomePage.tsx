import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HomeEntryCard } from "@/features/home/HomeEntryCard";
import { HomeQuickToolItem } from "@/features/home/HomeQuickToolItem";

/**
 * Phase 3 Home — gateway: hero, entry points, guided start, quick tools, trust framing.
 */
export async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <h1 id="home-hero-heading" className="home-hero__headline">
          {t("hero.headline")}
        </h1>
        <p className="home-hero__subheadline muted">{t("hero.subheadline")}</p>
        <div className="home-hero__ctas">
          <Link href="/start" className="fg-button fg-button--primary home-hero__cta">
            {t("hero.ctaPrimary")}
          </Link>
          <Link
            href="#home-entry-points"
            className="fg-button fg-button--secondary home-hero__cta"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>
      </section>

      <section
        id="home-entry-points"
        className="home-entry-cards"
        aria-labelledby="home-entry-points-heading"
      >
        <h2 id="home-entry-points-heading" className="fg-section-header">
          {t("entryPoints.sectionTitle")}
        </h2>
        <div className="home-entry-cards__grid">
          <HomeEntryCard
            href="/newcomer"
            title={t("entryPoints.newcomerTitle")}
            description={t("entryPoints.newcomerDesc")}
          />
          <HomeEntryCard
            href="/work"
            title={t("entryPoints.workTitle")}
            description={t("entryPoints.workDesc")}
          />
          <HomeEntryCard
            href="/housing"
            title={t("entryPoints.housingTitle")}
            description={t("entryPoints.housingDesc")}
          />
        </div>
      </section>

      <section className="home-guided-start" aria-labelledby="home-guided-heading">
        <div className="home-guided-start__inner">
          <h2 id="home-guided-heading" className="home-guided-start__title">
            {t("guidedStart.title")}
          </h2>
          <p className="home-guided-start__desc muted">{t("guidedStart.description")}</p>
          <Link href="/start" className="fg-button fg-button--primary home-guided-start__cta">
            {t("guidedStart.cta")}
          </Link>
        </div>
      </section>

      <section className="home-quick-tools" aria-labelledby="home-quick-tools-heading">
        <h2 id="home-quick-tools-heading" className="fg-section-header">
          {t("quickTools.sectionTitle")}
        </h2>
        <div className="home-quick-tools__list">
          <HomeQuickToolItem
            href="/documents/stay-calculator"
            label={t("quickTools.stayCalculator")}
          />
          <HomeQuickToolItem
            href="/newcomer/airport-to-city"
            label={t("quickTools.airportToCity")}
          />
          <HomeQuickToolItem href="/payments/terminals" label={t("quickTools.terminals")} />
          <HomeQuickToolItem
            href="/daily-life/essential-apps"
            label={t("quickTools.essentialApps")}
          />
          <HomeQuickToolItem
            href="/documents/social-card"
            label={t("quickTools.socialCard")}
          />
        </div>
      </section>

      <section className="home-trust-section" aria-labelledby="home-trust-heading">
        <h2 id="home-trust-heading" className="home-trust-section__title">
          {t("trustSection.title")}
        </h2>
        <ul className="home-trust-section__list">
          <li className="home-trust-section__item">{t("trustSection.sourceAware")}</li>
          <li className="home-trust-section__item">{t("trustSection.lastVerified")}</li>
          <li className="home-trust-section__item">{t("trustSection.whatMayVary")}</li>
        </ul>
      </section>
    </div>
  );
}
