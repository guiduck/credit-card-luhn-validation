import { log } from "@repo/logger";
import app from "./app";

const port = process.env.PORT || 5001;

app.listen(port, () => {
  log(`api running on ${port}`);
});
