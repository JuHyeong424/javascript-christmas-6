import {InputView} from "./view/InputView.js";
import {OutputView} from "./view/OutputView.js";
import {orderMenu} from "./utils/orderMenu.js";
import {discount} from "./utils/discount.js";

class App {
  async run() {
    const [date, menu] = await InputView();
    const [splitedMenu, total] = await orderMenu(date, menu);
    const [
      badge,
      champagne,
      champagnePrice,
      christmasDiscount,
      starDiscount,
      weekendDiscount,
      dayDiscount ] = await discount(splitedMenu, total, date);
    await OutputView(splitedMenu, total, badge, champagne, champagnePrice, christmasDiscount, starDiscount, weekendDiscount, dayDiscount);
  }
}

export default App;
