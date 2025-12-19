// Next.js automaticamente carrega variáveis do .env
// Não precisamos mais do dotenv/config

import { z } from "zod";

const envsSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("PORT must be a positive number")),

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
      /^\(\d{2}\) \d{5} \d{4}$/,
      "NEXT_PUBLIC_COMPANY_PHONE must be in format (XX) XXXXX XXXX",
    ),
  NEXT_PUBLIC_COMPANY_EMAIL: z
    .string()
    .email("NEXT_PUBLIC_COMPANY_EMAIL must be a valid email"),
  NEXT_PUBLIC_COMPANY_WHATSAPP: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5} \d{4}$/,
      "NEXT_PUBLIC_COMPANY_WHATSAPP must be in format (XX) XXXXX XXXX",
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
  NEXT_PUBLIC_COMPANY_ABOUT: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_ABOUT is required"),
  NEXT_PUBLIC_COMPANY_CNPJ: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CNPJ is required"),
  NEXT_PUBLIC_COMPANY_INVITATION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_INVITATION is required"),
  NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION is required"),
  NEXT_PUBLIC_COMPANY_QT_PRODUCTS: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_QT_PRODUCTS is required"),
  NEXT_PUBLIC_COMPANY_MAPS_URL: z
    .string()
    .url("NEXT_PUBLIC_COMPANY_MAPS_URL must be a valid URL"),
  NEXT_PUBLIC_COMPANY_SLOGAN1: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN1 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN2: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN2 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN3: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN3 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN4: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN4 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN5: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN5 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION1: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION1 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION2: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION2 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION3: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION3 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION4: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION4 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION5: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION5 is required"),
  NEXT_PUBLIC_COMPANY_META_TITLE_MAIN: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_META_TITLE_MAIN is required"),
  NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION is required"),
  NEXT_PUBLIC_COMPANY_META_DESCRIPTION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_META_DESCRIPTION is required"),

  // Payment & Shipping
  NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT must be a positive number"),
    ),
  NEXT_PUBLIC_PAY_IN_UP_TO: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().positive("NEXT_PUBLIC_PAY_IN_UP_TO must be a positive number"),
    ),
  NEXT_PUBLIC_FREE_SHIPPING_OVER: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(
      z
        .number()
        .min(0, "NEXT_PUBLIC_FREE_SHIPPING_OVER must be a positive number"),
    ),

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
  HOME_CATEGORY6_ID: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("HOME_CATEGORY6_ID must be a positive number")),
  HOME_SECTION_1_TITLE: z.string().min(1, "HOME_SECTION_1_TITLE is required"),
  HOME_SECTION_2_TITLE: z.string().min(1, "HOME_SECTION_2_TITLE is required"),
  HOME_SECTION_3_TITLE: z.string().min(1, "HOME_SECTION_3_TITLE is required"),
  HOME_SECTION_4_TITLE: z.string().min(1, "HOME_SECTION_4_TITLE is required"),
  HOME_SECTION_5_TITLE: z.string().min(1, "HOME_SECTION_5_TITLE is required"),
  HOME_SECTION_6_TITLE: z.string().min(1, "HOME_SECTION_6_TITLE is required"),
  HOME_SECTION_7_TITLE: z.string().min(1, "HOME_SECTION_7_TITLE is required"),
  HOME_SECTION_8_TITLE: z.string().min(1, "HOME_SECTION_8_TITLE is required"),
  HOME_SECTION_9_TITLE: z.string().min(1, "HOME_SECTION_9_TITLE is required"),
  HOME_SECTION_10_TITLE: z.string().min(1, "HOME_SECTION_10_TITLE is required"),
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
      /^\(\d{2}\) \d{5} \d{4}$/,
      "NEXT_PUBLIC_COMPANY_PHONE must be in format (XX) XXXXX XXXX",
    ),
  NEXT_PUBLIC_COMPANY_EMAIL: z
    .string()
    .email("NEXT_PUBLIC_COMPANY_EMAIL must be a valid email"),
  NEXT_PUBLIC_COMPANY_WHATSAPP: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5} \d{4}$/,
      "NEXT_PUBLIC_COMPANY_WHATSAPP must be in format (XX) XXXXX XXXX",
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
  NEXT_PUBLIC_COMPANY_ABOUT: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_ABOUT is required"),
  NEXT_PUBLIC_COMPANY_CNPJ: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CNPJ is required"),
  NEXT_PUBLIC_COMPANY_INVITATION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_INVITATION is required"),
  NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION is required"),
  NEXT_PUBLIC_COMPANY_QT_PRODUCTS: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_QT_PRODUCTS is required"),
  NEXT_PUBLIC_COMPANY_MAPS_URL: z
    .string()
    .url("NEXT_PUBLIC_COMPANY_MAPS_URL must be a valid URL"),
  NEXT_PUBLIC_COMPANY_SLOGAN1: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN1 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN2: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN2 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN3: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN3 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN4: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN4 is required"),
  NEXT_PUBLIC_COMPANY_SLOGAN5: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_SLOGAN5 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION1: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION1 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION2: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION2 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION3: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION3 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION4: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION4 is required"),
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION5: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_CALLTO_ACTION5 is required"),
  NEXT_PUBLIC_COMPANY_META_TITLE_MAIN: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_META_TITLE_MAIN is required"),
  NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION is required"),
  NEXT_PUBLIC_COMPANY_META_DESCRIPTION: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_META_DESCRIPTION is required"),

  // Payment & Shipping
  NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT must be a positive number"),
    ),
  NEXT_PUBLIC_PAY_IN_UP_TO: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().positive("NEXT_PUBLIC_PAY_IN_UP_TO must be a positive number"),
    ),
  NEXT_PUBLIC_FREE_SHIPPING_OVER: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(
      z
        .number()
        .min(0, "NEXT_PUBLIC_FREE_SHIPPING_OVER must be a positive number"),
    ),
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
        NEXT_PUBLIC_COMPANY_ABOUT: process.env.NEXT_PUBLIC_COMPANY_ABOUT || "",
        NEXT_PUBLIC_COMPANY_CNPJ: process.env.NEXT_PUBLIC_COMPANY_CNPJ || "",
        NEXT_PUBLIC_COMPANY_INVITATION:
          process.env.NEXT_PUBLIC_COMPANY_INVITATION || "",
        NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION:
          process.env.NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION || "",
        NEXT_PUBLIC_COMPANY_QT_PRODUCTS:
          process.env.NEXT_PUBLIC_COMPANY_QT_PRODUCTS || "",
        NEXT_PUBLIC_COMPANY_MAPS_URL:
          process.env.NEXT_PUBLIC_COMPANY_MAPS_URL || "",

        NEXT_PUBLIC_COMPANY_SLOGAN1:
          process.env.NEXT_PUBLIC_COMPANY_SLOGAN1 || "",
        NEXT_PUBLIC_COMPANY_SLOGAN2:
          process.env.NEXT_PUBLIC_COMPANY_SLOGAN2 || "",
        NEXT_PUBLIC_COMPANY_SLOGAN3:
          process.env.NEXT_PUBLIC_COMPANY_SLOGAN3 || "",
        NEXT_PUBLIC_COMPANY_SLOGAN4:
          process.env.NEXT_PUBLIC_COMPANY_SLOGAN4 || "",
        NEXT_PUBLIC_COMPANY_SLOGAN5:
          process.env.NEXT_PUBLIC_COMPANY_SLOGAN5 || "",

        NEXT_PUBLIC_COMPANY_CALLTO_ACTION1:
          process.env.NEXT_PUBLIC_COMPANY_CALLTO_ACTION1 || "",
        NEXT_PUBLIC_COMPANY_CALLTO_ACTION2:
          process.env.NEXT_PUBLIC_COMPANY_CALLTO_ACTION2 || "",
        NEXT_PUBLIC_COMPANY_CALLTO_ACTION3:
          process.env.NEXT_PUBLIC_COMPANY_CALLTO_ACTION3 || "",
        NEXT_PUBLIC_COMPANY_CALLTO_ACTION4:
          process.env.NEXT_PUBLIC_COMPANY_CALLTO_ACTION4 || "",
        NEXT_PUBLIC_COMPANY_CALLTO_ACTION5:
          process.env.NEXT_PUBLIC_COMPANY_CALLTO_ACTION5 || "",

        NEXT_PUBLIC_COMPANY_META_TITLE_MAIN:
          process.env.NEXT_PUBLIC_COMPANY_META_TITLE_MAIN || "",
        NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION:
          process.env.NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION || "",
        NEXT_PUBLIC_COMPANY_META_DESCRIPTION:
          process.env.NEXT_PUBLIC_COMPANY_META_DESCRIPTION || "",
        NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT:
          Number(process.env.NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT) || 0,
        NEXT_PUBLIC_PAY_IN_UP_TO:
          Number(process.env.NEXT_PUBLIC_PAY_IN_UP_TO) || 0,
        NEXT_PUBLIC_FREE_SHIPPING_OVER:
          Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_OVER) || 0,
        NEXT_PUBLIC_DEVELOPER_NAME:
          process.env.NEXT_PUBLIC_DEVELOPER_NAME || "",
        NEXT_PUBLIC_DEVELOPER_URL: process.env.NEXT_PUBLIC_DEVELOPER_URL || "",
      };

  // Usar valores vazios ou default para variáveis privadas no cliente
  envVars = {
    PORT: 0,
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
    HOME_CATEGORY6_ID: 0,

    HOME_SECTION_1_TITLE: "",
    HOME_SECTION_2_TITLE: "",
    HOME_SECTION_3_TITLE: "",
    HOME_SECTION_4_TITLE: "",
    HOME_SECTION_5_TITLE: "",
    HOME_SECTION_6_TITLE: "",
    HOME_SECTION_7_TITLE: "",
    HOME_SECTION_8_TITLE: "",
    HOME_SECTION_9_TITLE: "",
    HOME_SECTION_10_TITLE: "",
  };
}

