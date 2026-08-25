import type {
    IResrViewItem,
    IResrViewItemAttribute,
    IResrViewItemText,
    ObjectPropertyPath,
} from './index.ts';
import {
    ResrState,
    ResrViewItemAttribute,
    ResrViewItemText,
    ResrViewItem
} from './index.ts';

describe('state types module', () => {
    test('ResrState class defines view state and data state properties.', () => {
       const state: ResrState = new ResrState();
       expect(typeof state.viewState).not.toEqual('undefined');
       expect(typeof state.dataState).not.toEqual('undefined');
    });
    test('ResrViewItemAttribute defines appropriate default property values.', () => {
        const attribute: IResrViewItemAttribute = new ResrViewItemAttribute();
        expect(attribute.name).toEqual('');
        expect(attribute.dataType).toEqual('');
        expect(attribute.defaultValue).toBeNull();
        expect(attribute.value).toBeNull();
        expect(Array.isArray(attribute.dataStatePath)).toEqual(true);
    });
    test('ResrViewItemAttribute correctly initializes non-default property values.', () => {
       const attribute: IResrViewItemAttribute = new ResrViewItemAttribute(
           'attribute-name',
           'string',
           'default-name',
           'test-attribute-value',
           ['testComponent', 'componentAttributes', 'attributeValue'],
       );
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
       const itemText: IResrViewItemText = new ResrViewItemText();
       expect(itemText.textContent).toEqual('');
       expect(Array.isArray(itemText.dataStatePath)).toEqual(true);
    });
    test('ResrViewItemText correctly initializes non-default values.', () => {
        const testContent: string = 'test content';
        const dataPath: ObjectPropertyPath[] = ['test', 'property', 'path'];
        const itemText: IResrViewItemText = new ResrViewItemText(
            testContent,
            dataPath,
        );
        expect(itemText.textContent).toEqual(testContent);
        expect(itemText.dataStatePath).toEqual(expect.arrayContaining(dataPath));
    });

    test('ResrViewItem correctly initializes default values.', () => {
        const viewItem: IResrViewItem = new ResrViewItem();
        expect(viewItem.tagName).toEqual('');
        expect(viewItem.attributes).toEqual(expect.arrayContaining([]));
        expect(viewItem.textContent).toBeInstanceOf(ResrViewItemText);
        expect(viewItem.childViewItems).toEqual(expect.arrayContaining([]));
        expect(viewItem.appMessageTopicID).toEqual('');
    });
    test('ResrViewItem correctly initializes non-default values.', () => {
        const testTagName: string = 'tag-name';
        const attributes: ResrViewItemAttribute[] = [
            new ResrViewItemAttribute(),
        ];
        const viewItem: IResrViewItem = new ResrViewItem();

    });
});
