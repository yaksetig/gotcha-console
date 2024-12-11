let store = new Map<
  string,
  { name: string; keys: { id: string; siteKey: string; secretKey: string }[] }
>();
store.set("1", {
  name: "Development",
  keys: [
    {
      id: Date.now().toString(),
      siteKey: "site_key_123456789",
      secretKey: "secret_key_987654321",
    },
  ],
});
store.set("2", {
  name: "Production",
  keys: [
    {
      id: (Date.now() + 1).toString(),
      siteKey: "site_key_987654321",
      secretKey: "secret_key_123456789",
    },
  ],
});

export function getStore() {
  return store;
}
