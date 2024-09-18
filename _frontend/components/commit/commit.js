window.commit = () => {
  return {
    message: null,
    useDeleteOld: false,
    deleteOld: false,

    init() {
      this.message = this.getFromLocation("message");
      this.useDeleteOld = this.getFromLocation("useDeleteOld") === "1";
    },

    getFromLocation(name) {
      return new URL(location.href).searchParams.get(name);
    },

    submit() {
      const formData = new FormData(this.$root);
      const skip = formData.get("skip") === "1";
      const deleteOld = formData.get("deleteOld");

      const message = [skip ? "[skip ci]" : "", formData.get("message")]
        .filter((segment) => segment !== "")
        .join(" ");

      parent.postMessage("modal:close", "*");

      parent.postMessage(
        `reprose:commit?${new URLSearchParams({ message, deleteOld })}`,
        "*",
      );
    },
  };
};
