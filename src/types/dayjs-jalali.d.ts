

declare module "dayjs" {
  interface Dayjs {
    calendar(calendarType: string): Dayjs;
  }
}

declare module "dayjs-jalali";