export const previewStore = {
    images: [],       // toutes les images de l’expo
    active: false,    // toggle preview-expo ou slider
    hoverImage: null, // image survolée

    setImages(list) {
        this.images = list || [];
        this.active = true;
        window.dispatchEvent(
            new CustomEvent("preview:update", { detail: this })
        );
    },

    setHoverImage(imgUrl) {
        this.hoverImage = imgUrl;
        this.active = true; // switch panel
        window.dispatchEvent(
            new CustomEvent("preview:update", { detail: this })
        );
    },

    clearHover() {
        this.hoverImage = null;
        this.active = false; // rebasculer vers slider
        window.dispatchEvent(
            new CustomEvent("preview:update", { detail: this })
        );
    }
};