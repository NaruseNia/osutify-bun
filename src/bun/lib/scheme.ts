import Realm from 'realm';

export class Beatmap extends Realm.Object {
  ID!: string; // UUID
  DifficultyName?: string;
  Ruleset!: Ruleset;
  Difficulty!: BeatmapDifficulty;
  Metadata!: BeatmapMetadata;
  BeatmapSet!: BeatmapSet;
  UserSettings!: BeatmapUserSettings;
  Status!: number; // int
  Length!: number; // double
  BPM!: number; // double
  Hash?: string;
  StarRating!: number; // double
  MD5Hash?: string;
  OnlineMD5Hash?: string;
  LastLocalUpdate?: Date;
  LastOnlineUpdate?: Date;
  EditorTimestamp?: number; // double
  EndTimeObjectCount!: number; // int
  TotalObjectCount!: number; // int
  Hidden!: boolean;
  LastPlayed?: Date;
  BeatDivisor!: number; // int
  OnlineID!: number; // int

  static schema: Realm.ObjectSchema = {
    name: 'Beatmap',
    properties: {
      ID: 'uuid',
      DifficultyName: 'string?',
      Ruleset: 'Ruleset',
      Difficulty: 'BeatmapDifficulty',
      Metadata: 'BeatmapMetadata',
      BeatmapSet: 'BeatmapSet',
      UserSettings: 'BeatmapUserSettings',
      Status: 'int',
      Length: 'double',
      BPM: 'double',
      Hash: 'string?',
      StarRating: 'double',
      MD5Hash: 'string?',
      OnlineMD5Hash: 'string?',
      LastLocalUpdate: 'date?',
      LastOnlineUpdate: 'date?',
      EditorTimestamp: 'double?',
      EndTimeObjectCount: 'int',
      TotalObjectCount: 'int',
      Hidden: 'bool',
      LastPlayed: 'date?',
      BeatDivisor: 'int',
      OnlineID: { type: 'int', indexed: true },
    },
    primaryKey: 'ID',
  };
}

export class BeatmapUserSettings extends Realm.Object {
  Offset!: number; // double

  static schema: Realm.ObjectSchema = {
    name: 'BeatmapUserSettings',
    embedded: true,
    properties: {
      Offset: 'double',
    },
  };
}

export class BeatmapDifficulty extends Realm.Object {
  DrainRate!: number; // float
  CircleSize!: number; // float
  OverallDifficulty!: number; // float
  ApproachRate!: number; // float
  SliderMultiplier!: number; // double
  SliderTickRate!: number; // double

  static schema: Realm.ObjectSchema = {
    name: 'BeatmapDifficulty',
    embedded: true,
    properties: {
      DrainRate: 'float',
      CircleSize: 'float',
      OverallDifficulty: 'float',
      ApproachRate: 'float',
      SliderMultiplier: 'double',
      SliderTickRate: 'double',
    },
  };
}

export class BeatmapMetadata extends Realm.Object {
  Title?: string;
  TitleUnicode?: string;
  Artist?: string;
  ArtistUnicode?: string;
  Source?: string;
  Tags?: string;
  PreviewTime!: number; // int
  AudioFile?: string;
  BackgroundFile?: string;
  Author!: RealmUser;
  UserTags?: string[];

  static schema: Realm.ObjectSchema = {
    name: 'BeatmapMetadata',
    properties: {
      Title: 'string?',
      TitleUnicode: 'string?',
      Artist: 'string?',
      ArtistUnicode: 'string?',
      Source: 'string?',
      Tags: 'string?',
      PreviewTime: 'int',
      AudioFile: 'string?',
      BackgroundFile: 'string?',
      Author: 'RealmUser',
      UserTags: {
        type: 'list',
        objectType: 'string',
        optional: true,
      },
    },
  };
}

