const initialCats = [
    {
        id: '1',
        name: 'Category #1',
        number: '5'
    },
    {
        id: '2',
        name: 'Category #2',
        number: '55'
    }
];

export default class {
    constructor(storage) {
        this.storage = storage;
        this.storageName = 'categories';
        const savedCollection = storage.getItem(this.storageName);
        this.collection = savedCollection ? JSON.parse(savedCollection) : initialCats;
    }
    get() {
        return this.collection;
    }
    save() {
        this.storage.setItem(this.storageName, JSON.stringify(this.collection));
    }
    remove(id) {
        this.collection = this.collection.filter(model => model.id != id);
        this.save();
    }
    add(item) {
        this.collection = this.collection.concat([item]);
        this.save();
    }
    search(text) {
        return this.collection.filter(model =>
            model.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    }
}