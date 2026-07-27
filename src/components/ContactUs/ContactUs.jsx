// src/components/ContactUs/ContactUs.jsx

import { useRef, useState } from "react";
import useSectionReveal from "../../hooks/useSectionReveal.js";
import "./ContactUs.css";

const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc5cHtVCmSmiZF-9fsq8-2JEmLyyWBp-omQA7HzPz9zmMP_aQ/formResponse";

const ENTRY_IDS = {
  name: "entry.1721799175",
  email: "entry.1370634075",
  message: "entry.1176301202",
};

const ContactUs = () => {
  const sectionRef = useRef(null);
  useSectionReveal(
    sectionRef,
    ".section-06-header, .info-block, .form-group, .submit-btn",
    {
      y: 30,
      stagger: 0.08,
    },
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const iframeRef = useRef(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStatus("sending");

    const form = document.createElement("form");

    form.action = GOOGLE_FORM_ACTION_URL;
    form.method = "POST";
    form.target = "hidden_iframe";

    Object.entries(ENTRY_IDS).forEach(([key, entryId]) => {
      const input = document.createElement("input");

      input.type = "hidden";
      input.name = entryId;
      input.value = formData[key];

      form.appendChild(input);
    });

    document.body.appendChild(form);

    form.submit();

    document.body.removeChild(form);

    setTimeout(() => {
      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 800);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-06"
      aria-labelledby="contact-title"
    >
      <div className="section-06-header">
        <div className="section-06-title">06 — REACH US</div>

        <h2 id="contact-title" className="contact-header">
          Contact Us
        </h2>
      </div>

      <div className="contact-body">
        <div className="contact-info">
          <div className="info-block">
            <div className="info-label">Email</div>

            <div className="info-value">axe.nextgen@gmail.com</div>
          </div>

          {/* <div className="info-block">
            <div className="info-label">Phone</div>

            <div className="info-value">+91 00000 00000</div>
          </div> */}

          <div className="info-block">
            <div className="info-label">College</div>

            <div className="info-value">ADYPU SOE</div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              placeholder="Tell us what you want to build"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>

          {status === "success" && (
            <p className="form-status success">Thanks! We'll be in touch.</p>
          )}
        </form>

        <iframe
          name="hidden_iframe"
          ref={iframeRef}
          className="hidden-form-iframe"
          title="hidden-form-target"
        />
      </div>
    </section>
  );
};

export default ContactUs;
