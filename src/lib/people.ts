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
  // A malformed entry fails the build with its file name. A profile that can't be loaded (GitHub or Credly down)
  // is left out of this build with a warning instead of failing the deploy.
  const files = import.meta.glob<{ default: unknown }>('../content/passed/*.json', { eager: true });
  const loaded = await Promise.all(
    Object.entries(files).map(async ([file, mod]): Promise<Person | undefined> => {
      const parsed = passedEntry.safeParse(mod.default);
      if (!parsed.success) throw new Error(`${file}: ${parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`);
      const entry = parsed.data;
      try {
        const [user, earned] = await Promise.all([githubApi(`users/${entry.github}`, process.env.GH_TOKEN), credlyAwsCerts(entry.credly)]);
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
