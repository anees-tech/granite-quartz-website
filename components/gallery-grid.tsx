"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface GalleryItem {
  id: number
  title: string
  category: string
  material: string
  image: string
  description: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  categories: string[]
}

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredItems, setFilteredItems] = useState(items)
  const [isLoading, setIsLoading] = useState(false)
  const [visibleItems, setVisibleItems] = useState(6)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      if (activeCategory === "All") {
        setFilteredItems(items)
      } else {
        setFilteredItems(items.filter((item) => item.category === activeCategory))
      }
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [activeCategory, items])

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6)
  }

  const displayedItems = filteredItems.slice(0, visibleItems)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === activeCategory ? "default" : "outline"}
            size="sm"
            className="mb-2 transition-all duration-200"
            onClick={() => {
              setActiveCategory(category)
              setVisibleItems(6)
            }}
          >
            {category === "All" && <Filter className="w-4 h-4 mr-2" />}
            {category}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="w-full h-64 bg-muted animate-pulse"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-3 bg-muted animate-pulse rounded mb-2 w-2/3"></div>
                <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {displayedItems.map((item, index) => (
            <Card
              key={item.id}
              className={cn(
                "overflow-hidden hover:shadow-lg transition-all duration-300 group opacity-0 animate-in fade-in slide-in-from-bottom-4",
                "animation-delay-" + (index % 3) * 100,
              )}
              style={{
                animationDelay: `${(index % 3) * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/gallery/${item.id}`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="transform scale-90 group-hover:scale-100 transition-transform duration-200"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
                <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                  <Badge className="bg-primary/90 backdrop-blur-sm">{item.category}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-primary font-medium mb-2">{item.material}</p>
                <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                <Link
                  href={`/gallery/${item.id}`}
                  className="text-primary hover:underline flex items-center group/link"
                >
                  View Project
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!isLoading && visibleItems < filteredItems.length && (
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={handleLoadMore}
            className="hover:scale-105 transition-transform duration-200 bg-transparent"
          >
            Load More Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* No Results */}
      {!isLoading && filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try selecting a different category to see more projects.</p>
        </div>
      )}
    </div>
  )
}
