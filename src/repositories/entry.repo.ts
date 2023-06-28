import Entry from "../db/models/entry";
import { IEntry } from "../dtos/entry.dto";

export default class EntryRepo {
  static async addEntry(entry: IEntry) {
    try {
      const newEntry = await Entry.create({ ...entry });
      return newEntry.toJSON();
    } catch (error) {
      throw error;
    }
  }

  static async getEntries(): Promise<IEntry[]> {
    const entries = await Entry.findAll();
    const entryList = entries.map(entry => entry.toJSON() as IEntry);
    return entryList;
  }
}
