import moment from "moment-timezone";

export const dateFormatter = (dateString) => {
  return moment(dateString)
    .tz("Asia/Jakarta")
    .format("DD MMMM YYYY HH:mm [WIB]");
};