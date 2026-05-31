(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobileMq = window.matchMedia("(max-width: 880px)");
  var coarseMq = window.matchMedia("(pointer: coarse)");

  function isMobileViewport() {
    return mobileMq.matches || coarseMq.matches;
  }

  function revealIn(el, observer) {
    el.classList.add("in");
    if (observer) observer.unobserve(el);
  }

  function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var edge = isMobileViewport() ? 12 : 40;
    return rect.top < vh - edge && rect.bottom > edge;
  }

  function revealOptions() {
    var mobile = isMobileViewport();
    return {
      threshold: mobile ? 0.05 : 0.1,
      rootMargin: mobile ? "0px 0px 0px 0px" : "0px 0px -50px 0px",
    };
  }

  /* Sticky nav shadow */
  var nav = document.querySelector("nav.top");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Hero entrance */
  var hero = document.querySelector("header.hero");
  if (hero) {
    var readyHero = function () {
      hero.classList.add("hero-ready");
    };
    if (reduced) {
      readyHero();
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(readyHero);
      });
    }
    window.addEventListener(
      "pageshow",
      function (e) {
        if (e.persisted) readyHero();
      },
      { passive: true }
    );
  }

  /* Scroll reveals with stagger within parent */
  var reveals = document.querySelectorAll(".reveal");
  if (reduced) {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
    return;
  }

  reveals.forEach(function (el) {
    var parent = el.parentElement;
    if (parent) {
      var siblings = Array.prototype.filter.call(parent.children, function (c) {
        return c.classList && c.classList.contains("reveal");
      });
      var idx = siblings.indexOf(el);
      if (idx >= 0) el.style.setProperty("--reveal-i", String(idx));
    }
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      revealIn(entry.target, io);
    });
  }, revealOptions());

  reveals.forEach(function (el) {
    if (isInViewport(el)) {
      revealIn(el, io);
    } else {
      io.observe(el);
    }
  });

  var resizeTimer;
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        reveals.forEach(function (el) {
          if (!el.classList.contains("in") && isInViewport(el)) {
            revealIn(el, io);
          }
        });
      }, 120);
    },
    { passive: true }
  );

  window.addEventListener(
    "orientationchange",
    function () {
      setTimeout(function () {
        reveals.forEach(function (el) {
          if (!el.classList.contains("in") && isInViewport(el)) {
            revealIn(el, io);
          }
        });
      }, 200);
    },
    { passive: true }
  );

  /* Banner sections */
  document.querySelectorAll(".banner-visual").forEach(function (banner) {
    if (isInViewport(banner)) {
      banner.classList.add("is-visible");
      return;
    }
    var bIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            bIo.unobserve(e.target);
          }
        });
      },
      { threshold: isMobileViewport() ? 0.08 : 0.2 }
    );
    bIo.observe(banner);
  });

  /* Category filter chips */
  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (x) {
        x.classList.remove("active");
      });
      chip.classList.add("active");
      var f = chip.dataset.cat;
      document.querySelectorAll(".cat").forEach(function (el) {
        el.style.display = f === "all" || el.dataset.cat === f ? "" : "none";
      });
    });
  });

})();
