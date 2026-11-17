/* Design Studio AI assistant — suggests characters, levels, loops and pitch text for the step the learner is on.
   Uses Claude through the official Anthropic SDK. Disabled unless ANTHROPIC_API_KEY (or another Anthropic credential) is set. */
import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.STUDIO_AI_MODEL || "claude-opus-5-5";
export const AI_ENABLED = !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
const client = AI_ENABLED ? new Anthropic() : null;

export const STEPS = ["genre", "characters", "levels", "gameplay", "world", "pitch"];
const BLOCKS = ["start", "terrain", "enemy", "collect", "puzzle", "trap", "checkpoint", "npc", "shop", "secret", "chase", "boss", "goal"];
const VERBS = ["explore", "collect", "fight", "build", "upgrade", "solve", "race", "trade", "sneak", "craft", "match", "answer", "jump", "survive"];
const MECHS = ["doubleJump", "dash", "inventory", "crafting", "skillTree", "combo", "timer", "stealth", "dayNight", "physics", "dialogue", "permadeath", "coop", "leaderboard"];

const str = { type: "string" };
const obj = (properties) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });
const SCHEMA = obj({
  tip: str,
  title: str, logline: str, setting: str, audio: str, usp: str, audience: str, scope: str,
  characters: { type: "array", items: obj({ name: str, slot: { type: "string", enum: ["hero", "ally", "enemy", "boss"] }, note: str }) },
  levels: { type: "array", items: obj({ name: str, blocks: { type: "array", items: { type: "string", enum: BLOCKS } } }) },
  loop: { type: "array", items: { type: "string", enum: VERBS } },
  mechanics: { type: "array", items: { type: "string", enum: MECHS } }
});

const SYSTEM = `You are the design mentor inside "Game Academy", a course that teaches beginners to design games.
The learner is building a one-page game design step by step: genre → characters → levels → gameplay → world & style → pitch.
Give suggestions only for the current step; leave every other field as an empty string or empty array.
- characters step: 3–6 original characters (name, slot, one short note on their role or ability). Never reuse characters, names or settings from existing commercial games.
- levels step: 3 levels, each 4–8 blocks in the order the player meets them; start with "start" and end with "goal" or "boss"; difficulty should rise level by level.
- gameplay step: exactly 3 loop verbs and 3–5 mechanics that suit the genre.
- world step: a vivid setting paragraph (2–3 sentences) and a short audio direction.
- genre/pitch steps: a title, a one-sentence logline, and for pitch also usp, audience and a realistic first-milestone scope for a beginner.
Always fill "tip" with one practical design lesson (1–2 sentences) tied to what they built so far.
Keep it original, beginner-friendly and age-appropriate. Write all free text in the language requested.`;

/** Returns the suggestion object, or throws an Error with .code. */
export async function suggest({ step, lang, ask, design }) {
  if (!client) { const e = new Error("ai_off"); e.code = "ai_off"; throw e; }
  const user = `Language: ${lang === "ar" ? "Arabic" : "English"}\nCurrent step: ${step}\n` +
    (ask ? `Learner's request: ${ask}\n` : "") + `Design so far (JSON):\n${JSON.stringify(design)}`;
  const res = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 6000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default", // if a safety classifier declines, the API retries on a suitable fallback model
    output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: user }]
  });
  if (res.stop_reason === "refusal" || res.stop_reason === "max_tokens") { const e = new Error("ai_failed"); e.code = "ai_failed"; throw e; }
  const text = res.content.find(b => b.type === "text")?.text;
  return JSON.parse(text);
}
