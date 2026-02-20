'use strict';

(function () {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

  // --- DOM elements (keep Marzipano expected IDs)
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');

  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // Custom sidebar scene label (optional)
  var sidebarSceneNameElement = document.querySelector('#sidebar-scene-name');

  // --- Desktop / Mobile mode
  if (window.matchMedia) {
    var mql = matchMedia('(max-width: 500px), (max-height: 500px)');
    var setMode = function () {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // --- Touch detection
  document.body.classList.add('no-touch');
  window.addEventListener(
    'touchstart',
    function () {
      document.body.classList.remove('no-touch');
      document.body.classList.add('touch');
    },
    { passive: true }
  );

  // --- IE < 11 tooltip fallback
  if (bowser && bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // --- Viewer options
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode,
    },
  };

  // --- Create viewer
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // --- Create scenes
  var scenes = data.scenes.map(function (sceneData) {
    // ✅ GitHub Pages subpath safe (with <base href="/serenitytowers/"> in index.html)
    // Keep this WITHOUT "./"
    var urlPrefix = 'tiles';

    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + '/' + sceneData.id + '/{z}/{f}/{y}/{x}.jpg',
      { cubeMapPreviewUrl: urlPrefix + '/' + sceneData.id + '/preview.jpg' }
    );

    var geometry = new Marzipano.CubeGeometry(sceneData.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(
      sceneData.faceSize,
      (100 * Math.PI) / 180,
      (120 * Math.PI) / 180
    );

    var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    // Link hotspots
    sceneData.linkHotspots.forEach(function (hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Info hotspots
    sceneData.infoHotspots.forEach(function (hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: sceneData,
      scene: scene,
      view: view,
    };
  });

  // --- Autorotate
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2,
  });

  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  }

  autorotateToggleElement.addEventListener('click', toggleAutorotate);

  // --- Fullscreen
  if (screenfull && screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');

    fullscreenToggleElement.addEventListener('click', function () {
      screenfull.toggle();
    });

    screenfull.on('change', function () {
      if (screenfull.isFullscreen) fullscreenToggleElement.classList.add('enabled');
      else fullscreenToggleElement.classList.remove('enabled');
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  // --- Scene list toggle
  sceneListToggleElement.addEventListener('click', toggleSceneList);

  // Start with scene list open on desktop
  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }

  // --- Wire scene list clicks to scene switch
  scenes.forEach(function (sceneObj) {
    var el = document.querySelector('#sceneList .scene[data-id="' + sceneObj.data.id + '"]');
    if (!el) return;

    el.addEventListener('click', function () {
      switchScene(sceneObj);
      if (document.body.classList.contains('mobile')) hideSceneList();
    });
  });

  // --- View controls (optional buttons)
  var viewUpElement = document.querySelector('#viewUp');
  var viewDownElement = document.querySelector('#viewDown');
  var viewLeftElement = document.querySelector('#viewLeft');
  var viewRightElement = document.querySelector('#viewRight');
  var viewInElement = document.querySelector('#viewIn');
  var viewOutElement = document.querySelector('#viewOut');

  var velocity = 0.7;
  var friction = 3;
  var controls = viewer.controls();

  if (viewUpElement && viewDownElement && viewLeftElement && viewRightElement && viewInElement && viewOutElement) {
    controls.registerMethod(
      'upElement',
      new Marzipano.ElementPressControlMethod(viewUpElement, 'y', -velocity, friction),
      true
    );
    controls.registerMethod(
      'downElement',
      new Marzipano.ElementPressControlMethod(viewDownElement, 'y', velocity, friction),
      true
    );
    controls.registerMethod(
      'leftElement',
      new Marzipano.ElementPressControlMethod(viewLeftElement, 'x', -velocity, friction),
      true
    );
    controls.registerMethod(
      'rightElement',
      new Marzipano.ElementPressControlMethod(viewRightElement, 'x', velocity, friction),
      true
    );
    controls.registerMethod(
      'inElement',
      new Marzipano.ElementPressControlMethod(viewInElement, 'zoom', -velocity, friction),
      true
    );
    controls.registerMethod(
      'outElement',
      new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom', velocity, friction),
      true
    );
  }

  // --- Helpers
  function sanitize(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function switchScene(sceneObj) {
    stopAutorotate();
    sceneObj.view.setParameters(sceneObj.data.initialViewParameters);
    sceneObj.scene.switchTo();
    startAutorotate();
    updateSceneName(sceneObj);
    updateSceneList(sceneObj);
  }

  function updateSceneName(sceneObj) {
    var safeName = sanitize(sceneObj.data.name || '');

    if (sceneNameElement) sceneNameElement.innerHTML = safeName;
    if (sidebarSceneNameElement) sidebarSceneNameElement.textContent = sceneObj.data.name || '—';
  }

  function updateSceneList(sceneObj) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === sceneObj.data.id) el.classList.add('current');
      else el.classList.remove('current');
    }
  }

  function showSceneList() {
    sceneListElement.classList.add('enabled');
    sceneListToggleElement.classList.add('enabled');
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains('enabled')) return;
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) return scenes[i];
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) return data.scenes[i];
    }
    return null;
  }

  function createLinkHotspotElement(hotspot) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot', 'link-hotspot');

    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.classList.add('link-hotspot-icon');

    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
    for (var i = 0; i < transformProperties.length; i++) {
      icon.style[transformProperties[i]] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    wrapper.addEventListener('click', function () {
      var target = findSceneById(hotspot.target);
      if (target) switchScene(target);
    });

    stopTouchAndScrollEventPropagation(wrapper);

    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip', 'link-hotspot-tooltip');
    var targetData = findSceneDataById(hotspot.target);
    tooltip.innerHTML = sanitize(targetData ? targetData.name : '');

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot', 'info-hotspot');

    var header = document.createElement('div');
    header.classList.add('info-hotspot-header');

    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');

    var icon = document.createElement('img');
    icon.src = 'img/info.png';
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon);

    var titleWrapper = document.createElement('div');
    titleWrapper.classList.add('info-hotspot-title-wrapper');

    var title = document.createElement('div');
    title.classList.add('info-hotspot-title');
    title.innerHTML = sanitize(hotspot.title || '');
    titleWrapper.appendChild(title);

    var closeWrapper = document.createElement('div');
    closeWrapper.classList.add('info-hotspot-close-wrapper');

    var closeIcon = document.createElement('img');
    closeIcon.src = 'img/close.png';
    closeIcon.classList.add('info-hotspot-close-icon');
    closeWrapper.appendChild(closeIcon);

    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    var text = document.createElement('div');
    text.classList.add('info-hotspot-text');
    text.innerHTML = sanitize(hotspot.text || '');

    wrapper.appendChild(header);
    wrapper.appendChild(text);

    // Modal for mobile
    var modal = document.createElement('div');
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add('info-hotspot-modal');
    document.body.appendChild(modal);

    var toggle = function () {
      wrapper.classList.toggle('visible');
      modal.classList.toggle('visible');
    };

    wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);
    modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  function stopTouchAndScrollEventPropagation(element) {
    var events = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'mousewheel'];
    for (var i = 0; i < events.length; i++) {
      element.addEventListener(
        events[i],
        function (e) {
          e.stopPropagation();
        },
        { passive: true }
      );
    }
  }

  // --- Display initial scene
  switchScene(scenes[0]);
})();

// ===== Custom sidebar functions (called from HTML onclick) =====
function toggleCompanyInfo() {
  var info = document.getElementById('company-info');
  if (!info) return;
  info.classList.toggle('show');
}

function toggleSidebar() {
  var container = document.getElementById('side-panel-container');
  var icon = document.getElementById('toggle-icon');
  if (!container || !icon) return;

  if (container.classList.contains('collapsed')) {
    container.classList.remove('collapsed');
    icon.textContent = '❯';
  } else {
    container.classList.add('collapsed');
    icon.textContent = '❮';
  }
}
