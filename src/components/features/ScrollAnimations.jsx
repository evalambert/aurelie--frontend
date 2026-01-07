// src/components/features/ScrollAnimations.jsx
import { useEffect } from "react";

export default function ScrollAnimations() {
    useEffect(() => {
        let cleanupFunctions = [];

        // GSAP
        import("gsap").then((gsapModule) => {
            const { gsap } = gsapModule;
            import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
                const { ScrollTrigger } = ScrollTriggerModule;
                gsap.registerPlugin(ScrollTrigger);

                let sections = [...document.querySelectorAll("section[id]")];

                // Fonction pour détecter si on est sur mobile
                const isMobile = () => {
                    return window.innerWidth <= 768; // Ajustez la valeur selon vos besoins (768px est un breakpoint mobile standard)
                };

                // Fonction pour mettre à jour le soulignement des liens de navigation
                const updateActiveLink = (activeSectionId) => {
                    const navLinks = document.querySelectorAll("header nav ul li a");

                    navLinks.forEach((link) => {
                        const href = link.getAttribute("href");
                        const linkSectionId = href ? href.replace("#", "") : null;

                        if (linkSectionId === activeSectionId) {
                            link.classList.add("underline");
                        } else {
                            link.classList.remove("underline");
                        }
                    });
                };

                // Fonction pour créer les ScrollTriggers
                const createScrollTriggers = () => {
                    // Nettoyer les triggers existants pour éviter les doublons
                    ScrollTrigger.getAll().forEach(trigger => {
                        if (trigger.vars.trigger && sections.includes(trigger.vars.trigger)) {
                            trigger.kill();
                        }
                    });

                    // Créer un ScrollTrigger pour chaque section
                    sections.forEach((section) => {
                        const sectionId = section.id;

                        ScrollTrigger.create({
                            trigger: section,
                            start: "top 97px",
                            end: "bottom 97px",
                            //markers: true, // Affiche les markers pour visualiser les triggers
                            onEnter: () => {
                                // console.log(`Enter section: ${sectionId}`);

                                // // Fonction déclenchée uniquement sur mobile
                                // if (isMobile()) {
                                //     console.log(`📱 Mobile: Enter section ${sectionId}`);
                                // }

                                sections.forEach((s) => s.classList.remove("active"));
                                section.classList.add("active");
                                updateActiveLink(sectionId);

                            },
                            onEnterBack: () => {
                                // console.log(`EnterBack section: ${sectionId}`);

                                sections.forEach((s) => s.classList.remove("active"));
                                section.classList.add("active");
                                updateActiveLink(sectionId);
                                if (sectionId == "exhibitions") {
                                    // Show landscape
                                    if (!isMobile()) {
                                        const landscape = document.querySelector("#landscape");
                                        landscape.classList.remove("opacity-0");
                                        landscape.classList.add("opacity-100");
                                    }
                                }
                            },
                            onLeave: () => {
                                if (sectionId == "exhibitions") {
                                    // console.log(`Leave section: ${sectionId}`);
                                    updateActiveLink("atlas");

                                    // Hide landscape
                                    if (!isMobile()) {
                                        const landscape = document.querySelector("#landscape");
                                        landscape.classList.remove("opacity-100");
                                        landscape.classList.add("opacity-0");
                                    }
                                }
                            },
                            onLeaveBack: () => {
                                if (sectionId == "about") {
                                    // console.log(`LeaveBack section: ${sectionId}`);
                                    const navLinks = document.querySelectorAll("header nav ul li a");
                                    navLinks.forEach((l) => l.classList.remove("underline"));
                                }
                            },
                        });
                    });
                };

                // Créer les triggers initiaux
                createScrollTriggers();

                // /* ----------------------------- LANDSCAPE MOBILE SCROLL LOGIC ----------------------------- */
                // // Animation GSAP pour l'opacité du landscape sur mobile
                const landscape = document.querySelector("#landscape");
                if (landscape) {
                    if (isMobile()) {
                        const landscapeTween = gsap.to(landscape, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out",
                            paused: true
                        });
                        ScrollTrigger.create({
                            id: "landscape-mobile-scroll",
                            trigger: "#landscape",
                            start: "40px top",
                            end: "bottom top",
                            //markers: true,
                            onEnter: () => {
                                landscapeTween.play();
                                // console.log("Enter landscape");
                            },
                            onLeaveBack: () => {
                                landscapeTween.reverse();
                            },
                            onLeave: () => {
                                landscapeTween.reverse();
                                // console.log("Leave landscape");
                            },
                        });
                    };
                }
          

                // Écouter les événements de changement d'accordéon pour rafraîchir les triggers
                const handleAccordionChange = () => {
                    // Attendre un peu pour que le DOM soit mis à jour après l'animation
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                        // Recréer les triggers pour s'assurer qu'ils sont à jour
                        sections = [...document.querySelectorAll("section[id]")];
                        createScrollTriggers();
                    }, 100);
                };

                window.addEventListener("accordionAnimationComplete", handleAccordionChange);

                // Ajouter la fonction de cleanup pour les ScrollTriggers
                cleanupFunctions.push(() => {
                    window.removeEventListener("accordionAnimationComplete", handleAccordionChange);
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                });
            });
        });

        /* ----------------------------- HEADER HOVER LOGIC ----------------------------- */
        const nav = document.querySelector("header nav");
        const navLinks = document.querySelectorAll("header nav ul li a");

        const handleMouseEnter = () => {
            navLinks.forEach((l) => l.classList.remove("underline"));
        };

        const handleMouseLeave = () => {
            const activeSection = document.querySelector("section.active");
            if (activeSection) {
                const activeSectionId = activeSection.id;
                navLinks.forEach((l) => {
                    if (l.getAttribute("href") === `#${activeSectionId}`) {
                        l.classList.add("underline");
                    }
                });
            }
        };

        if (nav) {
            nav.addEventListener("mouseenter", handleMouseEnter);
            nav.addEventListener("mouseleave", handleMouseLeave);

            cleanupFunctions.push(() => {
                nav.removeEventListener("mouseenter", handleMouseEnter);
                nav.removeEventListener("mouseleave", handleMouseLeave);
            });
        }

        // Cleanup général
        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }, []);

    return null;
}