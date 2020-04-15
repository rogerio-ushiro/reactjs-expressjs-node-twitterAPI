
class FormatDate {

  formatedDate;

  constructor(date) {
    this.formatedDate = new Date(date);
  }

  getMonthName() {
    return this.formatedDate.getMonthName() + " " + this.formatedDate.getDate() + ", " + this.formatedDate.getFullYear();
  }

  getMonthNameShort() {
    return Date.locale["en"].month_names_short[this.formatedDate.getMonth()] + " " + this.formatedDate.getDate() + ", " + this.formatedDate.getFullYear();
  }

}

Date.locale = {
  en: {
    month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

export default FormatDate