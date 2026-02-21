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
  // Si en algún momento ya no usas side-panel-container, puedes borrar este bloque.
  function initLegacySidebar() {
    const container = byId("side-panel-container");
    const icon = byId("toggle-icon");
    const companyBox = byId("company-info");

    // Exponer funciones SOLO si esos elementos existen (compat)
    if (container && icon) {
      window.toggleSidebar = function toggleSidebar() {
        const collapsed = container.classList.toggle("is-collapsed");
        icon.textContent = collapsed ? "❮" : "❯";
      };
    }

    if (companyBox) {
      window.toggleCompanyInfo = function toggleCompanyInfo() {
        companyBox.classList.toggle("is-open");
      };
    }
  }

  // ============================
  // 2) Right Drawer (Serenity)
  // ============================
  function initRightDrawer() {
    const drawer = byId("rightDrawer");
    const btn = byId("rightDrawerBtn");
    const overlay = byId("rdOverlay");

    if (!drawer || !btn) return; // no drawer on this page

    const OPEN_CLASS = "is-open";

    function setScrollLocked(locked) {
      // Simple scroll lock (mobile friendly)
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

    // Click button
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleDrawer();
    });

    // Click overlay closes
    if (overlay) overlay.addEventListener("click", closeDrawer);

    // Click outside closes (extra safe)
    document.addEventListener("click", (e) => {
      if (!drawer.classList.contains(OPEN_CLASS)) return;
      const target = e.target;
      if (!(target instanceof Element)) return;

      const clickedInside = drawer.contains(target) || btn.contains(target);
      if (!clickedInside) closeDrawer();
    });

    // Close with ESC
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains(OPEN_CLASS)) closeDrawer();
    });

    // ============================
    // 2.1) Accordion: Information
    // ============================
    const accBtn = qs(".rd-acc[data-rd-target]");
    if (accBtn) {
      const panelId = accBtn.getAttribute("data-rd-target");
      const panel = panelId ? byId(panelId) : null;

      if (panel) {
        // ARIA wiring
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

    // Optional: si quieres que el drawer inicie cerrado siempre
    closeDrawer();
  }

  // ============================
  // 3) Small safe text overrides
  // ============================
  function initSafeText() {
    // Solo si existe el elemento
    const unit = qs(".ni-unit");
    if (unit) unit.textContent = "Unité 3 1/2 — XX10";
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    initLegacySidebar();
    initRightDrawer();
    initSafeText();
  });
})();