document.addEventListener('DOMContentLoaded', () => { 
    const messagesContainer = document.querySelector('.chat-messages'); 
    const chatOptions = document.querySelector('.chat-options'); 
 
    // Sound effects - using shorter, working sound URLs 
    const messageInSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'); 
 
    // Initialize birthday song audio 
    const birthdaySong = new Audio('catto.mp3'); 
    birthdaySong.volume = 0.5; 
    
    // Add this function to detect mobile devices
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               (navigator.userAgent.match(/Android/i)) || 
               (navigator.userAgent.match(/webOS/i)) || 
               (navigator.userAgent.match(/iPhone/i)) || 
               (navigator.userAgent.match(/iPad/i)) || 
               (navigator.userAgent.match(/iPod/i)) || 
               (navigator.userAgent.match(/BlackBerry/i)) || 
               (navigator.userAgent.match(/Windows Phone/i));
    }
 
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
        
        // Check if any options should be visible
        document.querySelectorAll('.chat-options').forEach(option => {
            if (option.dataset.shouldBeVisible === 'true') {
                option.style.display = 'flex';
            }
        });
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
 
    // Improved showOptions function for better mobile compatibility
    function showOptions(optionsDiv) {
        // Mark this options div as should be visible
        optionsDiv.dataset.shouldBeVisible = 'true';
        
        // Force display style to be flex
        optionsDiv.style.display = 'flex';
        
        // Ensure visibility with multiple approaches
        optionsDiv.style.opacity = '1';
        optionsDiv.style.visibility = 'visible';
        
        // Add !important flag for Samsung devices
        if (isMobileDevice()) {
            optionsDiv.setAttribute('style', 'display: flex !important; opacity: 1 !important; visibility: visible !important');
        }
        
        // Make sure to scroll after a delay to ensure rendering
        setTimeout(() => {
            scrollToBottom();
            // Double-check visibility after slight delay
            if (optionsDiv.style.display !== 'flex') {
                optionsDiv.style.display = 'flex';
            }
        }, 300);
    }
 
    async function startConversation() { 
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        await addMessage("I heard from Sir. Oza that today is your birthday hmm?"); 
        showOptions(chatOptions); 
    } 
 
    async function handleSongResponse(response) { 
        const songResponses = document.getElementById('songResponses'); 
        songResponses.style.display = 'none'; 
        songResponses.dataset.shouldBeVisible = 'false';
 
        if (response === 'omg') { 
            await addMessage("OMG! 😱", true); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await addMessage("Hehe... surprised? 😸 I've been practicing this song for weeks!"); 
            await new Promise(resolve => setTimeout(resolve, 1500)); 
             
            // Show next question 
            await addMessage("I heard you gonna go as an... animal doctor? 🤔"); 
             
            // Show new response option 
            const vetResponse = document.createElement('div'); 
            vetResponse.className = 'chat-options'; 
            vetResponse.innerHTML = ` 
                <button class="option-btn" data-response="vet">You mean a veterinarian? 🐾</button> 
            `; 
            messagesContainer.appendChild(vetResponse); 
            showOptions(vetResponse); 
             
            // Add listener for new response 
            vetResponse.querySelector('.option-btn').addEventListener('click', async function() { 
                this.disabled = true; 
                vetResponse.style.display = 'none'; 
                vetResponse.dataset.shouldBeVisible = 'false';
                await addMessage("You mean a veterinarian? 🐾", true); 
                await handleVetResponse(); 
            }); 
 
        } else if (response === 'where') { 
            await addMessage("Where did that music come from? 🤔", true); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await addMessage("Magic! ✨ Every cat has secret musical talents!"); 
            await new Promise(resolve => setTimeout(resolve, 1500)); 
             
            // Show next question 
            await addMessage("I heard you gonna go as an... animal doctor? 🤔"); 
             
            // Show new response option 
            const vetResponse = document.createElement('div'); 
            vetResponse.className = 'chat-options'; 
            vetResponse.innerHTML = ` 
                <button class="option-btn" data-response="vet">You mean a veterinarian? 🐾</button> 
            `; 
            messagesContainer.appendChild(vetResponse); 
            showOptions(vetResponse); 
             
            // Add listener for new response 
            vetResponse.querySelector('.option-btn').addEventListener('click', async function() { 
                this.disabled = true; 
                vetResponse.style.display = 'none'; 
                vetResponse.dataset.shouldBeVisible = 'false';
                await addMessage("You mean a veterinarian? 🐾", true); 
                await handleVetResponse(); 
            }); 
        } 
    } 
 
    async function handleVetResponse() { 
        await addMessage("YES THAT! 😸", false); 
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        await addMessage("i'm a cat and actually kinda sick... want to see my face? 😿", false); 
 
        // Show concern options 
        const concernOptions = document.createElement('div'); 
        concernOptions.className = 'chat-options'; 
        concernOptions.innerHTML = ` 
            <button class="option-btn" data-response="picture">Sure? can you even take picture? 📸</button> 
            <button class="option-btn" data-response="concern">What happened to you? 😟</button> 
        `; 
        messagesContainer.appendChild(concernOptions); 
        showOptions(concernOptions); 
 
        // Add listeners for concern responses 
        concernOptions.querySelectorAll('.option-btn').forEach(btn => { 
            btn.addEventListener('click', async function() { 
                this.disabled = true; 
                concernOptions.style.display = 'none'; 
                concernOptions.dataset.shouldBeVisible = 'false';
                await handleConcernResponse(this.dataset.response); 
            }); 
        }); 
    } 
 
    async function handleConcernResponse(response) { 
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
 
        // Add empathy response option 
        const empathyOptions = document.createElement('div'); 
        empathyOptions.className = 'chat-options'; 
        empathyOptions.innerHTML = ` 
            <button class="option-btn" data-response="empathy">I'm so sorry to hear that... 🥺</button> 
        `; 
        messagesContainer.appendChild(empathyOptions); 
        showOptions(empathyOptions); 
 
        // Add listener for empathy response 
        empathyOptions.querySelector('.option-btn').addEventListener('click', async function() { 
            this.disabled = true; 
            empathyOptions.style.display = 'none'; 
            empathyOptions.dataset.shouldBeVisible = 'false';
            await handleEmpathyResponse(); 
        }); 
    } 
 
    async function handleEmpathyResponse() { 
        await addMessage("I'm so sorry to hear that... 🥺", true); 
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        await addMessage("Thank you for caring... 💝", false); 
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        await addMessage("Can you promise me something? 🥺", false); 
         
        // Add promise response option 
        const promiseOptions = document.createElement('div'); 
        promiseOptions.className = 'chat-options'; 
        promiseOptions.innerHTML = ` 
            <button class="option-btn" data-response="what">What is it? 💭</button> 
        `; 
        messagesContainer.appendChild(promiseOptions); 
        showOptions(promiseOptions); 
 
        // Add listener for promise response 
        promiseOptions.querySelector('.option-btn').addEventListener('click', async function() { 
            this.disabled = true; 
            promiseOptions.style.display = 'none'; 
            promiseOptions.dataset.shouldBeVisible = 'false';
            await addMessage("What is it? 💭", true); 
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            await addMessage("Promise me you'll become a veterinarian... 🐱", false); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await addMessage("So cats like me can be healthy and happy again! 💖", false); 
 
            // After the cat asks about the promise 
            const promiseChoices = document.createElement('div'); 
            promiseChoices.className = 'chat-options'; 
            promiseChoices.innerHTML = ` 
                <button class="option-btn" data-response="yes-promise">Yes, I promise! 🤝</button> 
                <button class="option-btn" data-response="not-sure">I'm not sure... 😕</button> 
            `; 
            messagesContainer.appendChild(promiseChoices); 
            showOptions(promiseChoices); 
 
            // Add listeners for promise choices 
            promiseChoices.querySelectorAll('.option-btn').forEach(btn => { 
                btn.addEventListener('click', async function() { 
                    this.disabled = true; 
                    promiseChoices.style.display = 'none'; 
                    promiseChoices.dataset.shouldBeVisible = 'false';
                    await handlePromiseResponse(this.dataset.response); 
                }); 
            }); 
        }); 
    } 
 
    async function handlePromiseResponse(response) { 
        if (response === 'yes-promise') { 
            await addMessage("Yes, I promise! 🤝", true); 
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            await addMessage("I'm happy! Then tell Sir. Oza you gonna be one! 😸", false); 
            await new Promise(resolve => setTimeout(resolve, 2000)); 
             
            // Create offline message with animation 
            const offlineMsg = document.createElement('div'); 
            offlineMsg.className = 'system-message'; 
            offlineMsg.textContent = '🔴 The cat has gone offline'; 
            offlineMsg.style.animation = 'fadeIn 0.5s ease'; 
            messagesContainer.appendChild(offlineMsg); 
             
        } else if (response === 'not-sure') { 
            await addMessage("I'm not sure... 😕", true); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await addMessage("Why not? 🥺", false); 
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await addMessage("Is it because you're scared? Or is there something else holding you back? 🤔", false); 
             
            // Add reason options 
            const reasonOptions = document.createElement('div'); 
            reasonOptions.className = 'chat-options'; 
            reasonOptions.innerHTML = ` 
                <button class="option-btn" data-response="scared">Yes, I'm a bit scared...</button> 
                <button class="option-btn" data-response="different">I might want to do something different</button> 
            `; 
            messagesContainer.appendChild(reasonOptions); 
            showOptions(reasonOptions); 
 
            // Add listeners for reason responses 
            reasonOptions.querySelectorAll('.option-btn').forEach(btn => { 
                btn.addEventListener('click', async function() { 
                    this.disabled = true; 
                    reasonOptions.style.display = 'none'; 
                    reasonOptions.dataset.shouldBeVisible = 'false';
                    await handleUncertaintyResponse(this.dataset.response); 
                }); 
            }); 
        } 
    } 
 
    async function handleUncertaintyResponse(response) { 
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
        const offlineMsg = document.createElement('div'); 
        offlineMsg.className = 'system-message'; 
        offlineMsg.textContent = '🔴 The cat has gone offline'; 
        offlineMsg.style.animation = 'fadeIn 0.5s ease'; 
        messagesContainer.appendChild(offlineMsg); 
    } 
 
    // Update the conversation flow 
    document.querySelector('.option-btn').addEventListener('click', async function() { 
        this.disabled = true; 
        chatOptions.style.display = 'none'; 
        chatOptions.dataset.shouldBeVisible = 'false';
         
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
             
            // Show response options 
            const songResponses = document.getElementById('songResponses'); 
            showOptions(songResponses); 
             
            // Add click listeners to new options 
            songResponses.querySelectorAll('.option-btn').forEach(btn => { 
                btn.addEventListener('click', function() { 
                    handleSongResponse(this.dataset.response); 
                }); 
            }); 
        } catch (err) { 
            console.log('Audio playback failed:', err); 
            await addMessage("*The cat seems to have lost its voice* 😿"); 
        } 
    }); 
    
    // Add this function to fix visibility issues for mobile devices
    function checkMobileOptionVisibility() {
        if (isMobileDevice()) {
            document.querySelectorAll('.chat-options').forEach(option => {
                if (option.dataset.shouldBeVisible === 'true') {
                    option.style.display = 'flex';
                    option.style.opacity = '1';
                    option.style.visibility = 'visible';
                }
            });
        }
    }
    
    // Run this check periodically
    setInterval(checkMobileOptionVisibility, 1000);
 
    // Start the conversation 
    startConversation(); 
});
