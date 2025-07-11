export type ApiKey = {
  siteKey: string;
  secretKey: string;
  label: string | null;
};

export type Application = {
  id: string;
  name?: string;
};

export type ChallengePreferences = {
  width: number;
  height: number;
  smallWidth: number;
  smallHeight: number;
  logoUrl: string | null;
};
