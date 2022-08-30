import { NeedAuth } from "../../src/NeedAuth"

const handler = (req, res) => {
  res.send({
    content:
      "Yey!",
  })
};

export default NeedAuth(handler);
