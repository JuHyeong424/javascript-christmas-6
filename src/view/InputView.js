import {Console} from "@woowacourse/mission-utils";

async function chooseDate() {
  Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  return await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n");
}

async function chooseMenuAndCount() {
  return await Console.readLineAsync("주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n")
}

export async function InputView() {
  const date = Number(await chooseDate());
  const menu = await chooseMenuAndCount();
  return [date, menu];
}