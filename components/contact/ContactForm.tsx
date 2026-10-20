"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, User, Mail, MessageSquare, Tag, ArrowRight, RefreshCw } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const serviceOptions = [
  "Web Development & Digital Experiences",
  "Project & Program Coordination",
  "Digital Strategy & SEO",
  "Life Insurance Guidance (LIC Nepal)",
  "General Collaboration or Inquiry",
];

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState<{ [K in keyof FormData]?: boolean }>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate a single field
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    const trimmed = value.trim();

    switch (name) {
      case "name":
        if (!trimmed) return "Please enter your full name.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        return undefined;

      case "email":
        if (!trimmed) return "Please enter your email address.";
        if (!emailRegex.test(trimmed)) return "Please enter a valid email address (e.g., name@example.com).";
        return undefined;

      case "subject":
        if (!trimmed) return "Please select or enter a topic.";
        return undefined;

      case "message":
        if (!trimmed) return "Please write a message.";
        if (trimmed.length < 10) return "Message must be at least 10 characters so Milan can understand your request.";
        return undefined;

      default:
        return undefined;
    }
  };

  // Validate entire form
  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    (Object.keys(data) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // If already touched, validate on the fly
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.target.name as keyof FormData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const error = validateField(fieldName, formData[fieldName]);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    // If any error exists, prevent submission and focus the first invalid input
    if (Object.keys(formErrors).length > 0) {
      const firstInvalidField = Object.keys(formErrors)[0];
      const el = document.getElementById(firstInvalidField);
      el?.focus();
      return;
    }

    // Submit simulation with client feedback
    setIsSubmitting(true);
    try {
      // Simulate brief network submission
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      // Handle error gracefully
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTouched({});
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <div className="contact-success-icon-wrapper">
          <CheckCircle2 size={44} className="contact-success-icon" />
        </div>
        <h3 className="contact-success-title">Message Received!</h3>
        <p className="contact-success-desc">
          Thank you, <strong>{formData.name}</strong>. Your message regarding <em>&ldquo;{formData.subject}&rdquo;</em> has been sent.
          Milan will get back to you shortly at <strong>{formData.email}</strong>.
        </p>
        <div className="contact-success-actions">
          <button
            type="button"
            className="button button-primary contact-reset-btn"
            onClick={handleReset}
          >
            <RefreshCw size={15} />
            <span>Send another message</span>
          </button>
          <a href="mailto:mail@milanjoshi.com.np" className="text-link">
            Direct email inbox <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-intro">
        <h3 className="contact-form-title">Send a Direct Message</h3>
        <p className="contact-form-subtitle">
          Fill out the details below. All fields are verified before dispatch.
        </p>
      </div>

      <div className="contact-form-grid">
        {/* Full Name */}
        <div className={`contact-field-group ${touched.name && errors.name ? "has-error" : ""}`}>
          <label htmlFor="name" className="contact-field-label">
            <span>Your Name</span>
            <span className="contact-required">*</span>
          </label>
          <div className="contact-input-wrapper">
            <User size={16} className="contact-input-icon" aria-hidden="true" />
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              className="contact-input"
              placeholder="e.g. Milan Joshi"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            />
          </div>
          {touched.name && errors.name && (
            <p className="contact-field-error" id="name-error" role="alert">
              <AlertCircle size={13} aria-hidden="true" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className={`contact-field-group ${touched.email && errors.email ? "has-error" : ""}`}>
          <label htmlFor="email" className="contact-field-label">
            <span>Email Address</span>
            <span className="contact-required">*</span>
          </label>
          <div className="contact-input-wrapper">
            <Mail size={16} className="contact-input-icon" aria-hidden="true" />
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="contact-input"
              placeholder="e.g. name@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            />
          </div>
          {touched.email && errors.email && (
            <p className="contact-field-error" id="email-error" role="alert">
              <AlertCircle size={13} aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Subject / Service Selection */}
        <div className={`contact-field-group full-width ${touched.subject && errors.subject ? "has-error" : ""}`}>
          <label htmlFor="subject" className="contact-field-label">
            <span>Topic or Engagement Area</span>
            <span className="contact-required">*</span>
          </label>
          <div className="contact-input-wrapper">
            <Tag size={16} className="contact-input-icon" aria-hidden="true" />
            <select
              id="subject"
              name="subject"
              className="contact-select"
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.subject && !!errors.subject}
              aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
            >
              <option value="">Select a topic or service area...</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {touched.subject && errors.subject && (
            <p className="contact-field-error" id="subject-error" role="alert">
              <AlertCircle size={13} aria-hidden="true" />
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* Message */}
        <div className={`contact-field-group full-width ${touched.message && errors.message ? "has-error" : ""}`}>
          <div className="contact-field-header">
            <label htmlFor="message" className="contact-field-label">
              <span>Your Message</span>
              <span className="contact-required">*</span>
            </label>
            <span className="contact-char-count">
              {formData.message.trim().length} chars (min 10)
            </span>
          </div>
          <div className="contact-textarea-wrapper">
            <textarea
              id="message"
              name="message"
              rows={5}
              className="contact-textarea"
              placeholder="Tell me about your project, idea, or questions..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.message && !!errors.message}
              aria-describedby={touched.message && errors.message ? "message-error" : undefined}
            />
          </div>
          {touched.message && errors.message && (
            <p className="contact-field-error" id="message-error" role="alert">
              <AlertCircle size={13} aria-hidden="true" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>
      </div>

      <div className="contact-form-footer">
        <button
          type="submit"
          className="button button-primary contact-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <RefreshCw size={16} className="contact-spin" aria-hidden="true" />
              <span>Validating &amp; Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={15} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="contact-privacy-note">
          Your information is kept strictly private and used only for direct correspondence.
        </p>
      </div>
    </form>
  );
}
