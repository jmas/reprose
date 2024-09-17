import Awesomplete from "awesomplete";
import { Alpine } from "alpinejs";

window.autocomplete = ({ type, values } = { type: "select", values: [] }) => {
  let awesomeplete = null;

  return {
    init() {
      if (type === "multiselect") {
        awesomeplete = this.initMultiselect(this.$root);
      } else {
        awesomeplete = this.initSelect(this.$root);
      }

      this.handleFocus = this.handleFocus.bind(this);

      this.$root.addEventListener("focus", this.handleFocus);
    },

    destroy() {
      this.$root.removeEventListener(this.handleFocus);

      awesomeplete.destroy();
    },

    handleFocus() {
      requestAnimationFrame(() => {
        awesomeplete.open();
      });
    },

    initSelect(input) {
      return new Awesomplete(input, {
        minChars: -1,
        list: Alpine.raw(values),
      });
    },

    initMultiselect(input) {
      return new Awesomplete(input, {
        minChars: -1,
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
