import strftime from "strftime";
import { parse } from "yaml";

const DEFAULT_FIELDS_TYPES = [
  "text",
  "multiline",
  "datetime",
  "date",
  "select",
  "multiselect",
];

export function configFns(configYaml) {
  const data = parse(configYaml) ?? {
    fields: [
      {
        name: "title",
        type: "text",
      },
      {
        name: "description",
        type: "multiline",
      },
      {
        name: "date",
        type: "date",
        defaultValue: "%Y-%m-%d",
      },
    ],
  };

  return {
    getDefaultAttributes() {
      return data.fields.reduce((attributes, { name, defaultValue }) => {
        attributes[name] = strftime(defaultValue ?? "");

        return attributes;
      }, {});
    },

    getAttributesFields(attributes = {}) {
      const fields = data.fields.map((field) => {
        return {
          ...field,
          type: DEFAULT_FIELDS_TYPES.includes(field.type) ? field.type : "text",
          value: attributes[field.name] ?? "",
          values: data?.values?.[field.name] ?? [],
        };
      });

      Object.entries(attributes)
        .sort(([keyA], [keyB]) =>
          keyA !== "" && keyB === ""
            ? -1
            : keyA === "" && keyB !== ""
              ? 1
              : keyA.localeCompare(keyB),
        )
        .forEach(([name, value]) => {
          const field = fields.find((field) => field.name === name);

          if (!field) {
            fields.push({
              name,
              type: "text",
              value,
            });
          }
        });

      return fields;
    },

    formatAttributes(
      attributes,
      multiselectAsArray = false,
      removeEmpty = false,
    ) {
      return Object.entries(attributes)
        .filter(
          ([key, value]) =>
            !removeEmpty ||
            (String(key).trim() !== "" && String(value).trim() !== ""),
        )
        .reduce((attributes, [name, value]) => {
          const field = data.fields.find((field) => field.name === name);

          if (field?.type === "multiselect") {
            if (multiselectAsArray) {
              attributes[name] = String(value)
                .split(",")
                .map((value) => value.trim())
                .filter((value) => value !== "");
            } else {
              attributes[name] = String(value)
                .split(",")
                .map((value) => value.trim())
                .filter((value) => value !== "")
                .join(", ");
            }
          } else {
            attributes[name] = String(value);
          }

          return attributes;
        }, {});
    },
  };
}
