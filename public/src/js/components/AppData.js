export class AppData {
    static data = {};
    static dataName = 'AppData';

    static loadData() {
        const storedData = window.localStorage.getItem(AppData.dataName);
        const jsonData = JSON.parse(storedData);

        AppData.data = jsonData || {};
    }

    static saveData() {
        const stringData = JSON.stringify(AppData.data);

        window.localStorage.setItem(AppData.dataName, stringData);
    }
}