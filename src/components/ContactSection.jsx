import React from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';

export function ContactSection({ socials, personal }) {
  const FacebookIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );

  const contactLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      url: socials?.facebook || "https://facebook.com",
      label: "Connect on Facebook",
      color: "#1877F2",
      bgLight: "rgba(24, 119, 242, 0.08)"
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      url: socials?.instagram || "https://instagram.com",
      label: "@samihabushra",
      color: "#E1306C",
      bgLight: "rgba(225, 48, 108, 0.08)"
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={22} />,
      url: socials?.whatsapp || "https://wa.me/8801700000000",
      label: "Send a Message",
      color: "#25D366",
      bgLight: "rgba(37, 211, 102, 0.08)"
    },
    {
      name: "Gmail / Email",
      icon: <Mail size={22} />,
      url: `mailto:${socials?.email || "samihabushra@gmail.com"}`,
      label: socials?.email || "samihabushra@gmail.com",
      color: "#EA4335",
      bgLight: "rgba(234, 67, 53, 0.08)"
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Connect & Say Hello</span>
          <h2 className="section-title">Get in Touch</h2>
        </div>

        <div className="contact-grid">
          {contactLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              style={{
                '--hover-color': item.color,
                '--hover-bg': item.bgLight
              }}
            >
              <div
                className="contact-icon-bubble"
                style={{ color: item.color, backgroundColor: item.bgLight }}
              >
                {item.icon}
              </div>
              <div className="contact-card-info">
                <h4>{item.name}</h4>
                <span>{item.label}</span>
              </div>
              <Send size={16} className="contact-arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
