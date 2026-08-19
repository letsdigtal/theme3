/* ============================================================
   CALMA SKIN — theme scripts (vanilla, no dependencies)
   ============================================================ */
(function () {
  'use strict';

  var CALMA = window.CALMA || {};
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var moneyFormat = CALMA.moneyFormat || '${{amount}}';

  /* ---------- helpers ---------- */
  function money(cents) {
    var amount = (Math.round(cents) / 100).toFixed(2);
    return moneyFormat
      .replace('{{amount}}', amount)
      .replace('{{amount_with_comma_separator}}', amount.replace('.', ','));
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function getJSON(url, payload) {
    var opts = {
      method: payload ? 'POST' : 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    };
    if (payload) opts.body = JSON.stringify(payload);
    return fetch(url, opts).then(function (r) {
      if (!r.ok) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          throw new Error(j.description || j.message || 'Something went wrong');
        });
      }
      return r.json();
    });
  }

  /* ---------- toast ---------- */
  function toast(message, opts) {
    opts = opts || {};
    var wrap = $('[data-toast-wrap]');
    if (!wrap) return;
    var el = document.createElement('div');
    el.className = 'toast' + (opts.error ? ' toast--err' : '');
    var text = document.createElement('span');
    text.textContent = message;
    el.appendChild(text);

    if (!opts.error) {
      var btn = document.createElement('button');
      btn.textContent = 'View bag';
      btn.type = 'button';
      btn.addEventListener('click', function () {
        openCart();
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      el.appendChild(btn);
    }

    wrap.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
    }, 2800);
  }

  /* ---------- cart rendering ---------- */
  function lineHTML(item) {
    var img = item.image ? item.image.replace(/(\.\w{3,4})(_\d+x)?(\?.*)?$/, '$1_160x$3') : '';
    return (
      '<div class="cart-line">' +
        '<a class="line-media" href="' + item.url + '">' +
          (img ? '<img src="' + img + '" alt="">' : '') +
        '</a>' +
        '<div>' +
          '<a class="line-title" href="' + item.url + '">' + item.product_title + '</a>' +
          (item.variant_title && item.variant_title !== 'Default Title'
            ? '<p class="line-variant">' + item.variant_title + '</p>' : '') +
          '<div class="line-row">' +
            '<div class="qty qty--sm">' +
              '<button type="button" class="qty-btn" data-step="-1" aria-label="Decrease quantity">\u2212</button>' +
              '<input type="number" value="' + item.quantity + '" min="0" max="9" data-line-input data-line-key="' + item.key + '" aria-label="Quantity">' +
              '<button type="button" class="qty-btn" data-step="1" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<p class="line-price">' + money(item.final_line_price) + '</p>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="line-remove" data-line-key="' + item.key + '" data-remove aria-label="Remove item">\u00d7</button>' +
      '</div>'
    );
  }

  function renderCart(cart) {
    $$('.cart-badge, [data-cart-count]').forEach(function (el) {
      el.textContent = cart.item_count;
      el.classList.toggle('is-zero', cart.item_count === 0);
    });
    var label = $('[data-cart-count-label]');
    if (label) label.textContent = '(' + cart.item_count + ')';

    var lines = $('[data-cart-lines]');
    if (lines) {
      if (cart.items.length === 0) {
        lines.innerHTML =
          '<div class="cart-empty">' +
            '<p class="cart-empty-note">Your bag is empty — your skin deserves better.</p>' +
            '<a class="btn btn-dark" href="/collections/all" data-cart-toggle>Start shopping</a>' +
          '</div>';
      } else {
        lines.innerHTML = cart.items.map(lineHTML).join('');
      }
    }

    var sub = $('[data-cart-subtotal]');
    if (sub) sub.textContent = money(cart.total_price);

    // free shipping meters (drawer + cart page)
    var threshold = CALMA.freeShipThreshold || 5000;
    var pct = Math.min(100, Math.round((cart.total_price / threshold) * 100));
    var done = cart.total_price >= threshold;
    $$('[data-meter-fill]').forEach(function (fill) {
      fill.style.width = pct + '%';
      fill.classList.toggle('meter-fill--done', done);
    });
    $$('[data-meter-label]').forEach(function (lab) {
      lab.innerHTML = done
        ? '<strong>You\u2019ve unlocked free shipping \u2713</strong>'
        : 'You\u2019re <strong>' + money(threshold - cart.total_price) + '</strong> away from free shipping';
    });
    var foot = $('[data-cart-foot]');
    if (foot) foot.style.display = cart.items.length === 0 ? 'none' : '';
  }

  function refreshCart() {
    return getJSON('/cart.js').then(renderCart);
  }

  /* ---------- drawer / menu ---------- */
  function openCart() { document.body.classList.add('cart-open'); document.body.classList.remove('menu-open'); }
  function closeCart() { document.body.classList.remove('cart-open'); }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('[data-cart-toggle]');
    if (toggle) {
      e.preventDefault();
      document.body.classList.contains('cart-open') ? closeCart() : openCart();
      return;
    }
    var menuToggle = e.target.closest('[data-menu-toggle]');
    if (menuToggle) {
      e.preventDefault();
      var open = document.body.classList.toggle('menu-open');
      $$('[data-menu-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
      return;
    }
    if (e.target.closest('[data-overlay]')) { closeCart(); document.body.classList.remove('menu-open'); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCart(); document.body.classList.remove('menu-open'); }
  });

  /* ---------- add to cart (product forms + quick add) ---------- */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest ? e.target : null;
    if (!form || !form.matches('form[data-cart-add]')) return;
    e.preventDefault();

    var btn = form.querySelector('[type="submit"]');
    var original = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Adding\u2026'; }

    var payload = {
      items: [{
        id: Number(form.querySelector('[name="id"]').value),
        quantity: Number((form.querySelector('[name="quantity"]') || {}).value || 1)
      }]
    };

    getJSON('/cart/add.js', payload)
      .then(function () { return getJSON('/cart.js'); })
      .then(function (cart) {
        renderCart(cart);
        openCart();
        toast(payload.items[0].quantity > 1 ? 'Added to your bag' : 'Added to your bag');
      })
      .catch(function (err) { toast(err.message, { error: true }); })
      .then(function () {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
      });
  });

  /* ---------- "add all" ritual bundle ---------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add-all]');
    if (!btn) return;
    var ids = btn.getAttribute('data-add-all').split(',').map(function (id) {
      return { id: Number(id), quantity: 1 };
    }).filter(function (x) { return x.id; });
    if (!ids.length) return;
    btn.disabled = true;
    getJSON('/cart/add.js', { items: ids })
      .then(function () { return getJSON('/cart.js'); })
      .then(function (cart) { renderCart(cart); openCart(); toast('The full ritual is in your bag'); })
      .catch(function (err) { toast(err.message, { error: true }); })
      .then(function () { btn.disabled = false; });
  });

  /* ---------- drawer + cart page quantity controls ---------- */
  function changeLine(key, qty) {
    return getJSON('/cart/change.js', { id: key, quantity: qty }).then(renderCart);
  }

  document.addEventListener('change', function (e) {
    var input = e.target.closest ? e.target : null;
    if (!input || !input.matches('[data-line-input]')) return;
    var qty = Math.max(0, Math.min(9, Number(input.value) || 0));
    changeLine(input.getAttribute('data-line-key'), qty);
  });

  document.addEventListener('click', function (e) {
    var stepBtn = e.target.closest('[data-step]');
    if (!stepBtn) return;
    var scope = stepBtn.closest('.qty') || stepBtn.parentElement;
    var input = scope ? scope.querySelector('input[type="number"]') : null;
    if (!input) return;
    var next = Math.max(0, Math.min(9, (Number(input.value) || 0) + Number(stepBtn.getAttribute('data-step'))));
    if (next === 0 && !input.hasAttribute('data-line-input')) next = 1;
    input.value = next;
    if (input.hasAttribute('data-line-input')) {
      changeLine(input.getAttribute('data-line-key'), next);
    } else {
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  document.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-remove]');
    if (!rm) return;
    changeLine(rm.getAttribute('data-line-key'), 0);
  });

  /* ---------- variant switching on PDP ---------- */
  var variantSelect = $('[data-variant-select]');
  if (variantSelect) {
    variantSelect.addEventListener('change', function () {
      var opt = variantSelect.selectedOptions[0];
      var priceEl = $('[data-price-main]');
      var compareEl = $('[data-compare-main]');
      var addPrice = $('[data-add-price]');
      if (priceEl && opt.dataset.price) priceEl.textContent = opt.dataset.price;
      if (compareEl) {
        var hasCompare = opt.dataset.compare && opt.dataset.compare !== '';
        compareEl.hidden = !hasCompare;
        if (hasCompare) compareEl.textContent = opt.dataset.compare;
      }
      if (addPrice && opt.dataset.price) addPrice.textContent = opt.dataset.price;
    });
  }

  /* ---------- PDP gallery thumbnails ---------- */
  var mainImg = $('#pdp-main-img');
  if (mainImg) {
    document.addEventListener('click', function (e) {
      var thumb = e.target.closest('[data-thumb]');
      if (!thumb) return;
      mainImg.src = thumb.getAttribute('data-full');
      $$('.thumb').forEach(function (t) { t.classList.remove('thumb--on'); });
      thumb.classList.add('thumb--on');
    });
  }

  /* ---------- before / after slider ---------- */
  $$('[data-ba]').forEach(function (range) {
    range.addEventListener('input', function () {
      var wrap = range.closest('.ba');
      if (wrap) wrap.style.setProperty('--pos', range.value + '%');
    });
  });

  /* ---------- scroll reveals ---------- */
  var revealTargets = $$('[data-reveal]');
  if (REDUCED || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- count-up stats ---------- */
  var counters = $$('[data-count]');
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var decimals = (el.getAttribute('data-target') || '').indexOf('.') !== -1 ? 1 : 0;
    if (REDUCED) { el.textContent = target.toFixed(decimals); return; }
    var start = null;
    var dur = 1400;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (counters.length) {
    if ('IntersectionObserver' in window && !REDUCED) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runCount(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(runCount);
    }
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (window.__cart) renderCart(window.__cart);
  });
})();
