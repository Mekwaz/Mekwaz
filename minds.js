document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const chatbotMessages = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const voiceSearchButton = document.getElementById('voice-search-button');

    // Function to add a message to the chatbot
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to the bottom of the chat
    }

    // Function to handle user input
function handleUserInput() {
    const userMessage = inputField.value.trim().toLowerCase(); // Trim whitespace from the input and convert to lowercase
    if (userMessage === '') {
        return; // Don't send empty messages
    }
    addMessage(userMessage, 'user');

    // Logic for generating a bot response based on user input
    let botResponse = '';

    if (userMessage.includes('hi') || userMessage.includes('hello')) {
        botResponse = 'Hello! How can we assist you today?';
    } else if (userMessage.includes('good morning')) {
        botResponse = 'Good morning! How can we assist you today?';
    } else if (userMessage.includes('good evening')) {
        botResponse = 'Good evening! How can we assist you today?';
    } else if (userMessage.includes('services')) {
        botResponse = 'We offer healthcare, transportation, and education services. Which one are you interested in?';
    } else {
        botResponse = "I'm sorry, I couldn't understand your request. Please ask a different question.";
    }

    setTimeout(() => {
        addMessage(botResponse, 'bot');
    }, 1000); // Simulate a delay before the bot responds

    // Clear the input field
    inputField.value = '';
}


    // Event listener for send button click
    sendButton.addEventListener('click', handleUserInput);

    // Event listener for user input (e.g., pressing Enter)
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    // Event listener for voice search button click
    voiceSearchButton.addEventListener('click', () => {
        // Check if the browser supports the Web Speech API
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';

            recognition.onstart = function() {
                // Speech recognition has started
                console.log('Voice recognition started');
            };

            recognition.onresult = function(event) {
                // Get the recognized text
                const transcript = event.results[0][0].transcript;
                inputField.value = transcript;
            };

            recognition.onend = function() {
                // Speech recognition has ended
                console.log('Voice recognition ended');
                handleUserInput();
            };

            recognition.start();
        } else {
            console.log('Voice recognition not supported in this browser');
        }
    });
});
