import { ShadowDOMBaseElement} from "./base-types.js";

export default class ProfilePageElement extends ShadowDOMBaseElement {

    static #templateId = 'profile-page-template';

    static setTemplateId(templateId) {
        ProfilePageElement.#templateId = templateId;
    }

    constructor() {
        super(ProfilePageElement.#templateId);
    }

    set header(headerHtml) {
        const headerPart = this.shadowRoot.querySelector('[part="header"]');
        if (headerPart) {
            headerPart.innerHTML = headerHtml;
        }
    }

    set content(contentHtml) {
        const contentPart = this.shadowRoot.querySelector('[part="content"]');
        if (contentPart) {
            contentPart.innerHTML = contentHtml;
        }
    }

    set sidebar(sidebarHtml) {
        const sidebarPart = this.shadowRoot.querySelector('[part="sidebar"]');
        if (sidebarPart) {
            sidebarPart.innerHTML = sidebarHtml;
        }
    }
}