export const envs = {
  PORT: envVars.PORT,

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
  NEXT_PUBLIC_COMPANY_ABOUT: envVars.NEXT_PUBLIC_COMPANY_ABOUT,
  NEXT_PUBLIC_COMPANY_CNPJ: envVars.NEXT_PUBLIC_COMPANY_CNPJ,
  NEXT_PUBLIC_COMPANY_INVITATION: envVars.NEXT_PUBLIC_COMPANY_INVITATION,
  NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION:
    envVars.NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION,
  NEXT_PUBLIC_COMPANY_QT_PRODUCTS: envVars.NEXT_PUBLIC_COMPANY_QT_PRODUCTS,
  NEXT_PUBLIC_COMPANY_MAPS_URL: envVars.NEXT_PUBLIC_COMPANY_MAPS_URL,
  NEXT_PUBLIC_COMPANY_SLOGAN1: envVars.NEXT_PUBLIC_COMPANY_SLOGAN1,
  NEXT_PUBLIC_COMPANY_SLOGAN2: envVars.NEXT_PUBLIC_COMPANY_SLOGAN2,
  NEXT_PUBLIC_COMPANY_SLOGAN3: envVars.NEXT_PUBLIC_COMPANY_SLOGAN3,
  NEXT_PUBLIC_COMPANY_SLOGAN4: envVars.NEXT_PUBLIC_COMPANY_SLOGAN4,
  NEXT_PUBLIC_COMPANY_SLOGAN5: envVars.NEXT_PUBLIC_COMPANY_SLOGAN5,
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION1:
    envVars.NEXT_PUBLIC_COMPANY_CALLTO_ACTION1,
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION2:
    envVars.NEXT_PUBLIC_COMPANY_CALLTO_ACTION2,
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION3:
    envVars.NEXT_PUBLIC_COMPANY_CALLTO_ACTION3,
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION4:
    envVars.NEXT_PUBLIC_COMPANY_CALLTO_ACTION4,
  NEXT_PUBLIC_COMPANY_CALLTO_ACTION5:
    envVars.NEXT_PUBLIC_COMPANY_CALLTO_ACTION5,
  NEXT_PUBLIC_COMPANY_META_TITLE_MAIN:
    envVars.NEXT_PUBLIC_COMPANY_META_TITLE_MAIN,
  NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION:
    envVars.NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION,
  NEXT_PUBLIC_COMPANY_META_DESCRIPTION:
    envVars.NEXT_PUBLIC_COMPANY_META_DESCRIPTION,

  // Payment & Shipping
  NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT: envVars.NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT,
  NEXT_PUBLIC_PAY_IN_UP_TO: envVars.NEXT_PUBLIC_PAY_IN_UP_TO,
  NEXT_PUBLIC_FREE_SHIPPING_OVER: envVars.NEXT_PUBLIC_FREE_SHIPPING_OVER,

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
  HOME_CATEGORY6_ID: envVars.HOME_CATEGORY6_ID,

  // Home Page Sections Titles
  HOME_SECTION_1_TITLE: envVars.HOME_SECTION_1_TITLE,
  HOME_SECTION_2_TITLE: envVars.HOME_SECTION_2_TITLE,
  HOME_SECTION_3_TITLE: envVars.HOME_SECTION_3_TITLE,
  HOME_SECTION_4_TITLE: envVars.HOME_SECTION_4_TITLE,
  HOME_SECTION_5_TITLE: envVars.HOME_SECTION_5_TITLE,
  HOME_SECTION_6_TITLE: envVars.HOME_SECTION_6_TITLE,
  HOME_SECTION_7_TITLE: envVars.HOME_SECTION_7_TITLE,
  HOME_SECTION_8_TITLE: envVars.HOME_SECTION_8_TITLE,
  HOME_SECTION_9_TITLE: envVars.HOME_SECTION_9_TITLE,
  HOME_SECTION_10_TITLE: envVars.HOME_SECTION_10_TITLE,
};
