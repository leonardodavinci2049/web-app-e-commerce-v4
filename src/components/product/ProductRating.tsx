import { Star } from "lucide-react";

interface ProductRatingProps {
  productId: string;
  className?: string;
}

/**
 * Generates a deterministic rating of 4 or 5 stars based on product ID
 * This ensures the same product always shows the same rating
 * The rating alternates between 4.0, 4.5, and 5.0 based on the hash
 */
function generateRating(productId: string): number {
  // Create a simple hash from the product ID
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    const char = productId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Possible ratings: 4.0, 4.5, 5.0
  const possibleRatings = [4.0, 4.5, 5.0];

  // Use modulo to select from possible ratings (ensures even distribution)
  const index = Math.abs(hash) % possibleRatings.length;
  return possibleRatings[index];
}

/**
 * Generates a deterministic review count based on product ID
 */
function generateReviewCount(productId: string): number {
  // Create a different hash for review count
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    const char = productId.charCodeAt(i);
    hash = (hash << 3) + hash + char;
    hash = hash & hash;
  }

  // Generate a review count between 5 and 150
  const min = 5;
  const max = 150;
  const normalized = Math.abs(hash) / 2147483647;
  return Math.floor(min + normalized * (max - min));
}

/**
 * ProductRating Component
 * Displays a star rating with review count for a product
 * Rating is deterministically generated from product ID (3-5 stars)
 */
export function ProductRating({
  productId,
  className = "",
}: ProductRatingProps) {
  const rating = generateRating(productId);
  const reviewCount = generateReviewCount(productId);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Generate unique keys for stars based on their position and type
  const fullStarElements = [];
  for (let i = 0; i < fullStars; i++) {
    fullStarElements.push(
      <Star
        key={`star-full-${rating}-${i}`}
        className="w-3 h-3 fill-yellow-500 text-yellow-500"
      />,
    );
  }

  const emptyStarElements = [];
  const emptyStarsCount = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStarsCount; i++) {
    emptyStarElements.push(
      <Star
        key={`star-empty-${rating}-${i}`}
        className="w-3 h-3 text-muted-foreground/30"
      />,
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {fullStarElements}

        {/* Half star */}
        {hasHalfStar && (
          <div key={`star-half-${rating}`} className="relative w-3 h-3">
            <Star className="w-3 h-3 text-yellow-500 absolute" />
            <div className="overflow-hidden w-1.5 absolute">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {emptyStarElements}
      </div>

      {/* Review count */}
      <span className="text-[10px] text-muted-foreground">({reviewCount})</span>
    </div>
  );
}
