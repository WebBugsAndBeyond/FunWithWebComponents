import {ShadowDOMBaseElement} from "./base-types.js";

export default class CubeElement extends ShadowDOMBaseElement {
    #mouseOverTimer = 0;
    #mouseOutTimer = 0;
    #waitingAnimationToggleTimeout = 3000;
    #isMouseOver = false;
    #interruptFlickerAnimation = false;
    #visibleFaceFlickerAnimationTimer = 0;

    static #templateId = 'cube-element-template';

    static setTemplateId(templateId) {
        if (typeof templateId === 'string' && templateId !== '' && /^([a-z]+[a-z0-9]+)(-[a-z0-9]+)*/i.test(templateId)) {
            this.#templateId = templateId;
        }
    }

    constructor() {
        super(CubeElement.#templateId);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    static get observedAttributes() {
        return ['size', 'perspective', 'xaxis', 'yaxis', 'zaxis', 'angle', 'visible-face'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'size') {
            this.style.setProperty('--cube-width', newValue);
            this.style.setProperty('--cube-height', newValue);
        } else if (name === 'xaxis') {
            this.style.setProperty('--cube-xaxis', newValue);
        } else if (name === 'yaxis') {
            this.style.setProperty('--cube-yaxis', newValue);
        } else if (name === 'zaxis') {
            this.style.setProperty('--cube-zaxis', newValue);
        } else if (name === 'angle') {
            this.style.setProperty('--cube-angle', newValue);
        } else if (name === 'visible-face') {
            const validFaceNames = ['front', 'back', 'right', 'left', 'top', 'bottom'];
            if (!validFaceNames.includes(newValue)) {
                this.setAttribute('visible-face', oldValue);
            }
        } else if (name === 'perspective') {
            this.style.setProperty('--cube-perspective', `${newValue}`);
        }
    }

    connectedCallback() {
        const perspectiveAttributeValue = this.getAttribute('perspective');
        console.log('perspective attribute ', perspectiveAttributeValue);
        if (perspectiveAttributeValue === null) {
            const stylePerspectiveAttributeValue = getComputedStyle(this).getPropertyValue('--cube-perspective');
            console.log('style perspective value ', stylePerspectiveAttributeValue);
            this.setAttribute('perspective', stylePerspectiveAttributeValue);
        }

        this.addEventListener('mouseover', this.onMouseOver);
        this.addEventListener('mouseout', this.onMouseOut);

        // Maybe this is something to work with, but for now it sucks.
        // this.#visibleFaceFlickerAnimationTimer = setInterval(() => {
        //     this.runVisibleFaceFlickerAnimation();
        // }, 20000);
        this.#mouseOutTimer = setTimeout(() => {
            this.toggleWaitingAnimation();
            this.#mouseOutTimer = 0;
        }, this.#waitingAnimationToggleTimeout);
    }

