import { z } from "zod";

const envSchema = z.object({
  AUTH0_SECRET: z.string().min(1),
  AUTH0_BASE_URL: z.string().url(),
  AUTH0_ISSUER_BASE_URL: z.string().url(),
  AUTH0_CLIENT_ID: z.string().min(1),
  AUTH0_CLIENT_SECRET: z.string().min(1),
  AUTH0_AUDIENCE: z.string(),
  GOTCHA_ORIGIN: z.string().url(),
});

type EnvVariables = z.infer<typeof envSchema>;

function validateEnv(): EnvVariables {
  try {
    return envSchema.parse({
      AUTH0_SECRET: process.env.AUTH0_SECRET,
      AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
      AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      GOTCHA_ORIGIN: process.env.GOTCHA_ORIGIN,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => {
        return `${err.path.join(".")}: ${err.message}`;
      });
      throw new Error(
        `Environment validation failed:\n${errorMessages.join("\n")}`,
      );
    }
    throw error;
  }
}

const env = validateEnv();

export const {
  AUTH0_SECRET,
  AUTH0_BASE_URL,
  AUTH0_ISSUER_BASE_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
  GOTCHA_ORIGIN,
} = env;

export default env;
