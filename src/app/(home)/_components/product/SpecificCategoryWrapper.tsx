import { envs } from "@/core/config/envs";
import { getCategorySixSectionProducts } from "../../actions";
import { SpecificCategory } from "../banner/SpecificCategory";

// Wrapper component for SpecificCategory to fetch data
export async function SpecificCategoryWrapper() {
  const products = await getCategorySixSectionProducts();

  // Transform products to match SpecificCategory props and limit to 3 products
  const displayProducts = products.slice(0, 3).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    isNew: p.isNew,
    discount: p.discount,
    category: p.category || "",
  }));

  return (
    <SpecificCategory
      title={envs.HOME_SECTION_9_TITLE || "Mundo Gamer"}
      products={displayProducts}
      className="bg-background"
    />
  );
}
