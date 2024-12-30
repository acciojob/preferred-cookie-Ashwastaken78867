document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const fontSizeInput = document.getElementById("fontsize");
  const fontColorInput = document.getElementById("fontcolor");

  // Apply saved preferences from cookies
  const cookies = document.cookie.split("; ");
  const preferences = Object.fromEntries(
    cookies.map((cookie) => cookie.split("="))
  );

  if (preferences.fontsize) {
    document.documentElement.style.setProperty("--fontsize", preferences.fontsize + "px");
    fontSizeInput.value = preferences.fontsize;
  }

  if (preferences.fontcolor) {
    document.documentElement.style.setProperty("--fontcolor", preferences.fontcolor);
    fontColorInput.value = preferences.fontcolor;
  }

  // Save preferences to cookies on form submit
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;

    // Save cookies
    document.cookie = `fontsize=${fontSize}; path=/`;
    document.cookie = `fontcolor=${fontColor}; path=/`;

    // Apply styles
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.documentElement.style.setProperty("--fontcolor", fontColor);
  });
});

