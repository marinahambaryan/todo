export const configValues: ConfigValuesInterface = {
  DB_URI:
    "mongodb+srv://marina:zudkyH-nyjwox-1merca@cluster0.yvftlkf.mongodb.net/",
  NEXTAUTH_SECRET: "secret",
};

export interface ConfigValuesInterface {
  DB_URI: string | undefined;
  NEXTAUTH_SECRET: string | undefined;
}
