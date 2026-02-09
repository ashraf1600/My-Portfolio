import React, { useState } from "react";
import { certifications } from "../../constants";
import { FaExternalLinkAlt, FaCertificate, FaTimes } from "react-icons/fa";

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    const openModal = (cert) => {
        setSelectedCert(cert);
    };

    const closeModal = () => {
        setSelectedCert(null);
    };

    return (
        <section
            id="certifications"
            className="py-20 px-[8vw] md:px-[6vw] lg:px-[12vw] font-sans"
        >
            {/* Section Title - Minimal */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-3">CERTIFICATIONS</h2>
                <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Attractive List */}
            <ol className="space-y-6 max-w-4xl mx-auto">
                {certifications.map((cert, index) => (
                    <li 
                        key={cert.id} 
                        className="group flex gap-5 items-start pb-6 border-b border-gray-800/50 hover:border-purple-500/30 transition-colors duration-300 last:border-b-0"
                    >
                        {/* Number Circle */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/60 transition-all duration-300">
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                            </div>
                            <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                        </div>

                        <div className="flex-1 min-w-0 py-1">
                            {/* Title & Organization */}
                            <div className="flex items-baseline gap-3 flex-wrap mb-2">
                                <button
                                    onClick={() => openModal(cert)}
                                    className="text-lg font-bold text-white hover:text-purple-300 cursor-pointer transition group-hover:text-purple-300 duration-300"
                                >
                                    {cert.title}
                                </button>
                                <span className="text-purple-500 font-semibold text-sm">{cert.organization}</span>
                            </div>

                            {/* Date & Meta */}
                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400 flex-wrap">
                                <div className="flex items-center gap-1.5">
                                    <FaCertificate className="text-yellow-500 text-xs" />
                                    <span>{cert.date}</span>
                                </div>
                                {cert.expiryDate && (
                                    <span className="text-gray-500">• Expires: {cert.expiryDate}</span>
                                )}
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {cert.skills.slice(0, 5).map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/40 group-hover:border-purple-500/70 group-hover:bg-purple-500/30 transition-all duration-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {cert.skills.length > 5 && (
                                    <span className="text-gray-500 text-xs px-2 py-1">
                                        +{cert.skills.length - 5}
                                    </span>
                                )}
                            </div>

                            {/* Verify Link */}
                            <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-200 font-semibold text-sm transition-colors duration-300"
                            >
                                <span>View Credential</span>
                                <FaExternalLinkAlt size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </li>
                ))}
            </ol>

            {/* Certificate Modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700 rounded-full p-2 transition z-10"
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Modal Content */}
                        <div className="p-8">
                            {/* Certificate Header */}
                            <div className="text-center mb-8 pb-6 border-b border-gray-700">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 p-1">
                                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                                        <img
                                            src={selectedCert.logo}
                                            alt={selectedCert.organization}
                                            className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {selectedCert.title}
                                </h2>
                                <p className="text-purple-400 text-lg font-semibold mb-2">
                                    {selectedCert.organization}
                                </p>
                                <div className="flex items-center justify-center gap-2 text-gray-400">
                                    <FaCertificate className="text-yellow-400" />
                                    <span>Issued: {selectedCert.date}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-3">About This Certification</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {selectedCert.description}
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-3">Skills Acquired</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCert.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm font-medium text-purple-300 rounded-full px-4 py-2"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Credential Information */}
                            <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Credential Information</h3>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <span className="text-xs text-gray-500">Credential ID: </span>
                                        <span className="text-sm font-mono text-white">{selectedCert.credentialId}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Issued By: </span>
                                        <span className="text-sm text-white">{selectedCert.organization}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <a
                                    href={selectedCert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                                >
                                    <FaExternalLinkAlt />
                                    Verify Credential
                                </a>
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certifications;
