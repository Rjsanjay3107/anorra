"use client";

import { useState } from 'react';
import { Button, Input, Textarea, Select, Checkbox } from '@/components/ui';
import { queryFormSubjects } from '@/data/content';
import { useUIStore } from '@/stores/uiStore';

const defaultValues = { name: '', email: '', subject: '', message: '', consent: false, honeypot: '' };

export function QueryForm() {
  const { isFormSubmitting, formSubmitStatus, setFormSubmitting, setFormSubmitStatus, openPrivacyModal } = useUIStore();
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message || formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    if (!formData.consent) newErrors.consent = 'You must agree to the privacy policy';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) { setFormSubmitStatus('success'); return; }
    if (!validate()) return;
    setFormSubmitting(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error('Failed');
      setFormSubmitStatus('success');
      setFormData(defaultValues);
    } catch { setFormSubmitStatus('error'); }
    finally { setFormSubmitting(false); }
  };

  const selectOptions = queryFormSubjects.map(s => ({ value: s, label: s }));

  if (formSubmitStatus === 'success') {
    return (
      <section id="contact" className="py-16 lg:py-24 bg-[#1A1A1A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0D0D0D] rounded-xl p-8 lg:p-12 text-center">
            <div className="w-20 h-20 bg-[#C9A962]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#C9A962]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif mb-4">Thank You!</h2>
            <p className="text-gray-300 mb-6">Your enquiry has been submitted successfully.</p>
            <Button onClick={() => setFormSubmitStatus('idle')} variant="outline">Send Another Enquiry</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#1A1A1A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif mb-4">Request a Bespoke Quote</h2>
          <p className="text-gray-400 text-lg">Tell us about your project</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6 bg-[#0D0D0D] p-8 rounded-xl">
          <input type="hidden" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} tabIndex={-1} autoComplete="off" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
            <select
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C9A962] appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
            >
              <option value="" className="text-gray-400 bg-[#1A1A1A]">Select a subject</option>
              {queryFormSubjects.map(s => <option key={s} value={s} className="bg-[#1A1A1A] text-white">{s}</option>)}
            </select>
            {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project requirements..."
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A962] resize-none"
            />
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="w-5 h-5 mt-0.5 rounded border-2 border-white/20 bg-white/5 text-[#C9A962] focus:ring-[#C9A962]"
              />
              <span className="text-sm text-gray-300">
                I agree to the Privacy Policy and consent to my data being processed.
              </span>
            </label>
            {errors.consent && <p className="mt-1 text-sm text-red-500 ml-8">{errors.consent}</p>}
          </div>

          {formSubmitStatus === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              Something went wrong. Please try again.
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" isLoading={isFormSubmitting} className="w-full">
            Request a Bespoke Quote
          </Button>
        </form>
      </div>
    </section>
  );
}
