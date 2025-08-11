// Language management
let currentLang = localStorage.getItem("language") || "lt";

// Service icons mapping
const serviceIcons = {
  residential: "🏠",
  commercial: "🏢",
  industrial: "🏭",
  led_lighting: "💡",
  repair: "🔧",
  meters: "📊",
  security: "📹",
  ev_charging: "🔌",
  emergency: "🚨",
  audit: "📋",
  solar: "☀️",
};

// Load services
async function loadServices() {
  try {
    const response = await fetch(`/api/services?lang=${currentLang}`);
    const services = await response.json();

    const mainServices = services.filter((s) => s.category === "main");
    const additionalServices = services.filter(
      (s) => s.category === "additional"
    );

    displayServices("mainServices", mainServices);
    displayServices("additionalServices", additionalServices);
  } catch (error) {
    console.error("Error loading services:", error);
  }
}

// Display services
function displayServices(containerId, services) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buttonText = {
    lt: "Užsakyti",
    ru: "Заказать",
    en: "Order",
  };

  container.innerHTML = services
    .map(
      (service) => `
        <div class="col-md-6 col-lg-4">
            <div class="card service-card h-100">
                <div class="card-body text-center">
                    <div class="service-card__icon">
                        <span class="fs-2">${
                          serviceIcons[service.service_key] || "⚡"
                        }</span>
                    </div>
                    <h4 class="card-title">${service.title}</h4>
                    <p class="card-text">${service.description}</p>
                    <button class="btn btn-primary btn-order" data-service="${
                      service.service_key
                    }" data-title="${service.title.replace(/"/g, "&quot;")}">
                        ${buttonText[currentLang]}
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Add click handlers to all order buttons
  container.querySelectorAll(".btn-order").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const serviceKey = this.getAttribute("data-service");
      const serviceTitle = this.getAttribute("data-title");
      window.openServiceModal(serviceKey, serviceTitle);
    });
  });
}

// Language switcher
document.getElementById("langSwitch")?.addEventListener("change", (e) => {
  currentLang = e.target.value;
  localStorage.setItem("language", currentLang);
  updatePageLanguage();
  loadServices(); // This will reload services with new button text
});

// Update page language
function updatePageLanguage() {
  const translations = {
    lt: {
      // Navigation
      nav_home: "Pradžia",
      nav_services: "Paslaugos",
      nav_about: "Apie mus",
      nav_contact: "Kontaktai",
      // Hero
      hero_title: "Profesionalios elektros paslaugos Vilniuje",
      hero_subtitle:
        "Patikimas elektrikas jūsų namams ir verslui. Dirbame 24/7, garantuojame kokybę.",
      btn_order_service: "Užsakyti paslaugą",
      // Sections
      main_services: "Pagrindinės paslaugos",
      additional_services: "Papildomos paslaugos",
      why_us: "Kodėl verta rinktis mus?",
      // CTA
      cta_title: "Reikia skubios elektriko pagalbos?",
      cta_subtitle: "Skambinkite dabar arba palikite užklausą",
      btn_call_now: "Skambinti dabar",
      btn_leave_request: "Palikti užklausą",
      // Why Us
      service_247: "24/7 Aptarnavimas",
      service_247_desc: "Dirbame visą parą, net savaitgaliais ir šventėmis",
      warranty: "Garantija",
      warranty_desc: "Visiems darbams suteikiame 2 metų garantiją",
      good_prices: "Geros kainos",
      good_prices_desc: "Konkurencingos kainos ir skaidrus atsiskaitymas",
      // Footer
      footer_desc: "Profesionalios elektros paslaugos Vilniuje ir apylinkėse",
      footer_contacts: "Kontaktai",
      footer_phone: "Tel:",
      footer_email: "El. paštas:",
      footer_address: "Adresas:",
      footer_hours: "Darbo laikas",
      footer_schedule:
        "Pirmadienis - Sekmadienis\n00:00 - 24:00\nAvarinis iškvietimas 24/7",
      footer_copyright: "© 2024 ELEKTRIKAS LT. Visos teisės saugomos.",
    },
    ru: {
      // Navigation
      nav_home: "Главная",
      nav_services: "Услуги",
      nav_about: "О нас",
      nav_contact: "Контакты",
      // Hero
      hero_title: "Профессиональные электроуслуги в Вильнюсе",
      hero_subtitle:
        "Надежный электрик для вашего дома и бизнеса. Работаем 24/7, гарантируем качество.",
      btn_order_service: "Заказать услугу",
      // Sections
      main_services: "Основные услуги",
      additional_services: "Дополнительные услуги",
      why_us: "Почему стоит выбрать нас?",
      // CTA
      cta_title: "Нужна срочная помощь электрика?",
      cta_subtitle: "Звоните сейчас или оставьте заявку",
      btn_call_now: "Позвонить сейчас",
      btn_leave_request: "Оставить заявку",
      // Why Us
      service_247: "24/7 Обслуживание",
      service_247_desc: "Работаем круглосуточно, даже в выходные и праздники",
      warranty: "Гарантия",
      warranty_desc: "На все работы предоставляем гарантию 2 года",
      good_prices: "Хорошие цены",
      good_prices_desc: "Конкурентные цены и прозрачные расчеты",
      // Footer
      footer_desc: "Профессиональные электроуслуги в Вильнюсе и окрестностях",
      footer_contacts: "Контакты",
      footer_phone: "Тел:",
      footer_email: "Эл. почта:",
      footer_address: "Адрес:",
      footer_hours: "Время работы",
      footer_schedule:
        "Понедельник - Воскресенье\n00:00 - 24:00\nАварийный вызов 24/7",
      footer_copyright: "© 2024 ELEKTRIKAS LT. Все права защищены.",
    },
    en: {
      // Navigation
      nav_home: "Home",
      nav_services: "Services",
      nav_about: "About",
      nav_contact: "Contact",
      // Hero
      hero_title: "Professional Electrical Services in Vilnius",
      hero_subtitle:
        "Reliable electrician for your home and business. We work 24/7, quality guaranteed.",
      btn_order_service: "Order service",
      // Sections
      main_services: "Main Services",
      additional_services: "Additional Services",
      why_us: "Why Choose Us?",
      // CTA
      cta_title: "Need urgent electrician help?",
      cta_subtitle: "Call now or leave a request",
      btn_call_now: "Call now",
      btn_leave_request: "Leave request",
      // Why Us
      service_247: "24/7 Service",
      service_247_desc:
        "We work around the clock, even on weekends and holidays",
      warranty: "Warranty",
      warranty_desc: "We provide a 2-year warranty on all work",
      good_prices: "Good Prices",
      good_prices_desc: "Competitive prices and transparent billing",
      // Footer
      footer_desc:
        "Professional electrical services in Vilnius and surroundings",
      footer_contacts: "Contacts",
      footer_phone: "Tel:",
      footer_email: "Email:",
      footer_address: "Address:",
      footer_hours: "Working hours",
      footer_schedule: "Monday - Sunday\n00:00 - 24:00\nEmergency call 24/7",
      footer_copyright: "© 2024 ELEKTRIKAS LT. All rights reserved.",
    },
  };

  const trans = translations[currentLang];
  if (!trans) return;

  // Update all elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (trans[key]) {
      element.textContent = trans[key];
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("langSwitch").value = currentLang;
  updatePageLanguage();
  loadServices();
});

// Open service modal
window.openServiceModal = function (serviceKey, serviceTitle) {
  const modalHtml = `
        <div class="modal fade" id="serviceModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${serviceTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="serviceForm">
                            <input type="hidden" name="service" value="${serviceKey}">
                            <div class="mb-3">
                                <label class="form-label">${getLabel(
                                  "name"
                                )}</label>
                                <input type="text" class="form-control" name="name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${getLabel(
                                  "phone"
                                )}</label>
                                <input type="tel" class="form-control" name="phone" placeholder="+370..." required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${getLabel(
                                  "email"
                                )}</label>
                                <input type="email" class="form-control" name="email">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${getLabel(
                                  "message"
                                )}</label>
                                <textarea class="form-control" name="message" rows="4"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${getLabel(
                                  "preferred_time"
                                )}</label>
                                <input type="datetime-local" class="form-control" name="preferred_time">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${getLabel(
                          "cancel"
                        )}</button>
                        <button type="button" class="btn btn-primary" onclick="submitServiceForm()">${getLabel(
                          "send"
                        )}</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Remove existing modal if any
  const existingModal = document.getElementById("serviceModal");
  if (existingModal) {
    const bsModal = bootstrap.Modal.getInstance(existingModal);
    if (bsModal) {
      bsModal.hide();
    }
    existingModal.remove();
  }

  // Remove any modal backdrops
  document
    .querySelectorAll(".modal-backdrop")
    .forEach((backdrop) => backdrop.remove());

  // Add new modal to body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("serviceModal"));
  modal.show();
};

