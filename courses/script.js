



    <!-- ANIMATIONS -->

        // Back to top functionality
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        window.addEventListener('scroll', function() {
            const backToTop = document.getElementById('back-to-top');
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
      

        // Fixed tab system with working navigation
        function initTabSystem(){
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

                    let outgoingLines = outgoingContent.querySelectorAll("[data-tabs-fade]") || [];
                    let incomingLines = incomingContent.querySelectorAll("[data-tabs-fade]");

                    const timeline = gsap.timeline({
                        defaults: {
                            ease: "power3.inOut"
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

                    timeline
                        .to(outgoingLines, { y: "-2em", autoAlpha:0 }, 0)
                        .to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0)
                        .fromTo(incomingLines, { y: "2em", autoAlpha:0 }, { y: "0em", autoAlpha:1, stagger: 0.075 }, 0.4)
                        .fromTo(incomingVisual, { autoAlpha: 0, xPercent: 3 }, { autoAlpha: 1, xPercent: 0 }, "<");

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

        // Initialize everything when DOM is loaded
        document.addEventListener("DOMContentLoaded", () => {
            initTabSystem();
        });
