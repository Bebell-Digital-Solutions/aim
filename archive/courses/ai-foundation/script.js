document.addEventListener('DOMContentLoaded', () => {
    // --- Page Loader Logic ---
    const pageLoader = document.querySelector('.page-loader');
    window.addEventListener('load', () => {
        pageLoader.classList.add('hidden');
        setTimeout(() => pageLoader.remove(), 300);
    });

    // --- Back to Top Button Logic ---
    const toTopButton = document.getElementById('back-to-top');
    
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            toTopButton.classList.add('show');
        } else {
            toTopButton.classList.remove('show');
        }
    };

    toTopButton.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Dropdown Menu Click Logic ---
    const coursesLink = document.getElementById('courses-link');
    const submenu = document.getElementById('courses-submenu');
    const navBar = document.getElementById('nav-bar');

    if (coursesLink && submenu && navBar) {
        // 1. Toggle visibility on click
        coursesLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            const isMobile = window.innerWidth <= 980; // UPDATED Breakpoint
            if (isMobile) {
                submenu.classList.toggle('active');
            } else {
                submenu.classList.toggle('active');
            }
            e.stopPropagation(); 
        });

        // 2. Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navBar && !navBar.contains(e.target) && submenu.classList.contains('active')) {
                submenu.classList.remove('active');
            }
        });

        // 3. Prevent clicks inside submenu from closing it
        submenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }





  
    // --- Mobile Menu Toggle Logic (Hamburger Icon) ---
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = document.getElementById('toggle-icon');

    if (mobileToggle && navMenu && toggleIcon) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('mobile-open');
            
            if (navMenu.classList.contains('mobile-open')) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden';
            } else {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
                document.body.style.overflow = 'auto';
                if (submenu) submenu.classList.remove('active');
            }
        });
        
        navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 980 && !link.parentElement.classList.contains('has-submenu')) {
                    navMenu.classList.remove('mobile-open');
                    toggleIcon.classList.remove('fa-xmark');
                    toggleIcon.classList.add('fa-bars');
                    document.body.style.overflow = 'auto';
                    if (submenu) submenu.classList.remove('active');
                }
            });
        });




      

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 980 && 
                navMenu.classList.contains('mobile-open') &&
                !navMenu.contains(e.target) && 
                e.target !== mobileToggle) {
                navMenu.classList.remove('mobile-open');
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
                document.body.style.overflow = 'auto';
                if (submenu) submenu.classList.remove('active');
            }
        });
    }





  
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 980; // UPDATED Breakpoint
        if (!isMobile && navMenu && navMenu.classList.contains('mobile-open')) {
            navMenu.classList.remove('mobile-open');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            }
            document.body.style.overflow = 'auto';
        }
        if (submenu) {
            submenu.classList.remove('active');
        }
    });




  

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if(header){
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('faq-open');
                
                // Close all others
                faqItems.forEach(i => {
                    i.classList.remove('faq-open');
                    const content = i.querySelector('.faq-content');
                    if(content) content.style.maxHeight = '0';
                });

                // Toggle current item
                if (!isOpen) {
                    item.classList.add('faq-open');
                    const content = item.querySelector('.faq-content');
                    if(content) content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });





  

    // Winter Theme
    const now = new Date();
    const month = now.getMonth() + 1;
    
    if (month === 12 || month === 1 || month === 2) {
        const snow = document.createElement('div');
        snow.className = 'snowflakes-blurry';
        document.body.appendChild(snow);
    }
});
