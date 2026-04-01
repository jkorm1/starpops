"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, X, Heart, Share2, Volume2, VolumeX } from "lucide-react";

// Example high-quality images - replace with your actual images
const showcaseImages = [
  {
    id: 1,
    src: "/image1.jpg",
    alt: "Elegant popcorn presentation",
    category: "Product",
    featured: true,
  },
  {
    id: 2,
    src: "/enjoy1.jpg",
    alt: "People enjoying Starpops popcorn",
    category: "Lifestyle",
    featured: false,
  },
  {
    id: 3,
    src: "/image2.jpg",
    alt: "Premium popcorn varieties",
    category: "Product",
    featured: false,
  },
  {
    id: 4,
    src: "/enjoy2.jpg",
    alt: "Happy customers with popcorn",
    category: "Lifestyle",
    featured: false,
  },
  {
    id: 5,
    src: "/image3.jpg",
    alt: "Artistic popcorn arrangement",
    category: "Product",
    featured: false,
  },
  {
    id: 6,
    src: "/enjoy3.jpg",
    alt: "Couple sharing popcorn",
    category: "Lifestyle",
    featured: false,
  },
  {
    id: 7,
    src: "/image4.jpg",
    alt: "Couple sharing popcorn",
    category: "Lifestyle",
    featured: false,
  },
  {
    id: 8,
    src: "/enjoy5.jpg",
    alt: "Couple sharing popcorn",
    category: "Lifestyle",
    featured: false,
  },
  {
    id: 9,
    src: "/enjoy6.jpg",
    alt: "Couple sharing popcorn",
    category: "Lifestyle",
    featured: false,
  },
];

// Video data with local video paths
const showcaseVideos = [
  {
    id: 1,
    src: "/video1.mov",
    thumbnail: "/thumbnail1.jpg",
    title: "Starpops Magic",
    description: "Experience the enchanting journey of our premium popcorn.",
  },
  {
    id: 2,
    src: "/video3.mov",
    thumbnail: "/thumbnail3.jpg",
    title: "Flavor Explosion",
    description: "Discover the unique flavors that make Starpops special.",
  },
  {
    id: 3,
    src: "/video2.mov",
    thumbnail: "/thumbnail2.jpg",
    title: "Crafting Perfection",
    description: "Watch our artisans create the perfect popcorn with passion.",
  },
  {
    id: 4,
    src: "/video3.mov",
    thumbnail: "/thumbnail3.jpg",
    title: "Flavor Explosion",
    description: "Discover the unique flavors that make Starpops special.",
  },
  {
    id: 5,
    src: "/video4.mov",
    thumbnail: "/thumbnail4.jpg",
    title: "Joy in Every Kernel",
    description:
      "Real stories from our customers experiencing the Starpops magic.",
  },
];

export function Showcase() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [videoSoundEnabled, setVideoSoundEnabled] = useState<
    Record<number, boolean>
  >({});
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Handle video auto-play when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = parseInt(
            entry.target.getAttribute("data-index") || "0",
          );
          const video = videoRefs.current[videoIndex];

          if (video) {
            if (entry.isIntersecting) {
              // Play video without sound when in view
              video.play().catch((error) => {
                console.error("Error auto-playing video:", error);
              });
            } else {
              // Pause video when out of view
              video.pause();
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Toggle sound for a specific video
  const toggleVideoSound = (videoId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const video = videoRefs.current[videoId];
    if (video) {
      video.muted = !video.muted;
      setVideoSoundEnabled({
        ...videoSoundEnabled,
        [videoId]: !video.muted,
      });
    }
  };

  // Open video in modal with sound enabled
  const openVideoModal = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
  };

  return (
    <section ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-pink-500/5 to-transparent rounded-full filter blur-3xl animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Experience <span className="glow-text-gold">Starpops</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Discover the art of popcorn. Each kernel tells a story of passion,
            craftsmanship, and pure joy.
          </p>
        </motion.div>

        {/* Featured Image with Layered Effect */}
        <div className="mb-32 relative">
          <motion.div
            style={{ y: y1, opacity }}
            className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={showcaseImages[0].src}
              alt={showcaseImages[0].alt}
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-primary/80 text-white rounded-full">
                Featured
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Art of Popcorn
              </h3>
              <p className="text-white/80 text-lg max-w-2xl">
                Each batch of Starpops is crafted with meticulous attention to
                detail, ensuring every kernel delivers an explosion of flavor.
              </p>
            </div>
          </motion.div>

          {/* Layered images behind the main image */}
          <motion.div
            style={{ y: y2 }}
            className="absolute -top-8 -right-8 w-64 h-64 rounded-2xl overflow-hidden shadow-xl z-0 hidden md:block"
          >
            <img
              src={showcaseImages[1].src}
              alt={showcaseImages[1].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-8 -left-8 w-64 h-64 rounded-2xl overflow-hidden shadow-xl z-0 hidden md:block"
          >
            <img
              src={showcaseImages[2].src}
              alt={showcaseImages[2].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Masonry-style Image Grid */}
        <div className="mb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Moments of <span className="text-primary">Joy</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseImages.slice(3).map((image, idx) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-500 ${hoveredImage === image.id ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-medium bg-primary/80 text-white rounded-full">
                      {image.category}
                    </span>
                    <p className="text-white font-medium">{image.alt}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Like</span>
                      </button>
                      <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Showcase - Appetizing Layout */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Experience <span className="text-primary">Starpops Magic</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch how our passion transforms simple ingredients into
              extraordinary moments
            </p>
          </motion.div>

          {/* Featured Video - Large & Prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div
              className="relative bg-black cursor-pointer group"
              onClick={() => openVideoModal(showcaseVideos[0].src)}
            >
              <div className="w-full aspect-video md:aspect-[16/9] overflow-hidden relative">
                <video
                  ref={(el) => (videoRefs.current[0] = el)}
                  src={showcaseVideos[0].src}
                  poster={showcaseVideos[0].thumbnail}
                  muted={!videoSoundEnabled[0]}
                  loop
                  playsInline
                  data-index={0}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex flex-col items-center justify-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl"
                  >
                    <Play className="w-10 h-10 text-white ml-2" />
                  </motion.div>
                  <div className="text-center">
                    <h4 className="text-white font-bold text-2xl md:text-3xl mb-2">
                      {showcaseVideos[0].title}
                    </h4>
                    <p className="text-white/80 text-lg">
                      {showcaseVideos[0].description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => toggleVideoSound(0, e)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors z-10"
                >
                  {videoSoundEnabled[0] ? (
                    <Volume2 className="w-6 h-6 text-white" />
                  ) : (
                    <VolumeX className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Video Grid - Mobile & Desktop Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {showcaseVideos.slice(1).map((video, idx) => {
              const videoIdx = idx + 1;
              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => openVideoModal(video.src)}
                >
                  <div className="w-full aspect-video bg-black relative">
                    <video
                      ref={(el) => (videoRefs.current[videoIdx] = el)}
                      src={video.src}
                      poster={video.thumbnail}
                      muted={!videoSoundEnabled[videoIdx]}
                      loop
                      playsInline
                      data-index={videoIdx}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex flex-col items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-primary transition-colors"
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </motion.div>
                    </div>
                    <button
                      onClick={(e) => toggleVideoSound(videoIdx, e)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors z-10"
                    >
                      {videoSoundEnabled[videoIdx] ? (
                        <Volume2 className="w-4 h-4 text-white" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-bold text-base md:text-lg mb-1">
                      {video.title}
                    </h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={selectedVideo}
              autoPlay
              controls
              className="w-full aspect-[9/16] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
