document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(form); // Get all form data
    const counts = {
      casual: 0,
      'smart-casual': 0,
      streetwear: 0,
      sporty: 0,
      formal: 0,
      minimalist: 0
    };

    let notes = "";

    // Loop through form entries to count style choices
    for (let [name, value] of formData.entries()) {
      if (name === "notes") {
        notes = value.toLowerCase(); // Capture user's notes in lowercase
      } else if (counts[value] !== undefined) {
        counts[value]++; // Increment count for selected category
      }
    }

    // Determine which category was selected the most
    let topCategory = null;
    let maxCount = 0;
    for (let category in counts) {
      if (counts[category] > maxCount) {
        maxCount = counts[category];
        topCategory = category;
      }
    }

    // Adjust result based on special keywords in notes
    if (notes.includes("wool")) {
      if (topCategory === "formal" || topCategory === "smart-casual") {
        topCategory = "minimalist";
      }
    } else if (notes.includes("sport") || notes.includes("active")) {
      topCategory = "sporty";
    } else if (notes.includes("eco") || notes.includes("organic")) {
      topCategory = "minimalist";
    }

    // Map categories to descriptive messages
    const resultMap = {
      casual: "🧢 Casual: You prefer relaxed, everyday comfort with tees, jeans, and sneakers.",
      "smart-casual": "👔 Smart Casual: You like a polished look without being too formal. Stylish but effortless.",
      streetwear: "🔥 Streetwear: You dress bold, trendy, and like to make a fashion statement.",
      sporty: "🏃 Sporty/Athleisure: You’re active, energetic, and love mixing gym-ready looks with streetwear.",
      formal: "🤵 Formal: You enjoy structured, classy, and timeless pieces. Always looking sharp.",
      minimalist: "🧥 Minimalist: Clean lines, neutral tones, and subtle sophistication are your thing."
    };

    const resultText = resultMap[topCategory] || "Please complete more questions for a better result.";

    // Create result display container
    const resultDiv = document.createElement("div");
    resultDiv.className = "result";
    resultDiv.innerText = resultText;

    // Create and style the "Shop Now" button
    const shopButton = document.createElement("button");
    shopButton.innerText = "🛍️ Shop Now";
    shopButton.style.marginTop = "20px";
    shopButton.style.padding = "10px 20px";
    shopButton.style.border = "none";
    shopButton.style.borderRadius = "6px";
    shopButton.style.backgroundColor = "#3a2b2a";
    shopButton.style.color = "#fff";
    shopButton.style.fontSize = "16px";
    shopButton.style.cursor = "pointer";
    shopButton.style.transition = "background 0.3s ease, transform 0.3s ease";

    // Add hover animation
    shopButton.addEventListener("mouseover", function () {
      shopButton.style.transform = "scale(1.05)";
    });
    shopButton.addEventListener("mouseout", function () {
      shopButton.style.transform = "scale(1)";
    });

    // Redirect user when button is clicked
    shopButton.addEventListener("click", function () {
      window.location.href = "index_style.html"; // Link to shop page
    });

    // Append result and button to DOM
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(shopButton);

    form.style.display = "none"; // Hide form after submission
    form.parentNode.appendChild(resultDiv); // Show result and shop button
  });
});
