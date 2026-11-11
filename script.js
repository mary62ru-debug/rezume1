// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .competency-card, .achievement-card, .course-card, .additional-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add hover effect to timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.timeline-content').style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
        this.querySelector('.timeline-content').style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.timeline-content').style.boxShadow = 'none';
        this.querySelector('.timeline-content').style.transform = 'translateX(0)';
    });
});

// Add transition to timeline content
document.querySelectorAll('.timeline-content').forEach(content => {
    content.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
});

// Counter animation for achievement years
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe achievement cards for counter animation
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const yearElement = entry.target.querySelector('.achievement-year');
            if (yearElement) {
                const year = parseInt(yearElement.textContent);
                yearElement.textContent = year;
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.achievement-card').forEach(card => {
    achievementObserver.observe(card);
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Print functionality
function printResume() {
    window.print();
}

// Add print button dynamically
const printButton = document.createElement('button');
printButton.textContent = '🖨️ Распечатать резюме';
printButton.className = 'print-button';
printButton.onclick = printResume;
printButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 50px;
    font-size: 1em;
    cursor: pointer;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 1000;
`;

printButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
});

printButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
});

document.body.appendChild(printButton);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        printResume();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console message
console.log('%c Резюме Анастасьиной Марии Владиславовны ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('%c KAS-специалист по работе с ключевыми клиентами ', 'color: #667eea; font-size: 14px; font-weight: bold;');
console.log('%c 14 лет опыта в фармацевтической индустрии ', 'color: #555; font-size: 12px;');