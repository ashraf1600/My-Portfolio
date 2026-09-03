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
  tint: "bg-gray-500/10 text-gray-600 dark:text-gray-300 border-gray-500/30",
  accent: "from-gray-500 to-gray-500",
  initial: cert.issuer?.[0] || "â€¢",
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
      className="group bg-white dark:bg-[#111b2e] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header: logo + provider chip */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div
          className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border ${provider.tint} overflow-hidden bg-white dark:bg-[#0b1121]`}
        >
          <img
            src={cert.logo}
            alt={cert.issuer}
            className="w-7 h-7 object-contain mix-blend-multiply dark:mix-blend-normal"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider rounded-md px-2 py-1 border ${provider.tint}`}
        >
          {cert.issuer}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white leading-tight mb-3 line-clamp-3">
        {cert.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <FaCalendarAlt size={10} className="opacity-70" />
          <span>Issued {issuedFormatted}</span>
        </div>
        {cert.expiryDate && (
          <div
            className={`flex items-center gap-1.5 ${
              expired
                ? "text-red-500 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <FaShieldAlt size={10} className="opacity-70" />
            <span>{expired ? "Expired" : "Valid till"} {formatDate(cert.expiryDate)}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {cert.skills.slice(0, 3).map((skill, idx) => (
          <span
            key={idx}
            className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
          >
            {skill}
          </span>
        ))}
        {cert.skills.length > 3 && (
          <span className="text-[11px] text-gray-400 self-center">
            +{cert.skills.length - 3}
          </span>
        )}
      </div>

      {/* Footer actions */}
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpen(cert)}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Details <HiArrowUpRight size={12} />
        </button>
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Verify <FaExternalLinkAlt size={10} />
        </a>
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
          className="relative bg-white dark:bg-[#0b1121] rounded-2xl max-w-3xl w-full border border-gray-200 dark:border-white/10 shadow-xl my-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full p-2 transition z-10"
          aria-label="Close"
        >
          <FaTimes size={16} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 border ${provider.tint} bg-white dark:bg-[#111b2e]`}
            >
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.outerHTML = `<span class="text-xl font-bold font-serif">${provider.initial}</span>`;
                  }}
                />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 dark:text-white mb-2 leading-tight">
              {cert.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
              {cert.organization}
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-500 text-xs font-medium">
              <span>Issued {formatDate(cert.date)}</span>
              {cert.expiryDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span
                    className={
                      expired
                        ? "text-red-500 dark:text-red-400"
                        : "text-gray-500 dark:text-gray-500"
                    }
                  >
                    {expired ? "Expired" : "Valid"} {formatDate(cert.expiryDate)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
              Overview
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {cert.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              Skills Acquired
            </h3>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-full px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Credential info */}
          <div className="bg-gray-50 dark:bg-[#111b2e] rounded-xl p-5 mb-8 border border-gray-100 dark:border-white/5">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              Credential Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-0.5">Credential ID</span>
                <span className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                  {cert.credentialId}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-0.5">Issued By</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cert.organization}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition"
            >
              Verify Credential <HiArrowUpRight size={14} />
            </a>
          </div>
        </div>
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
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase mb-3">
          Continuous Learning
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Certifications
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
        
        {/* Simple Stats Row */}
        <div className="flex justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div><span className="font-bold text-gray-900 dark:text-white">{certifications.length}</span> Certs</div>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div><span className="font-bold text-gray-900 dark:text-white">{providers.length}</span> Providers</div>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div><span className="font-bold text-gray-900 dark:text-white">{certifications.reduce((sum, c) => sum + c.skills.length, 0)}</span> Skills</div>
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
