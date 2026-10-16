import React from 'react';
import { X, Search, Globe, CheckCircle, Code } from 'lucide-react';

interface SEOSERPInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
  currentDescription: string;
  currentUrl: string;
}

export const SEOSERPInspector: React.FC<SEOSERPInspectorProps> = ({
  isOpen,
  onClose,
  currentTitle,
  currentDescription,
  currentUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">Google SERP & AI Snippet Inspector</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-5 text-xs">
          {/* Google Preview Snippet */}
          <div>
            <h4 className="text-slate-400 uppercase tracking-wider text-[11px] font-bold mb-2">
              Google Search Result Snippet Simulation
            </h4>
            <div className="p-4 rounded-2xl bg-white text-slate-900 shadow-md">
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>auradirectory.com{currentUrl}</span>
              </div>
              <h3 className="text-base text-blue-700 hover:underline font-medium cursor-pointer mb-1 line-clamp-1">
                {currentTitle}
              </h3>
              <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                {currentDescription}
              </p>
            </div>
          </div>

          {/* Verification signals */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Structured Data & Grounding
            </h4>
            <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px]">
              <li>Schema.org JSON-LD Person / WebSite tags embedded dynamically.</li>
              <li>BreadcrumbList hierarchical location structured data active.</li>
              <li>OpenGraph and Twitter Card social preview metadata synchronized.</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
};
