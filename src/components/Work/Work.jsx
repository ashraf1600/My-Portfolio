import { useState, useEffect, useCallback, useMemo } from "react";
import { projects } from "../../constants";
import {
  HiChevronLeft,
  HiChevronRight,
  HiX,
  HiStar,
  HiCode,
  HiExternalLink,
  HiCheckCircle,
} from "react-icons/hi";

const categories = [
  "All",
  "Academic Project",
  "Web Development",
  "Machine Learning",
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setCurrentImgIndex(0);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setCurrentImgIndex(0);
    document.body.style.overflow = "";
  };

  const getScreenshots = (project) =>
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.image];

  const nextImage = useCallback(() => {
    if (!selectedProject) return;
    const total = getScreenshots(selectedProject).length;
    setCurrentImgIndex((prev) => (prev + 1) % total);
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (!selectedProject) return;
    const total = getScreenshots(selectedProject).length;
    setCurrentImgIndex((prev) => (prev - 1 + total) % total);
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKey = (e) => {
      if (e.key === "Escape") handleCloseModal();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedProject, nextImage, prevImage]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((project) =>
      Array.isArray(project.category)
        ? project.category.includes(selectedCategory)
        : project.category === selectedCategory
    );
  }, [selectedCategory]);

  const stats = useMemo(
    () => ({
      total: projects.length,
      featured: projects.filter((p) => p.featured).length,
      live: projects.filter((p) => p.webapp && p.webapp !== p.github).length,
    }),
    []
  );

  return (
    <section
      id="work"
      className="py-24 px-[10vw] md:px-[6vw] lg:px-[14vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-purple-600 dark:text-purple-400 uppercase mb-3">
          Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
          Featured Projects
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          A curated showcase of the projects I have engineered across web
          development and machine learning — each one shipping production-grade
          code.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {stats.total}
            </span>{" "}
            Projects
          </div>
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {stats.featured}
            </span>{" "}
            Featured
          </div>
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {stats.live}
            </span>{" "}
            Live Deployments
          </div>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                : "bg-white dark:bg-gray-900/60 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700/50 hover:border-purple-500/50 hover:scale-105 hover:text-purple-600 dark:hover:text-purple-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const shotCount = getScreenshots(project).length;
          return (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className="group relative bg-white dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden cursor-pointer border border-slate-200 dark:border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  <HiStar size={12} />
                  Featured
                </div>
              )}

              {/* Screenshot count badge */}
              {shotCount > 1 && (
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium">
                  📸 {shotCount} screenshots
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-gray-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white text-xs font-semibold tracking-wider uppercase border border-white/40 rounded-full px-4 py-1.5 backdrop-blur-sm">
                    View Details
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block text-[11px] font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-md px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="inline-block text-[11px] font-medium text-slate-500 dark:text-gray-500 px-2 py-0.5">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-gray-500 text-lg">
            No projects in this category yet.
          </p>
        </div>
      )}

      {/* Modal Container */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-purple-500/20 w-full max-w-4xl overflow-hidden relative border border-slate-200 dark:border-purple-500/30 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-5 py-3 bg-gradient-to-b from-black/70 to-transparent">
              <div className="flex items-center gap-2 text-white">
                {selectedProject.featured && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[10px] font-bold uppercase tracking-wider">
                    <HiStar size={12} />
                    Featured
                  </span>
                )}
                <span className="text-xs font-medium opacity-80">
                  {Array.isArray(selectedProject.category)
                    ? selectedProject.category.join(" · ")
                    : selectedProject.category}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-purple-300 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
                aria-label="Close"
              >
                <HiX size={22} />
              </button>
            </div>

            {/* Gallery */}
            <div className="relative w-full bg-slate-100 dark:bg-gray-950">
              <div className="relative w-full flex items-center justify-center min-h-[300px] md:min-h-[420px] py-12 px-4">
                {getScreenshots(selectedProject).length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-3 md:left-6 z-10 p-3 rounded-full bg-black/60 hover:bg-purple-600 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <HiChevronLeft size={24} />
                  </button>
                )}

                <img
                  src={getScreenshots(selectedProject)[currentImgIndex]}
                  alt={`${selectedProject.title} screenshot ${
                    currentImgIndex + 1
                  }`}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
                />

                {getScreenshots(selectedProject).length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-3 md:right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-purple-600 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <HiChevronRight size={24} />
                  </button>
                )}

                {/* Image counter pill */}
                {getScreenshots(selectedProject).length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                    {currentImgIndex + 1} /{" "}
                    {getScreenshots(selectedProject).length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {getScreenshots(selectedProject).length > 1 && (
                <div className="flex justify-center gap-2 pb-4 px-4 flex-wrap">
                  {getScreenshots(selectedProject).map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        idx === currentImgIndex
                          ? "border-purple-500 scale-105 shadow-lg shadow-purple-500/30"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-purple-400/50"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-slate-600 dark:text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Highlights */}
              {selectedProject.highlights &&
                selectedProject.highlights.length > 0 && (
                  <div className="mb-6 bg-slate-50 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-700/50 rounded-xl p-5">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-gray-300"
                        >
                          <HiCheckCircle
                            size={18}
                            className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/15 dark:to-pink-500/15 border border-purple-500/30 text-xs font-semibold text-purple-700 dark:text-purple-300 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={selectedProject.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => !selectedProject.github && e.preventDefault()}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedProject.github
                      ? "bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 hover:scale-[1.02]"
                      : "bg-slate-100 dark:bg-gray-800/40 text-slate-400 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <HiCode size={18} />
                  View Code
                </a>
                <a
                  href={selectedProject.webapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200 hover:scale-[1.02]"
                >
                  <HiExternalLink size={18} />
                  View Live
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
