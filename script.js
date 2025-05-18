document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = document.querySelectorAll('.carousel-item');
  const bgColors = ['#ffe8dc', '#f5dbc7', '#f7e4d6', '#fce3cb', '#ffddd2', '#f6d8c9'];

  carouselItems.forEach((item, index) => {
    const angle = index * 60;
    item.style.transform = `rotate(${angle}deg) translateX(190px)`;

    item.addEventListener('click', () => {
      // Optional: highlight selected item (e.g. with border or scale)
      carouselItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      document.body.style.backgroundColor = bgColors[index];
    });
  });
});