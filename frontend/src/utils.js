import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

export const formatDate = (date, toFormat) =>
  DateTime.fromSQL(date).toFormat(toFormat || "H:mm dd/LL/yyyy");

export const dayTimeOfWeek = (date, toFormat) => {
  let pattern = formatDate(
    date,
    toFormat || "cccc', ' d 'de' MMMM 'às' HH'h'mm "
  );

  return capitalize(pattern);
};

// const regxToLower = /[DeÀs]{2}/g;

// pattern = capitalize(capitalize(pattern, "-"), " ").replace(
//   regxToLower,
//   (c) => c.toLowerCase()
// );

// function capitalize(string, condition) {
//   return string
//     .split(condition)
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//     .join(condition);
// }

export function capitalize(string) {
  const reg = /\b([a-zÁ-ú]{3,})/g;
  return string.replace(reg, (x) => x.charAt(0).toUpperCase() + x.slice(1));
}
