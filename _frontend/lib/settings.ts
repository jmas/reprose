export type SettingValue =
  | string
  | number
  | Record<string, string | number | Record<string, string | number>>
  | (string | number | Record<string, string | number>)[];

export const settings = {
  async set(key: string, value: SettingValue) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  },

  async get<T extends SettingValue>(key: string): Promise<T | null> {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
};
