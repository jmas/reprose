import Awesomplete from "awesomplete";
import { Alpine } from "alpinejs";

window.autocomplete = ({ type, values } = { type: "select", values: [] }) => {
  let instance = null;

  return {
    init() {
      if (type === "multiselect") {
        instance = this.initMultiselect(this.$root);
      } else {
        instance = this.initSelect(this.$root);
      }

      this.handleFocus = this.handleFocus.bind(this);

      this.$root.addEventListener("focus", this.handleFocus);

      this.$root.addEventListener("change", (event) => {
        const values = event.target.value
          .split(",")
          .map((word) => word.trim())
          .filter((word) => word !== "");

        values.forEach((word) => {
          if (
            !instance._list.some(
              (item) => item.toLowerCase() === word.toLowerCase(),
            )
          ) {
            instance._list.push(word);
          }
        });

        instance.evaluate();
        event.target.dispatchEvent(
          new CustomEvent("awesomplete-selectcomplete"),
        );
      });
    },

    destroy() {
      this.$root.removeEventListener(this.handleFocus);

      instance.destroy();
    },

    handleFocus() {
      requestAnimationFrame(() => {
        instance.evaluate();
        instance.open();
      });
    },

    initSelect(input) {
      return new Awesomplete(input, {
        minChars: 0,
        list: Alpine.raw(values),
      });
    },

    initMultiselect(input) {
      return new Awesomplete(input, {
        minChars: 0,
        list: Alpine.raw(values),

        filter: function (text, input) {
          return Awesomplete.FILTER_CONTAINS(
            text,
            input
              .split(",")
              .slice(-1)[0]
              .match(/[^,]*$/)[0],
          );
        },

        item: function (text, input) {
          return Awesomplete.ITEM(
            text,
            input
              .split(",")
              .slice(-1)[0]
              .match(/[^,]*$/)[0],
          );
        },

        replace: function (text) {
          var before = this.input.value.match(/^.+,\s*|/)[0];
          this.input.value = before + text + ", ";
        },
      });
    },
  };
};
