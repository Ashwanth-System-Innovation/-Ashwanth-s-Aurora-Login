document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const backgroundAudio = new Audio('audio/background.mp3');
    const loginAudio = new Audio('audio/login.mp3');
    const signupAudio = new Audio('audio/signup.mp3');
    
    // Audio control elements
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtns = document.querySelectorAll('#signupBtn, #signupBtn2');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    
    // Audio state
    let isMuted = false;
    let audioStarted = false;
    
    // Set audio loop
    backgroundAudio.loop = true;
    
    // Start audio on first interaction
    function startAudio() {
        if (!audioStarted) {
            backgroundAudio.play().catch(e => console.log('Audio play failed:', e));
            audioStarted = true;
        }
    }
    
    // Event listeners for first interaction
    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);
    document.addEventListener('touchstart', startAudio);
    
    // Mute/unmute functionality
    muteBtn.addEventListener('click', function() {
        isMuted = !isMuted;
        
        backgroundAudio.muted = isMuted;
        loginAudio.muted = isMuted;
        signupAudio.muted = isMuted;
        
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
    });
    
    // Volume control
    volumeSlider.addEventListener('input', function() {
        const volume = this.value;
        backgroundAudio.volume = volume;
        loginAudio.volume = volume;
        signupAudio.volume = volume;
    });
    
    // Set initial volume
    backgroundAudio.volume = volumeSlider.value;
    loginAudio.volume = volumeSlider.value;
    signupAudio.volume = volumeSlider.value;
    
    // Ripple effect for login button
    loginBtn.addEventListener('click', function(e) {
        // Create ripple
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        // Position ripple
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Form validation - FIXED LOGIN SOUND ISSUE
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Email validation
        if (!emailInput.value || !emailInput.value.includes('@')) {
            emailInput.parentElement.classList.add('shake');
            isValid = false;
            
            setTimeout(() => {
                emailInput.parentElement.classList.remove('shake');
            }, 500);
        }
        
        // Password validation
        if (!passwordInput.value || passwordInput.value.length < 6) {
            passwordInput.parentElement.classList.add('shake');
            isValid = false;
            
            setTimeout(() => {
                passwordInput.parentElement.classList.remove('shake');
            }, 500);
        }
        
        if (isValid) {
            // Play login sound immediately
            loginAudio.currentTime = 0;
            loginAudio.play().catch(e => console.log('Login audio play failed:', e));
            
            // Show success animation
            showSuccessAnimation();
        }
    });
    
    // Signup button click
    signupBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Play signup sound
            signupAudio.currentTime = 0;
            signupAudio.play().catch(e => console.log('Signup audio play failed:', e));
            
            // Show signup animation
            showSignupAnimation();
        });
    });
    
    // Remember me focus animation
    rememberCheckbox.addEventListener('focus', function() {
        const label = document.querySelector('label[for="remember"]');
        label.classList.add('focused');
    });
    
    rememberCheckbox.addEventListener('blur', function() {
        const label = document.querySelector('label[for="remember"]');
        label.classList.remove('focused');
    });
    
    // Parallax effect for floating shapes
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.05 * (index + 1);
            const xMove = (x - 0.5) * 50 * speed;
            const yMove = (y - 0.5) * 50 * speed;
            
            shape.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${xMove}deg)`;
        });
    });
    
    // Success animation
    function showSuccessAnimation() {
        // Create confetti
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                // Random properties
                const colors = ['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#ffe66d'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                const size = Math.random() * 10 + 5;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 3 + 2;
                
                confetti.style.backgroundColor = color;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.left = `${left}%`;
                confetti.style.top = '-10px';
                confetti.style.opacity = '1';
                confetti.style.position = 'absolute';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                
                // Animation
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.animation = `fall ${animationDuration}s linear forwards`;
                
                document.body.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, animationDuration * 1000);
            }, i * 30);
        }
        
        // Add fall animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Signup animation
    function showSignupAnimation() {
        const rightSide = document.querySelector('.right-side');
        const leftSide = document.querySelector('.left-side');
        
        // Animate using anime.js
        anime({
            targets: rightSide,
            translateX: ['0%', '-100%'],
            opacity: [1, 0],
            duration: 800,
            easing: 'easeInOutQuad'
        });
        
        anime({
            targets: leftSide,
            translateX: ['0%', '100%'],
            opacity: [1, 0],
            duration: 800,
            easing: 'easeInOutQuad',
            complete: function() {
                // Change content
                const title = document.querySelector('.left-side .title');
                const subtitle = document.querySelector('.left-side .subtitle');
                const loginBtn = document.querySelector('.login-btn span');
                const signupLink = document.querySelector('.signup-link');
                
                if (title.textContent === 'Welcome Back') {
                    title.textContent = 'Create Account';
                    subtitle.textContent = 'Join us and start your journey';
                    loginBtn.textContent = 'Sign Up';
                    signupLink.innerHTML = 'Already have an account? <a href="#" id="loginLink">Login</a>';
                    
                    // Add event listener to new login link
                    document.getElementById('loginLink').addEventListener('click', function(e) {
                        e.preventDefault();
                        showLoginAnimation();
                    });
                } else {
                    title.textContent = 'Welcome Back';
                    subtitle.textContent = 'Please login to your account';
                    loginBtn.textContent = 'Login';
                    signupLink.innerHTML = 'Don\'t have an account? <a href="#" id="signupBtn">Sign Up</a>';
                    
                    // Add event listener to new signup button
                    document.getElementById('signupBtn').addEventListener('click', function(e) {
                        e.preventDefault();
                        showSignupAnimation();
                    });
                }
                
                // Reverse animation
                anime({
                    targets: rightSide,
                    translateX: ['100%', '0%'],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
                
                anime({
                    targets: leftSide,
                    translateX: ['-100%', '0%'],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
            }
        });
    }
    
    // Login animation (similar to signup but reversed)
    function showLoginAnimation() {
        showSignupAnimation(); // Reuses the same function with different content
    }
    
    // Initialize animations for form elements
    anime({
        targets: '.title, .subtitle, .form-group, .options, .login-btn, .signup-link, .welcome-message h1, .welcome-message p, .ghost-btn, .footer',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });
});