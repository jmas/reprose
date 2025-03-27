import {
  BaseRecord,
  CreateParams,
  DataProvider,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from "@refinedev/core";
import { settings } from "./settings";
import { getSourceProviderInstanceById } from "./source-providers";
import { SourceProviderConfig } from "./source-providers/SourceProvider";

export class DataProviderError extends Error {}

export class SourceProviderHasNotBeenSelectedError extends DataProviderError {}

export class SourceProviderHasWrongIdTypeError extends DataProviderError {}

const getSelectedSourceProviderId = async () => {
  const sourceProviderId = await settings.get("selectedSourceProvider.id");

  if (!(typeof sourceProviderId === "string")) {
    throw new SourceProviderHasWrongIdTypeError(
      "Source Provider has wrong ID type"
    );
  }

  if (!sourceProviderId) {
    throw new SourceProviderHasNotBeenSelectedError(
      "Source Provider has not been selected"
    );
  }

  return sourceProviderId;
};

const getSelectedSourceProviderConfig = async () =>
  settings.get<SourceProviderConfig>(
    `selectedSourceProvider.${getSelectedSourceProviderId()}.config`
  );

const getSelectedSourceProvider = async () =>
  getSourceProviderInstanceById(
    await getSelectedSourceProviderId(),
    await getSelectedSourceProviderConfig()
  );

export const dataProvider = (): DataProvider => ({
  getOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
    meta,
  }: GetOneParams) => {
    return {
      data: (await (
        await getSelectedSourceProvider()
      ).getOne("")) as unknown as TData,
    };
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = object>({
    resource,
    id,
    variables,
    meta,
  }: UpdateParams<TVariables>) => {
    return {
      data: (await (
        await getSelectedSourceProvider()
      ).update(id, "")) as unknown as TData,
    };
  },

  create: async <TData extends BaseRecord = BaseRecord, TVariables = object>({
    resource,
    variables,
    meta,
  }: CreateParams<TVariables>) => {
    return {
      data: (await (
        await getSelectedSourceProvider()
      ).create("", "")) as unknown as TData,
    };
  },

  deleteOne: async <
    TData extends BaseRecord = BaseRecord,
    TVariables = object
  >({
    resource,
    id,
    variables,
    meta,
  }: DeleteOneParams<TVariables>) => {
    return {
      data: (await (
        await getSelectedSourceProvider()
      ).deleteOne(id)) as unknown as TData,
    };
  },

  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
    pagination,
    sorters,
    filters,
    meta,
  }: GetListParams) => {
    return {
      data: (await (
        await getSelectedSourceProvider()
      ).getList("")) as unknown as TData,
      total: 0,
    };
  },

  getApiUrl: () => "",
});
