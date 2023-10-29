/**
 * Hàm nhận chuỗi HTML tìm tag P đầu tiên
 * @param text : string
 * @example
 * const tag = getFirstPTag("reallyLongHtmlString")
 * @returns string - "<p>...</p>"
 * @author DanhYeuLapTrinh
 * @version 1.0.1.0
 */
export const getFirstPTag = (htmlStr) => {
  if (htmlStr) {
    const match = htmlStr.match(/<p>([^<]*)<\/p>/);
    if (match) {
      return match[1]; 
    }
  }
  return null;
};

/**
 * Hàm nhận chuỗi xong tạo ra slug cho URL
 * @param text : string
 * @example
 * const slug = getFirstPTag("Em thích ăn chuối!")
 * @returns string - "em-thich-an-chuoi"
 * @author DanhYeuLapTrinh
 * @version 1.0.0.0
 */
export const toSlug = (inputStr) => {
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

  return inputStr;
};
