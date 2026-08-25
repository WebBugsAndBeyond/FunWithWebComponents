import {
    ResrState,
} from '../types';

export default class ResrStateSingleton {
    protected static instance: ResrState | null = null;

    static createInstance(): ResrState {
        if (!ResrStateSingleton.instance) {
            ResrStateSingleton.instance = new ResrState();
        }
        return ResrStateSingleton.instance;
    }
}
