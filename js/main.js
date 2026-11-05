/* Undangan ngunduh mantu. Interaksi tanpa library. */
(function () {
  "use strict";

  var CFG = window.WEDDING || {};
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Toast ---------- */
  var toastEl = $("#toast");
  var toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2400);
  }

  /* ---------- Isi teks dari config ---------- */
  function readPath(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : "";
    }, CFG);
  }
  $$("[data-field]").forEach(function (el) {
    var value = readPath(el.getAttribute("data-field"));
    if (value) el.textContent = value;
  });

  /* ---------- Nama tamu dari ?to= ---------- */
  var params = new URLSearchParams(window.location.search);
  var guest = (params.get("to") || params.get("nama") || "").trim();
  var guestEl = $("#guestName");
  if (guestEl) guestEl.textContent = guest || CFG.guestFallback || "Tamu Undangan";

  /* ---------- Cover ---------- */
  var cover = $("#cover");
  var openBtn = $("#openInvite");
  var nav = $("#nav");
  var main = $("#main");

  document.body.classList.add("is-locked");
  [nav, main].forEach(function (el) { if (el) el.inert = true; });

  function openInvite() {
    document.body.classList.remove("is-locked");
    document.body.classList.add("is-open");
    [nav, main].forEach(function (el) { if (el) el.inert = false; });
    if (cover) cover.setAttribute("aria-hidden", "true");
    var target = $(".hero__title");
    if (target) {
      target.setAttribute("tabindex", "-1");
      setTimeout(function () { target.focus({ preventScroll: true }); }, 600);
    }
    setTimeout(function () { if (cover) cover.hidden = true; }, 1000);
  }
  if (openBtn) openBtn.addEventListener("click", openInvite);

  /* ---------- Menu ---------- */
  var menu = $("#menu");
  var menuToggle = $("#menuToggle");
  var menuLabel = menuToggle ? menuToggle.querySelector(".nav__toggle-label") : null;

  function setMenu(open) {
    if (!menu || !menuToggle) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    if (menuLabel) menuLabel.textContent = open ? "Tutup" : "Menu";
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add("is-open"); });
      var first = menu.querySelector("a");
      if (first) setTimeout(function () { first.focus(); }, 80);
    } else {
      menu.classList.remove("is-open");
      setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 480);
    }
  }
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });
  }
  $$(".menu__nav a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuToggle && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Nav state ---------- */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
      ticking = false;
    });
  }, { passive: true });

  /* ---------- Countdown ---------- */
  var target = new Date(CFG.dateISO || "2026-12-12T11:00:00+07:00").getTime();
  var countdown = $("#countdown");
  var units = {};

  function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

  function tick() {
    if (!countdown) return;
    var diff = target - Date.now();
    if (diff < 0) diff = 0;
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor(diff % 86400000 / 3600000);
    var minutes = Math.floor(diff % 3600000 / 60000);
    var seconds = Math.floor(diff % 60000 / 1000);
    if (!units.days) {
      $$("[data-unit]", countdown).forEach(function (el) { units[el.getAttribute("data-unit")] = el; });
    }
    if (units.days) {
      units.days.textContent = pad(days);
      units.hours.textContent = pad(hours);
      units.minutes.textContent = pad(minutes);
      units.seconds.textContent = pad(seconds);
    }
  }
  if (countdown) { tick(); setInterval(tick, 1000); }

  /* ---------- Google Calendar ---------- */
  var calBtn = $("#calendarBtn");
  if (calBtn) {
    var start = new Date(CFG.dateISO || "2026-12-12T11:00:00+07:00");
    var end = new Date(start.getTime() + 3 * 3600000);
    var fmt = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
    var ev = CFG.event || {};
    var location = [ev.venue, ev.address].filter(Boolean).join(", ");
    calBtn.href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(CFG.calendarTitle || "Ngunduh Mantu") +
      "&dates=" + fmt(start) + "%2F" + fmt(end) +
      "&location=" + encodeURIComponent(location) +
      "&details=" + encodeURIComponent(CFG.calendarDetails || "");
  }

  /* ---------- Maps ---------- */
  var mapsBtn = $("#mapsEvent");
  if (mapsBtn) {
    var venue = (CFG.event && CFG.event.venue) || "";
    if (!venue || /\[|\]/.test(venue)) {
      mapsBtn.hidden = true;
    } else {
      mapsBtn.href = (CFG.event && CFG.event.mapsUrl) || "#";
      if (mapsBtn.getAttribute("href") === "#") mapsBtn.hidden = true;
    }
  }

  /* ---------- Copy ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); resolve(); } catch (err) { reject(err); }
      document.body.removeChild(ta);
    });
  }

  function bindCopy(btn, text) {
    btn.addEventListener("click", function () {
      copyText(text).then(function () {
        btn.classList.add("is-copied");
        var label = btn.querySelector("span");
        var old = label ? label.textContent : "";
        if (label) label.textContent = "Tersalin";
        toast("Berhasil disalin");
        setTimeout(function () {
          btn.classList.remove("is-copied");
          if (label) label.textContent = old;
        }, 1800);
      }).catch(function () { toast("Gagal menyalin. Salin manual ya."); });
    });
  }

  /* ---------- Hadiah ---------- */
  var accountsWrap = $("#giftAccounts");
  var gift = CFG.gift || {};
  var isPlaceholder = function (value) { return /\[|\]/.test(String(value || "")); };

  if (accountsWrap && gift.accounts && gift.accounts.length) {
    gift.accounts.forEach(function (acc) {
      var card = document.createElement("article");
      card.className = "bank reveal is-visible";

      var bank = document.createElement("p");
      bank.className = "bank__name";
      bank.textContent = acc.bank || "Bank";

      var number = document.createElement("p");
      number.className = "bank__number" + (isPlaceholder(acc.number) ? " is-empty" : "");
      number.textContent = acc.number || "Belum diisi";

      var holder = document.createElement("p");
      holder.className = "bank__holder";
      holder.textContent = acc.holder || "";

      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      var label = document.createElement("span");
      label.textContent = isPlaceholder(acc.number) ? "Belum diisi" : "Salin nomor";
      btn.appendChild(label);
      if (isPlaceholder(acc.number)) {
        btn.disabled = true;
      } else {
        bindCopy(btn, acc.number);
      }

      card.appendChild(bank);
      card.appendChild(number);
      card.appendChild(holder);
      card.appendChild(btn);
      accountsWrap.appendChild(card);
    });
  }

  var giftAddressBlock = $("#giftAddressBlock");
  var giftAddressEl = $("#giftAddress");
  if (giftAddressBlock && giftAddressEl && gift.address) {
    giftAddressBlock.hidden = false;
    giftAddressEl.textContent = gift.address;
    var addressBtn = $("#copyAddress");
    if (addressBtn) {
      if (isPlaceholder(gift.address)) {
        addressBtn.disabled = true;
        addressBtn.querySelector("span").textContent = "Belum diisi";
      } else {
        bindCopy(addressBtn, gift.address);
      }
    }
  }

  /* ---------- RSVP ---------- */
  var form = $("#rsvpForm");
  if (form) {
    var guests = $("#rsvpGuests");
    var guestField = guests ? guests.closest(".field") : null;

    function syncGuests() {
      var checked = form.querySelector('input[name="hadir"]:checked');
      var absent = checked && checked.value === "Tidak hadir";
      if (guestField) guestField.style.display = absent ? "none" : "";
      if (guests) guests.disabled = !!absent;
    }
    $$('input[name="hadir"]', form).forEach(function (radio) {
      radio.addEventListener("change", syncGuests);
    });
    syncGuests();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#rsvpName");
      var message = $("#rsvpMessage");
      var attendance = form.querySelector('input[name="hadir"]:checked');
      if (!name || !name.value.trim()) {
        toast("Nama masih kosong");
        if (name) name.focus();
        return;
      }
      var hadir = attendance ? attendance.value : "Hadir";
      var lines = [
        "Assalamu'alaikum, saya " + name.value.trim() + ".",
        "",
        "Konfirmasi kehadiran: " + hadir
      ];
      if (hadir === "Hadir") {
        lines.push("Jumlah tamu: " + (guests ? guests.value : "1") + " orang");
      }
      if (message && message.value.trim()) {
        lines.push("", "Ucapan: " + message.value.trim());
      }
      lines.push("", "Terima kasih.");
      var number = String(CFG.rsvpWhatsapp || "").replace(/\D/g, "");
      if (!number) { toast("Nomor WhatsApp belum diisi"); return; }
      var url = "https://wa.me/" + number + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
      toast("Membuka WhatsApp...");
    });
  }

  /* ---------- Lightbox ---------- */
  var galleryItems = $$("#gallery .gallery__item img");
  var lightbox = $("#lightbox");
  var lbImage = $("#lbImage");
  var lbCaption = $("#lbCaption");
  var current = 0;
  var lastFocus = null;

  function showImage(index) {
    if (!galleryItems.length) return;
    current = (index + galleryItems.length) % galleryItems.length;
    var img = galleryItems[current];
    lbImage.src = img.currentSrc || img.src;
    lbImage.alt = img.alt || "";
    lbCaption.textContent = (current + 1) + " / " + galleryItems.length;
  }
  function openLightbox(index) {
    if (!lightbox) return;
    lastFocus = document.activeElement;
    showImage(index);
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add("is-open"); });
    document.body.classList.add("is-locked", "lb-open");
    [nav, main].forEach(function (el) { if (el) el.inert = true; });
    $("#lbClose").focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.classList.remove("is-locked", "lb-open");
    [nav, main].forEach(function (el) { if (el) el.inert = false; });
    setTimeout(function () { lightbox.hidden = true; }, 260);
    if (lastFocus) lastFocus.focus();
  }
  galleryItems.forEach(function (img, i) {
    var figure = img.closest(".gallery__item");
    if (!figure) return;
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", "Perbesar foto " + (i + 1));
    figure.addEventListener("click", function () { openLightbox(i); });
    figure.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); }
    });
  });
  if (lightbox) {
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", function () { showImage(current - 1); });
    $("#lbNext").addEventListener("click", function () { showImage(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(current - 1);
      if (e.key === "ArrowRight") showImage(current + 1);
    });
  }
})();