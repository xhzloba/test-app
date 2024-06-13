import {DataItem} from "../types.ts";

export class DataService {
    static async fetchData(): Promise<DataItem[]> {
        const data = await import("../data/data.json");
        return data.default;
    }
}
