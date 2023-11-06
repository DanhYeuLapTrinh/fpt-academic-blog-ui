/**
 * Hàm nhận chuỗi HTML tìm tag h2, h3, p đầu tiên và lấy nội dung
 * @param text : string
 * @example
 * const tag = getFirstPTag("reallyLongHtmlString")
 * @returns string - "nội dung"
 * @author DanhYeuLapTrinh
 * @version 1.0.2.0
 */
export const getFirstTagContent = (htmlStr) => {
  if (htmlStr) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr, "text/html");

    // Get first heading or paragraph
    const tag = doc.querySelector("h2, h3, p");

    if (!tag) return "";

    // Get text content
    let text = tag.textContent;

    // Remove extra whitespace
    text = text.trim();

    return text;
  }
  return null;
};

/**
 * Hàm nhận chuỗi xong tạo ra slug cho URL
 * @param text : string
 * @example
 * const slug = getFirstPTag("Em yêu lập trình!")
 * @returns string - "em-yeu-lap-trinh-356231061"
 * @author DanhYeuLapTrinh
 * @version 1.0.0.0
 */
export const toSlug = (inputStr, noNumber) => {
  if(inputStr) {
    // Chuyển hết sang chữ thường
  inputStr = inputStr.toLowerCase();

  // xóa dấu
  inputStr = inputStr
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  inputStr = inputStr.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  inputStr = inputStr.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  inputStr = inputStr.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  inputStr = inputStr.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  inputStr = inputStr.replace(/^-+|-+$/g, "");

  if (noNumber) {
    return inputStr;
  } else {
    const randomNumber = Math.floor(Math.random() * 1000000000);
    inputStr = `${inputStr}-${randomNumber}`;
    return inputStr
  }
  }
};

/**
 * Hàm nhận chuỗi xong lấy chữ cái đầu của mỗi từ, in hoa và nối lại
 * @param text : string
 * @example
 * const firstChars = getFirstChar("Kỹ thuật phần mềm")
 * @returns string - "KTPM"
 * @author DanhYeuLapTrinh
 * @version 1.0.0.0
 */
export const getFirstChar = (inputStr) => {
  if (inputStr) {
    let firstChars = inputStr
      .split(" ")
      .map((words) => words.charAt(0))
      .join("")
      .toUpperCase();
    return firstChars;
  }
  return null;
};

/**
 * Hàm nhận chuỗi ngày tháng năm và giờ phút giây để trả ra thời điểm hiện tại tương ứng
 * @param text : string
 * @example
 * const time = timeConverter("2023-10-30 10:46:31")
 * @returns string - "55 phút trước"
 * @author DanhYeuLapTrinh
 * @version 1.0.0.0
 */
export const timeConverter = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const secondsPast = (now.getTime() - date) / 1000;

  if (secondsPast < 60) {
    return "vừa xong";
  }

  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} phút trước`;
  }

  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} giờ trước`;
  }

  if (secondsPast < 259200) {
    return `${Math.floor(secondsPast / 86400)} ngày trước`;
  }

  return date.toLocaleDateString("en-GB");
};
/**
 * Hàm nhận mảng, thứ tự sort và thuộc tính gốc để sort
 * @param array : array
 * @param order : string
 * @param propertyName : string
 * @example
 * const array = sortByPropertyName(array, "asc", "id")
 * @description
 * Mảng phải là mảng chứa object
 * Order mặc định nếu rỗng thì sort theo desc
 * Propertyname thuộc tính gốc
 * @returns array - sort by id in ascending order
 * @author DanhYeuLapTrinh
 * @version 1.0.0.0
 */
export const sortByPropertyName = (array, order, propertyName) => {
  if (array) {
    if (order === "asc") {
      return array.sort((a, b) => a[propertyName] - b[propertyName]);
    } else {
      return array.sort((a, b) => b[propertyName] - a[propertyName]);
    }
  }
};
