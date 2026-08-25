((module) => {
    'use strict';

    module.utils = module.utils || {};
    module.utils.types = module.utils.type || {};

    module.utils.types.ShadowDOMBaseElement = class ShadowDOMBaseElement extends HTMLElement {
        constructor(templateId) {
            super();
            const templateElement = document.getElementById(templateId);
            const templateContent = templateElement.content.cloneNode(true);
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(templateContent);
        }
    }

    module.utils.types.number = module.utils.types.number || {};
    module.utils.types.number.returnValidNumberOrThrow = (number, min, max) => {
        if (typeof(number) === 'number' && !Number.isNaN(number) && number >= min && number <= max) {
            return number;
        }
        throw TypeError(`Invalid number: ${number} for range (${min}, ${max}`);
    };

    module.utils.types.number.isFiniteNumber = (
        number,
        min = Number.MIN_VALUE,
        max = Number.MAX_VALUE
    ) => {
        return typeof (number) === 'number' &&
            Number.isFinite(number) &&
            number >= min && number <= max;
    }


    module.utils.types.number.isFactorOf = (subjectValue, ofValue) => {
        return module.utils.types.number.isFiniteNumber(subjectValue)
            && subjectValue !== 0 &&
            ofValue % subjectValue === 0;
    };

    module.utils.types.string = module.utils.types.string || {};
    module.utils.types.string.isAlphaNumericWithOptionalStringSeparators = (stringValue) => {
        return typeof stringValue === 'string' &&
            /^[a-z0-9]+(?:\s[a-z0-9]+)*$/i.test(stringValue);
    };

    module.utils.types.AccessibleSliderBaseElement = class AccessibleSliderBaseElement extends module.utils.types.ShadowDOMBaseElement {

        static get VERTICAL_ORIENTATION() {
            return 'vertical';
        }

        static get HORIZONTAL_ORIENTATION() {
            return 'horizontal';
        }

        static get UNDEFINED_ORIENTATION() {
            return 'undefined';
        }

        static get EMPTY_ORIENTATION() {
            return '';
        }

        #value = 0;
        #minValue = 0;
        #maxValue = 100;
        #pageSize = 10;
        #isMouseDown = false;
        #mousePosition = null;
        #isSelfAttributeUpdate = false;
        #labelText = '';
        #orientation = '';
        #debounceAttributeValueUpdate = false;

        constructor(templateId) {
            super(templateId);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.onKeyUp = this.onKeyUp.bind(this);
        }

        get mousePosition() {
            return this.#mousePosition;
        }

        get value() {
            return this.#value;
        }

        set value(value) {
            this.#value = value;
            this.#isSelfAttributeUpdate = true;
            this.setAttribute('value', value);
            this.#isSelfAttributeUpdate = false;
            this.updateUIValueDisplay();
            this.dispatchValueChangeEvent();
        }

        get minValue() {
            return this.#minValue;
        }

        get maxValue() {
            return this.#maxValue;
        }

        get pageSize() {
            return this.#pageSize;
        }

        get isMouseDown() {
            return this.#isMouseDown;
        }

        get orientation() {
            return this.#orientation;
        }

        updateMouseMoveCoordinates(x, y) {
            if (module.utils.types.number.isFiniteNumber(x) && module.utils.types.number.isFiniteNumber(y)) {
                this.#mousePosition = { x, y };
            }
        }

        static get observedAttributes() {
            return ['value', 'label', 'minvalue', 'maxvalue', 'pagesize', 'orientation'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'value') {
                const parsedValueAsNumber = parseFloat(newValue);
                if (
                    !this.#isSelfAttributeUpdate &&
                    module.utils.types.number.isFiniteNumber(
                        parsedValueAsNumber,
                        this.#minValue,
                        this.#maxValue,
                    )
                ) {
                    this.#value = parsedValueAsNumber;
                    if (this.#debounceAttributeValueUpdate) {
                        return;
                    }
                    this.updateUIValueDisplay();
                    this.dispatchValueChangeEvent();
                } else {
                    console.log(`what happened? ${parsedValueAsNumber}`);
                }
            } else if (name === 'label' && module.utils.types.string.isAlphaNumericWithOptionalStringSeparators(newValue)) {
                this.#labelText = newValue;
                if (this.#debounceAttributeValueUpdate) {
                    return;
                }
                this.updateUILabelDisplay();
            } else if (name === 'minvalue') {
                const parsedNumberValue = parseFloat(newValue);
                if (module.utils.types.number.isFiniteNumber(parsedNumberValue)) {
                    this.#minValue = newValue;
                }
            } else if (name === 'maxvalue') {
                const parsedNumberValue = parseFloat(newValue);
                if (module.utils.types.number.isFiniteNumber(parsedNumberValue)) {
                    this.#maxValue = newValue;
                }
            } else if (name === 'pagesize') {
                const parsedNumberValue = parseFloat(newValue);
                if (module.utils.types.number.isFactorOf(parsedNumberValue, (this.#maxValue - this.#minValue))) {
                    this.#pageSize = parsedNumberValue;
                }
            } else if (name === 'orientation') {
                if ([
                    module.utils.types.AccessibleSliderBaseElement.HORIZONTAL_ORIENTATION,
                    module.utils.types.AccessibleSliderBaseElement.VERTICAL_ORIENTATION,
                    module.utils.types.AccessibleSliderBaseElement.UNDEFINED_ORIENTATION,
                    module.utils.types.AccessibleSliderBaseElement.EMPTY_ORIENTATION,
                ].includes(newValue)) {
                    this.#orientation = newValue;
                    if (this.#debounceAttributeValueUpdate) {
                        return;
                    }
                    this.updateUIValueDisplay();
                }
            }
        }

        selfSetAttribute(name, value) {
            this.#isSelfAttributeUpdate = true;
            this.setAttribute(name, value);
            this.#isSelfAttributeUpdate = false;
        }

        connectedCallback() {
            this.addEventListener('mousedown', this.onMouseDown);
            this.addEventListener('mouseup', this.onMouseUp);
            this.addEventListener('mousemove', this.onMouseMove);
            this.addEventListener('keydown', this.onKeyDown);
            this.addEventListener('keyup', this.onKeyUp);
            this.#debounceAttributeValueUpdate = true;
            this.setAttribute('value', this.#value + '');
            this.setAttribute('minvalue', this.#minValue + '');
            this.setAttribute('maxvalue', this.#maxValue + '');
            this.setAttribute('pagesize', this.#pageSize + '');
            this.setAttribute('label', this.#labelText);
            this.setAttribute('orientation', this.#orientation);
            this.#debounceAttributeValueUpdate = false;
            this.updateUIValueDisplay();
            this.updateUILabelDisplay();
        }

        disconnectedCallback() {
            this.removeEventListener('mousedown', this.onMouseDown);
            this.removeEventListener('mouseup', this.onMouseUp);
            this.removeEventListener('mousemove', this.onMouseMove);
            this.removeEventListener('keyup', this.onKeyUp);
            this.removeEventListener('keydown', this.onKeyDown);
        }

        onMouseDown(event) {
            module.utils.events.ensureEventIsOnlyHandledOnce(event);
            this.#isMouseDown = true;
            this.#mousePosition = {
                x: event.clientX,
                y: event.clientY,
            };
            console.log('onMouseDown');
            console.log(this.#mousePosition);
        }

        onMouseUp(event) {
            module.utils.events.ensureEventIsOnlyHandledOnce(event);
            this.#isMouseDown = false;
            this.#mousePosition = null;
        }

        onMouseMove(event) {
            throw new TypeError(`onMouseMove must be implemented in derived classes.`);
        }

        onKeyDown(event) {
            const keysToProcess = ['Home', 'End', 'PageUp', 'PageDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'ArrowDown'];
            if (keysToProcess.includes(event.key)) {
                module.utils.events.ensureEventIsOnlyHandledOnce(event);
            }
        }

        onKeyUp(event) {
            const keysToProcess = ['Home', 'End', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'];
            console.log(`Key to process ${event.key}`);
            if (!keysToProcess.includes(event.key)) {
                return;
            }
            module.utils.events.ensureEventIsOnlyHandledOnce(event);
            switch (event.key) {
                case 'Home':
                    this.#value = this.#minValue;
                    break;
                case 'End':
                    this.#value = this.#maxValue;
                    break;
                case 'ArrowUp':
                case 'ArrowRight':
                    if (this.#value >= this.#maxValue) {
                        return;
                    }
                    this.#value = Math.min(this.#maxValue, this.#value + 1);
                    break;
                case 'ArrowDown':
                case 'ArrowLeft':
                    if (this.#value <= this.#minValue) {
                        return;
                    }
                    this.#value = Math.max(this.#minValue, this.#value - 1);
                    break;
                case 'PageUp':
                    if (this.#value >= this.#maxValue) {
                        return;
                    }
                    this.#value = Math.min(this.#maxValue, this.#value + this.#pageSize);
                    break;
                case 'PageDown':
                    if (this.#value <= this.#minValue) {
                        return;
                    }
                    this.#value = Math.max(this.#minValue, this.#value - this.#pageSize);
                    break;
                default:
                    return;
            }
            this.updateUIValueDisplay();
            this.dispatchValueChangeEvent();
        }

        updateUIValueDisplay() {
            throw new TypeError('Must be implemented in derived class');
        }

        updateUILabelDisplay() {
            const labelElement = this.shadowRoot.querySelector('[part="label"]');
            if (labelElement) {
                labelElement.textContent = this.#labelText;
            }
        }

        dispatchValueChangeEvent() {
            this.dispatchEvent(new CustomEvent('slidervaluechange', {
                detail: { value: this.#value },
                bubbles: true,
                composed: true,
            }));
        }
    }

    module.utils.events = module.utils.events || {};
    module.utils.events.ensureEventIsOnlyHandledOnce = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation()
    };

    module.utils.loadHTMLTemplates = async (templateSpecs, parentElementSelector = 'body') => {
        const templateElements = [];
        for (const spec of templateSpecs) {
            const { url, id } = spec;
            const response = await fetch(url, {
                headers: {
                    'Accept': 'text/html',
                },
            });
            const htmlContent = await response.text();
            const templateElement = document.createElement('template');
            templateElement.id = id;
            templateElement.innerHTML = htmlContent;
            const parentElement = document.querySelector(parentElementSelector);
            parentElement.appendChild(templateElement);
            templateElements.push({
                url,
                id,
                templateElement,
            });
        }
        return templateElements;
    };
    return module.utils;
})(window.FunWithWebComponents || {});
