
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
    const isDark = document.body.hasAttribute('data-theme');
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

function setFontSize(size) {
    const root = document.documentElement;
    if (size === 'small') root.style.fontSize = '14px';
    if (size === 'medium') root.style.fontSize = '18px';
    if (size === 'large') root.style.fontSize = '22px';
}

const input = document.getElementById('typing-input');
const texts = [
    "Ask about fees structure...",
    "Ask about hostel info...",
    "Ask about admission process...",
    "Ask about scholarships..."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentFullText = texts[textIndex];
    
    if (isDeleting) {
        input.placeholder = currentFullText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        input.placeholder = currentFullText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentFullText.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeAnimation, typeSpeed);
}


window.onload = typeAnimation;