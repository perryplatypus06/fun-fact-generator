// Your existing fun facts array
const funFacts = [
    "I've hiked all major trails in Yosemite National Park over three separate visits",
    "I practice guitar for 30 minutes every morning before work, currently mastering basic chords",
    "I maintain a small herb garden with basil, cilantro, and mint for my weekly cooking adventures",
    "I created a simple spreadsheet system to track shelter animal adoption rates",
    "My morning routine includes 20 minutes of yoga, usually with my cat watching from the windowsill",
    "I pack homemade trail mix and energy bars for all my hiking adventures",
    "My adopted cat Felix has been with me for 3 years, we found each other at the shelter where I volunteer",
    "I've photographed over 50 different hiking trails across 5 national parks",
    "I volunteer at the local animal shelter every Saturday morning",
    "I use my software development skills to maintain the animal shelter's website"
];

// Track the last shown fact to prevent repetition
let lastFactIndex = -1;

// Function to get a random fact
function getRandomFact() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * funFacts.length);
    } while (newIndex === lastFactIndex && funFacts.length > 1);
    
    lastFactIndex = newIndex;
    return funFacts[newIndex];
}

// Initialize the fact display
document.addEventListener('DOMContentLoaded', () => {
    const factDisplay = document.getElementById('factDisplay');
    const generateBtn = document.getElementById('generateBtn');
    
    // Show initial fact
    factDisplay.textContent = getRandomFact();
    
    // Add click handler for the button
    generateBtn.addEventListener('click', () => {
        factDisplay.style.opacity = '0';
        setTimeout(() => {
            factDisplay.textContent = getRandomFact();
            factDisplay.style.opacity = '1';
        }, 300);
    });
});
