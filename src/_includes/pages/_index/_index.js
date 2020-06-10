const setupSectionObserver = () => {
    const sections = {};
  const sectionIds = [];
  let visibleIndex = -1;
  let currentIndex = -1;
  let animating = false;

  const sectionElements = document.querySelectorAll(`[data-section]`);

  const getSectionId = el => el.dataset.section;

  const showSection = (sectionIndex, repeat = false) => {
    if (sectionIndex < currentIndex) return;

    if (sectionIndex > visibleIndex) {
      visibleIndex = sectionIndex;
    }

    if (animating && !repeat) return;

    animating = true;

    currentIndex++;
    const currentId = sectionIds[currentIndex];
    const section = sections[currentId];

    section.el.classList.add(`js--show-separator`);

    // TODO: Replace with animationEnd to make it smoother and more customisable
    setTimeout(() => {
      if (visibleIndex > currentIndex) {
        showSection(currentIndex, true);
      }

      else {
        animating = false;
      }
    }, 500 * section.separators); // TODO: Var 500
  };

  sectionElements.forEach(sectionEl => {
    const sectionId = getSectionId(sectionEl);
    sectionIds.push(sectionId);

    const separators = sectionEl.querySelectorAll(`.m-separator`).length;

    sections[sectionId] = {
      el: sectionEl,
      separators,
    };

    const transitionDuration = 500;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0) {
        const sectionEl = entry.target;
        const sectionId = getSectionId(sectionEl);
        const sectionIndex = sectionIds.indexOf(sectionId);

        showSection(sectionIndex);
        sectionEl.classList.add(`js--show-section`);
        observer.unobserve(sectionEl);
      }
    }, {
      rootMargin: `0% 0% -15% 0%`,
    });

    observer.observe(sectionEl);
  });
};

const setupImageObserver = () => {
  const imageEls = document.querySelectorAll(`.m-figure`);

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio > 0) {
      setTimeout(() => {
        entry.target.classList.add(`js--figure-visible`);
      }, 500);
      observer.unobserve(entry.target);
    }
  }, {
    rootMargin: `0% 0% -33% 0%`,
  });

  imageEls.forEach(imageEl => {
    observer.observe(imageEl);
  });
};

(() => {
  setupSectionObserver();
  setupImageObserver();
})();
