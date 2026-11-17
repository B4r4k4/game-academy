/* Content v4 — "deeper course" (2026-11-16, user request: the course was too thin to take more than 10 minutes).
   Every module gets lessons in the full template (idea → explanation → worked example → common mistake → try it with a
   platform link) plus a closing hands-on workshop. Entries with `match` rewrite the existing lesson with that English
   title in place (same id, so learners keep their progress); entries without `match` are appended as new lessons.
   An empty `image` keeps the lesson's current image. server/seed.js applies this to fresh seeds and, once, to existing DBs. */
import p1 from "./deepen-1.js";
import p2 from "./deepen-2.js";
import p3 from "./deepen-3.js";
import p4 from "./deepen-4.js";

const modules = {};
for (const part of [p4, p1, p2, p3]) for (const [slug, list] of Object.entries(part)) (modules[slug] ||= []).push(...list);

export default { version: 4, modules };
