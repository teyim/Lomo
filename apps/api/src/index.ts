import { createServer } from "./server";
import { log } from "@repo/logger";

const app = createServer();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(port, () => {
  log(`api running on ${port}`);
});

export default app;