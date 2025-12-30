import {OutputView} from "./view/OutputView.js";
import {orderMenu} from "./utils/orderMenu.js";
import {discount} from "./utils/discount.js";
import * as InputView from "./view/InputView.js";
import {validateDate} from "./utils/validateDate.js";
import {Console} from "@woowacourse/mission-utils";

class App {
  async run() {
    let date;

    while (true) {
      try {
        date = Number(await InputView.chooseDate());
        await validateDate(date);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

    let splitedMenu, total;

    while (true) {
      try {
        const menu = await InputView.chooseMenuAndCount();
        [splitedMenu, total] = await orderMenu(date, menu);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

    const [
      badge,
      champagne,
      champagnePrice,
      christmasDiscount,
      starDiscount,
      weekendDiscount,
      dayDiscount ] = await discount(splitedMenu, total, date);
    await OutputView(date, splitedMenu, total, badge, champagne, champagnePrice, christmasDiscount, starDiscount, weekendDiscount, dayDiscount);
  }
}

export default App;
