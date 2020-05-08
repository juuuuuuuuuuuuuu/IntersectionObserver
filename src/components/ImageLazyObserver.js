import $ from 'jquery';

class ImageLazyObserver {
  constructor() {
  }

  init() {
    const images = document.querySelectorAll('img');
    const options = {
      root: null,
      threshold: 0.8
    };
    const lazyLoadIO = new IntersectionObserver(this.lazyLoadImage, options);
    images.forEach(image => {
      lazyLoadIO.observe(image)
    });
  }

  lazyLoadImage(entries, observer) {
    entries.forEach(entry => {
      const { target } = entry;
      if (entry.isIntersecting) {
        const $target = $(target);
        const hrefVal = $target.data('src');
        $target.attr('src', hrefVal).removeAttr('data-src');
        // observer 해제
        observer.unobserve(target);
      }
    })
  }
}
export default ImageLazyObserver;
