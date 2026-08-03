const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const pageHeader = document.querySelector('.header');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });
}

window.addEventListener('scroll', () => {
  if (!pageHeader) return;
  pageHeader.classList.toggle('scrolled', window.scrollY > 40);
});

/* Enquiry form: open WhatsApp with prefilled message */
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(enquiryForm);
    const name = f.get('name') || '';
    const phone = f.get('phone') || '';
    const email = f.get('email') || '';
    const checkin = f.get('checkin') || '';
    const checkout = f.get('checkout') || '';
    const guests = f.get('guests') || '';
    const message = f.get('message') || '';

    let text = `Hello Lotus Paradise, I would like to enquire about a stay.`;
    if (name) text += `%0AName: ${name}`;
    if (phone) text += `%0APhone: ${phone}`;
    if (email) text += `%0AEmail: ${email}`;
    if (checkin) text += `%0ACheck-in: ${checkin}`;
    if (checkout) text += `%0ACheck-out: ${checkout}`;
    if (guests) text += `%0AGuests: ${guests}`;
    if (message) text += `%0AMessage: ${message}`;

    const url = `https://wa.me/919732300111?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

/* Gallery lightbox */
const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.getElementById('lightbox');
if (lightbox && galleryItems.length) {
  const lbImg = lightbox.querySelector('.lightbox-stage img');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');
  let current = 0;

  function openLightbox(index) {
    current = index;
    const src = galleryItems[current].src;
    lbImg.src = src;
    lbImg.alt = galleryItems[current].alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  function showNext(delta = 1) {
    current = (current + delta + galleryItems.length) % galleryItems.length;
    lbImg.src = galleryItems[current].src;
    lbImg.alt = galleryItems[current].alt || '';
  }

  galleryItems.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', () => showNext(-1));
  btnNext.addEventListener('click', () => showNext(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    }
  });
}
