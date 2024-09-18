window.commit = () => {
  return {
    message: null,

    init() {
      this.message = this.getMessageFromLocation();
    },

    getMessageFromLocation() {
      return new URL(location.href).searchParams.get("message");
    },

    submit() {
      const formData = new FormData(this.$root);
      const skip = formData.get("skip") === "1";

      const message = [skip ? "[skip ci]" : "", formData.get("message")]
        .filter((segment) => segment !== "")
        .join(" ");

      parent.postMessage("modal:close", "*");

      parent.postMessage(
        `reprose:commit?${new URLSearchParams({ message })}`,
        "*",
      );
    },
  };
};
