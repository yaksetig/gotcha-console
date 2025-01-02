export type ApiKey = {
  siteKey: string;
  secretKey: string;
  label: string | null;
};

export type Application = {
  id: string;
  name?: string;
};
