"use strict";

const TIMES = {
  mow: 2000,
  weed: 1500,
  trim: 1000,
  wood: 2500,
  water: 500,
};

// helper: returns true if they fall asleep (chance between 0 and 1)
function fellAsleep(chance = 0.3) {
  return Math.random() < chance;
}

function mowYard(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${name} mowed the yard.`);
      resolve();
    }, TIMES.mow);
  });
}

function weedEat(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fellAsleep(0.25))
        return reject(`${name} fell asleep after mowing the yard.`);
      console.log(`${name} finished using the weed eater.`);
      resolve();
    }, TIMES.weed);
  });
}

function trimHedges(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fellAsleep(0.25))
        return reject(`${name} fell asleep after weed eating the yard.`);
      console.log(`${name} finished trimming the hedges.`);
      resolve();
    }, TIMES.trim);
  });
}

function collectWood(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fellAsleep(0.35))
        return reject(`${name} fell asleep after trimming the hedges.`);
      console.log(`${name} finished collecting wood.`);
      resolve();
    }, TIMES.wood);
  });
}

function waterGarden(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fellAsleep(0.2))
        return reject(`${name} fell asleep after collecting wood.`);
      console.log(`${name} finished watering the garden.`);
      resolve();
    }, TIMES.water);
  });
}

function doSummerChores(name) {
  // promise chain (one after another)
  mowYard(name)
    .then(() => weedEat(name))
    .then(() => trimHedges(name))
    .then(() => collectWood(name))
    .then(() => waterGarden(name))
    .then(() => {
      console.log(`${name} finished all their chores!`);
    })
    .catch((msg) => {
      console.log(msg);
    });
}

// run it
doSummerChores("J");
