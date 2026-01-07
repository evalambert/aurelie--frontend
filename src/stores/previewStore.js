export const previewStore = {
    images: [],
    active: false,
    hoverImage: null,
  
    addImages(list = []) {
      const existingIds = new Set(this.images.map(img => img.id));
  
      const newImages = list.filter(img => !existingIds.has(img.id));
  
      this.images = [...this.images, ...newImages];
      this.active = true;
  
      window.dispatchEvent(
        new CustomEvent("preview:update", { detail: this })
      );
    },
  
    setHoverImage(imgUrl) {
      this.hoverImage = imgUrl;
      this.active = true;
  
      window.dispatchEvent(
        new CustomEvent("preview:update", { detail: this })
      );
    },
  
    clearHover() {
      this.hoverImage = null;
      this.active = false;
  
      window.dispatchEvent(
        new CustomEvent("preview:update", { detail: this })
      );
    }
  };
  