export class BeatmapSet extends Realm.Object {
  ID!: Realm.BSON.ObjectId; // UUID
  DateAdded!: Date;
  DateSubmitted?: Date;
  DateRanked?: Date;
  Beatmaps!: Beatmap[];
  Files!: RealmNamedFileUsage[];
  DeletePending!: boolean;
  Hash?: string;
  Protected!: boolean;
  OnlineID!: number; // int
  Status!: number; // int

  static schema: Realm.ObjectSchema = {
    name: 'BeatmapSet',
    primaryKey: 'ID',
    properties: {
      ID: 'uuid',
      DateAdded: 'date',
      DateSubmitted: 'date?',
      DateRanked: 'date?',
      Beatmaps: 'Beatmap[]',
      Files: 'RealmNamedFileUsage[]',
      DeletePending: 'bool',
      Hash: 'string?',
      Protected: 'bool',
      OnlineID: { type: 'int', indexed: true },
      Status: 'int',
    },
  };
}

export class File extends Realm.Object<File> {
  Hash?: string;

  static schema: Realm.ObjectSchema = {
    name: 'File',
    primaryKey: 'Hash',
    properties: {
      Hash: 'string?',
    },
  };
}

export class KeyBinding extends Realm.Object {
  ID!: string; // UUID
  Variant?: number; // int
  Action!: number; // int
  KeyCombination?: string;
  RulesetName?: string; // string

  static schema: Realm.ObjectSchema = {
    name: 'KeyBinding',
    primaryKey: 'ID',
    properties: {
      ID: 'uuid',
      Variant: 'int?',
      Action: 'int',
      KeyCombination: 'string?',
      RulesetName: 'string?',
    },
  };
}

export class RealmNamedFileUsage extends Realm.Object {
  File!: File;
  Filename?: string;

  static schema: Realm.ObjectSchema = {
    name: 'RealmNamedFileUsage',
    embedded: true,
    properties: {
      File: 'File',
      Filename: 'string?',
    },
  };
}

export class RealmUser extends Realm.Object {
  CountryCode?: string;
  OnlineID!: number; // int
  Username?: string;

  static schema: Realm.ObjectSchema = {
    name: 'RealmUser',
    embedded: true,
    properties: {
      CountryCode: 'string?',
      OnlineID: 'int',
      Username: 'string?',
    },
  };
}

export class Ruleset extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Ruleset',
    primaryKey: 'ShortName',
    properties: {
      LastAppliedDifficultyVersion: 'int',
      ShortName: 'string?',
      Name: 'string?',
      InstantiationInfo: 'string?',
      Available: 'bool',
      OnlineID: { type: 'int', indexed: true },
    },
  };
}

export class RulesetSetting extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'RulesetSetting',
    properties: {
      Variant: { type: 'int', indexed: true },
      Key: 'string',
      Value: 'string',
      RulesetName: { type: 'string', indexed: true },
    },
  };
}

export class Score extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Score',
    primaryKey: 'ID',
    properties: {
      ID: 'uuid',
      BeatmapInfo: 'Beatmap',
      Ruleset: 'Ruleset',
      Files: 'RealmNamedFileUsage[]',
      Hash: 'string?',
      DeletePending: 'bool',
      TotalScore: 'int',
      MaxCombo: 'int',
      Accuracy: 'double',
      HasReplay: 'bool',
      Date: 'date',
      PP: 'double?',
      OnlineID: { type: 'int', indexed: true },
      User: 'RealmUser',
      Mods: 'string?',
      Statistics: 'string?',
      Rank: 'int',
      Combo: 'int',
    },
  };
}

export class Skin extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Skin',
    primaryKey: 'ID',
    properties: {
      ID: 'uuid',
      Name: 'string?',
      Creator: 'string?',
      InstantiationInfo: 'string?',
      Hash: 'string?',
      Protected: 'bool',
      Files: 'RealmNamedFileUsage[]',
      DeletePending: 'bool',
    },
  };
}
