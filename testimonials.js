/**
 * Testimonial content
 *
 * Add new entries to this array. `previewQuote` is optional; when omitted, a
 * concise excerpt is generated from `fullQuote`.
 */
const testimonials = [
  {
    name: 'Michael Koenigs',
    role: 'CEO',
    company: 'Worthy Media',
    previousRole: 'Former Director and Executive Producer, ABC Localish',
    previewQuote: '“Tim is an extraordinarily gifted producer, videographer, and leader who inspires all who work alongside him.”',
    fullQuote: '“Tim is an extraordinarily gifted producer, videographer, and leader who inspires all who work alongside him. He elevates every production that he touches, whether it’s a 30-second promo video or an hour-long investigative documentary. Tim demonstrates extraordinary range, professionalism, and creativity, making him a top asset to the Disney company over the years.”'
  },
  {
    name: 'Justin Allen',
    role: 'CEO',
    company: 'Oddbird Creative',
    previousRole: 'Former Executive Producer, ABC Owned Television Stations',
    previewQuote: '“I always knew if Tim was on the project, it was going to be incredible, regardless of the curveballs thrown our way.”',
    fullQuote: '“Tim is the ultimate pro’s pro. He made every big-time streaming project and series we worked on together at ABC better. As a cinematographer and storyteller, his creative eye and attention to detail are unmatched. I always knew if Tim was on the project, it was going to be incredible, regardless of the curveballs thrown our way. Phenomenal collaborator and yet, somehow, an even better person. Tim’s a unicorn!”'
  }
];

const INITIAL_TESTIMONIAL_COUNT = 4;

function createExcerpt(text, maxLength = 150) {
  const cleanText = text.trim().replace(/\s+/g, ' ');
  if (cleanText.length <= maxLength) return cleanText;

  const candidate = cleanText.slice(0, maxLength + 1);
  const sentenceEnd = Math.max(
    candidate.lastIndexOf('. '),
    candidate.lastIndexOf('! '),
    candidate.lastIndexOf('? ')
  );
  if (sentenceEnd > maxLength * 0.55) return candidate.slice(0, sentenceEnd + 1);

  const lastSpace = candidate.lastIndexOf(' ');
  return `${candidate.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}…`;
}

function renderTestimonial(testimonial, index) {
  const article = document.createElement('article');
  const contentId = `testimonial-quote-${index + 1}`;
  const excerpt = testimonial.previewQuote?.trim() || createExcerpt(testimonial.fullQuote);
  const professionalLine = [testimonial.role, testimonial.company].filter(Boolean).join(' · ');

  article.className = 'testimonial reveal';
  if (index >= INITIAL_TESTIMONIAL_COUNT) article.hidden = true;

  const card = document.createElement('div');
  card.className = 'testimonial-card';

  const excerptElement = document.createElement('p');
  excerptElement.className = 'testimonial-quote testimonial-excerpt';
  excerptElement.textContent = excerpt;

  const fullWrap = document.createElement('div');
  fullWrap.className = 'testimonial-full-wrap';
  fullWrap.id = contentId;
  fullWrap.setAttribute('aria-hidden', 'true');
  const fullQuote = document.createElement('p');
  fullQuote.className = 'testimonial-quote testimonial-full';
  fullQuote.textContent = testimonial.fullQuote;
  fullWrap.append(fullQuote);

  const person = document.createElement('div');
  person.className = 'testimonial-person';
  const name = document.createElement('h3');
  name.className = 'testimonial-name';
  name.textContent = testimonial.name;
  const role = document.createElement('p');
  role.className = 'testimonial-role';
  role.textContent = professionalLine;
  person.append(name, role);
  if (testimonial.previousRole) {
    const previousRole = document.createElement('p');
    previousRole.className = 'testimonial-previous-role';
    previousRole.textContent = testimonial.previousRole;
    person.append(previousRole);
  }

  const action = document.createElement('span');
  action.className = 'testimonial-action';
  action.setAttribute('aria-hidden', 'true');
  action.textContent = 'Read more';

  const toggle = document.createElement('button');
  toggle.className = 'testimonial-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', contentId);
  toggle.setAttribute('aria-label', `Read the full testimonial from ${testimonial.name}`);
  toggle.addEventListener('click', () => {
    const isExpanded = article.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(isExpanded));
    fullWrap.setAttribute('aria-hidden', String(!isExpanded));
    toggle.setAttribute('aria-label', `${isExpanded ? 'Show less of' : 'Read the full'} testimonial from ${testimonial.name}`);
    action.textContent = isExpanded ? 'Show less' : 'Read more';
  });

  card.append(excerptElement, fullWrap, person, action, toggle);
  article.append(card);
  return article;
}

const testimonialsGrid = document.getElementById('testimonials-grid');
const moreWrap = document.getElementById('testimonials-more-wrap');
const moreButton = document.getElementById('testimonials-more');

if (testimonialsGrid) {
  testimonials.forEach((testimonial, index) => {
    const item = renderTestimonial(testimonial, index);
    testimonialsGrid.append(item);
    if (typeof observer !== 'undefined') observer.observe(item);
  });

  if (testimonials.length > INITIAL_TESTIMONIAL_COUNT && moreWrap && moreButton) {
    moreWrap.hidden = false;
    moreButton.addEventListener('click', () => {
      const willShowAll = moreButton.getAttribute('aria-expanded') === 'false';
      testimonialsGrid.querySelectorAll('.testimonial').forEach((item, index) => {
        if (index >= INITIAL_TESTIMONIAL_COUNT) item.hidden = !willShowAll;
      });
      moreButton.setAttribute('aria-expanded', String(willShowAll));
      moreButton.textContent = willShowAll ? 'Fewer testimonials' : 'More testimonials';
    });
  }
}
