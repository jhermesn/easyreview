// "Who passed" people, loaded once per build and shared by the home page and /passed.
import { credlyAwsCerts, githubApi, passedEntry, tierOf, type Earned, type TierId } from './passed';

export const ADD_YOURSELF = 'https://github.com/jhermesn/easyreview/blob/main/CONTRIBUTING.md#add-yourself-to-who-passed';

export interface Person {
  login: string;
  name: string;
  bio?: string;
  avatar?: string;
  credly: string;
  linkedin?: string;
  builder?: string;
  earned: Earned[];
  active: number;
  latest: string;
  tier: TierId;
}

async function load(): Promise<Person[]> {
  // A malformed entry fails the build with its file name. Credly proves the badges, so a profile whose Credly page
  // can't be loaded is left out of this build with a warning. GitHub only adds the name, bio and avatar: when it
  // fails (rate limits hit unauthenticated local builds first), the person is still listed under their login.
  const files = import.meta.glob<{ default: unknown }>('../content/passed/*.json', { eager: true });
  const loaded = await Promise.all(
    Object.entries(files).map(async ([file, mod]): Promise<Person | undefined> => {
      const parsed = passedEntry.safeParse(mod.default);
      if (!parsed.success) throw new Error(`${file}: ${parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`);
      const entry = parsed.data;
      try {
        const profile = githubApi(`users/${entry.github}`, process.env.GH_TOKEN).catch((err: Error) => {
          console.warn(`[passed] ${entry.github}: GitHub profile unavailable (${err.message}); listed by login`);
          return {} as Awaited<ReturnType<typeof githubApi>>;
        });
        const [user, earned] = await Promise.all([profile, credlyAwsCerts(entry.credly)]);
        if (!earned.length) return undefined;
        return {
          login: entry.github,
          name: user.name || entry.github,
          bio: user.bio || undefined,
          avatar: typeof user.avatar_url === 'string' ? user.avatar_url : undefined,
          credly: entry.credly,
          linkedin: entry.linkedin,
          builder: entry.builder,
          earned,
          active: earned.filter((e) => e.active).length,
          latest: earned.map((e) => e.issued).sort().at(-1)!,
          tier: tierOf(earned),
        };
      } catch (err) {
        console.warn(`[passed] skipped ${entry.github}: ${(err as Error).message}`);
        return undefined;
      }
    }),
  );
  const people = loaded.filter((p): p is Person => !!p);
  return people;
}

let cached: Promise<Person[]> | undefined;
export const loadPeople = () => (cached ??= load());
