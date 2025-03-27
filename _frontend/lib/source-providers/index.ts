import { GitHubSourceProvider } from "./GitHubSourceProvider";
import { GoogleDriveSourceProvider } from "./GoogleDriveSourceProvider";
import { LocalStorageSourceProvider } from "./LocalStorageSourceProvider";
import {
  SourceProvider,
  SourceProviderConfig,
  SourceProviderConstructor,
  SourceProviderKey,
} from "./SourceProvider";

export const sourceProviders: SourceProviderConstructor<SourceProvider>[] = [
  LocalStorageSourceProvider,
  GitHubSourceProvider,
  GoogleDriveSourceProvider,
];

class SourceProviderError extends Error {}

class UnknownSourceProviderError extends SourceProviderError {}

export const getSourceProviderInstanceById = (
  sourceProviderId: SourceProviderKey,
  config: SourceProviderConfig | null
) => {
  const SourceProviderClass = sourceProviders.find(
    (Provider) => Provider.id === sourceProviderId
  );

  if (!(SourceProviderClass instanceof SourceProvider)) {
    throw new UnknownSourceProviderError(
      `Unknown Source Provider with id '${sourceProviderId}'`
    );
  }

  return new SourceProviderClass(config);
};
