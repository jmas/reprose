import {
  SourceProvider,
  SourceProviderContent,
  SourceProviderUnitKey,
} from "./SourceProvider";

export class LocalStorageSourceProvider extends SourceProvider {
  id = "localStorage";
  name = "Local Storage";

  async getOne(id: SourceProviderUnitKey) {
    return {
      id: "",
      content: "",
    };
  }

  async update(id: SourceProviderUnitKey, content: SourceProviderContent) {
    return {
      id: "",
      content: "",
    };
  }

  async create(id: SourceProviderUnitKey, content: SourceProviderContent) {
    return {
      id: "",
      content: "",
    };
  }

  async getList(id: SourceProviderUnitKey) {
    return [];
  }

  async deleteOne(id: SourceProviderUnitKey) {
    return {
      id: "",
      content: "",
    };
  }
}
