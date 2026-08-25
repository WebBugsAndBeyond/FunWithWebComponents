export class ShadowDOMBaseElement extends HTMLElement {
    constructor(initOptions) {
        super();
        const { templateId, shadowRootMode = 'open' } = initOptions;
        const templateElement = document.getElementById(templateId);
        if (templateElement !== null) {
            const templateContent = templateElement.content.cloneNode(true);
            const shadowRoot = this.attachShadow({ mode: shadowRootMode });
            shadowRoot.appendChild(templateContent);
        }
        else {
            throw new ReferenceError(`The template element identified by ${templateId} does not exist.`);
        }
    }
}
export class OpenShadowDOMBaseElement extends ShadowDOMBaseElement {
    constructor(templateId) {
        super({
            templateId,
            shadowRootMode: 'open',
        });
    }
}
export class ClosedShadowDOMBaseElement extends ShadowDOMBaseElement {
    constructor(templateId) {
        super({
            templateId,
            shadowRootMode: 'closed',
        });
    }
}
//# sourceMappingURL=index.js.map