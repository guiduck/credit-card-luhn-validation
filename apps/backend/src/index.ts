import app from "./app";
import { log } from "./utils/logger";

const port = process.env.PORT || 5001;

app.listen(port, () => {
  log(`api running on ${port}`);
});
