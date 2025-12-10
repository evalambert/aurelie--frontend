// src/components/features/ScrollAnimations.jsx
import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    // import dynamique uniquement côté client
    import("gsap").then((gsapModule) => {
      const { gsap } = gsapModule;
      import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
        const { ScrollTrigger } = ScrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        let sections = [...document.querySelectorAll("section[id]")];

        // Créer un ScrollTrigger pour chaque section
        // sections.forEach((section) => {
        //   const sectionId = section.id;
          
        //   ScrollTrigger.create({
        //     trigger: section,
        //     start: "top 95px",
        //     end: "bottom center",
        //     markers: true, // Affiche les markers pour visualiser les triggers
        //     onEnter: () => {
        //       console.log(`Enter section: ${sectionId}`);
        //     },
        //     onEnterBack: () => {
        //       console.log(`EnterBack section: ${sectionId}`);
        //     },
        //   });
        // });

        console.log("ScrollAnimations initialized");
      });
    });
  }, []);

  return null;
}