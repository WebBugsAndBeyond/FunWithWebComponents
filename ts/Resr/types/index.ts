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
// Or should this be export type AttributeDataTypeName = "string" | "number" | "boolean" | "object"; // ?

export interface IResrViewItemAttribute {
    name: ViewAttributeName;
    dataType: AttributeDataTypeName;
    defaultValue: AttributeDataType;
    value: AttributeDataType;
    dataStatePath: ObjectPropertyPath[];
}

export class ResrViewItemAttribute implements IResrViewItemAttribute {
    constructor(
        public name: ViewAttributeName = '',
        public dataType: AttributeDataTypeName = '',
        public defaultValue: AttributeDataType = null,
        public value: AttributeDataType = null,
        public dataStatePath: ObjectPropertyPath[] = [],
    ) {

    }
}

export interface IResrViewItemText {
    textContent: string;
    dataStatePath: ObjectPropertyPath[];
}

export class ResrViewItemText implements IResrViewItemText {
    constructor(
        public textContent: string = '',
        public dataStatePath: ObjectPropertyPath[] = [],
    ) {

    }
}

export interface IResrViewItem {
    tagName: ViewTagName;
    attributes: ResrViewItemAttribute[];
    textContent: ResrViewItemText;
    childViewItems: IResrViewItem[];
    appMessageTopicID: ResrMessageTopicID;
}

export class ResrViewItem implements IResrViewItem {
    protected isDataUpdateCandidate: boolean = false;
    protected isDOMUpdateCandidate: boolean = false;

    constructor(
        public tagName: ViewTagName = '',
        public attributes: ResrViewItemAttribute[] = [],
        public textContent: ResrViewItemText = new ResrViewItemText(),
        public childViewItems: ResrViewItem[] = [],
        public appMessageTopicID: ResrMessageTopicID = '',
    ) {

    }
}

export interface IResrView {
    documentRootElementSelector: string;
    viewItems: IResrViewItem[];
}

export class ResrView {
    constructor(
        public documentRootElementSelector: string = '',
        public viewItems: IResrViewItem[] = [],
        public appMessageTopicID: string = '',
    ) {

    }
}

export type ResrDataStateScalarPropertyRecord = Record<
    ComponentPropertyName,
    string | number | boolean
>

export type SendMessageFunction<
    MessageDomainInput,
    MessageDomainOutput
> = (
    messageContents: MessageDomainInput,
) => Promise<MessageDomainOutput>;

export interface IResrMessageSource<MessageDomainInput, MessageDomainOutput> {
    messageTopicID: ResrMessageTopicID;
    sendMessage: SendMessageFunction<MessageDomainInput, MessageDomainOutput>;
}

export type ResrDataStateProperty = ResrDataStateScalarPropertyRecord |
    Record<
        ComponentPropertyName,
        ResrDataStateScalarPropertyRecord | any
    > & {
        messageTopicID: ResrMessageTopicID,
    };

export interface IResrDataState {
    properties: ResrDataStateProperty | null;
}

export class ResrDataState implements IResrDataState {
    properties: ResrDataStateProperty | null = null;
}

export class ResrState {
    constructor(
        public viewState: IResrView = new ResrView(),
        public dataState: IResrDataState = new ResrDataState(),
        // public messagePubSub: ResrPubSub = new ResrPubSub(),
    ) {

    }
}
