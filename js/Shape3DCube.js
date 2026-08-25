((global, FunWithComponents) => {
    'use strict';


    class Shape3DCubeElement extends HTMLElement {
        static get DEFAULT_SIZE() {
            return '200px';
        }
        static get DEFAULT_PERSPECTIVE() {
            return '600px';
        }

        #cubeElement = null;

        constructor() {
            super();
            const templateId = 'cube-element-template';
            const templateElement = document.getElementById(templateId);
            const templateContent = templateElement.content.cloneNode(true);
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent);
        }

        static get observedAttributes() {
            return ['size', 'perspective'];
        }

        connectedCallback() {
            if (!this.getAttribute('size')) {
                this.setAttribute('size', Shape3DCubeElement.DEFAULT_SIZE);
            }
            if (!this.getAttribute('perspective')) {
                this.setAttribute('perspective', Shape3DCubeElement.DEFAULT_PERSPECTIVE);
            }
            this.#cubeElement = this.shadowRoot.querySelector('.shape--cube');
        }

        attributeChangeCallback(name, oldValue, newValue) {
            if (name === 'size') {
                if (newValue !== this.style.getProperty('--cube-container-size')) {
                    this.style.setProperty('--cube-container-size', newValue);
                }
            } else if (name === 'perspective') {
                if (newValue !== this.style.getProperty('--cube-container-perspective')) {
                    this.style.setProperty('--cube-container-perspective', newValue);
                }
            }
        }

        rotateOnYAxis(cssDegrees) {
            if (this.#cubeElement) {
                this.#cubeElement.style.transform = `rotateY(${cssDegrees}) translateZ(calc(-1 * var(--cube-container-size) / 2))`;
            }
        }

        rotateOnXAxis(cssDegrees) {
            if (this.#cubeElement) {
                this.#cubeElement.style.transform = `rotateX(${cssDegrees}) translateZ(calc(-1 * var(--cube-container-size) / 2))`;
            }
        }
    }

    FunWithComponents.types = FunWithComponents.types || {};
    FunWithComponents.types.Shape3DCubeElement = Shape3DCubeElement;

    if (!Object.hasOwn(window, 'FunWithComponents')) {
        window.FunWithComponents = FunWithComponents;
    }
})(window, window['FunWithComponents'] || {});
