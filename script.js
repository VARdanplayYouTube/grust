// Блокировка некоторых функций DevTools
(function() {
    'use strict';
    
    // Блокировка открытия консоли
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && e.key === 'U') ||
            (e.key === 'F12')
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Правая кнопка мыши
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            alert('Доступ к инструментам разработчика ограничен.');
            return false;
        }
    });
    
    // Блокировка контекстного меню
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Обнаружение открытия DevTools
    function detectDevTools() {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            document.body.innerHTML = '<div style="padding: 50px; text-align: center; font-size: 24px;">Инструменты разработчика отключены</div>';
            window.location.reload();
        }
    }
    
    // Проверка каждые 500ms
    setInterval(detectDevTools, 500);
    
    // Дополнительная проверка при изменении размера
    window.addEventListener('resize', detectDevTools);
})();

// Simple interactive functionality for the GALST website

document.addEventListener('DOMContentLoaded', function() {
    
    // Update player counts with random variations (simulating live updates)
    function updatePlayerCounts() {
        const playerCounts = document.querySelectorAll('.player-count');
        playerCounts.forEach(count => {
            const currentText = count.textContent;
            const parts = currentText.split('/');
            if (parts.length === 2) {
                const current = parseInt(parts[0]);
                const max = parseInt(parts[1]);
                // Random change of -3 to +3, but keep within bounds
                let newCount = current + Math.floor(Math.random() * 7) - 3;
                if (newCount < 0) newCount = 0;
                if (newCount > max) newCount = max;
                count.textContent = newCount + '/' + max;
                
                // Change color based on population
                if (newCount > max * 0.8) {
                    count.style.color = '#ff5722'; // Orange for high pop
                } else if (newCount > max * 0.5) {
                    count.style.color = '#4CAF50'; // Green for medium pop
                } else {
                    count.style.color = '#2196F3'; // Blue for low pop
                }
            }
        });
        
        // Update the main stats
        const totalPlayers = document.querySelector('.stat-number:nth-child(2)');
        if (totalPlayers) {
            const currentTotal = parseInt(totalPlayers.textContent.replace(',', ''));
            // Random small variation
            const variation = Math.floor(Math.random() * 21) - 10; // -10 to +10
            let newTotal = currentTotal + variation;
            if (newTotal < 1200) newTotal = 1200;
            if (newTotal > 1300) newTotal = 1300;
            totalPlayers.textContent = newTotal.toLocaleString();
        }
    }
    
    // Update counts every 30 seconds
    setInterval(updatePlayerCounts, 30000);
    
    // Button click effects
    const buttons = document.querySelectorAll('button, .btn-play, .btn-store, .btn-connect, .btn-small');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // If it's a JOIN or CONNECT button, show a connecting message
            if (this.textContent.includes('JOIN') || this.textContent.includes('CONNECT')) {
                e.preventDefault();
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';
                this.disabled = true;
                
                // Simulate connection attempt
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    alert('Server is developing.');
                }, 1500);
            }
            
            // If it's a login or register button
            if (this.classList.contains('btn-login') || this.classList.contains('btn-register')) {
                e.preventDefault();
                const action = this.classList.contains('btn-login') ? 'Login' : 'Register';
                alert(`${action} on soon...`);
            }
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // News item click effect
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = 'rgba(90, 62, 31, 0.2)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
    
    // Initialize tooltips for social icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const platform = this.querySelector('i').className.split('fa-')[1].split(' ')[0];
            this.setAttribute('title', `Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
        });
    });
    
    // Simulate live player count updates on load
    setTimeout(updatePlayerCounts, 1000);
    
    // Console welcome message
    console.log('%c GRust - Rust in Garry\'s Mod', 'color: #f0a800; font-size: 18px; font-weight: bold;');
    console.log('%c Welcome to the GRust demo website!', 'color: #ccc;');
});