import { ResrState, ResrViewItemAttribute, ResrViewItemText, ResrViewItem } from './index.js';
describe('state types module', () => {
    test('ResrState class defines view state and data state properties.', () => {
        const state = new ResrState();
        expect(typeof state.viewState).not.toEqual('undefined');
        expect(typeof state.dataState).not.toEqual('undefined');
    });
    test('ResrViewItemAttribute defines appropriate default property values.', () => {
        const attribute = new ResrViewItemAttribute();
        expect(attribute.name).toEqual('');
        expect(attribute.dataType).toEqual('');
        expect(attribute.defaultValue).toBeNull();
        expect(attribute.value).toBeNull();
        expect(Array.isArray(attribute.dataStatePath)).toEqual(true);
    });
    test('ResrViewItemAttribute correctly initializes non-default property values.', () => {
        const attribute = new ResrViewItemAttribute('attribute-name', 'string', 'default-name', 'test-attribute-value', ['testComponent', 'componentAttributes', 'attributeValue']);
        expect(attribute.name).toEqual('attribute-name');
        expect(attribute.dataType).toEqual('string');
        expect(attribute.defaultValue).toEqual('default-name');
        expect(attribute.value).toEqual('test-attribute-value');
        expect(attribute.dataStatePath).toEqual(expect.arrayContaining([
            'testComponent',
            'componentAttributes',
            'attributeValue',
        ]));
    });
    test('ResrViewItemText correctly initializes default values.', () => {
        const itemText = new ResrViewItemText();
        expect(itemText.textContent).toEqual('');
        expect(Array.isArray(itemText.dataStatePath)).toEqual(true);
    });
    test('ResrViewItemText correctly initializes non-default values.', () => {
        const testContent = 'test content';
        const dataPath = ['test', 'property', 'path'];
        const itemText = new ResrViewItemText(testContent, dataPath);
        expect(itemText.textContent).toEqual(testContent);
        expect(itemText.dataStatePath).toEqual(expect.arrayContaining(dataPath));
    });
    test('ResrViewItem correctly initializes default values.', () => {
        const viewItem = new ResrViewItem();
        expect(viewItem.tagName).toEqual('');
        expect(viewItem.attributes).toEqual(expect.arrayContaining([]));
        expect(viewItem.textContent).toBeInstanceOf(ResrViewItemText);
        expect(viewItem.childViewItems).toEqual(expect.arrayContaining([]));
        expect(viewItem.appMessageTopicID).toEqual('');
    });
    test('ResrViewItem correctly initializes non-default values.', () => {
        const testTagName = 'tag-name';
        const attributes = [
            new ResrViewItemAttribute(),
        ];
        const viewItem = new ResrViewItem();
    });
});
//# sourceMappingURL=index.test.js.map