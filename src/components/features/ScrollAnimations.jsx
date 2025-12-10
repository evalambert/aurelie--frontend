// src/components/features/ScrollAnimations.jsx
import { useEffect } from "react";

export default function ScrollAnimations() {
    useEffect(() => {


        // GSAP
        import("gsap").then((gsapModule) => {
            const { gsap } = gsapModule;
            import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
                const { ScrollTrigger } = ScrollTriggerModule;
                gsap.registerPlugin(ScrollTrigger);

                let sections = [...document.querySelectorAll("section[id]")];

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

                // Créer un ScrollTrigger pour chaque section
                sections.forEach((section) => {
                    const sectionId = section.id;

                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 97px",
                        end: "bottom 97px",
                        markers: true, // Affiche les markers pour visualiser les triggers
                        onEnter: () => {
                            console.log(`Enter section: ${sectionId}`);
                            
                            sections.forEach((s) => s.classList.remove("active"));
                            section.classList.add("active");
                            updateActiveLink(sectionId);

                        },
                        onEnterBack: () => {
                            console.log(`EnterBack section: ${sectionId}`);

                            sections.forEach((s) => s.classList.remove("active"));
                            section.classList.add("active");
                            updateActiveLink(sectionId);
                        },
                        onLeave: () => {
                            if (sectionId == "exhibitions") {
                                console.log(`Leave section: ${sectionId}`);
                                updateActiveLink("atlas");
                            }
                        },
                        onLeaveBack: () => {
                            if (sectionId == "about") {
                                console.log(`LeaveBack section: ${sectionId}`);
                                const navLinks = document.querySelectorAll("header nav ul li a");
                                navLinks.forEach((l) => l.classList.remove("underline"));
                            }
                        },
                    });
                });

                console.log("ScrollAnimations initialized");
            });
        });


        /* ----------------------------- HEADER HOVER LOGIC ----------------------------- */
        const nav = document.querySelector("header nav"); ``
        const navLinks = document.querySelectorAll("header nav ul li a");

        nav.addEventListener("mouseenter", () => {
            navLinks.forEach((l) => l.classList.remove("underline"));
        });

        nav.addEventListener("mouseleave", () => {
            const activeSection = document.querySelector("section.active");
            if (activeSection) {
                const activeSectionId = activeSection.id;
                navLinks.forEach((l) => {
                    if (l.getAttribute("href") === `#${activeSectionId}`) {
                        l.classList.add("underline");
                    } 
                });
            }
        });





    }, []);

    return null;
}