export class ResrViewItemAttribute {
    constructor(name = '', dataType = '', defaultValue = null, value = null, dataStatePath = []) {
        this.name = name;
        this.dataType = dataType;
        this.defaultValue = defaultValue;
        this.value = value;
        this.dataStatePath = dataStatePath;
    }
}
export class ResrViewItemText {
    constructor(textContent = '', dataStatePath = []) {
        this.textContent = textContent;
        this.dataStatePath = dataStatePath;
    }
}
export class ResrViewItem {
    constructor(tagName = '', attributes = [], textContent = new ResrViewItemText(), childViewItems = [], appMessageTopicID = '') {
        this.tagName = tagName;
        this.attributes = attributes;
        this.textContent = textContent;
        this.childViewItems = childViewItems;
        this.appMessageTopicID = appMessageTopicID;
        this.isDataUpdateCandidate = false;
        this.isDOMUpdateCandidate = false;
    }
}
export class ResrView {
    constructor(documentRootElementSelector = '', viewItems = [], appMessageTopicID = '') {
        this.documentRootElementSelector = documentRootElementSelector;
        this.viewItems = viewItems;
        this.appMessageTopicID = appMessageTopicID;
    }
}
export class ResrDataState {
    constructor() {
        this.properties = null;
    }
}
export class ResrState {
    constructor(viewState = new ResrView(), dataState = new ResrDataState()) {
        this.viewState = viewState;
        this.dataState = dataState;
    }
}
//# sourceMappingURL=index.js.map