    disconnectedCallback() {
        this.removeEventListener('mouseover', this.onMouseOver);
        this.removeEventListener('mouseout', this.onMouseOut);
        if (this.#mouseOutTimer !== 0) {
            clearTimeout(this.#mouseOutTimer);
            this.#mouseOutTimer = 0;
        }
        if (this.#mouseOutTimer !== 0) {
            clearTimeout(this.#mouseOutTimer);
            this.#mouseOutTimer = 0;
        }
        if (this.#visibleFaceFlickerAnimationTimer !== 0) {
            this.#cleanupVisibleFaceFlickerAnimation();
        }
    }

    #cleanupVisibleFaceFlickerAnimation() {
        clearInterval(this.#visibleFaceFlickerAnimationTimer);
        this.#visibleFaceFlickerAnimationTimer = 0;
        const visibleFaceName = this.getAttribute('visible-face');
        if (visibleFaceName !== null) {
            const visibleFaceElement = this.shadowRoot.querySelector(`.face.${visibleFaceName}`);
            if (visibleFaceElement !== null) {
                if (visibleFaceElement.classList.contains('cube--flicker-phase-1')) {
                    visibleFaceElement.classList.remove('cube--flicker-phase-1');
                }
                if (visibleFaceElement.classList.contains('cube--flicker-phase-2')) {
                    visibleFaceElement.classList.remove('cube--flicker-phase-2');
                }
                if (visibleFaceElement.classList.contains('cube--flicker-phase-3')) {
                    visibleFaceElement.classList.remove('cube--flicker-phase-3');
                }
            }
        }
    }

    toggleWaitingAnimation() {
        const cubeElement = this.shadowRoot.querySelector('.cube');
        if (cubeElement) {
            if (this.#isMouseOver) {
                if (cubeElement.classList.contains('cube--waiting-animation')) {
                    cubeElement.classList.remove('cube--waiting-animation');
                }
            } else {
                if (!cubeElement.classList.contains('cube--waiting-animation')) {
                    cubeElement.classList.add('cube--waiting-animation');
                }
            }
            this.#interruptFlickerAnimation = false;
            // this.runVisibleFaceFlickerAnimation();
        }
    }

    onMouseOver(event) {

        if (this.#mouseOutTimer !== 0) {
            clearTimeout(this.#mouseOutTimer);
            this.#mouseOutTimer = 0;
        }
        this.#isMouseOver = true;
        this.#mouseOverTimer = setTimeout(() => {
            this.toggleWaitingAnimation();
            this.#mouseOverTimer = 0;
        }, 1000);
        console.log(event.composedPath());
        const faceElement = event.composedPath().find(element => element?.classList?.contains?.('face') ?? false);
        console.log(faceElement);
        if (faceElement) {
            const faceName = faceElement.getAttribute('class')?.replace?.(/face\s+/, '') ?? '';
            if (faceName) {
                this.setAttribute('visible-face', faceName);
            }
        }
    }

    onMouseOut(event) {
        console.log(event);
        console.log(event.composedPath());
        this.#isMouseOver = false;
        if (this.#mouseOutTimer !== 0) {
            clearTimeout(this.#mouseOutTimer);
            this.#mouseOutTimer = 0;
        }
        this.#mouseOutTimer = setTimeout(() => {
            this.toggleWaitingAnimation();
            this.#mouseOutTimer = 0;
        }, this.#waitingAnimationToggleTimeout);
    }

    runVisibleFaceFlickerAnimation(visibleFace = '') {
        if (visibleFace !== '') {
            if (['front', 'back', 'left', 'right', 'top', 'bottom'].includes(visibleFace)) {
                this.setAttribute('visible-face', visibleFace);
            }
        } else {
            visibleFace = this.getAttribute('visible-face');
        }
        const faceElement = this.shadowRoot.querySelector(`.face.${visibleFace}`);
        if (faceElement) {
            const animationPhaseDurations = [{
                className: 'cube--flicker-phase-1',
                duration: 1000,
                repeatCount: 3,
            }, {
                className: 'cube--flicker-phase-2',
                duration: 700,
                repeatCount: 4,
            }, {
                className: 'cube--flicker-phase-3',
                duration: 500,
                repeatCount: 5,
            }];
            const runPhaseStep = (phase) => {
                return new Promise((resolve) => {
                    console.log(phase);
                    window.setTimeout(() => {
                       if (this.#interruptFlickerAnimation) {
                           phase.repeatCount = 0;
                       } else {
                           --phase.repeatCount;
                       }
                       resolve(phase);
                   }, phase.duration);
                });
            };

            const runPhase = async (phase) => {

                const toggleClass = () => {

                };

                console.log(`adding class ${phase.className}`);
                faceElement.classList.add(phase.className);
                while (phase.repeatCount > 0) {
                    await runPhaseStep(phase);
                }
                faceElement.classList.remove(phase.className);
                console.log(`removing class ${phase.className}`);
            }

            const runAnimation = async (phases) => {
                for (let i = 0; i < phases.length; i++) {
                    const phase = phases[i];
                    await runPhase(phase);
                    if (this.#interruptFlickerAnimation) {
                        break;
                    }
                }
            };
            runAnimation(animationPhaseDurations).then(() => {
                console.log('Flicker animation finished');
            });
        }
    }
}