// Get label translation
function getLabel(key) {
  const labels = {
    lt: {
      name: "Vardas",
      phone: "Telefonas",
      email: "El. paštas",
      message: "Papildoma informacija",
      preferred_time: "Pageidaujamas laikas",
      cancel: "Atšaukti",
      send: "Siųsti užklausą",
      success: "Užklausa sėkmingai išsiųsta!",
      error: "Įvyko klaida. Bandykite dar kartą.",
    },
    ru: {
      name: "Имя",
      phone: "Телефон",
      email: "Эл. почта",
      message: "Дополнительная информация",
      preferred_time: "Предпочтительное время",
      cancel: "Отмена",
      send: "Отправить заявку",
      success: "Заявка успешно отправлена!",
      error: "Произошла ошибка. Попробуйте еще раз.",
    },
    en: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      message: "Additional information",
      preferred_time: "Preferred time",
      cancel: "Cancel",
      send: "Send request",
      success: "Request sent successfully!",
      error: "An error occurred. Please try again.",
    },
  };

  return labels[currentLang][key] || labels["lt"][key];
}

// Submit service form
async function submitServiceForm() {
  const form = document.getElementById("serviceForm");
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    service: formData.get("service"),
    preferred_time: formData.get("preferred_time"),
  };

  // Validate
  if (!data.name || !data.phone) {
    alert(getLabel("error"));
    return;
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Close modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("serviceModal")
      );
      modal.hide();

      // Show success message
      showNotification(getLabel("success"), "success");

      // Clear form
      form.reset();
    } else {
      showNotification(getLabel("error"), "danger");
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification(getLabel("error"), "danger");
  }
}
