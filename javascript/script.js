'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Slider
  const slideFigure = document.querySelectorAll('.slideFigure');
  const slideLength = slideFigure.length;
  const heading = document.querySelector('.sect-4-title h2');
  const headingTexts = [
    'Brand naming & guidelines',
    'Brand identity & marchandise',
    'Brand identity & web design',
  ];
  let counter = slideLength - 1;
  let slideTimer = null;
  let pauseTimer = null;
  let slideOutTimer = null;

  const blurOnmouseleave = (selector) => {
    const element = document.querySelector(selector);
    element.onmouseleave = (evt) => {
      evt.currentTarget.blur();
      element.onmouseleave = null;
    }; 
  };

  const displayFigure = (counter) => {
    heading.textContent = headingTexts[counter];
    const previous = document.querySelector('figure[data-isdisplayed]');
    previous.style.display = 'none';
    previous.removeAttribute('data-isdisplayed');
    slideFigure[counter].style.display = 'block';
    slideFigure[counter].setAttribute('data-isdisplayed', true);
  };

  const slideShow = () => {
    clearTimeout(pauseTimer);
    counter = (counter + 1) % slideLength;
    displayFigure(counter);
    slideTimer = setTimeout(slideShow, 2000);
  };
  slideShow();

  document.querySelector('.slide-nav').onclick = (evt) => {
    if (evt.target.closest('#previous') || evt.target.closest('#next')) {
      clearTimeout(pauseTimer);
      clearTimeout(slideTimer);
      pauseTimer = setTimeout(slideShow, 3000);
      if (evt.target.closest('#previous')) {
        counter = (counter > 0) ? counter - 1 : slideLength - 1;
        displayFigure(counter);
        blurOnmouseleave('#previous');
      }
      if (evt.target.closest('#next')) {
        counter = (counter < slideLength - 1) ? counter + 1 : 0;
        displayFigure(counter);
        blurOnmouseleave('#next');
      }
    }
  };

  // Nav bar
  const hamburgerBtn = document.getElementById('hamburger');
  const crossBtn = document.getElementById('cross');
  const navBarDiv = document.querySelector('.nav-bar');

  const openMenu = () => {
    hamburgerBtn.style.display =  'none';
    crossBtn.style.display =  'block';
    navBarDiv.classList.add('drop-nav');
  };
  const closeMenu = () => {
    crossBtn.style.display =  'none';
    hamburgerBtn.style.display =  'block';
    navBarDiv.classList.remove('drop-nav');
  };
  
  hamburgerBtn.onclick = () => {
    openMenu();
    window.onclick = (evt) => {
      if (!evt.target.closest('.nav-bar') && evt.target.id !== 'hamburger') {
        evt.preventDefault();
        closeMenu();
        window.onclick = null;
      }
    }
  }
  crossBtn.onclick = () => {
    closeMenu();
  }
  window.onresize = () => {
    if (window.innerWidth >= 690) {
      closeMenu();
    }
  }

});
