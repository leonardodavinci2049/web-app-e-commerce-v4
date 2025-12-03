// Next.js automaticamente carrega variáveis do .env
// Não precisamos mais do dotenv/config

import { z } from "zod";

const envsSchema = z.object({
  APP_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("APP_PORT must be a positive number")),

  // API Externa
  EXTERNAL_API_MAIN_URL: z
    .string()
    .url("EXTERNAL_API_MAIN_URL must be a valid URL"),
  EXTERNAL_API_ASSETS_URL: z
    .string()
    .url("EXTERNAL_API_ASSETS_URL must be a valid URL"),

  // System
  APP_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("APP_ID must be a positive number")),
  SYSTEM_CLIENT_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("SYSTEM_CLIENT_ID must be a positive number")),
  STORE_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("STORE_ID must be a positive number")),

  // Organization/Member/User IDs
  ORGANIZATION_ID: z.string().min(1, "ORGANIZATION_ID is required"),
  MEMBER_ID: z.string().min(1, "MEMBER_ID is required"),
  USER_ID: z.string().min(1, "USER_ID is required"),
  PERSON_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("PERSON_ID must be a positive number")),

  TYPE_BUSINESS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("TYPE_BUSINESS must be a positive number")),

  // INFO COMPANY - Variáveis públicas da empresa (disponíveis no cliente)
  NEXT_PUBLIC_COMPANY_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_NAME is required"),
  NEXT_PUBLIC_COMPANY_PHONE: z
    .string()
    .regex(
      /^\(\d{2}\) \d{4}-\d{4}$/,
      "NEXT_PUBLIC_COMPANY_PHONE must be in format (XX) XXXX-XXXX",
    ),
  NEXT_PUBLIC_COMPANY_EMAIL: z
    .string()
    .email("NEXT_PUBLIC_COMPANY_EMAIL must be a valid email"),
  NEXT_PUBLIC_COMPANY_WHATSAPP: z
    .string()
    .regex(
      /^55\d{11}$/,
      "NEXT_PUBLIC_COMPANY_WHATSAPP must be in format 55XXXXXXXXXXX (country code + area code + number)",
    ),
  NEXT_PUBLIC_COMPANY_ADDRESS: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_ADDRESS is required"),
  NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION is required"),
  NEXT_PUBLIC_COMPANY_OPENING_HOURS: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_OPENING_HOURS is required"),
  NEXT_PUBLIC_COMPANY_OPENING_SATURDAY: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_OPENING_SATURDAY is required"),

  // INFO DEVELOPER
  NEXT_PUBLIC_DEVELOPER_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_DEVELOPER_NAME is required"),
  NEXT_PUBLIC_DEVELOPER_URL: z
    .string()
    .url("NEXT_PUBLIC_DEVELOPER_URL must be a valid URL"),

  // Email Sender
  EMAIL_SENDER_NAME: z.string().min(1, "EMAIL_SENDER_NAME is required"),
  EMAIL_SENDER_ADDRESS: z
    .string()
    .email("EMAIL_SENDER_ADDRESS must be a valid email"),

  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Security
  API_KEY: z.string().min(1, "API_KEY is required"),
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),

  // Resend Email Configuration
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),

  // Home Page Categories
  HOME_CATEGORY1_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("HOME_CATEGORY1_ID must be a positive number")),
  HOME_CATEGORY2_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("HOME_CATEGORY2_ID must be a positive number")),
  HOME_CATEGORY3_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("HOME_CATEGORY3_ID must be a positive number")),
  HOME_CATEGORY4_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("HOME_CATEGORY4_ID must be a positive number")),
  HOME_CATEGORY5_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("HOME_CATEGORY5_ID must be a positive number")),
  HOME_SECTION_1_TITLE: z.string().min(1, "HOME_SECTION_1_TITLE is required"),
  HOME_SECTION_2_TITLE: z.string().min(1, "HOME_SECTION_2_TITLE is required"),
  HOME_SECTION_3_TITLE: z.string().min(1, "HOME_SECTION_3_TITLE is required"),
  HOME_SECTION_4_TITLE: z.string().min(1, "HOME_SECTION_4_TITLE is required"),
  HOME_SECTION_5_TITLE: z.string().min(1, "HOME_SECTION_5_TITLE is required"),
  HOME_SECTION_6_TITLE: z.string().min(1, "HOME_SECTION_6_TITLE is required"),
});

