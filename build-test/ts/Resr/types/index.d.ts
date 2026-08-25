export type ViewTagName = string;
export type ViewAttributeName = string;
export type ComponentPropertyName = string;
export type ComponentID = string;
export type AttributePropertyName = string;
export type ViewCSSClassName = string;
export type ObjectPropertyPath = string;
export type ResrMessageTopicID = string;
export type AttributeDataType = string | number | boolean | null;
export type AttributeDataTypeName = string;
export interface IResrViewItemAttribute {
    name: ViewAttributeName;
    dataType: AttributeDataTypeName;
    defaultValue: AttributeDataType;
    value: AttributeDataType;
    dataStatePath: ObjectPropertyPath[];
}
export declare class ResrViewItemAttribute implements IResrViewItemAttribute {
    name: ViewAttributeName;
    dataType: AttributeDataTypeName;
    defaultValue: AttributeDataType;
    value: AttributeDataType;
    dataStatePath: ObjectPropertyPath[];
    constructor(name?: ViewAttributeName, dataType?: AttributeDataTypeName, defaultValue?: AttributeDataType, value?: AttributeDataType, dataStatePath?: ObjectPropertyPath[]);
}
export interface IResrViewItemText {
    textContent: string;
    dataStatePath: ObjectPropertyPath[];
}
export declare class ResrViewItemText implements IResrViewItemText {
    textContent: string;
    dataStatePath: ObjectPropertyPath[];
    constructor(textContent?: string, dataStatePath?: ObjectPropertyPath[]);
}
export interface IResrViewItem {
    tagName: ViewTagName;
    attributes: ResrViewItemAttribute[];
    textContent: ResrViewItemText;
    childViewItems: IResrViewItem[];
    appMessageTopicID: ResrMessageTopicID;
}
export declare class ResrViewItem implements IResrViewItem {
    tagName: ViewTagName;
    attributes: ResrViewItemAttribute[];
    textContent: ResrViewItemText;
    childViewItems: ResrViewItem[];
    appMessageTopicID: ResrMessageTopicID;
    protected isDataUpdateCandidate: boolean;
    protected isDOMUpdateCandidate: boolean;
    constructor(tagName?: ViewTagName, attributes?: ResrViewItemAttribute[], textContent?: ResrViewItemText, childViewItems?: ResrViewItem[], appMessageTopicID?: ResrMessageTopicID);
}
export interface IResrView {
    documentRootElementSelector: string;
    viewItems: IResrViewItem[];
}
export declare class ResrView {
    documentRootElementSelector: string;
    viewItems: IResrViewItem[];
    appMessageTopicID: string;
    constructor(documentRootElementSelector?: string, viewItems?: IResrViewItem[], appMessageTopicID?: string);
}
export type ResrDataStateScalarPropertyRecord = Record<ComponentPropertyName, string | number | boolean>;
export type SendMessageFunction<MessageDomainInput, MessageDomainOutput> = (messageContents: MessageDomainInput) => Promise<MessageDomainOutput>;
export interface IResrMessageSource<MessageDomainInput, MessageDomainOutput> {
    messageTopicID: ResrMessageTopicID;
    sendMessage: SendMessageFunction<MessageDomainInput, MessageDomainOutput>;
}
export type ResrDataStateProperty = ResrDataStateScalarPropertyRecord | (Record<ComponentPropertyName, ResrDataStateScalarPropertyRecord | any> & {
    messageTopicID: ResrMessageTopicID;
});
export interface IResrDataState {
    properties: ResrDataStateProperty | null;
}
export declare class ResrDataState implements IResrDataState {
    properties: ResrDataStateProperty | null;
}
export declare class ResrState {
    viewState: IResrView;
    dataState: IResrDataState;
    constructor(viewState?: IResrView, dataState?: IResrDataState);
}
//# sourceMappingURL=index.d.ts.map