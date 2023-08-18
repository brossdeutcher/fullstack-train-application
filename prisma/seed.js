const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  //Create Trains
  const train1 = await prisma.train.create({
    data: {
      year: 1985,
      fuelType: "Diesel",
      color: "Orange",
      range: 1500,
    },
  });
  const train2 = await prisma.train.create({
    data: {
      year: 1995,
      fuelType: "Coal",
      color: "Orange",
      range: 1900,
    },
  });
  const train3 = await prisma.train.create({
    data: {
      year: 2000,
      fuelType: "Electric",
      color: "Red",
      range: 1300,
    },
  });
  const train4 = await prisma.train.create({
    data: {
      year: 1890,
      fuelType: "Steam",
      color: "Black",
      range: 200,
    },
  });

  //Create Conductors
  await prisma.conductor.create({
    data: {
      name: "Bob",
      yearHired: 2015,
      trainId: train1.id,
    },
  });
  await prisma.conductor.create({
    data: {
      name: "Jill",
      yearHired: 2011,
      trainId: train1.id,
    },
  });
  await prisma.conductor.create({
    data: {
      name: "Frank",
      yearHired: 2014,
      trainId: train2.id,
    },
  });
  await prisma.conductor.create({
    data: {
      name: "Sandra",
      yearHired: 2020,
      trainId: train3.id,
    },
  });

  //Create Stations
  await prisma.station.create({
    data: {
      name: "Big Station",
      city: "Columbus",
      state: "Ohio",
      capacity: 2000,
    },
  });
  await prisma.station.create({
    data: {
      name: "Small Station",
      city: "Springfield",
      state: "Illinois",
      capacity: 200,
    },
  });
  await prisma.station.create({
    data: {
      name: "Grand Central",
      city: "New York City",
      state: "New York",
      capacity: 1500,
    },
  });

  // create Users
  await prisma.user.create({
    data: {
      firstName: "Jean-Luc",
      lastName: "Picard",
      username: "captainP",
      password: "3arlGreuH0t"
    }
  })
  await prisma.user.create({
    data: {
      firstName: "Ross",
      lastName: "Ulbricht",
      username: "DPR",
      password: "iH8Alt0id"
    }
  })
};

main();