// Inferir o tipo automaticamente a partir do schema
type EnvVars = z.infer<typeof envsSchema>;

// ✅ Só executar validação no servidor, nunca no cliente
let envVars: EnvVars;

// Para prevenir problemas de hidratação, vamos criar um schema separado para variáveis públicas
const publicEnvSchema = z.object({
  NEXT_PUBLIC_COMPANY_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_NAME is required"),
  NEXT_PUBLIC_COMPANY_PHONE: z
    .string()
    .regex(
      /^\(\d{2}\) \d{4}-\d{4}$/,
      "NEXT_PUBLIC_COMPANY_PHONE must be in format (XX) XXXX-XXXX",
    ),
  NEXT_PUBLIC_COMPANY_EMAIL: z
    .string()
    .email("NEXT_PUBLIC_COMPANY_EMAIL must be a valid email"),
  NEXT_PUBLIC_COMPANY_WHATSAPP: z
    .string()
    .regex(
      /^55\d{11}$/,
      "NEXT_PUBLIC_COMPANY_WHATSAPP must be in format 55XXXXXXXXXXX (country code + area code + number)",
    ),
  NEXT_PUBLIC_COMPANY_ADDRESS: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_ADDRESS is required"),
  NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION is required"),
  NEXT_PUBLIC_COMPANY_OPENING_HOURS: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_OPENING_HOURS is required"),
  NEXT_PUBLIC_COMPANY_OPENING_SATURDAY: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_OPENING_SATURDAY is required"),
  NEXT_PUBLIC_DEVELOPER_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_DEVELOPER_NAME is required"),
  NEXT_PUBLIC_DEVELOPER_URL: z
    .string()
    .url("NEXT_PUBLIC_DEVELOPER_URL must be a valid URL"),
});

if (typeof window === "undefined") {
  // Estamos no servidor - fazer validação completa
  const validationResult = envsSchema.safeParse(process.env);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join("\n");
    throw new Error(`❌ Invalid environment variables:\n${errorMessages}`);
  }

  envVars = validationResult.data;
} else {
  // Estamos no cliente - validar apenas variáveis públicas para garantir consistência
  const publicValidationResult = publicEnvSchema.safeParse(process.env);

  if (!publicValidationResult.success) {
    console.warn(
      "⚠️ Some public environment variables are missing on client:",
      publicValidationResult.error.issues.map((issue) => issue.path.join(".")),
    );
  }

  const publicVars = publicValidationResult.success
    ? publicValidationResult.data
    : {
        NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || "",
        NEXT_PUBLIC_COMPANY_PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE || "",
        NEXT_PUBLIC_COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "",
        NEXT_PUBLIC_COMPANY_WHATSAPP:
          process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || "",
        NEXT_PUBLIC_COMPANY_ADDRESS:
          process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "",
        NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION:
          process.env.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION || "",
        NEXT_PUBLIC_COMPANY_OPENING_HOURS:
          process.env.NEXT_PUBLIC_COMPANY_OPENING_HOURS || "",
        NEXT_PUBLIC_COMPANY_OPENING_SATURDAY:
          process.env.NEXT_PUBLIC_COMPANY_OPENING_SATURDAY || "",
        NEXT_PUBLIC_DEVELOPER_NAME:
          process.env.NEXT_PUBLIC_DEVELOPER_NAME || "",
        NEXT_PUBLIC_DEVELOPER_URL: process.env.NEXT_PUBLIC_DEVELOPER_URL || "",
      };

  // Usar valores vazios ou default para variáveis privadas no cliente
  envVars = {
    APP_PORT: 0,
    EXTERNAL_API_MAIN_URL: "",
    EXTERNAL_API_ASSETS_URL: "",
    APP_ID: 0,
    SYSTEM_CLIENT_ID: 0,
    STORE_ID: 0,
    ORGANIZATION_ID: "",
    MEMBER_ID: "",
    USER_ID: "",
    PERSON_ID: 0,
    TYPE_BUSINESS: 0,

    // Usar as variáveis públicas validadas
    ...publicVars,

    EMAIL_SENDER_NAME: "",
    EMAIL_SENDER_ADDRESS: "",
    DATABASE_URL: "",
    API_KEY: "",
    BETTER_AUTH_SECRET: "",
    BETTER_AUTH_URL: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_CLIENT_SECRET: "",
    RESEND_API_KEY: "",
    HOME_CATEGORY1_ID: 0,
    HOME_CATEGORY2_ID: 0,
    HOME_CATEGORY3_ID: 0,
    HOME_CATEGORY4_ID: 0,
    HOME_CATEGORY5_ID: 0,
    HOME_SECTION_1_TITLE: "",
    HOME_SECTION_2_TITLE: "",
    HOME_SECTION_3_TITLE: "",
    HOME_SECTION_4_TITLE: "",
    HOME_SECTION_5_TITLE: "",
    HOME_SECTION_6_TITLE: "",
  };
}

