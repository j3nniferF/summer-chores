"use strict";

// ====== Timing (ms) ======
const TIMES = {
  mow: 2000,
  weed: 1500,
  trim: 1000,
  wood: 2500,
  water: 500,
};

// ====== Sleep chance per step (tweak these while testing) ======
const SLEEP_CHANCE = {
  // no sleep before mowing (so mowYard always completes)
  afterMow: 0.15,
  afterWeed: 0.2,
  afterTrim: 0.25,
  afterWood: 0.3,
};

// helper: returns true if person stays awake
function staysAwake(chanceToSleep) {
  return Math.random() >= chanceToSleep;
}

// ====== Required chore functions ======

function mowYard(name, callback) {
  setTimeout(() => {
    console.log(`${name} mowed the yard.`);
    callback();
  }, TIMES.mow);
}

function weedEat(name, callback) {
  setTimeout(() => {
    if (staysAwake(SLEEP_CHANCE.afterMow)) {
      console.log(`${name} finished using the weed eater.`);
      callback();
    } else {
      console.log(`${name} fell asleep after mowing the yard.`);
    }
  }, TIMES.weed);
}

function trimHedges(name, callback) {
  setTimeout(() => {
    if (staysAwake(SLEEP_CHANCE.afterWeed)) {
      console.log(`${name} finished trimming the hedges.`);
      callback();
    } else {
      console.log(`${name} fell asleep after weed eating the yard.`);
    }
  }, TIMES.trim);
}

function collectWood(name, callback) {
  setTimeout(() => {
    if (staysAwake(SLEEP_CHANCE.afterTrim)) {
      console.log(`${name} finished collecting wood.`);
      callback();
    } else {
      console.log(`${name} fell asleep after trimming the hedges.`);
    }
  }, TIMES.wood);
}

function waterGarden(name, callback) {
  setTimeout(() => {
    if (staysAwake(SLEEP_CHANCE.afterWood)) {
      console.log(`${name} finished watering the garden.`);
      callback();
    } else {
      console.log(`${name} fell asleep after collecting wood.`);
    }
  }, TIMES.water);
}

// ====== Wrapper function that creates the "callback hell" chain ======
function doSummerChores(name) {
  // name must be a string literal when you call it, like: doSummerChores("J");
  mowYard(name, () => {
    weedEat(name, () => {
      trimHedges(name, () => {
        collectWood(name, () => {
          waterGarden(name, () => {
            console.log(`${name} finished all their chores!`);
          });
        });
      });
    });
  });
}

// ====== Run it ======
doSummerChores("J");
