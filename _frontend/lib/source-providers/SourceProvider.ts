export type SourceProviderAuth = Record<string, string | number>;

export type SourceProviderConfig = { auth?: SourceProviderAuth };

export type SourceProviderKey = string;

export type SourceProviderUnitKey = string | number;

export type SourceProviderContent = string;

export type SourceProviderHeader = {
  id?: SourceProviderUnitKey;
};

export type SourceProviderBody = {
  content: SourceProviderContent;
};

export type SourceProviderUnit = SourceProviderHeader & SourceProviderBody;

export abstract class SourceProvider {
  static id: SourceProviderKey;
  static name: string;

  constructor(protected config: SourceProviderConfig | null = null) {}

  authorize?(): Promise<SourceProviderAuth>;

  abstract getOne(id: SourceProviderUnitKey): Promise<SourceProviderUnit>;

  abstract update(
    id: SourceProviderUnitKey,
    content: SourceProviderContent
  ): Promise<SourceProviderUnit>;

  abstract create(
    id: SourceProviderUnitKey,
    content: SourceProviderContent
  ): Promise<SourceProviderUnit>;

  abstract getList(id: SourceProviderUnitKey): Promise<SourceProviderHeader[]>;

  abstract deleteOne(id: SourceProviderUnitKey): Promise<SourceProviderUnit>;
}

export type SourceProviderConstructor<T extends SourceProvider> = {
  new (config: SourceProviderConfig | null): T;
  id: SourceProviderKey;
  name: string;
};
