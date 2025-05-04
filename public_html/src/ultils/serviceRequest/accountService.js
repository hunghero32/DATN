import { getLocal, setLocal } from "../local/localStorage";


class AccountService {
  setAccountValue(user) {
    setLocal("user", user);
    window.dispatchEvent(new Event("storage"));
  }

  get accountValue() {
    return getLocal("user");
  }

  clearAccount() {
    localStorage.removeItem("user");
    console.log("Token và thông tin tài khoản đã bị xóa.");
  }
}

export const accountService = new AccountService();