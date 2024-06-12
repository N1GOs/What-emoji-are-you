const questions = [
    { question: "What’s your favorite type of music?", answers: ["Pop", "Rock", "Classical", "Hip-hop"] },
    { question: "How do you react to stressful situations?", answers: ["Stay calm", "Get anxious", "Seek help", "Avoid it"] },
    { question: "What is your favorite hobby?", answers: ["Reading", "Sports", "Gaming", "Cooking"] },
    { question: "How do you prefer to communicate with friends?", answers: ["Texting", "Calling", "In-person", "Social media"] },
    { question: "What’s your favorite time of the day?", answers: ["Morning", "Afternoon", "Evening", "Night"] },
    { question: "How do you feel about surprises?", answers: ["Love them", "Hate them", "Indifferent", "Depends"] },
    { question: "What kind of movies do you like?", answers: ["Action", "Comedy", "Drama", "Horror"] },
    { question: "What’s your dream vacation?", answers: ["Beach", "Mountains", "City", "Countryside"] },
    { question: "How do you handle criticism?", answers: ["Accept it", "Ignore it", "Defend myself", "Reflect on it"] },
    { question: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
    { question: "How do you start your day?", answers: ["Coffee", "Exercise", "Reading", "Sleeping in"] },
    { question: "What’s your favorite season?", answers: ["Spring", "Summer", "Autumn", "Winter"] },
    { question: "How do you like to spend your evenings?", answers: ["Watching TV", "Reading a book", "Going out", "Exercising"] },
    { question: "What’s your favorite dessert?", answers: ["Ice cream", "Cake", "Cookies", "Fruit"] },
    { question: "What’s your go-to drink?", answers: ["Water", "Coffee", "Tea", "Juice"] },
    { question: "How do you prefer to relax?", answers: ["Meditation", "Listening to music", "Watching movies", "Going for a walk"] },
    { question: "What type of pet do you prefer?", answers: ["Dog", "Cat", "Bird", "No pet"] },
    { question: "What’s your favorite sport?", answers: ["Football", "Basketball", "Tennis", "Swimming"] },
    { question: "How do you feel about traveling?", answers: ["Love it", "It's okay", "Prefer staying home", "Depends on the destination"] },
    { question: "What’s your favorite type of weather?", answers: ["Sunny", "Rainy", "Snowy", "Windy"] },
    { question: "How do you usually spend your evenings?", answers: ["With family", "With friends", "Alone", "Working"] },
    { question: "What’s your favorite meal of the day?", answers: ["Breakfast", "Lunch", "Dinner", "Snacks"] },
    { question: "What’s your favorite type of book?", answers: ["Fiction", "Non-fiction", "Mystery", "Fantasy"] },
    { question: "How do you feel about social media?", answers: ["Love it", "Hate it", "It's okay", "Avoid it"] },
    { question: "What’s your favorite way to exercise?", answers: ["Running", "Yoga", "Gym", "Swimming"] },
    { question: "How do you prefer to spend a rainy day?", answers: ["Reading", "Watching TV", "Sleeping", "Doing hobbies"] },
    { question: "What’s your favorite type of art?", answers: ["Painting", "Sculpture", "Photography", "Digital art"] },
    { question: "What’s your favorite type of flower?", answers: ["Rose", "Tulip", "Sunflower", "Daisy"] },
    { question: "How do you feel about technology?", answers: ["Love it", "Indifferent", "It's complicated", "Prefer simple life"] },
    { question: "What’s your favorite way to celebrate?", answers: ["Party", "Quiet night", "Travel", "Family gathering"] }
];

const emojis = ["😀", "😂", "😍", "😎", "🤔", "😜", "🤗", "😇", "😱", "😭", "😡", "🤢", "😴", "😵", "🤓", "🤠", "🥳", "🥰", "😋", "🤪", "🤬", "🥺", "😌", "🧐", "🤖", "👻", "🎃", "💀", "👽", "😺"];

let currentQuestionIndex = 0;
let answers = [];

function startQuiz() {
    console.log('Starting quiz...');
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const answerButtons = document.getElementById('answer-buttons');

    if (!questionContainer || !answerButtons) {
        console.error('Question container or answer buttons not found');
        return;
    }

    questionContainer.innerHTML = questions[currentQuestionIndex].question;
    answerButtons.innerHTML = '';

    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answer-button');
        button.onclick = () => selectAnswer(answer);
        answerButtons.appendChild(button);
    });

    console.log('Question displayed:', questions[currentQuestionIndex].question);
    console.log('Answer buttons:', questions[currentQuestionIndex].answers);
}

function selectAnswer(answer) {
    answers.push(answer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showLoading();
    }
}

function showLoading() {
    console.log('Showing loading...');
    const loadingScreen = document.getElementById('loading');
    const quizScreen = document.getElementById('quiz');
    if (quizScreen) quizScreen.classList.add('hidden');
    if (loadingScreen) loadingScreen.classList.remove('hidden');

    setTimeout(showResult, 3000 + Math.random() * 3000);
}

function showResult() {
    console.log('Showing result...');
    const loadingScreen = document.getElementById('loading');
    const resultScreen = document.getElementById('result');
    const emoji = calculateEmoji();

    if (loadingScreen) loadingScreen.classList.add('hidden');
    if (resultScreen) resultScreen.classList.remove('hidden');
    const emojiElement = document.getElementById('emoji');
    if (emojiElement) emojiElement.innerText = emoji;
    console.log('Result shown:', emoji);
}

function calculateEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function restartQuiz() {
    console.log('Restarting quiz...');
    currentQuestionIndex = 0;
    answers = [];
    const resultScreen = document.getElementById('result');
    const quizScreen = document.getElementById('quiz');
    if (resultScreen) resultScreen.classList.add('hidden');
    if (quizScreen) quizScreen.classList.remove('hidden');
    showQuestion();
}

document.addEventListener("DOMContentLoaded", function() {
    startQuiz();
    console.log('DOM fully loaded and parsed');
});