export async function validateDate(date) {
  if (date < 1 || date > 31 || isNaN(date)) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
}