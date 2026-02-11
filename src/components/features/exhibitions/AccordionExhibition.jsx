

//components/features/exhibitions/AccordionExhibition.jsx
import { useState, useEffect } from 'react';
import ImagesExhibition from './ImagesExhibition.jsx';
import { previewStore } from '../../../stores/previewStore.js';
import AtlasList from './AtlasList.jsx';

export default function AccordionExhibition({
    item,
    lang,
    open,
    toggle,
    motion,
    AnimatePresence,
}) {
    const [mobileClicked, setMobileClicked] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // état pour mobile

    useEffect(() => {
        // Ce code ne s'exécute que côté client
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    return (
        <li
            className={`transition-opacity duration-300 opacity-10 lg:hover:opacity-100 ${mobileClicked ? 'opacity-100' : 'opacity-10'}`}
            key={item.id}
        >
            {/* --- EXHIBITION LIST --- */}
            <button
                onClick={() => {
                    // Récupère les images de l'expo
                    const expoImages = item.exhibitionView || [];

                    // Récupère les images/vidéos courtes des œuvres de l'Atlas sous forme d'objets standardisés
                    const atlasImages =
                        item.atlasRelation
                            ?.map((work) => {
                                // Si une shortVideo existe, on priorise la vidéo pour la preview
                                if (work.shortVideo?.url) {
                                    return {
                                        id: work.id,
                                        type: 'video',
                                        url:
                                            work.shortVideo.previewUrl ||
                                            work.shortVideo.url, // URL pour le hover (previewUrl si disponible)
                                        videoUrl: work.shortVideo.url, // URL de la vidéo complète
                                    };
                                }
                                // Sinon, on utilise l'image
                                const url =
                                    work.image?.formats?.large?.url ||
                                    work.image?.url;
                                if (!url) return null;
                                return {
                                    id: work.id,
                                    type: 'image',
                                    url, // URL de l'image
                                };
                            })
                            .filter(Boolean) || [];

                    // Combine les deux
                    const allImages = [...expoImages, ...atlasImages];
                    previewStore.addImages(allImages);

                    // Toggle l'accordion
                    toggle(item.id);
                    if (isMobile && !mobileClicked) {
                        setMobileClicked(true);
                    } else {
                        setMobileClicked(false);
                    }
                }}
                className='exhibition--item w-full grid lg:grid-cols-10 text-left'
            >
                <div className='grid grid-cols-[45px_1fr] lg:grid-cols-[55px_1fr] lg:col-span-6'>
                    <p>{item.year}</p>
                    <h2>{item.title}</h2>
                </div>

                <p className='lg:col-span-4 text-left hidden lg:inline'>
                    {[item.structure, item.place]
                        .map((v) => v?.trim())
                        .filter(Boolean)
                        .join(', ')}
                </p>
            </button>

            {/* --- ACCORDION ANIMATION --- */}
            <AnimatePresence initial={false}>
                {open.includes(item.id) && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        onAnimationComplete={() => {
                            console.log('Animation complete');
                            // Déclencher un événement personnalisé pour notifier ScrollAnimations
                            window.dispatchEvent(
                                new CustomEvent('accordionAnimationComplete')
                            );
                        }}
                        className='overflow-hidden'
                    >
                        {/* --- EXHIBITION WRAPPER-CONTENTS --- */}
                        <div className='exhibition--wrapper-content pb-[40px] lg:pb-[55px] flex flex-col gap-[30px] lg:gap-[35px]'>
                            {/* --- EXHIBITION INFO –-- */}
                            <div className='exhibition--infos p-0 pl-[45px] lg:pl-[55px] pt-[6px] lg:pt-[12px] grid grid-cols-9 gap-[6px] lg:gap-[12px]'>
                                <div className='exhibition--description col-start-1 col-end-9'>
                                    {item.text?.map((block, i) => (
                                        <p key={i}>
                                            {block.children
                                                .map((c) => c.text)
                                                .join(' ')}
                                        </p>
                                    ))}
                                </div>
                                <div className='exhibition--credits col-start-1 col-end-9'>
                                    {lang === 'fr' ? (
                                        <p>{item.groupShow ? 'Exposition collective' : 'Exposition solo'}</p>
                                    ) : (
                                        <p>{item.groupShow ? 'Group show' : 'Solo show'}</p>
                                    )}
                                    {item.startingDate && item.endingDate && (
                                        <p className='dates'>
                                            {' '}
                                            {new Date(item.startingDate)
                                                .toISOString()
                                                .slice(0, 10)
                                                .split('-')
                                                .reverse()
                                                .join('.')}{' '}
                                            –{' '}
                                            {new Date(item.endingDate)
                                                .toISOString()
                                                .slice(0, 10)
                                                .split('-')
                                                .reverse()
                                                .join('.')}
                                        </p>
                                    )}
                                    {item.curator && (
                                        <p className='credit-photo'>
                                            {' '}
                                            {lang === 'fr'
                                                ? 'Commissariat : '
                                                : 'Curator : '}{' '}
                                            {item.curator}
                                        </p>
                                    )}
                                    {item.scenographie && (
                                        <p className='credit-photo'>
                                            {' '}
                                            {lang === 'fr'
                                                ? 'Scénographie : '
                                                : 'Set design : '}{' '}
                                            {item.scenographie}
                                        </p>
                                    )}
                                    {Array.isArray(item.contributionFields) &&
                                        item.contributionFields.map(
                                            (contribution) => {
                                                const label =
                                                    contribution.label?.trim();
                                                const content =
                                                    contribution.content?.trim();

                                                if (!label || !content)
                                                    return null;

                                                return (
                                                    <p key={contribution.id}>
                                                        {label} : {content}
                                                    </p>
                                                );
                                            }
                                        )}

                                    {item.copyright && (
                                        <p className='photo-credits'>
                                            {' '}
                                            {lang === 'fr'
                                                ? 'Crédits photos : '
                                                : 'Photo credits : '}{' '}
                                            © {item.copyright}
                                        </p>
                                    )}
                                    {item.link && (
                                        <p>
                                            <a
                                                className="more-info underline decoration-1 underline-offset-[3px]"
                                                href={item.link}
                                                target='_blank'
                                            >
                                                {lang === 'fr'
                                                    ? 'En savoir plus…'
                                                    : 'Learn more…'}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* --- EXHIBITION IMAGES --- */}
                            <ImagesExhibition item={item} />

                            {/* --- EXHIBITION WORKS-LIST --- */}
                            <AtlasList item={item} lang={lang} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
}