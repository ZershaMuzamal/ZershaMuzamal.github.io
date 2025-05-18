document.addEventListener("DOMContentLoaded", function () {
  // Select all carousel items
  const carouselItems = document.querySelectorAll('.carousel-item');

  // Define background colors for each carousel item index
  const bgColors = ['#ffe8dc', '#f5dbc7', '#f7e4d6', '#fce3cb', '#ffddd2', '#f6d8c9'];

  // Position each carousel item around a circle and set click handlers
  carouselItems.forEach((item, index) => {
    // Calculate rotation angle based on item index (60 degrees apart)
    const angle = index * 60;
    // Apply rotation and translation to arrange items in a circular layout
    item.style.transform = `rotate(${angle}deg) translateX(190px)`;

    // Add click event listener to each carousel item
    item.addEventListener('click', () => {
      // Remove 'active' class from all items (for visual feedback)
      carouselItems.forEach(el => el.classList.remove('active'));
      // Add 'active' class to the clicked item
      item.classList.add('active');
      // Change the page background color based on clicked item's index
      document.body.style.backgroundColor = bgColors[index];
    });
  });
});

// Variables to track current scroll position and step size
let scrollAmount = 0;
const scrollStep = 750; // Number of pixels to scroll per button click (adjust as needed)

// Select the container that holds the product items
const track = document.getElementById("productTrack");

// Function to scroll the carousel left or right
function scrollCarousel(direction) {
  // Update scroll amount by adding or subtracting scrollStep
  scrollAmount += direction * scrollStep;

  // Calculate the maximum scrollable distance
  const maxScroll = track.scrollWidth - track.clientWidth;

  // Prevent scrolling beyond the left boundary
  if (scrollAmount < 0) scrollAmount = 0;
  // Prevent scrolling beyond the right boundary
  if (scrollAmount > maxScroll) scrollAmount = maxScroll;

  // Apply CSS transform to move the track container horizontally
  track.style.transform = `translateX(-${scrollAmount}px)`;
}