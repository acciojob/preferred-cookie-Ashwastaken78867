//your JS code here. If required.
// Helper function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Helper function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) return value;
  }
  return null;
}

// Apply saved preferences from cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", `${savedFontSize}px`);
    document.getElementById("fontsize").value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
}

// Save preferences to cookies and apply them
document.getElementById("preferencesForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save preferences to cookies
  setCookie("fontsize", fontSize, 365); // Save for 1 year
  setCookie("fontcolor", fontColor, 365);

  // Apply preferences
  document.documentElement.style.setProperty("--fontsize", `${fontSize}px`);
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  alert("Preferences saved!");
});

// Initialize the page with saved preferences
applyPreferences();   
describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('index.html'); // Correct path to your app
    cy.log('Page visited');
  });

  it('should allow users to customize font size and color', () => {
    cy.get('#fontsize').clear().type('20');
    cy.get('#fontcolor').invoke('val', '#0000FF').trigger('input');
    cy.get('input[type="submit"]').click();

    // Check if cookies are saved
    cy.getCookie('fontSize').should('have.property', 'value', '20');
    cy.getCookie('fontColor').should('have.property', 'value', '#0000FF');

    // Reload and verify preferences
    cy.reload();
    cy.get('body').should('have.css', 'font-size', '20px');
    cy.get('body').should('have.css', 'color', 'rgb(0, 0, 255)');
  });
});

