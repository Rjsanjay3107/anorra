import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, label, id, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <input ref={ref} id={id} className={clsx('w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500', 'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent', 'transition-all duration-300', error && 'border-red-500 focus:ring-red-500', className)} {...props} />
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
export { Input };
