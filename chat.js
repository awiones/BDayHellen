document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.querySelector('.chat-messages');
    const chatOptions = document.querySelector('.chat-options');

    // Sound effects - using shorter, working sound URLs
    const messageInSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');

    // Initialize birthday song audio
    const birthdaySong = new Audio('catto.mp3');
    birthdaySong.volume = 0.5;

    function createTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = `
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        return typing;
    }

    // Add touch event handling
    document.body.addEventListener('touchmove', function(e) {
        if (!e.target.closest('.chat-messages')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Adjust viewport height for mobile browsers
    function adjustViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', adjustViewportHeight);
    adjustViewportHeight();

    // Add this new function for smooth scrolling
    function scrollToBottom() {
        requestAnimationFrame(() => {
            const scrollOptions = {
                top: messagesContainer.scrollHeight,
                behavior: window.innerWidth > 768 ? 'smooth' : 'auto'
            };
            messagesContainer.scrollTo(scrollOptions);
        });
    }

    async function addMessage(text, isUser = false) {
        const existingTyping = messagesContainer.querySelector('.typing-indicator');
        if (existingTyping) existingTyping.remove();

        if (!isUser) {
            const typing = createTypingIndicator();
            messagesContainer.appendChild(typing);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, 2000));
            typing.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'cat');
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);

        // Play sound with error handling
        try {
            await messageInSound.play();
        } catch (err) {
            console.log('Sound playback failed:', err);
        }

        // Replace the direct scroll with smooth scroll
        scrollToBottom();
    }

    // Add this function to handle button disable/enable
    function setButtonState(button, disabled = true) {
        button.disabled = disabled;
        if (disabled) {
            button.style.opacity = '0.5';
            button.style.cursor = 'default';
        }
    }

    // Add this function to ensure all options are hidden
    function hideAllOptions() {
        document.querySelectorAll('.chat-options').forEach(container => {
            container.style.display = 'none';
        });
    }

    // Update showOptions to first hide all other options
    function showOptions(optionsDiv) {
        hideAllOptions();
        if (optionsDiv) {
            optionsDiv.style.display = 'flex';
            // Enable all buttons in the new options container
            optionsDiv.querySelectorAll('.option-btn').forEach(btn => {
                setButtonState(btn, false);
            });
            setTimeout(() => {
                scrollToBottom();
            }, 100); // Small delay to ensure options are rendered
        }
    }

    async function startConversation() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addMessage("I heard from Sir. Oza that today is your birthday hmm?");
        showOptions(initialResponse);
    }

    async function handleSongResponse(response) {
        songResponses.style.display = 'none';

        if (response === 'omg') {
            await addMessage("OMG! 😱", true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("Hehe... surprised? 😸 I've been practicing this song for weeks!");
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show next question
            await addMessage("I heard you gonna go as an... animal doctor? 🤔");
            
            // Show vet response options
            showOptions(vetResponse);
            
        } else if (response === 'where') {
            await addMessage("Where did that music come from? 🤔", true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("Magic! ✨ Every cat has secret musical talents!");
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show next question
            await addMessage("I heard you gonna go as an... animal doctor? 🤔");
            
            // Show vet response options
            showOptions(vetResponse);
        }
    }

    // Update handleVetResponse to prevent duplicate execution
    async function handleVetResponse() {
        vetResponse.style.display = 'none';
        await addMessage("You mean a veterinarian? 🐾", true);
        await addMessage("YES THAT! 😸", false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addMessage("i'm a cat and actually kinda sick... want to see my face? 😿", false);
        showOptions(concernOptions);
    }

    async function handleConcernResponse(response) {
        // Hide concern options immediately
        hideAllOptions();
        
        if (response === 'picture') {
            await addMessage("Sure? can you even take picture? 📸", true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("Of course! what did you think i am? a dumb cat? 😼", false);
        } else {
            await addMessage("What happened to you? 😟", true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("I have sickness... 😿", false);
        }

        // Add small delay before showing image
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create and add image message
        const imageContainer = document.createElement('div');
        imageContainer.className = 'message cat image-message';
        imageContainer.innerHTML = `
            <img src="cat-autism.jpg" alt="Cat with autism" class="chat-image">
        `;
        messagesContainer.appendChild(imageContainer);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        await addMessage("I have autism... 💕", false);

        // Show empathy options
        showOptions(empathyOptions);
    }

    async function handleEmpathyResponse() {
        // Hide empathy options immediately
        hideAllOptions();
        
        await addMessage("I'm so sorry to hear that... 🥺", true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        await addMessage("Thank you for caring... 💝", false);
        await new Promise(resolve => setTimeout(resolve, 1500));
        await addMessage("Can you promise me something? 🥺", false);
        
        // Show promise options
        showOptions(promiseOptions);
    }

    async function handlePromiseResponse(response) {
        // Hide all options immediately
        hideAllOptions();
        
        if (response === 'yes-promise') {
            await addMessage("Yes, I promise! 🤝", true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            await addMessage("I'm happy! Then tell Sir. Oza you gonna be one! 😸", false);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create offline message with animation without showing new options
            const offlineMsg = document.createElement('div');
            offlineMsg.className = 'system-message';
            offlineMsg.textContent = '🔴 The cat has gone offline';
            offlineMsg.style.animation = 'fadeIn 0.5s ease';
            messagesContainer.appendChild(offlineMsg);
            scrollToBottom();
            
        } else if (response === 'not-sure') {
            await addMessage("I'm not sure... 😕", true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("Why not? 🥺", false);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("Is it because you're scared? Or is there something else holding you back? 🤔", false);
            
            // Show reason options
            showOptions(reasonOptions);
        }
    }

    async function handleUncertaintyResponse(response) {
        // Hide the reason options immediately
        reasonOptions.style.display = 'none';
        
        if (response === 'scared') {
            await addMessage("Yes, I'm a bit scared...", true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            await addMessage("Being scared is normal! 🤗", false);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("But you know what? I believe in you! You have such a kind heart... 💖", false);
            await new Promise(resolve => setTimeout(resolve, 1500));
            await addMessage("Just think about all the animals you could help! 🐱🐶🐰", false);
            
        } else if (response === 'different') {
            await addMessage("I might want to do something different", true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            await addMessage("Oh... 😿", false);
            await new Promise(resolve => setTimeout(resolve, 1500));
            await addMessage("Well... as long as you're happy with your choice... 🌟", false);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("But please remember to always be kind to animals, okay? 💝", false);
        }

        // Common ending for both paths
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Hide all option containers one final time
        hideAllOptions();
        
        const offlineMsg = document.createElement('div');
        offlineMsg.className = 'system-message';
        offlineMsg.textContent = '🔴 The cat has gone offline';
        offlineMsg.style.animation = 'fadeIn 0.5s ease';
        messagesContainer.appendChild(offlineMsg);
        scrollToBottom();
    }

    // Get references to all option containers
    const initialResponse = document.getElementById('initialResponse');
    const songResponses = document.getElementById('songResponses');
    const vetResponse = document.getElementById('vetResponse');
    const concernOptions = document.getElementById('concernOptions');
    const empathyOptions = document.getElementById('empathyOptions');
    const promiseOptions = document.getElementById('promiseOptions');
    const promiseChoices = document.getElementById('promiseChoices');
    const reasonOptions = document.getElementById('reasonOptions');

    // Hide all option containers initially except initialResponse
    [songResponses, vetResponse, concernOptions, empathyOptions, 
     promiseOptions, promiseChoices, reasonOptions].forEach(container => {
        if (container) container.style.display = 'none';
    });

    // Update the conversation flow
    initialResponse.querySelector('.option-btn').addEventListener('click', async function() {
        try {
            if (this.disabled) return;
            setButtonState(this, true);
            hideAllOptions();
            
            await addMessage("Yes! Why?", true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addMessage("Well... I have a surprise for you! 😺");
            await new Promise(resolve => setTimeout(resolve, 1500));
            await addMessage("But first, let me sing you a birthday song! 🎵");
            
            // Start playing the song after a short delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                await birthdaySong.play();
                await addMessage("🎵 ~Meow meow meow~ 🎵");
                await new Promise(resolve => setTimeout(resolve, 2000));
                await addMessage("🎂 Happy Birthday dear Hellen! 🎉");
                
                // Show song response options
                showOptions(songResponses);
                
            } catch (err) {
                console.log('Audio playback failed:', err);
                await addMessage("*The cat seems to have lost its voice* 😿");
            }
        } catch (error) {
            console.error('Error in initial response:', error);
            await addMessage("Oops! Something went wrong... 😿", false);
        }
    });

    // Add event listeners for all option buttons
    document.querySelectorAll('.chat-options .option-btn').forEach(btn => {
        btn.addEventListener('click', async function(e) {
            try {
                // Prevent double clicks
                if (this.disabled) return;
                
                // Disable the button immediately
                setButtonState(this, true);
                
                const response = this.dataset.response;
                const optionContainer = this.closest('.chat-options');
                
                // Disable all buttons in the container
                optionContainer.querySelectorAll('.option-btn').forEach(btn => {
                    setButtonState(btn, true);
                });

                switch(optionContainer.id) {
                    case 'songResponses':
                        await handleSongResponse(response);
                        break;
                    case 'vetResponse':
                        await handleVetResponse();
                        break;
                    case 'concernOptions':
                        await handleConcernResponse(response);
                        break;
                    case 'empathyOptions':
                        await handleEmpathyResponse();
                        break;
                    case 'promiseOptions':
                        // Hide options immediately
                        hideAllOptions();
                        await addMessage(this.textContent.trim(), true);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await addMessage("Promise me you'll become a veterinarian... 🐱", false);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await addMessage("So cats like me can be healthy and happy again! 💖", false);
                        showOptions(promiseChoices);
                        break;
                    case 'promiseChoices':
                        await handlePromiseResponse(response);
                        break;
                    case 'reasonOptions':
                        await handleUncertaintyResponse(response);
                        break;
                }
            } catch (error) {
                console.error('Error handling button click:', error);
                // Show a user-friendly error message if needed
                await addMessage("Oops! Something went wrong... 😿", false);
            }
        });
    });

    // Start the conversation
    startConversation();
});
