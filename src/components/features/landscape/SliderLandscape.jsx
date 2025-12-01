// SliderLandscape.jsx

const SliderLandscape = () => {
    return (
        <>
            <div className="fixed top-0 right-0 w-screen h-screen bg-violet-100 md:w-[57.8vw] lg:w-[58vw] z-20 hover:[&+div]:opacity-60">
                <a href="#landscape" className="absolute right-0">
                    <span>Image cover</span>
                </a>
            </div>
            <div className="fixed top-0 right-0 w-screen h-screen bg-orange-200 opacity-0 pointer-events-none z-10"></div>

        </>
    );
};

export default SliderLandscape;