document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Class-based)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // 3. Intersection Observer for Reveals
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Mouse Glow Effect
    const mouseGlow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });

    // 5. Typewriter Effect
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const words = JSON.parse(typewriter.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {
            const currentWord = words[wordIndex % words.length];
            
            if (isDeleting) {
                typewriter.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 75;
            } else {
                typewriter.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000); // Initial delay
    }

    // 6. Copy Email to Clipboard
    const copyEmailBtn = document.querySelector('.copy-email');
    const toast = document.getElementById('copy-toast');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            // We don't preventDefault() so the mailto: link still triggers
            const email = copyEmailBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                toast.textContent = "Email Copied & Opening App...";
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2500);
            });
        });
    }

    // 7. Contact Section Micro-Interactions
    const contactSection = document.getElementById('contact');
    const blobs = document.querySelectorAll('.blob');
    const iconBtns = document.querySelectorAll('.icon-btn');

    if (contactSection) {
        contactSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.4;
                blob.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
            });
        });
    }

    // Magnetic Icons
    iconBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.15) translateY(-5px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0) scale(1)`;
        });
    });

    // 8. 3D Tilt Effect for Mosaic Tiles
    const mosaicTiles = document.querySelectorAll('.mosaic-tile');
    mosaicTiles.forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            tile.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-8px)`;
        });
        
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)`;
        });
    });

    // 9. Adaptive Immersive UX (Contact Section)
    const contactTitle = document.querySelector('.contact-title');
    const contactDesc = document.querySelector('.contact-desc');
    const originalTitle = contactTitle.innerHTML;
    const originalDesc = contactDesc.innerHTML;

    iconBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const newTitle = btn.getAttribute('data-title');
            const newDesc = btn.getAttribute('data-desc');
            const newColor = btn.getAttribute('data-color');

            if (newTitle && newDesc) {
                contactTitle.classList.add('fade');
                contactDesc.classList.add('fade');

                setTimeout(() => {
                    contactTitle.innerHTML = newTitle;
                    contactDesc.innerHTML = newDesc;
                    contactTitle.classList.remove('fade');
                    contactDesc.classList.remove('fade');
                }, 200);
            }

            if (newColor) {
                blobs.forEach(blob => {
                    blob.style.background = `radial-gradient(circle, ${newColor}22 0%, transparent 70%)`;
                });
            }
        });

        btn.addEventListener('mouseleave', () => {
            contactTitle.classList.add('fade');
            contactDesc.classList.add('fade');

            setTimeout(() => {
                contactTitle.innerHTML = originalTitle;
                contactDesc.innerHTML = originalDesc;
                contactTitle.classList.remove('fade');
                contactDesc.classList.remove('fade');
            }, 200);

            blobs.forEach(blob => {
                blob.style.background = `radial-gradient(circle, rgba(0, 153, 255, 0.08) 0%, transparent 70%)`;
            });
        });
    });
});
