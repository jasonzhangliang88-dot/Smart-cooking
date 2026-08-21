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

  /* ---- Inquiry form (static: show success message) ---- */
  var form = document.getElementById("inquiryForm");
  if (form) {
    var isEN = (document.documentElement.getAttribute("lang") || "zh").toLowerCase().indexOf("en") === 0;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple required validation
      var required = form.querySelectorAll("[required]");
      var ok = true;
      required.forEach(function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = "#ff5a5a"; }
        else { f.style.borderColor = ""; }
      });
      if (!ok) return;

      // Build a mailto fallback so it actually reaches the factory
      var data = new FormData(form);
      var name = data.get("name") || "";
      var company = data.get("company") || "";
      var email = data.get("email") || "";
      var country = data.get("country") || "";
      var mode = data.get("mode") || "";
      var message = data.get("message") || "";

      var subject, body;
      if (isEN) {
        subject = encodeURIComponent("Smart Cooking Robot Inquiry - " + company);
        body = encodeURIComponent(
          "Name: " + name + "\n" +
          "Company / Brand: " + company + "\n" +
          "Email: " + email + "\n" +
          "Country / Region: " + country + "\n" +
          "Engagement model: " + mode + "\n" +
          "Requirements: " + message
        );
      } else {
        subject = encodeURIComponent("智能炒菜机代工询盘 - " + company);
        body = encodeURIComponent(
          "姓名: " + name + "\n" +
          "公司/品牌: " + company + "\n" +
          "邮箱: " + email + "\n" +
          "国家/地区: " + country + "\n" +
          "合作模式: " + mode + "\n" +
          "需求描述: " + message
        );
      }

      // Show in-page confirmation
      var success = document.createElement("div");
      success.className = "form-success show";
      success.textContent = isEN
        ? "✓ Thank you. Your inquiry has been received — a Dongji consultant will contact you shortly."
        : "✓ 已收到您的询盘，东吉项目顾问将尽快与您联系。";
      form.parentNode.insertBefore(success, form);
      form.reset();

      // Optionally open mail client (no-op if blocked)
      window.open("mailto:info@dongji-smart.com?subject=" + subject + "&body=" + body, "_blank");
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
