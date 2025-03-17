export type SourceProviderAuthData = {
  token: string;
};

export type SourceProviderPath = string;

export type SourceProviderItemHeader = {
  name: string;
  path: SourceProviderPath;
};

export type SourceProviderItemBody = {
  contents: string;
};

export abstract class SourceProvider<
  TAuthData extends SourceProviderAuthData = SourceProviderAuthData,
  TPath extends SourceProviderPath = SourceProviderPath,
  TItemHeader extends SourceProviderItemHeader = SourceProviderItemHeader,
  TItemBody extends SourceProviderItemBody = SourceProviderItemBody
> {
  abstract getName(): string;

  abstract auth(): TAuthData | null;

  abstract getItems(): TItemHeader[];

  abstract getItem(path: TPath): TItemHeader & TItemBody;

  abstract storeItem(path: TPath, body: TItemBody): void;

  abstract moveItem(oldPath: TPath, newPath: TPath): void;

  abstract deleteItem(path: TPath): void;
}

export class AuthFailedError extends Error {}

export class GetListFailedError extends Error {}

export class GetItemFailedError extends Error {}

export class StoreItemFailedError extends Error {}

export class RenameItemFailedError extends Error {}

export class MoveItemFailedError extends Error {}

export class DeleteItemFailedError extends Error {}
