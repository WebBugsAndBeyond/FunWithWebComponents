import { AccessibleSliderBaseElement } from './base-types.js';

export default class SliderElement extends AccessibleSliderBaseElement {

    #isClicked = false;

    constructor(templateId = 'slider-component-template') {
        super(templateId);
        this.onClick = this.onClick.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.onClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.onClick);
    }


    onMouseMove(event) {
        if (!this.isMouseDown || this.mousePosition === null || this.#isClicked) {
            return;
        }

        window.FunWithWebComponents.utils.events.ensureEventIsOnlyHandledOnce(event);
        if (this.orientation === 'horizontal') {
            const isMovingRight = event.offsetX > this.mousePosition.x;
            const isMovingLeft = event.offsetX < this.mousePosition.x;
            if (isMovingRight) {
                const distance = event.offsetX - this.mousePosition.x;
                const value = this.value;
                const maxValue = this.maxValue;
                this.value = Math.min(maxValue, value + distance);
            } else if (isMovingLeft) {
                const distance = this.mousePosition.x - event.offsetX;
                const value = this.value;
                const minValue = this.minValue;
                this.value = Math.max(minValue, value - distance);
            } else {
                return;
            }
            this.updateMouseMoveCoordinates(event.offsetX, event.offsetY);
        } else {
            const yCoordinateWithinSlider = event.offsetY;
            const trackElement = this.shadowRoot.querySelector('.slider__track');
            const trackTop = trackElement.offsetTop;
            const trackTopEventClickedYOffset = yCoordinateWithinSlider - trackTop;
            const height = trackElement.clientHeight;

            let newValue = 100 - (trackTopEventClickedYOffset / height * 100);
            if (newValue > this.maxValue) {
                newValue = this.maxValue;
            } else if (newValue < this.minValue) {
                newValue = this.minValue;
            }
            console.log(`Old value ${this.value}, new value ${newValue}`);
            this.value = newValue;
            // const isMovingUp = event.offsetY < this.mousePosition.y;
            // const isMovingDown = event.offsetY > this.mousePosition.y;
            // if (isMovingUp) {
            //     const value = this.value;
            //     const pageSize = this.pageSize;
            //     const maxValue = this.maxValue;
            //     this.value = Math.min(value + pageSize, maxValue);
            // } else if (isMovingDown) {
            //     const value = this.value;
            //     const pageSize = this.pageSize;
            //     const minValue = this.minValue;
            //     this.value = Math.max(value - pageSize, minValue);
            // } else {
            //     return;
            // }
            this.updateMouseMoveCoordinates(event.offsetX, event.offsetY);
        }
        this.selfSetAttribute('value', this.value);
        this.updateUIValueDisplay();
    }

    onClick(event) {
        window.FunWithWebComponents.utils.events.ensureEventIsOnlyHandledOnce(event);
        const thumbElement = this.shadowRoot.querySelector('.slider__thumb');
        if (this.isMouseDown) {
            this.#isClicked = false;
            return;
        } else {
            this.isMouseDown = false;
            this.#isClicked = true;
        }

        if (thumbElement) {
            const thumbLeft = parseInt(getComputedStyle(thumbElement).left, 10);
            const thumbTop = parseInt(getComputedStyle(thumbElement).top, 10);
            const { value, minValue, maxValue, pageSize } = this;

            if (this.orientation === 'vertical') {
                const trackElement = this.shadowRoot.querySelector('.slider__track');
                if (!trackElement) {
                    this.#isClicked = false;
                    return;
                }

                //const trackHeightEventYOffset = (trackElement.offsetHeight + trackElement.offsetTop) - event.offsetY;
                //const trackHeightEventYOffset = event.offsetY;
                const yCoordinateWithinTrack = event.offsetY;
                const trackTop = trackElement.offsetTop;
                const trackTopEventYOffset = yCoordinateWithinTrack - trackTop;
                const height = trackElement.clientHeight;

                //const trackHeightEventYOffset = 100 - (yCoordinateWithinTrack - trackTop);
                console.log('trackHeightEventYOffset', trackTopEventYOffset);
                //const newValue = 100 - ((maxValue - minValue) / 100 * trackTopEventYOffset);
                let newValue = 100 - (trackTopEventYOffset / height * 100);
                if (newValue > this.maxValue) {
                    newValue = this.maxValue;
                } else if (newValue < this.minValue) {
                    newValue = this.minValue;
                }
                console.log('newValue', newValue);
                this.value = newValue;
                // if (trackHeightEventYOffset < thumbTop) {
                //     // Increase value by page size.
                //     // this.value = Math.min(value + pageSize, maxValue);
                //     this.value = newValue;
                // } else if (trackHeightEventYOffset > thumbTop) {
                //     // Decrease value by page size.
                //     // this.value = Math.max(value - pageSize, minValue);
                //     this.value = newValue;
                // }
            } else {
                if (event.offsetX > thumbLeft) {
                    // Increase value by page size.
                    this.value = Math.min(value + pageSize, maxValue);
                } else if (event.offsetX < thumbLeft) {
                    // Decrease value by page size
                    this.value = Math.max(value - pageSize, minValue);
                }
            }
        }
        this.#isClicked = false;
    }

    updateUIValueDisplay() {
        if (!this.isConnected) {
            return;
        }
        const thumbElement = this.shadowRoot.querySelector('.slider__thumb');

        if (thumbElement) {
            const trackElement = this.shadowRoot.querySelector('.slider__track');
            if (trackElement) {
                const trackDistance = this.orientation === 'vertical' ? trackElement.clientHeight : trackElement.clientWidth;
                const { value, minValue, maxValue, } = this;
                const sliderValueRange = maxValue - minValue;
                const steps = trackDistance / sliderValueRange;
                const valueSteps = value * steps;

                if (this.orientation === 'vertical') {
                    thumbElement.style.top = `${trackDistance - valueSteps}px`;
                    console.log(`Thumb top: ${thumbElement.style.top}`);
                } else {
                    thumbElement.style.left = `${valueSteps}px`;
                    console.log(`Thumb left: ${thumbElement.style.left}`);
                }
                this.selfSetAttribute('value', value);
            }
        }
    }
}
