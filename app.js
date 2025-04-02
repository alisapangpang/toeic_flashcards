// DOM Elements
const wordElement = document.getElementById('word');
const posElement = document.getElementById('pos');
const translationElement = document.getElementById('translation');
const showBtn = document.getElementById('show-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const cardCountElement = document.getElementById('card-count');

// App State
let currentCardIndex = -1;
let isStudyMode = false;
let shuffledDictionary = [];

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
        wordElement.textContent = card.english;
        posElement.textContent = card.pos;
        translationElement.textContent = card.chinese;
        translationElement.style.display = 'none';
        
        // Update card count
        cardCountElement.textContent = `Card ${index + 1} of ${shuffledDictionary.length}`;
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === shuffledDictionary.length - 1;
        
        showBtn.textContent = 'Show Translation';
        showBtn.disabled = false;
    }
}

// Reset study mode
function resetStudyMode() {
    isStudyMode = false;
    currentCardIndex = -1;
    wordElement.textContent = 'Press Start to begin';
    posElement.textContent = '';
    translationElement.textContent = '';
    translationElement.style.display = 'none';
    showBtn.textContent = 'Show Translation';
    showBtn.disabled = true;
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
    // Show translation button
    showBtn.addEventListener('click', function() {
        if (translationElement.style.display === 'none') {
            translationElement.style.display = 'block';
            showBtn.textContent = 'Hide Translation';
        } else {
            translationElement.style.display = 'none';
            showBtn.textContent = 'Show Translation';
        }
    });
    
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