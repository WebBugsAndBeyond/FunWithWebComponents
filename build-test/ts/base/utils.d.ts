import type { HTMLElementConstructorFunction } from './types/utils/types.ts';
export declare function extractTagNameFromElementClass(elementClass: HTMLElementConstructorFunction): string;
export interface ILoadableHTMLElement<ElementType extends HTMLElement> {
    readonly url: string;
    readonly id: string;
    readonly tagName: string;
    get loadedElement(): ElementType | null;
    load(): Promise<ILoadableHTMLElement<ElementType>>;
}
export declare class HTMLElementLoader<ElementType extends HTMLElement> implements ILoadableHTMLElement<ElementType> {
    readonly url: string;
    readonly id: string;
    tagName: string;
    private _loadedElement;
    constructor(url: string, id: string, tagName: string);
    load(): Promise<HTMLElementLoader<ElementType>>;
    get loadedElement(): ElementType | null;
}
export declare function loadHTMLTemplates(templateSpecs: HTMLElementLoader<HTMLTemplateElement>[], parentElementSelector: string): Promise<HTMLElementLoader<HTMLTemplateElement>[]>;
export declare function ensureEventIsHandledOnlyOnce(event: Event): void;
export declare function isAlphaNumericWithOptionalStringSeparators(stringValue: string): boolean;
export declare function isFiniteNumber(subject: number, min?: number, max?: number): boolean;
export declare function isFactorOf(subjectValue: number, ofValue: number): boolean;
export declare function returnValidNumberOrThrow(subject: number, min: number, max: number): number;
export declare function reduceObjectPropertyPath(rootObject: Record<string, any>, paths: string[]): unknown;
//# sourceMappingURL=utils.d.ts.map