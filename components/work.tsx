import { Archive } from "@/components/archive";
import { FeaturedGrid } from "@/components/featured-grid";

// Four featured systems as full cards, then the archive table.
export function Work() {
  return (
    <>
      <FeaturedGrid />
      <div className="mt-28">
        <Archive />
      </div>
    </>
  );
}
