// DOM Elements
const englishSide = document.getElementById('english-side');
const chineseSide = document.getElementById('chinese-side');
const englishElement = document.getElementById('english');
const posElement = document.getElementById('pos');
const chineseElement = document.getElementById('chinese');
const flipBtn = document.getElementById('flip-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const cardCountElement = document.getElementById('card-count');

// App State
let currentCardIndex = -1;
let isStudyMode = false;
let shuffledDictionary = [];
let showingChinese = false;

// Shuffle the dictionary using Fisher-Yates algorithm
function shuffleDictionary() {
    // Create a copy of the original dictionary
    shuffledDictionary = [...dictionary];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledDictionary.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDictionary[i], shuffledDictionary[j]] = [shuffledDictionary[j], shuffledDictionary[i]];
    }
}

// Display a flashcard
function displayCard(index) {
    if (index >= 0 && index < shuffledDictionary.length) {
        const card = shuffledDictionary[index];
        
        // Update card content
        englishElement.textContent = card.english;
        posElement.textContent = card.pos;
        chineseElement.textContent = card.chinese;
        
        // Always show English side first
        showEnglishSide();
        
        // Update card count
        cardCountElement.textContent = `Card ${index + 1} of ${shuffledDictionary.length}`;
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === shuffledDictionary.length - 1;
        
        // Enable flip button
        flipBtn.disabled = false;
    }
}

// Show English side
function showEnglishSide() {
    englishSide.style.display = 'flex';
    chineseSide.style.display = 'none';
    flipBtn.textContent = 'Show Translation';
    showingChinese = false;
}

// Show Chinese side
function showChineseSide() {
    englishSide.style.display = 'none';
    chineseSide.style.display = 'flex';
    flipBtn.textContent = 'Show English';
    showingChinese = true;
}

// Toggle between English and Chinese sides
function toggleSides() {
    if (showingChinese) {
        showEnglishSide();
    } else {
        showChineseSide();
    }
}

// Reset study mode
function resetStudyMode() {
    isStudyMode = false;
    currentCardIndex = -1;
    
    englishElement.textContent = 'Press Start to begin';
    posElement.textContent = '';
    chineseElement.textContent = '';
    
    showEnglishSide();
    flipBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    startBtn.textContent = 'Start';
    cardCountElement.textContent = '';
}

// Start study mode
function startStudyMode() {
    if (dictionary.length === 0) {
        alert('No words in your dictionary. Please add words to the vocabulary.js file.');
        return;
    }
    
    // Shuffle the dictionary when starting
    shuffleDictionary();
    
    isStudyMode = true;
    currentCardIndex = 0;
    displayCard(currentCardIndex);
    startBtn.textContent = 'Restart';
}

// Setup event listeners
function setupEventListeners() {
    // Flip button
    flipBtn.addEventListener('click', toggleSides);
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            displayCard(currentCardIndex);
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        if (currentCardIndex < shuffledDictionary.length - 1) {
            currentCardIndex++;
            displayCard(currentCardIndex);
        }
    });
    
    // Start/Restart button
    startBtn.addEventListener('click', function() {
        if (isStudyMode) {
            resetStudyMode();
        }
        startStudyMode();
    });
}

// Initialize the app
setupEventListeners();
