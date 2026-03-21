import {
  Beatmap,
  File,
  BeatmapSet,
  KeyBinding,
  Ruleset,
  BeatmapDifficulty,
  BeatmapMetadata,
  RealmNamedFileUsage,
  RealmUser,
  BeatmapUserSettings,
} from "./scheme";
import Realm from "realm";

export class LazerDatabase {
  private _connection: Realm | null;
  private _databasePath: string;

  constructor(path: string) {
    this._connection = null;
    this._databasePath = path;
  }

  public async open(): Promise<void> {
    try {
      this._connection = await Realm.open({
        path: this._databasePath,
        schema: [
          BeatmapSet,
          File,
          Beatmap,
          KeyBinding,
          Ruleset,
          BeatmapDifficulty,
          BeatmapMetadata,
          RealmNamedFileUsage,
          RealmUser,
          BeatmapUserSettings,
        ],
        schemaVersion: 51,
      });
    } catch (error) {
      console.error('Failed to open Realm database:', error);
      throw error;
    }
  }

  public get connection(): Realm | null {
    return this._connection;
  }
}

