// Global mobile menu toggle functions
window.toggleMobileNav = function () {
  var menu = document.getElementById('mobile-menu-dropdown');
  var openIcon = document.getElementById('icon-open');
  var closeIcon = document.getElementById('icon-close');
  var btn = document.getElementById('hamburger-btn');

  if (!menu) return;

  var isCurrentlyClosed = menu.style.display === 'none' || menu.style.display === '';
  if (isCurrentlyClosed) {
    menu.style.display = 'block';
    if (openIcon) openIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'block';
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    menu.style.display = 'none';
    if (openIcon) openIcon.style.display = 'block';
    if (closeIcon) closeIcon.style.display = 'none';
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
};

window.closeMobileNav = function () {
  var menu = document.getElementById('mobile-menu-dropdown');
  var openIcon = document.getElementById('icon-open');
  var closeIcon = document.getElementById('icon-close');
  var btn = document.getElementById('hamburger-btn');

  if (menu) menu.style.display = 'none';
  if (openIcon) openIcon.style.display = 'block';
  if (closeIcon) closeIcon.style.display = 'none';
  if (btn) btn.setAttribute('aria-expanded', 'false');
};

document.addEventListener('DOMContentLoaded', function () {
  // Close mobile menu automatically when resizing up to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      window.closeMobileNav();
    }
  });

  // Monthly / Annual Pricing Switcher
  var btnMonthly = document.getElementById('btn-monthly');
  var btnAnnual = document.getElementById('btn-annual');
  var priceStartup = document.getElementById('price-startup');
  var priceBusiness = document.getElementById('price-business');
  var noteStartup = document.getElementById('billing-note-startup');
  var noteBusiness = document.getElementById('billing-note-business');
  var currentCycle = 'Monthly';

  if (btnMonthly && btnAnnual) {
    btnMonthly.addEventListener('click', function () {
      currentCycle = 'Monthly';
      btnMonthly.className = 'px-4 py-2 rounded-lg text-sm font-semibold bg-white text-slate-900 shadow-sm transition';
      btnAnnual.className = 'px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 transition';
      priceStartup.textContent = '$19';
      priceBusiness.textContent = '$59';
      noteStartup.textContent = 'Billed monthly';
      noteBusiness.textContent = 'Billed monthly';
    });

    btnAnnual.addEventListener('click', function () {
      currentCycle = 'Annual';
      btnAnnual.className = 'px-4 py-2 rounded-lg text-sm font-semibold bg-white text-slate-900 shadow-sm transition';
      btnMonthly.className = 'px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 transition';
      priceStartup.textContent = '$15';
      priceBusiness.textContent = '$47';
      noteStartup.textContent = 'Billed $180/year (Save 20%)';
      noteBusiness.textContent = 'Billed $564/year (Save 20%)';
    });
  }

  // Pricing Plan Selection Buttons
  var planButtons = document.querySelectorAll('.select-plan-btn');
  var planSelect = document.getElementById('plan-select');
  var contactSection = document.getElementById('contact');

  planButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var chosenPlan = btn.getAttribute('data-plan');
      if (planSelect && chosenPlan) {
        planSelect.value = chosenPlan;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Demo Request Form Validation
  var demoForm = document.getElementById('demo-form');
  var fullName = document.getElementById('full-name');
  var workEmail = document.getElementById('work-email');
  var errName = document.getElementById('err-name');
  var errEmail = document.getElementById('err-email');
  var formSuccess = document.getElementById('form-success');
  var successDetails = document.getElementById('success-details');

  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      if (!fullName.value.trim()) {
        errName.style.display = 'block';
        fullName.classList.add('border-rose-500');
        valid = false;
      } else {
        errName.style.display = 'none';
        fullName.classList.remove('border-rose-500');
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(workEmail.value.trim())) {
        errEmail.style.display = 'block';
        workEmail.classList.add('border-rose-500');
        valid = false;
      } else {
        errEmail.style.display = 'none';
        workEmail.classList.remove('border-rose-500');
      }

      if (valid) {
        var selectedPlan = planSelect ? planSelect.value : 'Business Plan';
        successDetails.textContent =
          'Thank you, ' + fullName.value.trim() + '! We sent calendar invites for your ' +
          selectedPlan + ' (' + currentCycle + ' billing) walkthrough to ' + workEmail.value.trim() + '.';
        demoForm.style.display = 'none';
        formSuccess.style.display = 'block';
      }
    });
  }
});
