// When a revision starts to count against a reader's "known" mark or card review.
// A revision is dated by day, so it counts from the end of that UTC day: a reader who marked the section
// known earlier that day, before the change shipped, still sees it as updated. On the day itself the site
// that ships the change is built at a known time, so marks made after that build are already up to date.
const BUILT_AT = Date.now();

export const revisionTime = (date: Date, builtAt = BUILT_AT) => Math.min(date.getTime() + 86_400_000 - 1, builtAt);
