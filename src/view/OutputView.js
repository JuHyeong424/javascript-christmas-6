import {Console} from "@woowacourse/mission-utils";

async function printMenu(date, splitedMenu) {
  Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  Console.print("<주문 메뉴>");
  for (let i = 0; i < splitedMenu.length; i++) {
    Console.print(`${splitedMenu[i][0]} ${splitedMenu[i][1]}개`);
  }
  Console.print("");
}

async function printTotalPrice(total) {
  Console.print("<할인 전 총주문 금액>");
  Console.print(`${total}원\n`);
}

async function printPresentMenu(champagne) {
  Console.print("<증정 메뉴>");
  Console.print(`${champagne}\n`);
}

async function printBenefit(christmasDiscount, starDiscount, weekendDiscount, dayDiscount, champagne, champagnePrice) {
  Console.print("<혜택 내역>");
  if (christmasDiscount === 0 && starDiscount === 0 && weekendDiscount === 0 && dayDiscount === 0 && champagne === "없음") Console.print("없음");
  if (christmasDiscount !== 0) Console.print(`크리스마스 디데이 할인: -${christmasDiscount}원`);
  if (starDiscount !== 0) Console.print(`특별 할인: -${starDiscount}원`);
  if (weekendDiscount !== 0) Console.print(`주말 할인: -${weekendDiscount}원`);
  if (dayDiscount !== 0) Console.print(`평일 할인: -${dayDiscount}원`);
  if (champagne !== "없음") Console.print(`증정 이벤트: -${champagnePrice}원`);
  Console.print('');
}

async function printTotalBenefit(christmasDiscount, starDiscount, weekendDiscount, dayDiscount, champagne, champagnePrice) {
  let totalDiscount = 0;
  Console.print("<총혜택 금액>");
  if (christmasDiscount === 0 && starDiscount === 0 && weekendDiscount === 0 && dayDiscount === 0 && champagne === "없음") {
    Console.print(`${totalDiscount}원\n`);
    return totalDiscount;
  }
  totalDiscount = christmasDiscount + starDiscount + weekendDiscount + dayDiscount + champagnePrice;
  Console.print(`-${totalDiscount}원\n`);
  return totalDiscount - champagnePrice;
}

async function printPayment(totalDiscount, total) {
  Console.print('<할인 후 예상 결제 금액>');
  Console.print(`${total - totalDiscount}원\n`);
}

async function printEventBadge(badge) {
  Console.print("<12월 이벤트 배지>");
  Console.print(`${badge}`);
}

export async function OutputView(
  date,
  splitedMenu,
  total,
  badge,
  champagne,
  champagnePrice,
  christmasDiscount,
  starDiscount,
  weekendDiscount,
  dayDiscount
) {
  await printMenu(date, splitedMenu);
  await printTotalPrice(total);
  await printPresentMenu(champagne);
  await printBenefit(christmasDiscount, starDiscount, weekendDiscount, dayDiscount, champagne, champagnePrice);
  const totalDiscount = await printTotalBenefit(christmasDiscount, starDiscount, weekendDiscount, dayDiscount, champagne, champagnePrice);
  await printPayment(totalDiscount, total);
  await printEventBadge(badge);
}
