/* custom.js — UI only (SAFE)
   - No toca index.js ni data.js
   - Solo controla UI: sidebar legacy (si existe) + right drawer + accordion
*/
(() => {
  "use strict";

  const qs = (sel, root = document) => root.querySelector(sel);
  const byId = (id) => document.getElementById(id);

  // ============================
  // 1) Legacy sidebar (optional)
  // ============================
  function initLegacySidebar() {
    const container = byId("side-panel-container");
    const icon = byId("toggle-icon");
    const companyBox = byId("company-info");

    if (container && icon) {
      window.toggleSidebar = function toggleSidebar() {
        const collapsed = container.classList.toggle("is-collapsed");
        icon.textContent = collapsed ? "\u276E" : "\u276F";
      };
    }

    if (companyBox) {
      window.toggleCompanyInfo = function toggleCompanyInfo() {
        companyBox.classList.toggle("is-open");
      };
    }
  }

  // ============================
  // 2) Right Drawer
  // ============================
  function initRightDrawer() {
    const drawer = byId("rightDrawer");
    const btn = byId("rightDrawerBtn");
    const overlay = byId("rdOverlay");

    if (!drawer || !btn) return;

    const OPEN_CLASS = "is-open";

    function setScrollLocked(locked) {
      document.documentElement.style.overflow = locked ? "hidden" : "";
      document.body.style.overflow = locked ? "hidden" : "";
      document.body.style.touchAction = locked ? "none" : "";
    }

    function openDrawer() {
      drawer.classList.add(OPEN_CLASS);
      drawer.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      if (overlay) overlay.hidden = false;
      setScrollLocked(true);
    }

    function closeDrawer() {
      drawer.classList.remove(OPEN_CLASS);
      drawer.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      if (overlay) overlay.hidden = true;
      setScrollLocked(false);
    }

    function toggleDrawer() {
      drawer.classList.contains(OPEN_CLASS) ? closeDrawer() : openDrawer();
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleDrawer();
    });

    if (overlay) overlay.addEventListener("click", closeDrawer);

    document.addEventListener("click", (e) => {
      if (!drawer.classList.contains(OPEN_CLASS)) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const clickedInside = drawer.contains(target) || btn.contains(target);
      if (!clickedInside) closeDrawer();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains(OPEN_CLASS)) closeDrawer();
    });

    // Accordion: Information
    const accBtn = qs(".rd-acc[data-rd-target]");
    if (accBtn) {
      const panelId = accBtn.getAttribute("data-rd-target");
      const panel = panelId ? byId(panelId) : null;

      if (panel) {
        accBtn.setAttribute("aria-controls", panel.id);
        accBtn.setAttribute("aria-expanded", panel.hasAttribute("hidden") ? "false" : "true");

        accBtn.addEventListener("click", () => {
          const willOpen = panel.hasAttribute("hidden");
          if (willOpen) panel.removeAttribute("hidden");
          else panel.setAttribute("hidden", "");
          accBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        });
      }
    }

    closeDrawer();
  }

  // ============================
  // 3) Small safe text overrides
  // ============================
  function initSafeText() {
    const unit = qs(".ni-unit");
    if (unit) unit.textContent = unit.textContent;
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    initLegacySidebar();
    initRightDrawer();
    initSafeText();
  });
})();
