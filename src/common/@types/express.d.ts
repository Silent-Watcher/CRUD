// biome-ignore lint/style/noNamespace: <explanation>
declare namespace Express {
  interface Request {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    user?: { [key: string]: any };
  }
}
