const SysStorage = (name: string) => {
  return {
    async get() {
      return localStorage.getItem(name);
    },
    async set(value: string) {
      localStorage.setItem(name, value);
    },
    async remove() {
      localStorage.removeItem(name);
    },
  };
};

export default SysStorage;
