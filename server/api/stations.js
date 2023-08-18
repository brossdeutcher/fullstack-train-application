const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Returns all the stations
router.get("/", async (req, res) => {
  try {
    const stations = await prisma.station.findMany();
    res.send(stations);
  } catch (err) {
    console
    res.send(err);
  }
});

//Returns a station with specified id
router.get("/:id", async (req, res) => {
  try {
    const station = await prisma.station.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (station) {
      res.send(station);
    } else {
      res.send({error: true, message: "Station not found!!"});
    }
  } catch (err) {
    res.send(err);
  }
});

//Creates a new station
router.post("/", async (req, res) => {
  //TODO
});

//Updates the station with specified id
router.put("/:id", async (req, res) => {
  //TODO
});

//Deletes a station
router.delete("/:id", async (req, res) => {
  //TODO
});

module.exports = router;
