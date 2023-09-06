export const configValues: ConfigValuesInterface = {
  NEXT_PUBLIC_AUTH_URL: "http://localhost:3000",
  DB_URI:
    "mongodb+srv://marina:zudkyH-nyjwox-1merca@cluster0.yvftlkf.mongodb.net/",
  NEXTAUTH_SECRET: "secret",
};

export interface ConfigValuesInterface {
  NEXT_PUBLIC_AUTH_URL: string | undefined;
  DB_URI: string | undefined;
  NEXTAUTH_SECRET: string | undefined;
}
