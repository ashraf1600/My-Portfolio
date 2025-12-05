import React, { useState } from "react";
import { research } from "../../constants";
import { FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";

const categories = ["All", "Machine Learning", "Computer Vision", "Software Engineering", "Healthcare AI"];

const Research = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredResearch =
        selectedCategory === "All"
            ? research
            : research.filter((paper) => paper.category === selectedCategory);

    const getStatusColor = (status) => {
        switch (status) {
            case "Published":
                return "bg-green-500/20 text-green-400 border-green-500";
            case "Under Review":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
            case "In Progress":
                return "bg-blue-500/20 text-blue-400 border-blue-500";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500";
        }
    };

    return (
        <section
            id="research"
            className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans"
        >
            {/* Section Title */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white">RESEARCH</h2>
                <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
                <p className="text-gray-400 mt-4 text-lg font-semibold">
                    My research contributions in Machine Learning, AI, and Computer Science
                </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === category
                                ? "bg-purple-600 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-purple-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Research Papers Grid */}
            <div className="grid gap-8 grid-cols-1">
                {filteredResearch.map((paper) => (
                    <div
                        key={paper.id}
                        className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-purple-500/50 hover:-translate-y-1 transition-transform duration-300"
                    >
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {paper.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-2">{paper.authors}</p>
                                <p className="text-purple-400 text-sm font-semibold">
                                    {paper.conference} • {paper.year}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-4">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                        paper.status
                                    )}`}
                                >
                                    {paper.status}
                                </span>
                            </div>
                        </div>

                        {/* Abstract */}
                        <p className="text-gray-300 mb-4 leading-relaxed">{paper.abstract}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {paper.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-3 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                <FaExternalLinkAlt size={14} />
                                View Paper
                            </a>
                            <button className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold transition">
                                <FaFilePdf size={14} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredResearch.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">
                        No research papers found in this category.
                    </p>
                </div>
            )}
        </section>
    );
};

export default Research;
