import React, { useState } from 'react';
import { MessageSquare, Copy, Check, ExternalLink, X, Share2 } from 'lucide-react';
import {
  CalculationResults,
  CalculatorInputs,
  generateWhatsAppEstimateText,
} from '../utils/calculator';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  isOpen,
  onClose,
  inputs,
  results,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawText = generateWhatsAppEstimateText(inputs, results);
  const encodedUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(rawText)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = rawText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendWhatsApp = () => {
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Send Estimate to WhatsApp
              </h3>
              <p className="text-xs text-slate-400">
                Instantly forward live BOQ to clients, contractors & suppliers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formatted Markdown Preview */}
        <div className="space-y-1.5 flex-1 overflow-hidden flex flex-col">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Formatted Message Preview:</span>
            <span className="text-[11px] text-emerald-400 font-mono">100% WhatsApp Markdown</span>
          </label>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-y-auto font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed flex-1 select-all shadow-inner">
            {rawText}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700 active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Raw Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Open in WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
};
