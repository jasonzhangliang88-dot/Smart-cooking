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
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  /* ---- Language switch (visual demo only) ---- */
  var langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      langBtns.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
    });
  });

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

  /* ---- WeChat float modal ---- */
  var wechatFloat = document.getElementById("wechatFloat");
  var wechatModal = document.getElementById("wechatModal");
  var wechatClose = document.getElementById("wechatClose");
  function openWechat(e) {
    if (e) e.preventDefault();
    if (wechatModal) {
      wechatModal.classList.add("show");
      wechatModal.setAttribute("aria-hidden", "false");
    }
  }
  function closeWechat() {
    if (wechatModal) {
      wechatModal.classList.remove("show");
      wechatModal.setAttribute("aria-hidden", "true");
    }
  }
  if (wechatFloat) wechatFloat.addEventListener("click", openWechat);
  if (wechatClose) wechatClose.addEventListener("click", closeWechat);
  if (wechatModal) {
    wechatModal.addEventListener("click", function (e) {
      if (e.target === wechatModal) closeWechat();
    });
  }

  /* ---- Smooth anchor scroll with header offset already handled by CSS scroll-padding ---- */
})();
