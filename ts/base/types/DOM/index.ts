
export type ShadowDOMBaseElementInit = {
    templateId: string;
    shadowRootMode?: 'open' | 'closed',
};

export abstract class ShadowDOMBaseElement extends HTMLElement {
    protected constructor(initOptions: ShadowDOMBaseElementInit) {
        super();
        const { templateId, shadowRootMode = 'open' } = initOptions;
        const templateElement: HTMLElement | null = document.getElementById(templateId);
        if (templateElement !== null) {
            const templateContent: Node = (templateElement as HTMLTemplateElement).content.cloneNode(true);
            const shadowRoot: ShadowRoot = this.attachShadow({mode: shadowRootMode});
            shadowRoot.appendChild(templateContent);
        } else {
            throw new ReferenceError(`The template element identified by ${templateId} does not exist.`);
        }
    }
}

export abstract class OpenShadowDOMBaseElement extends ShadowDOMBaseElement {
    protected constructor(templateId: string) {
        super({
            templateId,
            shadowRootMode: 'open',
        });
    }
}

export abstract class ClosedShadowDOMBaseElement extends ShadowDOMBaseElement {
    protected constructor(templateId: string) {
        super({
            templateId,
            shadowRootMode: 'closed',
        });
    }
}
