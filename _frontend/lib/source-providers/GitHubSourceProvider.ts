import {
  SourceProvider,
  SourceProviderContent,
  SourceProviderUnit,
  SourceProviderUnitKey,
} from "./SourceProvider";

export class GitHubSourceProvider extends SourceProvider {
  id = "github";
  name = "GitHub";

  async authorize() {
    return {
      auth_token: "",
    };
  }

  async getOne(id: SourceProviderUnitKey) {
    const data: SourceProviderUnit = {
      id: "",
      content: "",
    };

    return data;
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