export const envs = {
  APP_PORT: envVars.APP_PORT,

  // API Externa
  EXTERNAL_API_MAIN_URL: envVars.EXTERNAL_API_MAIN_URL,
  EXTERNAL_API_ASSETS_URL: envVars.EXTERNAL_API_ASSETS_URL,

  // System
  APP_ID: envVars.APP_ID,
  SYSTEM_CLIENT_ID: envVars.SYSTEM_CLIENT_ID,
  STORE_ID: envVars.STORE_ID,

  // Organization/Member/User IDs
  ORGANIZATION_ID: envVars.ORGANIZATION_ID,
  MEMBER_ID: envVars.MEMBER_ID,
  USER_ID: envVars.USER_ID,
  PERSON_ID: envVars.PERSON_ID,

  TYPE_BUSINESS: envVars.TYPE_BUSINESS,

  // INFO COMPANY
  NEXT_PUBLIC_COMPANY_NAME: envVars.NEXT_PUBLIC_COMPANY_NAME,
  NEXT_PUBLIC_COMPANY_PHONE: envVars.NEXT_PUBLIC_COMPANY_PHONE,
  NEXT_PUBLIC_COMPANY_EMAIL: envVars.NEXT_PUBLIC_COMPANY_EMAIL,
  NEXT_PUBLIC_COMPANY_WHATSAPP: envVars.NEXT_PUBLIC_COMPANY_WHATSAPP,
  NEXT_PUBLIC_COMPANY_ADDRESS: envVars.NEXT_PUBLIC_COMPANY_ADDRESS,
  NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION:
    envVars.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION,
  NEXT_PUBLIC_COMPANY_OPENING_HOURS: envVars.NEXT_PUBLIC_COMPANY_OPENING_HOURS,
  NEXT_PUBLIC_COMPANY_OPENING_SATURDAY:
    envVars.NEXT_PUBLIC_COMPANY_OPENING_SATURDAY,

  // INFO DEVELOPER
  NEXT_PUBLIC_DEVELOPER_NAME: envVars.NEXT_PUBLIC_DEVELOPER_NAME,
  NEXT_PUBLIC_DEVELOPER_URL: envVars.NEXT_PUBLIC_DEVELOPER_URL,

  // Email Sender
  EMAIL_SENDER_NAME: envVars.EMAIL_SENDER_NAME,
  EMAIL_SENDER_ADDRESS: envVars.EMAIL_SENDER_ADDRESS,

  // Database
  DATABASE_URL: envVars.DATABASE_URL,

  // Security
  API_KEY: envVars.API_KEY,
  BETTER_AUTH_SECRET: envVars.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: envVars.BETTER_AUTH_URL,

  // Google OAuth
  GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: envVars.GOOGLE_CLIENT_SECRET,

  // Resend Email Configuration
  RESEND_API_KEY: envVars.RESEND_API_KEY,

  // Home Page Categories
  HOME_CATEGORY1_ID: envVars.HOME_CATEGORY1_ID,
  HOME_CATEGORY2_ID: envVars.HOME_CATEGORY2_ID,
  HOME_CATEGORY3_ID: envVars.HOME_CATEGORY3_ID,
  HOME_CATEGORY4_ID: envVars.HOME_CATEGORY4_ID,
  HOME_CATEGORY5_ID: envVars.HOME_CATEGORY5_ID,

  // Home Page Sections Titles
  HOME_SECTION_1_TITLE: envVars.HOME_SECTION_1_TITLE,
  HOME_SECTION_2_TITLE: envVars.HOME_SECTION_2_TITLE,
  HOME_SECTION_3_TITLE: envVars.HOME_SECTION_3_TITLE,
  HOME_SECTION_4_TITLE: envVars.HOME_SECTION_4_TITLE,
  HOME_SECTION_5_TITLE: envVars.HOME_SECTION_5_TITLE,
  HOME_SECTION_6_TITLE: envVars.HOME_SECTION_6_TITLE,
};
