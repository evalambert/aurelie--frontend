//ScrollSpy.jsx
//ScrollSpy.jsx
import { useEffect } from "react";

export default function ScrollSpy() {

    useEffect(() => {
        const sections = [...document.querySelectorAll("section[id]")];
        const links = document.querySelectorAll("header nav a");

        let lastScrollY = window.scrollY;
        let blockObserver = false;

        function setActive(id) {
            links.forEach((l) => l.classList.remove("active"));
            sections.forEach((s) => s.classList.remove("section-active"));

            const link = document.querySelector(`a[href="#${id}"]`);
            const section = document.querySelector(`section[id="${id}"]`);

            if (section) section.classList.add("section-active");
            if (link) link.classList.add("active");
        }

        /* ----------------------------- SCROLL SPY OBSERVER ----------------------------- */
        const observer = new IntersectionObserver(
            (entries) => {
                if (blockObserver) return;

                entries.forEach((entry) => {
                    const id = entry.target.id;

                    const scrollingDown = window.scrollY > lastScrollY;
                    lastScrollY = window.scrollY;

                    if (entry.isIntersecting) {
                        setActive(id);
                    }
                });
            },
            {
                rootMargin: "-10% 0px -85% 0px",
                threshold: 0,
            }
        );

        sections.forEach((sec) => observer.observe(sec));

        /* ----------------------------- EXIT / ENTER BACK EXHIBITIONS ----------------------------- */
        if (window.innerWidth >= 1024) {
            const exhibitionsSection = document.querySelector("#exhibitions");
            const pannel = document.querySelector("#landscape");

            if (exhibitionsSection && pannel) {
                let lastY = window.scrollY;

                const isOnExhibitions = () => {
                    if (window.scrollY > exhibitionsSection.offsetTop) {
                        pannel.classList.remove("opacity-100");
                        pannel.classList.add("opacity-0");
                    } else {
                        pannel.classList.remove("opacity-0");
                        pannel.classList.add("opacity-100");
                    }
                };

                isOnExhibitions();
                
                const exitObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            const scrollingDown = window.scrollY > lastY;
                            const scrollingUp = window.scrollY < lastY;
                            lastY = window.scrollY;

                            if (!entry.isIntersecting && scrollingDown) {
                                // quand on sort vers le bas
                                pannel.classList.remove("opacity-100");
                                pannel.classList.add("opacity-0");
                            }

                            if (entry.isIntersecting && scrollingUp) {
                                // quand on entre par le haut (enter-back)
                                pannel.classList.remove("opacity-0");
                                pannel.classList.add("opacity-100");
                            }
                        });
                    },
                    {
                        rootMargin: "0px",
                        threshold: 0,
                    }
                );

                exitObserver.observe(exhibitionsSection);
            }
        }
        /* ----------------------------- FORCE ABOUT AT TOP ----------------------------- */
        function handleScrollTop() {
            if (window.scrollY === 0) {
                blockObserver = true;
                setActive("about");

                setTimeout(() => {
                    blockObserver = false;
                }, 250);
            }
        }

        window.addEventListener("scroll", handleScrollTop);


        /* ----------------------------- HEADER HOVER LOGIC ----------------------------- */
        const aboutLink = document.querySelector(`a[href="#about"]`);
        const aboutSection = document.querySelector("#about");
        const nav = document.querySelector("header nav");

        if (aboutLink && aboutSection && nav) {
            aboutLink.addEventListener("mouseenter", () => {
                aboutSection.classList.add("opacity-100");
            });

            aboutLink.addEventListener("mouseleave", () => {
                aboutSection.classList.remove("opacity-100");
            });

            nav.addEventListener("mouseenter", () => {
                links.forEach((l) => l.classList.remove("active"));
            });

            nav.addEventListener("mouseleave", () => {
                const activeSection = document.querySelector("section.section-active");
                if (activeSection) {
                    const id = activeSection.getAttribute("id");
                    const link = document.querySelector(`a[href="#${id}"]`);
                    if (link) link.classList.add("active");
                }
            });
        }



        /* ----------------------------- CLEANUP ----------------------------- */
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScrollTop);
        };

    }, []);

    return null;
}