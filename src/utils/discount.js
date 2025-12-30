import {DESSERT, DRINK, MAIN} from "../data/menu.js";
import {Console} from "@woowacourse/mission-utils";

async function getBadge(champagnePrice, christmasDiscount, starDiscount, weekendDiscount, dayDiscount) {
  const total = champagnePrice + christmasDiscount + starDiscount + weekendDiscount + dayDiscount;

  if (total >= 20000) {
    return "산타";
  }
  if (total >= 10000) {
    return "트리";
  }
  if (total >= 5000) {
    return "별";
  }
  return "없음";
}

async function getChampagne(total) {
  if (total >= 120000) return "샴페인 1개";
  return "없음";
}

async function getChampagnePrice() {
  return DRINK.find(value => value.name === "샴페인").price;
}

async function getChristmasDiscount(date) {
  return 1000 + ((date - 1) * 100);
}

async function getStarDiscount() {
  return 1000;
}

async function getDateDiscount(menu, selectedMenu) {
  let count = 0;
  for (let i = 0; i < selectedMenu.length; i++) {
    if (menu.find(value => value.name === selectedMenu[i][0])) {
      count += Number(selectedMenu[i][1]);
    }
  }
  return count * 2023;
}

export async function discount(splitedMenu, total, date) {
  const champagne = await getChampagne(total);
  let champagnePrice = 0;
  if (champagne !== '없음') champagnePrice = await getChampagnePrice();

  let christmasDiscount = 0;
  if (date >= 1 && date <= 25) christmasDiscount = await getChristmasDiscount(date);

  let starDiscount = 0;
  if (date === 3 || date === 10 || date === 17 || date === 24 || date === 25 || date === 31) starDiscount = await getStarDiscount();

  let weekendDiscount = 0;
  let dayDiscount = 0;
  if (date === 1 || date === 2 || date === 8 || date === 9 || date === 15 || date === 16 || date === 22 || date === 23 || date === 29 || date === 30) {
    weekendDiscount = await getDateDiscount(MAIN, splitedMenu);
  } else {
    dayDiscount = await getDateDiscount(DESSERT, splitedMenu);
  }

  const badge = await getBadge(champagnePrice, christmasDiscount, starDiscount, weekendDiscount, dayDiscount);

  Console.print(`splitedMenu: ${splitedMenu}`);
  Console.print(`badge: ${badge}`);
  Console.print(`Champagne: ${champagne}`);
  Console.print(`christmasDiscount: ${christmasDiscount}`);
  Console.print(`starDiscount: ${starDiscount}`);
  Console.print(`weekendDiscount: ${weekendDiscount}`);
  Console.print(`dayDiscount: ${dayDiscount}`);

  return [
    badge,
    champagne,
    champagnePrice,
    christmasDiscount,
    starDiscount,
    weekendDiscount,
    dayDiscount
  ];

  /*
  Console.print(`splitedMenu: ${splitedMenu}`);
  Console.print(`badge: ${badge}`);
  Console.print(`Champagne: ${Champagne}`);
  Console.print(`christmasDiscount: ${christmasDiscount}`);
  Console.print(`starDiscount: ${starDiscount}`);
  Console.print(`weekendDiscount: ${weekendDiscount}`);
  Console.print(`dayDiscount: ${dayDiscount}`);
  */
}
