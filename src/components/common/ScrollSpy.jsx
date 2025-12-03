//ScrollSpy.jsx
import { useEffect } from "react";

export default function ScrollSpy() {

    // Ajoute un marker dans la page
    // const marker = document.createElement("div");
    // marker.style.position = "fixed";
    // marker.style.top = "10vh";     // 10% du viewport → équivalent à rootMargin bottom: "-90%"
    // marker.style.left = 0;
    // marker.style.right = 0;
    // marker.style.height = "1px";
    // marker.style.background = "red";
    // marker.style.zIndex = 9999;
    // marker.style.pointerEvents = "none";
    // document.body.appendChild(marker);

    useEffect(() => {
        const sections = [...document.querySelectorAll("section[id]")];
        const links = document.querySelectorAll("header nav a");

        let lastScrollY = window.scrollY;

        // ---- SCROLL LOGIC ----
        function setActive(id) {
            links.forEach((l) => l.classList.remove("active"));
            sections.forEach((s) => s.classList.remove("section-active"));
            const link = document.querySelector(`a[href="#${id}"]`);
            const section = document.querySelector(`section[id="${id}"]`);
            if (section) section.classList.add("section-active");
            if (link) link.classList.add("active");
            return { link, section };
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id;

                    // Détecter la direction
                    const scrollingDown = window.scrollY > lastScrollY;
                    lastScrollY = window.scrollY;

                    // ENTER (scrolling down)
                    if (entry.isIntersecting && scrollingDown) {
                        setActive(id);
                    }

                    // ENTER BACK
                    if (entry.isIntersecting && !scrollingDown) {
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

        // ---- HOVER LOGIC ----
        const aboutLink = document.querySelector('a[href="#about"]');
        const aboutSection = document.querySelector("#about");
        const navigationWrapper = document.querySelector("header nav");

        if (aboutLink && aboutSection && navigationWrapper) {
            aboutLink.addEventListener("mouseenter", () => {
                aboutSection.classList.add("opacity-100");
            });

            aboutLink.addEventListener("mouseleave", () => {
                aboutSection.classList.remove("opacity-100");
            });
            navigationWrapper.addEventListener("mouseenter", () => {
                links.forEach((l) => l.classList.remove("active"));
            });
            navigationWrapper.addEventListener("mouseleave", () => {
                const activeSection = document.querySelector("section.section-active");

                if (activeSection) {
                    const id = activeSection.getAttribute("id");
                    const link = document.querySelector(`a[href="#${id}"]`);

                    if (link) link.classList.add("active");
                }
            });
        }

        return () => observer.disconnect();
    }, []);

    return null;
}



