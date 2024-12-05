export type ApiKey = {
  id: number;
  label: string;
  siteKey: string;
  secretKey: string;
  showSecret: boolean;
};

export type Application = {
  id: number;
  name: string;
  isActive?: boolean;
};
