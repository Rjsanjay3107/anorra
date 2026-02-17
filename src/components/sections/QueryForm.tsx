"use client";

import { useState } from 'react';
import { Button } from '@/components/ui';
import { queryFormSubjects } from '@/data/content';
import { useUIStore } from '@/stores/uiStore';

const defaultValues = { name: '', email: '', subject: '', message: '', consent: false, honeypot: '' };

export function QueryForm() {
  const { isFormSubmitting, formSubmitStatus, setFormSubmitting, setFormSubmitStatus } = useUIStore();
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Name required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.subject) newErrors.subject = 'Please select';
    if (!formData.message || formData.message.length < 10) newErrors.message = 'Message required';
    if (!formData.consent) newErrors.consent = 'Consent required';
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

  if (formSubmitStatus === 'success') {
    return (
      <section id="contact" className="py-16 lg:py-24 bg-[var(--color-background)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-bg-card)] rounded-lg p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-normal text-[var(--color-text)] font-serif mb-4">Thank You</h2>
            <p className="text-[var(--color-textMuted)] mb-6">We'll be in touch soon.</p>
            <Button onClick={() => setFormSubmitStatus('idle')} variant="outline">Send Another</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[var(--color-background)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-text)] font-serif mb-4">Get in Touch</h2>
          <p className="text-[var(--color-textMuted)] text-lg">Let's create something meaningful together</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6 bg-[var(--color-bg-card)] p-8 rounded-lg">
          <input type="hidden" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} tabIndex={-1} autoComplete="off" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-textMuted)] mb-2">Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-textMuted)] mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-textMuted)] mb-2">Enquiry Type</label>
            <select
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              <option value="">Select...</option>
              {queryFormSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--color-textMuted)] mb-2">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none"
            />
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              <span className="text-sm text-[var(--color-textMuted)]">I agree to the Privacy Policy</span>
            </label>
            {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent}</p>}
          </div>

          {formSubmitStatus === 'error' && (
            <div className="p-4 bg-red-100 border border-red-300 rounded-md text-red-600">Please try again.</div>
          )}

          <Button type="submit" variant="primary" size="lg" isLoading={isFormSubmitting} className="w-full">Send Enquiry</Button>
        </form>
      </div>
    </section>
  );
}
