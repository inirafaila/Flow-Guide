import { StartOnboardingFlow } from "@/features/onboarding/StartOnboardingFlow";
import { generateMetadataForPath } from "@/lib/seo/generate-metadata-for-path";

export function generateMetadata() {
  return generateMetadataForPath("/start");
}

export default function Page() {
  return (
    <section className="start-page">
      <StartOnboardingFlow />
    </section>
  );
}
