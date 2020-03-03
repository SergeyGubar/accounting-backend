export class Config implements Readonly<Config> {
  env: string;
  commit: string;
  branch: string;
}
