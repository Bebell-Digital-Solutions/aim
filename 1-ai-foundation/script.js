
  // --- Page Loader Logic (provided by user) ---
  function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="loader-header">Wait for it...</div>
      <div class="progress"></div>
    `;
    document.body.appendChild(loader);
    return loader;
  }

  function initLoader() {
    const loader = showLoader();
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 300); // Remove after fade out
    }, 2000); // 2 second duration
  }

  document.addEventListener('DOMContentLoaded', initLoader);

  // --- FAQ Accordion Logic ---
  document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-open');

        // Close all others
        faqItems.forEach(i => {
          i.classList.remove('faq-open');
          i.querySelector('.faq-content').style.maxHeight = '0';
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('faq-open');
          const content = item.querySelector('.faq-content');
          // Set max-height dynamically for smooth transition
          content.style.maxHeight = content.scrollHeight + 'px'; 
        }
      });
    });

    // --- Back to Top Logic ---
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });







<!-- =========================== -->
    <!-- NAVIGATION LOGIC (JS) -->
    <!-- =========================== -->

        document.addEventListener('DOMContentLoaded', () => {
            // --- Navigation Dropdown Logic ---
            const coursesLink = document.getElementById('courses-link');
            const submenu = document.getElementById('courses-submenu');
            const navBar = document.getElementById('nav-bar');

            if (coursesLink && submenu && navBar) {
                // Toggle Dropdown
                coursesLink.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    submenu.classList.toggle('active');
                    e.stopPropagation(); 
                });

                // Close Dropdown when clicking outside nav
                document.addEventListener('click', (e) => {
                    if (!navBar.contains(e.target)) {
                        submenu.classList.remove('active');
                    }
                });

                // Prevent closing when clicking inside submenu
                submenu.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }

            // --- Mobile Menu Logic ---
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
                        document.body.style.overflow = 'hidden'; // Lock scroll
                    } else {
                        toggleIcon.classList.remove('fa-xmark');
                        toggleIcon.classList.add('fa-bars');
                        document.body.style.overflow = 'auto'; // Unlock scroll
                        if (submenu) submenu.classList.remove('active');
                    }
                });
                
                // Handle Links Click on Mobile
                navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
                    link.addEventListener('click', () => {
                        // Check if width is 980px or less (Mobile/Tablet View)
                        if (window.innerWidth <= 980) { 
                            // Do not close menu if clicking the "Courses" toggle 
                            // or if clicking a link inside the submenu
                            if (!link.classList.contains('submenu-link') && link.id !== 'courses-link') {
                                navMenu.classList.remove('mobile-open');
                                toggleIcon.classList.remove('fa-xmark');
                                toggleIcon.classList.add('fa-bars');
                                document.body.style.overflow = 'auto';
                            }
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
            
            // Handle Window Resize
            window.addEventListener('resize', function() {
                const isMobile = window.innerWidth <= 980;
                
                // If resizing to Desktop while mobile menu is open, close it
                if (!isMobile && navMenu && navMenu.classList.contains('mobile-open')) {
                    navMenu.classList.remove('mobile-open');
                    if (toggleIcon) {
                        toggleIcon.classList.remove('fa-xmark');
                        toggleIcon.classList.add('fa-bars');
                    }
                    document.body.style.overflow = 'auto';
                }
                
                // Always close submenu on resize to prevent layout glitches
                if (submenu) submenu.classList.remove('active');
            });
        });
