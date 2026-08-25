import { extractTagNameFromElementClass, HTMLElementLoader, loadHTMLTemplates, ensureEventIsHandledOnlyOnce, isAlphaNumericWithOptionalStringSeparators, isFiniteNumber, isFactorOf, returnValidNumberOrThrow, reduceObjectPropertyPath, } from "./utils.js";
describe('base utils module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('extractTagNameFromElementClass returns the class name', () => {
        const extractedTagName = extractTagNameFromElementClass(HTMLDivElement);
        expect(extractedTagName).toEqual('Div');
    });
    test('extractTagnameFromElementClass returns the class name from function toString().', () => {
        const mockInput = {
            name: '',
            toString() {
                return `function HTMLDivElement() {
                   [native code]
                }`;
            },
        };
        const extractedTagName = extractTagNameFromElementClass(mockInput);
        expect(extractedTagName).toEqual('Div');
    });
    test('extractTagNameFromElementClass returns an empty string for a mismatched constructor function.', () => {
        const mockInput = {
            name: '',
            toString() {
                return 'function some stuff';
            },
        };
        const extractedTagName = extractTagNameFromElementClass(mockInput);
        expect(extractedTagName).toEqual('');
    });
    test('loadHTMLTemplates loads identified templtes', async () => {
        const loaders = [
            new HTMLElementLoader('https://foo.com/bar.html', 'fake-template-id', extractTagNameFromElementClass(HTMLTemplateElement)),
        ];
        global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            text: () => Promise.resolve('<style>* { display: flex; }</style><div>Foobar!</div>'),
        });
        const loadedElements = await loadHTMLTemplates(loaders, 'body');
        // Every loaded element is in the set of loaders.
        expect(loadedElements.every((loaded) => loaders.includes(loaded) && loaded.loadedElement !== null)).toEqual(true);
        expect(loadedElements.every((loaded) => {
            const found = document.getElementById(loaded.id);
            return found !== null;
        })).toEqual(true);
    });
    test('loadHTMLTemplates throws a ReferenceError for a parent element that does not exist.', async () => {
        try {
            const loaders = [
                new HTMLElementLoader('https://foo.com/bar.html', 'fake-template-id', extractTagNameFromElementClass(HTMLTemplateElement)),
            ];
            global.fetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                text: () => Promise.resolve('<style>* { display: flex; }</style><div>Foobar!</div>'),
            });
            await loadHTMLTemplates(loaders, 'parent-element-that-does-not-exist');
        }
        catch (error) {
            expect(error).toBeInstanceOf(ReferenceError);
        }
    });
    test('ensureEventIsHandledOnlyOnce prevents further event handling.', () => {
        const event = new Event('click');
        event.preventDefault = jest.fn();
        event.stopPropagation = jest.fn();
        event.stopImmediatePropagation = jest.fn();
        ensureEventIsHandledOnlyOnce(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(event.stopImmediatePropagation).toHaveBeenCalled();
    });
    test('isAlphaNumericWithOptionalStringSeparators correctly evaluates its argument', () => {
        const testString = 'Foo124 Bar89az';
        expect(isAlphaNumericWithOptionalStringSeparators(testString)).toEqual(true);
        const testStringForFalse = '#*#)C )#(#(!';
        expect(isAlphaNumericWithOptionalStringSeparators(testStringForFalse)).toEqual(false);
    });
    test('isFiniteNumber correctly evaluates its argument.', () => {
        const finiteNumber = 13;
        expect(isFiniteNumber(finiteNumber)).toEqual(true);
        expect(isFiniteNumber(finiteNumber, 0, 100)).toEqual(true);
        const nanNumber = Number.NaN;
        expect(isFiniteNumber(nanNumber)).toEqual(false);
    });
    test('isFactorOf correctly evaluates its arguments.', () => {
        let subject = 10;
        let ofValue = 100;
        expect(isFactorOf(subject, ofValue)).toEqual(true);
        subject = 7;
        ofValue = 13;
        expect(isFactorOf(subject, ofValue)).toEqual(false);
    });
    it('returnValidNumberOrThrow returns the number for valid arguments.', () => {
        let subject = 50;
        let min = 0;
        let max = 100;
        expect(returnValidNumberOrThrow(subject, min, max)).toEqual(subject);
        subject = -1;
        expect(() => returnValidNumberOrThrow(subject, min, max)).toThrow(TypeError);
        subject = 101;
        expect(() => returnValidNumberOrThrow(subject, min, max)).toThrow(TypeError);
    });
    test('reduceObjectPropertyPath correctly follows object path.', () => {
        const rootObject = {
            path1: {
                path2: {
                    path3: 'foobar',
                },
            },
        };
        const paths = ['path1', 'path2', 'path3'];
        const reducedValueAtEndOfPath = reduceObjectPropertyPath(rootObject, paths);
        expect(reducedValueAtEndOfPath).toEqual('foobar');
    });
    test('reduceObjectPropertyPath throws a TypeError when there is a path-name to object mismatch.', () => {
        const rootObject = {
            path1: {
                path2: {
                    path3: 'foobar',
                },
            },
        };
        const paths = ['path1', 'fakePath', 'path3'];
        expect(() => {
            const reducedValue = reduceObjectPropertyPath(rootObject, paths);
            expect(reducedValue).not.toEqual('foobar');
        }).toThrow(TypeError);
    });
    test('reduceObjectPropertyPath throws a TypeError when there is a non-object when an object is expected in the path.', () => {
        const rootObject = {
            path1: {
                path2: 'foobar',
            },
        };
        const paths = ['path1', 'path2', 'path3'];
        expect(() => {
            const reducedValue = reduceObjectPropertyPath(rootObject, paths);
            expect(reducedValue).not.toEqual('foobar');
        }).toThrow(TypeError);
    });
});
//# sourceMappingURL=utils.test.js.map