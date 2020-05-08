import $ from 'jquery';

const defaultProps = {
  selector: 'data-src',
  top: 700,
  right: 0,
  bottom: -700,
  left: 0,
};

class ImageLazy {
  constructor(props = {}) {
    this.props = Object.assign({}, defaultProps, props);

  }

  init() {
    // on 이벤트 바인딩 셀렉터가 this가 됨. 그러므로 function형태로 수정해줘야함,
    $(window).on('load resize scroll imageLazyEvent', () => { this.doImageLoad() });
  }

  /**
   * 이미지 로드 실행
   */
  doImageLoad() {
    $(document)
      .find(`[${this.props.selector}]`)
      .each((idx, item) => {
        const $this = $(item);

        if (this.isScrolledIntoView($this)) {
          const hrefVal = $this.data('src');
          $this.attr('src', hrefVal).removeAttr(this.props.selector);
        }
      });
  }

  /**
   * 이미지가 로딩될 조건 체크
   * @param {Object} $this 로딩할 타겟
   * @return {boolean} 타겟 로딩될 조건 반환
   */
  isScrolledIntoView($this) {
    const rect = $this[0].getBoundingClientRect();
    const isTop = parseInt(rect.top) + this.props.top >= 0;
    const isBottom =
      parseInt(rect.bottom) + this.props.bottom <= $(window).height();
    const isLeft = parseInt(rect.left) + this.props.left >= 0;
    const isRight = parseInt(rect.right) + this.props.right <= $(window).width();
      return isTop && isBottom && isLeft && isRight;
  }
}
export default ImageLazy;
