
// INTERACTIVE NAVIGATION MENU
// JavaScript for scroll effects and mobile menu


// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    
    // GET DOM ELEMENTS
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    
    // SCROLL EFFECT - Change navbar color when scrolled
   
    function handleScroll() {
        // Check if page has been scrolled more than 100 pixels
        if (window.scrollY > 100) {
            // Add 'scrolled' class to navbar
            navbar.classList.add('scrolled');
        } else {
            // Remove 'scrolled' class
            navbar.classList.remove('scrolled');
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

   
    // MOBILE MENU TOGGLE
   
    function toggleMobileMenu() {
        // Toggle 'active' class on hamburger (for animation)
        hamburger.classList.toggle('active');
        // Toggle 'active' class on menu (to show/hide)
        navMenu.classList.toggle('active');
    }

    // Listen for click on hamburger button
    hamburger.addEventListener('click', toggleMobileMenu);

  
    // CLOSE MOBILE MENU WHEN LINK IS CLICKED
  
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Remove active classes to close menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

  
    // ACTIVE LINK HIGHLIGHTING
    // Changes active link based on scroll position
  
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveLink() {
        // Get current scroll position
        const scrollPosition = window.scrollY + 200;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove 'active' class from all links
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });

                // Add 'active' class to corresponding link
                const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll to update active link
    window.addEventListener('scroll', highlightActiveLink);

  
    // SMOOTH SCROLL FOR NAV LINKS

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate position accounting for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CLOSE MENU WHEN CLICKING OUTSIDE

    document.addEventListener('click', function(e) {
        // Check if click is outside menu and hamburger
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Run initial check on page load
    handleScroll();
    highlightActiveLink();

    console.log('Navigation menu initialized successfully!');
});
