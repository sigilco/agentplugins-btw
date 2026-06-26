# agentplugins-btw

> Ask side questions without interrupting the main agent.

A port of [pi-btw](https://github.com/dbachelder/pi-btw) to the [agentplugins](https://github.com/sigilco/agentplugins) CLI. The original Pi extension gives you a real TUI overlay for parallel side conversations; this package brings the same `/btw` workflow to every tier-1 agent harness.

* * *

## Quick start

```bash
pnpm dlx agentplugins install agentplugins-btw
```

Then:

```text
/btw what file defines this route?
/btw:tangent brainstorm from first principles
/btw:summarize implement the recommended plan
```

* * *

## How to use it

### `/btw <question>` — side question

Opens a parallel side thread while the main agent keeps working.

### `/btw:tangent <question>` — clean slate

Starts a contextless tangent that ignores the current session.

### `/btw:inject` — hand the full thread back

Sends the side conversation back to the main agent verbatim.

### `/btw:summarize` — hand back a summary

Injects a condensed version instead of the full transcript.

### `/btw:new`, `/btw:clear`, `/btw:model`, `/btw:thinking`

Start fresh, dismiss, or tune cost/speed independently of the main thread.

* * *

## What you get

- **Commands** — `/btw`, `/btw:new`, `/btw:tangent`, `/btw:inject`, `/btw:summarize`, `/btw:clear`, `/btw:model`, `/btw:thinking`
- **Skill** — `btw` teaches the agent when to suggest a side thread
- **Pi native overlay** — full TUI side-conversation modal via the upstream `pi-btw` extension
- **Cross-harness parity** — same workflow on Claude, Codex, OpenCode, and any other tier-1 harness

* * *

## Why this works

- **Non-blocking.** Ask clarifying questions while the main run continues.
- **Clean context.** Side threads stay out of the main agent's transcript.
- **Handoff-ready.** Inject the full discussion or just the summary when it matters.
- **Cost-aware.** Override model/thinking per side thread.

* * *

## Learn more

For the full feature set, behavior details, keyboard shortcuts, and the Pi TUI overlay, see the upstream source of truth: [dbachelder/pi-btw](https://github.com/dbachelder/pi-btw).

## License

MIT
