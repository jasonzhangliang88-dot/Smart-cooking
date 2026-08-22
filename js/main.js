/* =========================================================
   DONGJI · main.js
   Static prototype interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Header shadow on scroll ---- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("mobileToggle");
  var nav = document.getElementById("mainNav");
  var overlay = document.getElementById("navOverlay");
  function closeNav() {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }
  function openNav() {
    nav.classList.add("open");
    toggle.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? closeNav() : openNav();
    });
  }
  if (overlay) overlay.addEventListener("click", closeNav);
  if (nav) {
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---- Language switch active state is set server-side/HTML; no JS needed ---- */

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(
    ".section-head, .platform-card, .service-card, .solution-item, .step, .case-card, .cert-badge, .fg, .about-copy, .about-visual, .trust-item, .lead-form"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("show"); });
  }

  /* ---- Inquiry form (POST to Basin backend) ---- */
  var form = document.getElementById("inquiryForm");
  if (form) {
    var isEN = (document.documentElement.getAttribute("lang") || "zh").toLowerCase().indexOf("en") === 0;
    var BASIN_ENDPOINT = "https://usebasin.com/f/b1f6dc97f794";

    // Reusable status message (created once, toggled on each submit)
    var msg = document.createElement("div");
    msg.className = "form-success";
    form.parentNode.insertBefore(msg, form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Required-field validation
      var required = form.querySelectorAll("[required]");
      var ok = true;
      required.forEach(function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = "#ff5a5a"; }
        else { f.style.borderColor = ""; }
      });
      if (!ok) return;

      var btn = form.querySelector('button[type="submit"]');
      var originalLabel = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = isEN ? "Sending…" : "提交中…"; }

      fetch(BASIN_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      })
      .then(function (res) {
        if (res.ok) {
          msg.className = "form-success show";
          msg.textContent = isEN
            ? "✓ Thank you. Your inquiry has been received — a Dongji consultant will contact you shortly."
            : "✓ 已收到您的询盘，东吉项目顾问将尽快与您联系。";
          form.reset();
        } else {
          throw new Error("Basin responded with " + res.status);
        }
      })
      .catch(function () {
        msg.className = "form-success show error";
        msg.textContent = isEN
          ? "✕ Sending failed. Please try again or email us at djengineer@metalwork.cc."
          : "✕ 提交失败，请重试，或直接发邮件至 djengineer@metalwork.cc。";
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
      });
    });
  }

  /* ---- WhatsApp float modal ---- */
  var wechatFloat = document.getElementById("wechatFloat");
  var wechatModal = document.getElementById("wechatModal");
  var wechatClose = document.getElementById("wechatClose");
  var lastFocusedElement = null;
  function openWechat(e) {
    if (e) e.preventDefault();
    if (wechatModal) {
      lastFocusedElement = document.activeElement;
      wechatModal.classList.add("show");
      wechatModal.removeAttribute("inert");
      wechatModal.setAttribute("aria-hidden", "false");
      if (wechatClose) wechatClose.focus();
    }
  }
  function closeWechat() {
    if (wechatModal) {
      wechatModal.classList.remove("show");
      wechatModal.setAttribute("inert", "");
      wechatModal.setAttribute("aria-hidden", "true");
      if (lastFocusedElement) lastFocusedElement.focus();
    }
  }
  if (wechatModal) wechatModal.setAttribute("inert", "");
  if (wechatFloat) wechatFloat.addEventListener("click", openWechat);
  if (wechatFloat) {
    wechatFloat.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openWechat();
      }
    });
  }
  if (wechatClose) wechatClose.addEventListener("click", closeWechat);
  if (wechatModal) {
    wechatModal.addEventListener("click", function (e) {
      if (e.target === wechatModal) closeWechat();
    });
    wechatModal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeWechat();
    });
  }

  /* ---- Smooth anchor scroll with header offset already handled by CSS scroll-padding ---- */
})();
