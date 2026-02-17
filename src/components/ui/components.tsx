import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return clsx(inputs);
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, label, id, value, onChange, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <input 
        ref={ref} 
        id={id} 
        value={value}
        onChange={onChange}
        className={cn('w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500', 'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent', 'transition-all duration-300', error && 'border-red-500 focus:ring-red-500', className)} 
        {...props} 
      />
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, label, id, value, onChange, ...props }, ref) => (
  <div className="w-full">
    {label && <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
    <textarea ref={ref} id={id} value={value} onChange={onChange} className={cn('w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500', 'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent', 'transition-all duration-300 resize-none', error && 'border-red-500 focus:ring-red-500', className)} {...props} />
    {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
  </div>
));
Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, error, label, options, id, value, onChange, ...props }, ref) => (
  <div className="w-full">
    {label && <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
    <select ref={ref} id={id} value={value} onChange={onChange} className={cn('w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white', 'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent', 'transition-all duration-300 appearance-none cursor-pointer bg-no-repeat', error && 'border-red-500 focus:ring-red-500', className)} {...props}>
      <option value="" className="text-gray-500">Select a subject</option>
      {options.map(o => <option key={o.value} value={o.value} className="text-gray-900 bg-white">{o.label}</option>)}
    </select>
    {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
  </div>
));
Select.displayName = 'Select';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, error, id, checked, onChange, ...props }, ref) => (
  <div className="w-full">
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
      <input ref={ref} type="checkbox" id={id} checked={checked} onChange={onChange} className={cn('w-5 h-5 mt-0.5 rounded border-2 border-white/20 bg-white/5 text-[#C9A962]', 'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2 focus:ring-offset-[#0D0D0D]', 'transition-all duration-300 cursor-pointer', 'checked:bg-[#C9A962] checked:border-[#C9A962]', className)} {...props} />
      <span className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">{label}</span>
    </label>
    {error && <p className="mt-1 text-sm text-red-500 ml-8" role="alert">{error}</p>}
  </div>
));
Checkbox.displayName = 'Checkbox';

export function Modal({ isOpen, onClose, children, className, size = 'md' }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }) {
  const sizes: Record<string, string> = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-[95vw] max-h-[95vh]' };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[400]" onClick={onClose} />
      <div className={cn('w-full bg-[#0D0D0D] rounded-xl shadow-2xl relative z-[500] overflow-hidden', sizes[size], className)}>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/10">
      <h2 className="text-xl font-semibold text-white font-serif">{children}</h2>
      {onClose && <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>}
    </div>
  );
}

export function ModalContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6', className)}>{children}</div>;
}
