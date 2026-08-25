// @ts-ignore
import {
    ShadowDOMBaseElement,
    OpenShadowDOMBaseElement,
    ClosedShadowDOMBaseElement,
} from './index.ts';

describe('base.types.dom module', () => {

    const reifiedShadowDOMTemplateId: string = 'reified-element-template';
    const reifiedTemplate: string = `
        
            <style>
                div {
                    display: flex;
                }
            </style>
            <div>Foobar</div>
`;

    class ReifiedShadowDOMBaseElement extends ShadowDOMBaseElement {
        constructor() {
            super({
                templateId: reifiedShadowDOMTemplateId,
            });
        }
    }

    class ReifiedOpenShadowDOMElement extends OpenShadowDOMBaseElement {
        constructor() {
            super(reifiedShadowDOMTemplateId);
        }
    }

    class ReifiedClosedShadowDOMElement extends ClosedShadowDOMBaseElement {
        constructor() {
            super(reifiedShadowDOMTemplateId);
        }
    }

    class ReifiedNonExistentTemplateShadowDOMElement extends ShadowDOMBaseElement {
        constructor() {
            super({
                templateId: 'non-existent-template-id',
            });
        }
    }

    beforeAll(() => {
        const templateElement = document.createElement('template');
        templateElement.id = reifiedShadowDOMTemplateId;
        templateElement.innerHTML = reifiedTemplate;
        document.body.appendChild(templateElement);
        window.customElements.define('reified-shadow', ReifiedShadowDOMBaseElement);
        window.customElements.define('open-reified-shadow', ReifiedOpenShadowDOMElement);
        window.customElements.define('closed-reified-shadow', ReifiedClosedShadowDOMElement);
        window.customElements.define('non-existent-template-element', ReifiedNonExistentTemplateShadowDOMElement);
    });

    test('its constructor attaches a shadow root with the contents of the specified template.', async () => {
        await window.customElements.whenDefined('reified-shadow');
        const element: HTMLElement = document.createElement('reified-shadow');
        expect(element).not.toBeNull();
        const shadowDivElement: HTMLElement | null = element?.shadowRoot?.querySelector?.('div') ?? null;
        expect(shadowDivElement).not.toBeNull();
    });

    it('defines an abstract base element for creating an open shadow root.', async () => {
        await window.customElements.whenDefined('open-reified-shadow');
        const element: HTMLElement = document.createElement('open-reified-shadow');
        expect(element).not.toBeNull();
        expect(element?.shadowRoot?.mode).toEqual("open");
    });
    it('defines an abstract base element for creating a closed shadow root.', async () => {
        await window.customElements.whenDefined('closed-reified-shadow');
        const element: HTMLElement = document.createElement('closed-reified-shadow');
        expect(element).not.toBeNull();
        expect(element?.shadowRoot).toBeNull();
    });
    it('throws ReferenceError when the shadow dom template does not exist.', async () => {
        await window.customElements.whenDefined('non-existent-template-element');
        expect(() => {
           return new ReifiedNonExistentTemplateShadowDOMElement();
        }).toThrow();
    });
});
