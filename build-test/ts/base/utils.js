import DOMPurify from 'dompurify';
export function extractTagNameFromElementClass(elementClass) {
    const name = elementClass.name || elementClass.toString();
    let extractedTagName = '';
    if (name.startsWith('function')) {
        // the elementClass.toString() value was used.
        const namePattern = /HTML[a-zA-Z]+/;
        const matches = namePattern.exec(name);
        const matchedName = matches?.[0] ?? '';
        extractedTagName = matchedName.replace('HTML', '').replace('Element', '');
    }
    else {
        extractedTagName = name.replace('HTML', '').replace('Element', '');
    }
    return extractedTagName;
}
export class HTMLElementLoader {
    constructor(url, id, tagName) {
        this.url = url;
        this.id = id;
        this.tagName = tagName;
        this._loadedElement = null;
    }
    async load() {
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
        const element = document.createElement(this.tagName);
        element.innerHTML = sanitizedHtml;
        element.id = this.id;
        this._loadedElement = element;
        return this;
    }
    get loadedElement() {
        return this._loadedElement;
    }
}
export async function loadHTMLTemplates(templateSpecs, parentElementSelector) {
    const templateElements = await Promise.all(templateSpecs.map((spec) => {
        return spec.load();
    }));
    const parentElement = document.querySelector(parentElementSelector);
    if (parentElement !== null) {
        const loadedElements = templateElements.map(elementLoader => elementLoader.loadedElement).filter(element => element !== null);
        parentElement.append(...loadedElements);
    }
    else {
        throw new ReferenceError(`Parent element not foud in body; selector ${parentElementSelector}`);
    }
    return templateElements;
}
export function ensureEventIsHandledOnlyOnce(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}
export function isAlphaNumericWithOptionalStringSeparators(stringValue) {
    return /^[a-z0-9]+(?:\s[a-z0-9]+)*$/i.test(stringValue);
}
export function isFiniteNumber(subject, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
    return Number.isFinite(subject) &&
        subject >= min && subject <= max;
}
export function isFactorOf(subjectValue, ofValue) {
    return isFiniteNumber(subjectValue)
        && subjectValue !== 0 &&
        ofValue % subjectValue === 0;
}
export function returnValidNumberOrThrow(subject, min, max) {
    if (subject >= min && subject <= max) {
        return subject;
    }
    throw TypeError(`Invalid number: ${subject} for range (${min}, ${max}`);
}
;
export function reduceObjectPropertyPath(rootObject, paths) {
    return paths.reduce((carry, current) => {
        if (typeof carry === 'object') {
            if (Object.hasOwn(carry, current)) {
                return carry[current];
            }
        }
        throw new TypeError('Object property path does not match object in question.');
    }, rootObject);
}
//# sourceMappingURL=utils.js.map