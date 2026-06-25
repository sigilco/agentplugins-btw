import { definePlugin } from '@agentplugins/core';

export default definePlugin({
  name: 'btw',
  version: '1.0.0',
  description:
    'Parallel side conversations for AI agents. Pi gets the full TUI overlay; all other tier-1 harnesses get functional side-thread parity via skills and commands.',
  displayName: 'BTW',
  author: { name: 'Dan Bachelder', url: 'https://github.com/dbachelder' },
  homepage: 'https://github.com/espetro/agentplugins-btw',
  repository: 'https://github.com/espetro/agentplugins-btw',
  license: 'MIT',
  keywords: ['btw', 'side-conversation', 'parallel', 'tangent'],

  // ─── Native entry (Pi) ───────────────────────────────────────────────────────
  // On Pi Mono the full TUI overlay is emitted verbatim from extensions/btw.ts.
  // On all other tier-1 harnesses, universal codegen handles skills + commands.
  nativeEntry: {
    pimono: './extensions/btw.ts',
  },

  // ─── Skills ──────────────────────────────────────────────────────────────────
  // Tier-1 harnesses that receive universal codegen (Claude, Codex, OpenCode)
  // get the btw skill so the agent understands the side-thread pattern.
  skills: [
    {
      name: 'btw',
      description:
        'Guides the agent on when and how to use the /btw side-conversation workflow: aside questions, tangent threads, inject/summarize back to main, model/thinking overrides.',
      filePath: 'skills/btw/SKILL.md',
    },
  ],

  // ─── Commands ────────────────────────────────────────────────────────────────
  // On Pi the TUI overlay handles all btw:* commands natively.
  // On Claude/Codex/OpenCode these are prompt-based functional equivalents:
  // the agent opens a scoped aside, answers it, and optionally injects back.
  commands: [
    {
      name: 'btw',
      description: 'Ask a side question without interrupting the current work context',
      prompt: `Answer the following side question in a focused, sandboxed way, without modifying any ongoing work: {{args}}

Keep your response concise. If the user wants to hand the result back to the main context, they can follow up with /btw:inject or /btw:summarize.`,
      argumentHint: '<side question>',
    },
    {
      name: 'btw:new',
      description: 'Start a fresh side thread (inherits current session context)',
      prompt: `Start a new side thread. If a question was provided, answer it: {{args}}

This side thread shares context with the main session. The main session's ongoing work is paused. Use /btw:inject or /btw:summarize to hand results back.`,
      argumentHint: '[optional opening question]',
    },
    {
      name: 'btw:tangent',
      description: 'Start a contextless tangent thread (no main-session context)',
      prompt: `Start a fully contextless tangent thread. Ignore everything from the current main session — treat this as a brand-new conversation.

Question or topic: {{args}}

Answer purely from your general knowledge and instructions. No references to ongoing work.`,
      argumentHint: '<question or topic>',
    },
    {
      name: 'btw:inject',
      description: 'Hand the full side thread back to the main agent',
      prompt: `The side thread is now being handed back to the main session verbatim.

Here is the full content of the side thread for the main agent to act on: {{args}}

Read the thread, understand it fully, and apply any decisions, plans, or code to the main session work.`,
      argumentHint: '[instructions for the main agent]',
    },
    {
      name: 'btw:summarize',
      description: 'Summarize the side thread and inject it into the main agent',
      prompt: `Summarize the recent side thread concisely — key decisions, plans, risks, and action items only. Then inject this summary into the main session.

Instructions from the user: {{args}}

Apply the distilled outcome to the main session work.`,
      argumentHint: '[instructions for the main agent]',
    },
    {
      name: 'btw:clear',
      description: 'Dismiss the current BTW side thread',
      prompt: `Clear the current BTW side thread. Acknowledge that it is dismissed and return focus to the main session without carrying forward any side-thread content.`,
    },
  ],
});
