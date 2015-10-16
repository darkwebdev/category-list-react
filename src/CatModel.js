export default class {
    constructor(storage) {
        this.storage = storage;
        this.storageName = 'categories';
        var savedCollection = storage.getItem(this.storageName);
        this.savedCollection = savedCollection ? JSON.parse(savedCollection) : [];
    }
    get collection() {
        return this.savedCollection;
    }
    set collection(newCollection) {
        this.storage.setItem(this.storageName, JSON.stringify(newCollection));
    }
};