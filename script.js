// Constants and Configuration
const CONFIG = {
    transitionDuration: 300,
    errorMessage: 'Unable to generate fact. Please try again.',
};

// State management
let currentFactIndex = -1;
let isTransitioning = false;

// Cache DOM elements early with error handling
function initializeApp() {
    const elements = {
        factDisplay: document.getElementById('factDisplay'),
        generateBtn: document.getElementById('generateBtn')
    };

    if (!elements.factDisplay || !elements.generateBtn) {
        console.error('Required DOM elements not found');
        document.body.innerHTML = '<p role="alert">App initialization failed. Please refresh.</p>';
        return null;
    }

    return elements;
}

// Improved random fact generation with better validation
function getRandomFact(facts) {
    if (!Array.isArray(facts) || facts.length === 0) {
        throw new Error('Invalid facts array');
    }

    let newIndex;
    const maxAttempts = facts.length * 2;
    let attempts = 0;

    do {
        newIndex = Math.floor(Math.random() * facts.length);
        attempts++;
    } while (newIndex === currentFactIndex && attempts < maxAttempts && facts.length > 1);

    currentFactIndex = newIndex;
    return facts[newIndex];
}

// Enhanced display function with debouncing and accessibility
function displayNewFact(elements) {
    if (isTransitioning) return; // Prevent rapid-fire clicks
    isTransitioning = true;

    elements.generateBtn.disabled = true; // Prevent multiple clicks
    elements.factDisplay.style.opacity = '0';

    try {
        setTimeout(() => {
            const fact = getRandomFact(funFacts);
            elements.factDisplay.textContent = fact;
            elements.factDisplay.style.opacity = '1';
            elements.generateBtn.disabled = false;
            isTransitioning = false;
            
            // Announce to screen readers
            elements.factDisplay.setAttribute('aria-label', `New fact: ${fact}`);
        }, CONFIG.transitionDuration);
    } catch (error) {
        console.error('Error:', error);
        elements.factDisplay.textContent = CONFIG.errorMessage;
        elements.factDisplay.style.opacity = '1';
        elements.generateBtn.disabled = false;
        isTransitioning = false;
    }
}

// Initialize app and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    const elements = initializeApp();
    if (!elements) return;

    // Add keyboard support
    elements.generateBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            displayNewFact(elements);
        }
    });

    elements.generateBtn.addEventListener('click', () => displayNewFact(elements));
    displayNewFact(elements); // Show initial fact
});
