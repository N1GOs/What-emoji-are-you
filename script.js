document.addEventListener("DOMContentLoaded", async function (){
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

    let currentQuestionIndex = 0;
    let answers = [];

    const questionContainer = document.getElementById('question-container');
    const answerButtons = document.getElementById('answer-buttons');
    const loadingScreen = document.getElementById('loading');
    const quizScreen = document.getElementById('quiz');
    const resultScreen = document.getElementById('result');
    const emojiElement = document.getElementById('emoji');
    const restartButton = document.getElementById('restart-button');

        // Initialize CrazyGames SDK
        let crazygames;
        if (typeof window.CrazyGames !== 'undefined' && window.CrazyGames.SDK) {
            crazygames = window.CrazyGames.SDK;
    
            try {
                await crazygames.init();
                console.log("SDK has been initialized");
    
                // Request a banner ad
                await window.CrazyGames.SDK.banner.requestBanner({
                    id: "banner-container",
                    width: 300,
                    height: 250,
                }).catch(error => {
                    console.error("Error requesting banner:", error);
                });
                console.log("A banner has been requested");
    
                // Start gameplay
                window.CrazyGames.SDK.game.gameplayStart();
                console.log("A gameplay start event has been triggered");
            } catch (error) {
                console.error("Error initializing SDK:", error);
            }
        } else {
            console.error('CrazyGames SDK not found.');
        }
    
        function startQuiz() {
            currentQuestionIndex = 0;
            answers = [];
            showQuestion();
            quizScreen.classList.add('active');
            loadingScreen.classList.remove('active');
            resultScreen.classList.remove('active');
        }
    
        function showQuestion() {
            const question = questions[currentQuestionIndex];
            questionContainer.innerText = question.question;
            answerButtons.innerHTML = '';
    
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer;
                button.classList.add('answer-button');
                button.addEventListener('click', () => selectAnswer(answer));
                answerButtons.appendChild(button);
            });
        }
    
        function selectAnswer(answer) {
            answers.push(answer);
            currentQuestionIndex++;
    
            if (currentQuestionIndex % 7 === 0 && currentQuestionIndex < questions.length) {
                showAd(() => {
                    showQuestion();
                });
            } else {
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    showLoading();
                }
            }
        }
    
        function showAd(callback) {
            if (crazygames) {
                window.CrazyGames.SDK.ad.requestAd("midgame").then(() => {
                    console.log('Ad finished');
                    callback();
                }).catch(err => {
                    console.error('Ad error', err);
                    callback();
                });
            } else {
                console.error('CrazyGames SDK not found.');
                callback();
            }
        }
    
        function showLoading() {
            quizScreen.classList.remove('active');
            loadingScreen.classList.add('active');
    
            setTimeout(showResult, 3000 + Math.random() * 3000);
        }
    
        function showResult() {
            loadingScreen.classList.remove('active');
            resultScreen.classList.add('active');
            const emoji = calculateEmoji();
            emojiElement.innerText = emoji;
            emojiElement.style.display = 'block';
    
            // Stop gameplay
            if (crazygames) {
                window.CrazyGames.SDK.game.gameplayStop();
                console.log("A gameplay stop event has been triggered");
            }
        }
    
        function calculateEmoji() {
            return emojis[Math.floor(Math.random() * emojis.length)];
        }
    
        restartButton.addEventListener('click', startQuiz);
    
        // Start the quiz on page load
        startQuiz();
    });