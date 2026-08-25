import DOMPurify from 'dompurify';
import type { HTMLElementConstructorFunction } from './types/utils/types.ts';

export function extractTagNameFromElementClass(elementClass: HTMLElementConstructorFunction): string {
    const name: string = elementClass.name || elementClass.toString();
    let extractedTagName: string = '';
    if (name.startsWith('function')) {
        // the elementClass.toString() value was used.
        const namePattern: RegExp = /HTML[a-zA-Z]+/;
        const matches = namePattern.exec(name);
        const matchedName: string = matches?.[0] ?? '';
        extractedTagName = matchedName.replace('HTML', '').replace('Element', '');
    } else {
        extractedTagName = name.replace('HTML', '').replace('Element', '');
    }
    return extractedTagName;
}

export interface ILoadableHTMLElement<ElementType extends HTMLElement> {
    readonly url: string;
    readonly id: string;
    readonly tagName: string;
    get loadedElement(): ElementType | null;
    load(): Promise<ILoadableHTMLElement<ElementType>>;
}

export class HTMLElementLoader<ElementType extends HTMLElement> implements ILoadableHTMLElement<ElementType> {

    private _loadedElement: ElementType | null = null;

    constructor(
        public readonly url: string,
        public readonly id: string,
        public tagName: string,
    ) {}

    async load(): Promise<HTMLElementLoader<ElementType>> {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
            },
        });
        const elementHtml = await response.text();
        const sanitizedHtml = DOMPurify.sanitize(elementHtml, {
            USE_PROFILES: {
                html: true,
            },
        });

        const element: HTMLElement = document.createElement(this.tagName);

        element.innerHTML = sanitizedHtml;
        element.id = this.id;
        this._loadedElement = element as ElementType;
        return this;
    }

    get loadedElement(): ElementType | null {
        return this._loadedElement;
    }
}

export async function loadHTMLTemplates(
    templateSpecs: HTMLElementLoader<HTMLTemplateElement>[],
    parentElementSelector: string,
): Promise<HTMLElementLoader<HTMLTemplateElement>[]> {
    const templateElements: HTMLElementLoader<HTMLTemplateElement>[] = await Promise.all(
        templateSpecs.map((spec) => {
            return spec.load();
        }),
    );
    const parentElement: HTMLElement | null = document.querySelector(parentElementSelector);
    if (parentElement !== null) {
        const loadedElements: HTMLTemplateElement[] = templateElements.map(
            elementLoader => elementLoader.loadedElement
        ).filter(
            element => element !== null
        );
        parentElement.append(...loadedElements);
    } else {
        throw new ReferenceError(`Parent element not foud in body; selector ${parentElementSelector}`);
    }
    return templateElements;
}

export function ensureEventIsHandledOnlyOnce(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

export function isAlphaNumericWithOptionalStringSeparators(stringValue: string): boolean {
    return /^[a-z0-9]+(?:\s[a-z0-9]+)*$/i.test(stringValue);
}

export function isFiniteNumber(
    subject: number,
    min: number = Number.MIN_VALUE,
    max: number = Number.MAX_VALUE,
): boolean {
    return Number.isFinite(subject) &&
        subject >= min && subject <= max;
}

export function isFactorOf(subjectValue: number, ofValue: number): boolean {
    return isFiniteNumber(subjectValue)
        && subjectValue !== 0 &&
        ofValue % subjectValue === 0;
}

export function returnValidNumberOrThrow(subject: number, min: number, max: number) {
    if (subject >= min && subject <= max) {
        return subject;
    }
    throw TypeError(`Invalid number: ${subject} for range (${min}, ${max}`);
};

export function reduceObjectPropertyPath(rootObject: Record<string, any>, paths: string[]): unknown {
    return paths.reduce((carry: any, current: string) => {
        if (typeof carry === 'object') {
            if (Object.hasOwn(carry, current)) {
                return carry[current];
            }
        }
        throw new TypeError('Object property path does not match object in question.');
    }, rootObject);
}
