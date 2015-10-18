export default class {
    constructor(storage) {
        this.storage = storage;
        this.storageName = 'categories';
        const savedCollection = storage.getItem(this.storageName);
        this.savedCollection = savedCollection ? JSON.parse(savedCollection) : [];
    }
    get collection() {
        return this.savedCollection;
    }
    set collection(newCollection) {
        this.savedCollection = newCollection;
        this.storage.setItem(this.storageName, JSON.stringify(newCollection));
    }
    remove(id) {
        this.collection = this.collection.filter(model => model.id != id);
    }
    add(item) {
        this.collection = this.collection.concat([item]);
    }
    search(text) {
        return this.collection.filter(model => model.name.indexOf(text) !== -1);
    }
}