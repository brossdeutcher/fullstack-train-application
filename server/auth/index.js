const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { setRandomFallback } = require("bcryptjs");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// require("dotenv")
// const { route } = require(".");

// register a user
router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await prisma.user.create({
      data: req.body
    });
    if (result) {
      const token = jwt.sign({ id: result.id}, "secretString" );
      res.status(201).send({token});
      // res.send(user);
    } else {
      res.send({error: true, message: "could not add user"});
    }
  } catch (err) {
    res.send(err.message);
  }
});

// TODO: sign in as a user
router.post('/signin', async (req, res) => {
  const {username, password} = req.body;
  const user = await prisma.user.findUnique({
    where: {username: username}
  });
  if (user) {
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.send(user);
    }
  } else {
    res.send("invalid login");
  }
});

module.exports = router;