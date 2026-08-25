import { AccessibleSliderBaseElement } from "./base-types.js";

export default class RotatingKnobElement extends AccessibleSliderBaseElement {

    constructor(templateId = 'rotating-knob-template') {
        super(templateId);
    }

    static get observedAttributes() {
        return ['value', 'minValue', 'maxValue', 'pageSize', 'label'];
    }

    onMouseMove(event) {
        if (!this.isMouseDown) {
            return;
        }
        window.FunWithWebComponents.utils.event.ensureEventIsOnlyHandledOnce(event);
        const { mousePosition, value, pageSize, minValue, maxValue } = this;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const moveDistance = (mousePosition?.y ?? mouseY) - mouseY;
        if (moveDistance > 0) {
            const newValue = Math.min(value + pageSize, maxValue);
            console.log(`Increasing value ${newValue}`);
            this.value = newValue;
        } else if (moveDistance < 0) {
            const newValue = Math.max(minValue, value - pageSize);
            console.log(`Decreasing value ${newValue}`);
            this.value = newValue;
        } else {
            return;
        }
        this.updateMouseMoveCoordinates(mouseX, mouseY);
        this.selfSetAttribute('value', this.value);
        this.updateUIValueDisplay();
    }

    updateUIValueDisplay() {
        if (!this.isConnected) {
            return;
        }
        const knobElement = this.shadowRoot.querySelector('.knob__value-pointer');
        if (knobElement) {
            const steps = 135 * 2 / 100;
            const rotation = this.value * steps - 135;
            knobElement.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
            knobElement.setAttribute('aria-valuenow', `${this.value}`);
        }
    }
}
