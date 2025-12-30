import {APPETIZER, DESSERT, DRINK, MAIN} from "../data/menu.js";

function sum(item, splitedMenu) {
  let result = 0;

  for (let i = 0; i < splitedMenu.length; i++) {
    const dish = item.filter(value => value.name === splitedMenu[i][0]);
    dish.map((value) => {
      result += value.price * Number(splitedMenu[i][1]);
    })
  }

  return result;
}

export async function orderMenu(date, menu) {
  const selectedMenu = menu.split(',');

  let splitedMenu = [];
  selectedMenu.map((value) => {
    splitedMenu.push(value.split('-',2));
  });

  let total = 0;
  total += sum(APPETIZER, splitedMenu);
  total += sum(MAIN, splitedMenu);
  total += sum(DESSERT, splitedMenu);
  total += sum(DRINK, splitedMenu);

  return [splitedMenu, total];
}