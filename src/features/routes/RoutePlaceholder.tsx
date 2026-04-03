import { RoutePageBanner } from "@/features/routes/RoutePageBanner";

type RoutePlaceholderProps = {
  path: string;
};

/** Generic Phase 1 shell for routes outside hub/guide/calculator/utility/service-form slice (e.g. `/`, `/start`, `/dashboard`). */
export async function RoutePlaceholder({ path }: RoutePlaceholderProps) {
  return (
    <section className="route-placeholder">
      <RoutePageBanner path={path} />
    </section>
  );
}
