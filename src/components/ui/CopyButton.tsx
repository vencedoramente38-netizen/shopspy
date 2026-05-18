import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  size?: number;
}

export function CopyButton({ value, size = 14 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className="transition-all duration-200 hover:brightness-125 active:scale-95 shadow-sm"
      style={{
        width: 32, height: 32, borderRadius: 10,
        background: 'rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: copied ? 'default' : 'pointer',
        position: 'relative',
        flexShrink: 0
      }}
    >
      <div style={{
        position: 'absolute',
        transition: 'all 0.2s ease',
        transform: copied ? 'scale(0)' : 'scale(1)',
        opacity: copied ? 0 : 0.8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Copy size={size} color="white" />
      </div>
      <div style={{
        position: 'absolute',
        transition: 'all 0.2s ease',
        transform: copied ? 'scale(1)' : 'scale(0)',
        opacity: copied ? 1 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Check size={size} color="#22C55E" strokeWidth={3} />
      </div>
    </button>
  );
}
