const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Returns all the trains (with their conductors)
router.get("/", async (req, res) => {
  try {
    const trains = await prisma.train.findMany({
      include: {
        conductors: true,
      },
    });
    res.send(trains);
  } catch (error) {
    res.send(error);
  }
});

//Returns a train with specified id
router.get("/:id", async (req, res) => {
  try {
    const train = await prisma.train.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!train) {
      res.send({ error: true, message: "Train Not Found" });
    } else {
      res.send(train);
    }
  } catch (error) {
    res.send(error);
  }
});

//Creates a new train
router.post("/", async (req, res) => {
  try {
    const train = await prisma.train.create({
      data: req.body,
    });

    res.send(train);
  } catch (error) {
    res.send(error);
  }
});

//Updates train with specified id
router.put("/:id", async (req, res) => {
  try {
    const train = await prisma.train.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    if (!train) {
      res.send({ error: true, message: "Train Not Found" });
    } else {
      res.send(train);
    }
  } catch (error) {
    res.send(error);
  }
});

//Deletes a train
router.delete("/:id", async (req, res) => {
  try {
    const train = await prisma.train.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!train) {
      res.send({ error: true, message: "Train Not Found" });
    } else {
      res.send(train);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
