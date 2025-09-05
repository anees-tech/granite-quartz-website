"use client";
import Link from "next/link";
import Image from "next/image";
import { GalleryItem } from "@/lib/gallery";

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No gallery items available.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(item => {
        
        return (
          <Link
            key={item.id}
            href={`/gallery/${item.id}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full h-56">
              <Image
                src={item.mainImageUrl || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              {typeof item.averageRating === "number" && (
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={star <= Math.round(item.averageRating ?? 0) ? "text-yellow-400 text-base" : "text-gray-300 text-base"}>★</span>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{(item.averageRating ?? 0).toFixed(1)} / 5</span>
                  {item.reviewCount !== undefined && item.reviewCount > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground">({item.reviewCount} review{item.reviewCount > 1 ? 's' : ''})</span>
                  )}
                </div>
              )}
              <p className="text-sm text-gray-500 mb-1">{item.category}</p>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
