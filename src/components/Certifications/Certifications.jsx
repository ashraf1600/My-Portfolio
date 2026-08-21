import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { certifications } from "../../constants";
import {
  FaExternalLinkAlt,
  FaCertificate,
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { HiAcademicCap, HiArrowUpRight } from "react-icons/hi2";

const providerPalette = {
  Udemy: {
    tint: "bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30",
    accent: "from-purple-500 to-fuchsia-500",
    initial: "U",
  },
  HackerRank: {
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    accent: "from-emerald-500 to-green-500",
    initial: "H",
  },
  Meta: {
    tint: "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/30",
    accent: "from-blue-500 to-sky-500",
    initial: "M",
  },
  "Stanford University": {
    tint: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/30",
    accent: "from-red-500 to-rose-500",
    initial: "S",
  },
};

const getProvider = (cert) => providerPalette[cert.issuer] || {
  tint: "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/30",
  accent: "from-slate-500 to-gray-500",
  initial: cert.issuer?.[0] || "•",
};

const isExpired = (date) => {
  if (!date) return false;
  const d = new Date(date);
  return !isNaN(d.getTime()) && d < new Date();
};

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const CertCard = ({ cert, index, onOpen }) => {
  const provider = getProvider(cert);
  const expired = isExpired(cert.expiryDate);
  const issuedFormatted = formatDate(cert.date);

  return (
    <div
      className="group relative bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 overflow-hidden flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${provider.accent}`} aria-hidden="true" />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header: logo + provider chip */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${provider.tint} overflow-hidden`}
          >
            <img
              src={cert.logo}
              alt={cert.issuer}
              className="w-7 h-7 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2.5 py-1 border ${provider.tint}`}
          >
            <HiAcademicCap size={12} />
            {cert.issuer}
          </span>
        </div>

        {/* Title */}
        <button
          onClick={() => onOpen(cert)}
          className="text-left text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-300 leading-snug mb-3 line-clamp-3"
        >
          {cert.title}
        </button>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-gray-400 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-indigo-500" size={11} />
            <span>Issued {issuedFormatted}</span>
          </div>
          {cert.expiryDate && (
            <div
              className={`flex items-center gap-1.5 ${
                expired
                  ? "text-red-500 dark:text-red-400"
                  : "text-slate-500 dark:text-gray-400"
              }`}
            >
              <FaShieldAlt size={11} />
              <span>{expired ? "Expired" : "Valid till"} {formatDate(cert.expiryDate)}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {cert.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="bg-slate-100 dark:bg-gray-800/60 text-slate-700 dark:text-gray-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200 dark:border-gray-700"
            >
              {skill}
            </span>
          ))}
          {cert.skills.length > 3 && (
            <span className="text-[11px] text-slate-500 dark:text-gray-500 px-1.5 py-1">
              +{cert.skills.length - 3}
            </span>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-gray-700/50 flex items-center justify-between gap-2">
          <button
            onClick={() => onOpen(cert)}
            className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200 font-semibold text-sm transition-colors"
          >
            <span>Details</span>
            <HiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-semibold text-sm transition-colors"
          >
            <FaExternalLinkAlt size={11} />
            <span>Verify</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const CertModal = ({ cert, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const provider = getProvider(cert);
  const expired = isExpired(cert.expiryDate);

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] overflow-y-auto bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 rounded-2xl max-w-3xl w-full border border-indigo-500/30 shadow-2xl shadow-indigo-500/20 my-8"
          onClick={(e) => e.stopPropagation()}
        >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-gray-800/50 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-full p-2 transition z-10"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-slate-200 dark:border-gray-700">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${provider.accent} rounded-full mb-4 p-1`}
            >
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.outerHTML = `<span class="text-2xl font-bold text-slate-900 dark:text-white">${provider.initial}</span>`;
                  }}
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {cert.title}
            </h2>
            <p className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold mb-2">
              {cert.organization}
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-gray-400 text-sm">
              <FaCertificate className="text-yellow-500" />
              <span>Issued {formatDate(cert.date)}</span>
              {cert.expiryDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-600" />
                  <span
                    className={
                      expired
                        ? "text-red-500 dark:text-red-400"
                        : "text-slate-600 dark:text-gray-400"
                    }
                  >
                    {expired ? "Expired" : "Valid"} {formatDate(cert.expiryDate)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <HiAcademicCap className="text-indigo-500" size={20} />
              About This Certification
            </h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              {cert.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" size={18} />
              Skills Acquired
            </h3>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-indigo-500/20 to-teal-500/20 border border-indigo-500/30 text-sm font-medium text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Credential info */}
          <div className="bg-slate-100 dark:bg-gray-800/50 rounded-xl p-4 mb-6 border border-slate-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              Credential Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-slate-500 dark:text-gray-500 block">Credential ID</span>
                <span className="text-sm font-mono text-slate-900 dark:text-white break-all">
                  {cert.credentialId}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-gray-500 block">Issued By</span>
                <span className="text-sm text-slate-900 dark:text-white">{cert.organization}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
            >
              <FaExternalLinkAlt />
              Verify Credential
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-900 dark:text-white rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
      </div>
    </div>,
    document.body
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = "";
  };

  const providers = [...new Set(certifications.map((c) => c.issuer))];

  return (
    <section
      id="certifications"
      className="py-24 px-[8vw] md:px-[6vw] lg:px-[12vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase mb-3">
          Continuous Learning
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
          Certifications
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-teal-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Industry-recognized credentials and coursework from leading
          institutions and platforms.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {certifications.length}
            </span>{" "}
            Certifications
          </div>
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {providers.length}
            </span>{" "}
            Providers
          </div>
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {certifications.reduce((sum, c) => sum + c.skills.length, 0)}
            </span>{" "}
            Skills Covered
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, index) => (
          <CertCard
            key={cert.id}
            cert={cert}
            index={index}
            onOpen={openModal}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedCert && (
        <CertModal cert={selectedCert} onClose={closeModal} />
      )}
    </section>
  );
};

export default Certifications;
