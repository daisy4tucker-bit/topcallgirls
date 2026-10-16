import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AgeGateModalProps {
  onVerified: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ onVerified }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('aura_age_verified')) {
        onVerified();
        return;
      }
    } catch (e) {}
    setIsOpen(true);
  }, [onVerified]);

  const handleConfirm = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('aura_age_verified', 'true');
      }
    } catch (e) {}
    setIsOpen(false);
    onVerified();
  };

  const handleDecline = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-900/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
          Adult Content Notice (18+)
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Age Verification Required
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          This website contains adult directory listings and commercial advertisement material intended strictly for consenting adults aged <strong>18 years or older</strong>.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I am 18 or older – Enter</span>
          </button>

          <button
            onClick={handleDecline}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-400 hover:text-white font-medium text-xs transition-colors"
          >
            I am under 18 – Exit
          </button>
        </div>

        <p className="text-[11px] text-slate-500 mt-5">
          By entering, you confirm you are at least 18 years of age and agree to our Terms of Use and Community Safety Standards.
        </p>
      </div>
    </div>
  );
};
