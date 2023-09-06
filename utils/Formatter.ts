

export const temp1 = <T extends Intl.DateTimeFormatOptions>(opt: T) => ({
  ...opt,
  hour: "numeric",
  minute: "numeric",
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export const optionWeekday = <T extends Intl.DateTimeFormatOptions>(opt: T) => ({
  ...opt,
  weekday: "long"
});

export const numderDayMount = <T extends Intl.DateTimeFormatOptions>(opt: T) => ({
  ...opt,
  month: "short",
  day: "numeric",
});

export const optionHoursMinute = <T extends Intl.DateTimeFormatOptions>(opt: T) => ({
  ...opt,
  hour: "numeric",
  minute: "numeric"
});

export const optionWeekMouthDay = <T extends Intl.DateTimeFormatOptions>(opt: T) => ({
  ...opt,
  weekday: "short",
  month: "short",
  day: "numeric",
});

export const optionWeekMouthDaySecondary = <T extends Intl.DateTimeFormatOptions>(opt: T) => ({
  ...opt,
  weekday: "long",
  month: "long",
  day: "numeric",
});
