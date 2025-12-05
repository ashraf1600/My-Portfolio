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

            {/* Compact Grid - 3 columns on desktop */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        className="group relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                        {/* Minimal Header */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <img
                                    src={cert.logo}
                                    alt={cert.organization}
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-white truncate group-hover:text-purple-400 transition">
                                    {cert.title}
                                </h3>
                                <p className="text-xs text-gray-400 truncate">{cert.organization}</p>
                            </div>
                        </div>

                        {/* Skills - Compact */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {cert.skills.slice(0, 3).map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-purple-500/10 text-[10px] font-medium text-purple-300 rounded px-2 py-0.5"
                                >
                                    {skill}
                                </span>
                            ))}
                            {cert.skills.length > 3 && (
                                <span className="text-[10px] text-gray-500">+{cert.skills.length - 3}</span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => openModal(cert)}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition"
                            >
                                See Certificate
                            </button>
                        </div>

                        {/* Bottom Row - Date & Link */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <FaCertificate className="text-yellow-500 text-[10px]" />
                                <span>{cert.date}</span>
                            </div>
                            <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs font-semibold transition"
                            >
                                <span>Verify</span>
                                <FaExternalLinkAlt size={10} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

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
