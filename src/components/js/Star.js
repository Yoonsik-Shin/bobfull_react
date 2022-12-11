import '../css/star.css';

function Star(props) {
  window.addEventListener("DOMContentLoaded", () => {
    const starRating = new StarRating("form");
  });

  class StarRating {
    constructor(qs) {
      this.ratings = [
        { id: 1, name: "Terrible" },
        { id: 2, name: "Bad" },
        { id: 3, name: "OK" },
        { id: 4, name: "Good" },
        { id: 5, name: "Excellent" }
      ];
      this.rating = null;
      this.el = document.querySelector(qs);

      this.init();
    }
    init() {
      this.el?.addEventListener("change", this.updateRating.bind(this));

      try {
        this.el?.reset();
      } catch (err) {
        console.error("Element isn’t a form.");
      }
    }
    updateRating(e) {
      Array.from(this.el.querySelectorAll(`[for*="rating"]`)).forEach(el => {
        el.className = "rating__label";
      });

      const ratingObject = this.ratings.find(r => r.id === +e.target.value);
      const prevRatingID = this.rating?.id || 0;

      let delay = 0;
      this.rating = ratingObject;
      this.ratings.forEach(rating => {
        const { id } = rating;

        const ratingLabel = this.el.querySelector(`[for="rating-${id}"]`);

        if (id > prevRatingID + 1 && id <= this.rating.id) {
          ++delay;
          ratingLabel.classList.add(`rating__label--delay${delay}`);
        }

      });
    }
  }
  return (
    <form className="rating" onChange={props.handleInput}>
      <div className="rating__stars">
        <input id="rating-1" className="rating__input rating__input-1" type="radio" name="rating" value="1" defaultChecked />
        <input id="rating-2" className="rating__input rating__input-2" type="radio" name="rating" value="2" />
        <input id="rating-3" className="rating__input rating__input-3" type="radio" name="rating" value="3" />
        <input id="rating-4" className="rating__input rating__input-4" type="radio" name="rating" value="4" />
        <input id="rating-5" className="rating__input rating__input-5" type="radio" name="rating" value="5" />
        <label className="rating__label" for="rating-1">
          <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <g transform="translate(16,16)">
              <circle className="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
            </g>
            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <g transform="translate(16,16) rotate(180)">
                <polygon className="rating__star-stroke"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="none" />
                <polygon className="rating__star-fill"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="#000" />
              </g>
              <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                <polyline className="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
              </g>
            </g>
          </svg>
          <span className="rating__sr">1 star—Terrible</span>
        </label>
        <label className="rating__label" for="rating-2">
          <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <g transform="translate(16,16)">
              <circle className="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
            </g>
            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <g transform="translate(16,16) rotate(180)">
                <polygon className="rating__star-stroke"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="none" />
                <polygon className="rating__star-fill"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="#000" />
              </g>
              <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                <polyline className="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
              </g>
            </g>
          </svg>
          <span className="rating__sr">2 stars—Bad</span>
        </label>
        <label className="rating__label" for="rating-3">
          <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <g transform="translate(16,16)">
              <circle className="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
            </g>
            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <g transform="translate(16,16) rotate(180)">
                <polygon className="rating__star-stroke"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="none" />
                <polygon className="rating__star-fill"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="#000" />
              </g>
              <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                <polyline className="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
              </g>
            </g>
          </svg>
          <span className="rating__sr">3 stars—OK</span>
        </label>
        <label className="rating__label" for="rating-4">
          <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <g transform="translate(16,16)">
              <circle className="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
            </g>
            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <g transform="translate(16,16) rotate(180)">
                <polygon className="rating__star-stroke"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="none" />
                <polygon className="rating__star-fill"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="#000" />
              </g>
              <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                <polyline className="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
              </g>
            </g>
          </svg>
          <span className="rating__sr">4 stars—Good</span>
        </label>
        <label className="rating__label" for="rating-5">
          <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <g transform="translate(16,16)">
              <circle className="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
            </g>
            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <g transform="translate(16,16) rotate(180)">
                <polygon className="rating__star-stroke"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="none" />
                <polygon className="rating__star-fill"
                  points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                  fill="#000" />
              </g>
              <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                <polyline className="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                <polyline className="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
              </g>
            </g>
          </svg>
          <span className="rating__sr">5 stars—Excellent</span>
        </label>
      </div>
    </form>
  );
}

export default Star;