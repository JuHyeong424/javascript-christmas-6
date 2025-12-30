import {APPETIZER, DESSERT, DRINK, MAIN} from "../data/menu.js";

const ALL_MENU = [...APPETIZER, ...MAIN, ...DESSERT, ...DRINK];

async function sum(item, splitedMenu) {
  let result = 0;
  let count = 0;

  for (let i = 0; i < splitedMenu.length; i++) {
    if (!(ALL_MENU.find(value => value.name === splitedMenu[i][0]))) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
    const dish = item.filter(value => value.name === splitedMenu[i][0]);
    dish.map((value) => {
      const quantity = Number(splitedMenu[i][1]);
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
      result += value.price * quantity;
      count += Number(splitedMenu[i][1]);
    })
  }
  return [result, count];
}

async function checkDuplicationMenu(splitedMenu) {
  let menuArr = [];
  for (let i = 0; i < splitedMenu.length; i++) {
    menuArr.push(splitedMenu[i][0]);
  }
  let set = new Set(menuArr);
  if (menuArr.length !== set.size) {
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
}

export async function orderMenu(date, menu) {
  const selectedMenu = menu.split(',');

  let splitedMenu = [];
  selectedMenu.map((value) => {
    splitedMenu.push(value.split('-',2));
  });

  await checkDuplicationMenu(splitedMenu);

  let checkTotal = 0;
  let total = 0;
  let totalCount = 0;
  const [aPrice, aCount] = await sum(APPETIZER, splitedMenu);
  const [mPrice, mCount] = await sum(MAIN, splitedMenu);
  const [dPrice, dCount] = await sum(DESSERT, splitedMenu);
  const [drPrice, drCount] = await sum(DRINK, splitedMenu);

  checkTotal = aPrice + mPrice + dPrice;
  total = aPrice + mPrice + dPrice + drPrice;
  totalCount = aCount + mCount + dCount + drCount;

  if (total !== 0 && checkTotal === 0) throw new Error("[ERROR]음료만 주문하였습니다. 다시 입력해 주세요.");
  if (total === 0 || totalCount === 0) throw new Error("[ERROR]음식이 주문되지 않았습니다. 다시 입력해 주세요.");
  if (totalCount > 20) throw new Error("[ERROR]한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.");

  return [splitedMenu, total];
}