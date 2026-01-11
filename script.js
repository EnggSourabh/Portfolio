document.addEventListener("DOMContentLoaded", () => {

  /* ================= PROJECT SHUFFLE ================= */

  const cards = [...document.querySelectorAll(".project-card")];
  const btn = document.querySelector(".shuffle-btn");
  let index = 0;

  function updateStack(skipAnimation = false) {
    cards.forEach((card, i) => {
      card.className = "project-card";
      card.style.opacity = "";
      card.style.pointerEvents = "";
      card.style.transform = "";
      card.style.zIndex = "";

      if (skipAnimation) card.style.transition = "none";

      const pos = (i - index + cards.length) % cards.length;

      if (pos === 0) card.classList.add("active");
      else if (pos === 1) card.classList.add("stack-1");
      else if (pos === 2) card.classList.add("stack-2");
      else if (pos === 3) card.classList.add("stack-3");
      else {
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        card.style.zIndex = "0";
      }
    });

    if (skipAnimation) {
      requestAnimationFrame(() => {
        cards.forEach(card => (card.style.transition = ""));
      });
    }
  }

  updateStack(true);

  btn?.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    updateStack();
  });
  

  /* ================= ABOUT REVEAL ================= */

  const aboutSection = document.querySelector(".about-section");

  if (aboutSection) {
    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("show");
          aboutObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    aboutObserver.observe(aboutSection);
  }

  /* ================= EXPERIENCE REVEAL ================= */

  const experienceCards = document.querySelectorAll(".experience-card");

  if (experienceCards.length) {
    const experienceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 140);
            experienceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    experienceCards.forEach(card => experienceObserver.observe(card));
  }

  /* ================= SKILLS REVEAL ================= */

  const skillCards = document.querySelectorAll(".skill-card");

  if (skillCards.length) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 120);
            skillsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    skillCards.forEach(card => skillsObserver.observe(card));
  }

});
