"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface GalleryItem {
  _id: string
  title: string
  imageUrl: string
  category: string
}

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [categories, setCategories] = useState<string[]>([])
  const [isAlbumOpen, setIsAlbumOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery")
        if (!response.ok) {
          throw new Error("Failed to fetch gallery")
        }
        const data = await response.json()
        setImages(data)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((item: GalleryItem) => item.category)))
        setCategories(["all", ...uniqueCategories] as string[]) // Include "all"
        setLoading(false)
      } catch (error) {
        console.error("Error fetching gallery:", error)
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((image) => image.category.toLowerCase() === activeCategory.toLowerCase())

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsAlbumOpen(true)
  }

  const closeAlbum = () => {
    setIsAlbumOpen(false)
    setSelectedImageIndex(null)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 h-10 w-64 rounded-md animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Filter */}
      <div className="flex justify-center mb-8 overflow-x-auto">
        <div className="flex space-x-2 p-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md capitalize whitespace-nowrap ${
                activeCategory === category ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <motion.div
            key={image._id}
            className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => handleImageClick(index)}
          >
            <Image src={image.imageUrl || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm">
              {image.category}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Album Modal */}
      <AnimatePresence>
        {isAlbumOpen && selectedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAlbum}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <button onClick={closeAlbum} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
                X
              </button>
              <div className="relative max-w-5xl w-full h-full" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={filteredImages[selectedImageIndex].imageUrl || "/placeholder.svg"}
                  alt={filteredImages[selectedImageIndex].title}
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                  <p className="font-semibold text-lg">{filteredImages[selectedImageIndex].category}</p>
                  <p className="text-gray-300">{filteredImages[selectedImageIndex].description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
