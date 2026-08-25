export type ShadowDOMBaseElementInit = {
    templateId: string;
    shadowRootMode?: 'open' | 'closed';
};
export declare abstract class ShadowDOMBaseElement extends HTMLElement {
    protected constructor(initOptions: ShadowDOMBaseElementInit);
}
export declare abstract class OpenShadowDOMBaseElement extends ShadowDOMBaseElement {
    protected constructor(templateId: string);
}
export declare abstract class ClosedShadowDOMBaseElement extends ShadowDOMBaseElement {
    protected constructor(templateId: string);
}
//# sourceMappingURL=index.d.ts.map