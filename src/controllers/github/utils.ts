export function formatDateTime(timestamp: number) {
  const locale = new Date(timestamp * 1000)
    .toLocaleString("en-US", { hour12: false })
    .split(" ");
  const localTime = locale[1];
  const mdy = locale[0].split("/");
  const month = mdy[0].length > 1 ? mdy[0] : `0${mdy[0]}`;
  const day = mdy[1].length > 1 ? mdy[1] : `0${mdy[1]}`;
  const year = parseInt(mdy[2]);
  const formattedDate = year + "-" + month + "-" + day + " " + localTime;

  return formattedDate;
}
