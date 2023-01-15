// export const formatter = new Intl.DateTimeFormat("en-US", {
//   day: "numeric",
//   month: "numeric",
//   year: "2-digit",
// });
// export const formatterDay = new Intl.DateTimeFormat("en-US", {
//   weekday: "long",
// });
// export const formatterTime = new Intl.DateTimeFormat("ru", {
//   hour: "numeric",
//   minute: "numeric",
// });

// export const formatterDayTwo = new Intl.DateTimeFormat("en-US", {
//   weekday: "short",
//   month: "short",
//   day: "numeric",
// });

export const formatter = (option) =>
  new Intl.DateTimeFormat(option.reg, option.param);

export const temp1 = (reg, timeZone) =>
  Object.create({
    reg: reg,
    param: {
      hour: "numeric",
      minute: "numeric",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: timeZone,
    },
  });
export const temp2 = (reg) =>
  Object.create({
    reg: reg,
    param: {
      weekday: "long",
    },
  });
export const temp3 = (reg) =>
  Object.create({
    reg: reg,
    param: {
      month: "short",
      day: "numeric",
    },
  });

export const temp4 = (reg) =>
  Object.create({
    reg: reg,
    param: {
      hour: "numeric",
      minute: "numeric",
    },
  });
export const temp5 = (reg) =>
  Object.create({
    reg: reg,
    param: {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
  });
export const temp6 = (reg) =>
  Object.create({
    reg: reg,
    param: {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  });
