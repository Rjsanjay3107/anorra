"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-bl from-[#1A1A1A] via-[#222222] to-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A962]/6 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjQzhBOTYyIiBmaWxsLW9wYWNpdHk9IjAuMDEiPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-25" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0D0D0D] rounded-xl p-8 lg:p-12 text-center">
            <div className="w-20 h-20 bg-[#C9A962]/20 rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-10 h-10 text-[#C9A962]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif mb-4">Thank You!</h2>
            <p className="text-gray-300 mb-6">Your enquiry has been submitted successfully. Our team will get back to you within 24-48 hours.</p>
            <Button onClick={() => setFormSubmitStatus('idle')} variant="outline">Send Another Enquiry</Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-bl from-[#1A1A1A] via-[#222222] to-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A962]/6 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjQzhBOTYyIiBmaWxsLW9wYWNpdHk9IjAuMDEiPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-25" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif mb-4">Request a Bespoke Quote</h2><p className="text-gray-400 text-lg">Tell us about your project and we'll provide a tailored solution</p></div>
        <form onSubmit={onSubmit} className="space-y-6" aria-label="Contact form">
          <input type="hidden" {...{ value: formData.honeypot, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, honeypot: e.target.value }) }} tabIndex={-1} autoComplete="off" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input id="name" label="Name" placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} />
            <Input id="email" type="email" label="Email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
          </div>
          <Select id="subject" label="Subject" options={selectOptions} value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} error={errors.subject} />
          <Textarea id="message" label="Message" placeholder="Tell us about your project requirements..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} error={errors.message} />
          <Checkbox id="consent" label={<span>I agree to the <button type="button" onClick={openPrivacyModal} className="text-[#C9A962] hover:underline">Privacy Policy</button> and consent to my data being processed.</span>} checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} error={errors.consent} />
          {formSubmitStatus === 'error' && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400" role="alert">Something went wrong. Please try again.</div>}
          <Button type="submit" variant="primary" size="lg" isLoading={isFormSubmitting} className="w-full md:w-auto">Request a Bespoke Quote</Button>
        </form>
      </div>
    </section>
  );
}
