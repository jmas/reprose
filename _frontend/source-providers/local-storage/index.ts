import {
  SourceProvider,
  type SourceProviderAuthData,
  type SourceProviderItemBody,
  type SourceProviderItemHeader,
  type SourceProviderPath,
} from "../SourceProvider";

export default class LocalStorageProvider extends SourceProvider {
  getName(): string {
    return "Local Storage";
  }

  auth(): SourceProviderAuthData | null {
    return null;
  }

  getItems(): SourceProviderItemHeader[] {
    return [];
  }

  getItem(
    path: SourceProviderPath
  ): SourceProviderItemHeader & SourceProviderItemBody {
    return {
      name: "",
      path: "",
      contents: "",
    };
  }

  storeItem(path: SourceProviderPath, body: SourceProviderItemBody): void {}

  moveItem(oldPath: SourceProviderPath, newPath: SourceProviderPath): void {}

  deleteItem(path: SourceProviderPath): void {}
}
