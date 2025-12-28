

        // 1. Back to top functionality
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            backToTop.addEventListener('click', scrollToTop);
            
            function scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });
        }

        // 2. Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const toggleIcon = document.getElementById('toggle-icon');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('mobile-open');
                if (navMenu.classList.contains('mobile-open')) {
                    toggleIcon.classList.remove('fa-bars');
                    toggleIcon.classList.add('fa-xmark');
                } else {
                    toggleIcon.classList.remove('fa-xmark');
                    toggleIcon.classList.add('fa-bars');
                }
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('#nav-menu .nav-link, #nav-menu .submenu-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('mobile-open');
                    toggleIcon.classList.remove('fa-xmark');
                    toggleIcon.classList.add('fa-bars');
                });
            });
        }

        // 3. Dropdown functionality for Courses
        const coursesLink = document.querySelector('[data-dropdown-toggle]');
        const coursesSubmenu = document.getElementById('courses-submenu');
        
        if (coursesLink && coursesSubmenu) {
            // Desktop: Toggle on click
            coursesLink.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.innerWidth >= 768) { // Desktop only
                    coursesSubmenu.classList.toggle('active');
                }
            });
            
            // Mobile: Toggle on click
            coursesLink.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.innerWidth < 768) { // Mobile only
                    coursesSubmenu.classList.toggle('active');
                }
            });
            
            // Close dropdown when clicking outside (desktop only)
            document.addEventListener('click', function(e) {
                if (window.innerWidth >= 768 && 
                    !coursesLink.contains(e.target) && 
                    !coursesSubmenu.contains(e.target)) {
                    coursesSubmenu.classList.remove('active');
                }
            });
            
            // Close dropdown on window resize to desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768) {
                    coursesSubmenu.classList.remove('active');
                }
            });
        }

        // 4. Fixed tab system with SIMPLE FADE animation (no fade-up)
        function initTabSystem() {
            let wrappers = document.querySelectorAll('[data-tabs="wrapper"]');
            
            wrappers.forEach((wrapper) => {
                let nav = wrapper.querySelector('[data-tabs="nav"]');
                let buttons = nav.querySelectorAll('[data-tabs="button"]');
                let contentWrap = wrapper.querySelector('[data-tabs="content-wrap"]');
                let contentItems = contentWrap.querySelectorAll('[data-tabs="content-item"]');
                let visualWrap = wrapper.querySelector('[data-tabs="visual-wrap"]');
                let visualItems = visualWrap.querySelectorAll('[data-tabs="visual-item"]');

                let activeButton = buttons[0];
                let activeContent = contentItems[0];
                let activeVisual = visualItems[0];
                let isAnimating = false;

                function switchTab(index, initial = false) {
                    if (!initial && (isAnimating || buttons[index] === activeButton)) return;
                    isAnimating = true;

                    const outgoingContent = activeContent;
                    const incomingContent = contentItems[index];
                    const outgoingVisual = activeVisual;
                    const incomingVisual = visualItems[index];

                    // SIMPLE FADE ANIMATION (no fade-up)
                    const timeline = gsap.timeline({
                        defaults: {
                            ease: "power2.inOut",
                            duration: 0.4
                        },
                        onComplete: () => {
                            if(!initial){
                                outgoingContent.classList.remove("active");
                                outgoingVisual.classList.remove("active");          
                            }
                            activeContent = incomingContent;
                            activeVisual = incomingVisual;
                            isAnimating = false;
                        },
                    });

                    incomingContent.classList.add("active");
                    incomingVisual.classList.add("active");

                    // Simple fade out current, fade in new
                    timeline
                        .to(outgoingContent, { opacity: 0 }, 0)
                        .to(outgoingVisual, { opacity: 0 }, 0)
                        .fromTo(incomingContent, { opacity: 0 }, { opacity: 1 }, 0.2)
                        .fromTo(incomingVisual, { opacity: 0 }, { opacity: 1 }, 0.2);

                    activeButton.classList.remove("active");
                    buttons[index].classList.add("active");
                    activeButton = buttons[index];
                }

                // Initialize first tab
                switchTab(0, true);

                // Add click event to all buttons
                buttons.forEach((button, i) => {
                    button.addEventListener("click", () => switchTab(i));  
                });
            });
        }

        // 5. Initialize everything when DOM is loaded
        document.addEventListener("DOMContentLoaded", () => {
            initTabSystem();
            
            // Initialize loader if you have one
            if (typeof initLoader === 'function') {
                initLoader();
            }
        });
    
