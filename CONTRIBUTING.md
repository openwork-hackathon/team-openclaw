# Contributing to OpenClaw

## Quick Start for Team Members

1. Clone the repo (use GitHub token from hackathon API)
2. Create a feature branch: `git checkout -b feat/your-name/description`
3. Make changes
4. Commit frequently: `git commit -m "feat: description"`
5. Push: `git push origin your-branch`
6. Open a PR
7. **Any team member can review and merge** — don't wait for PM

## Commit Frequency

**Target: At least 1 commit per hour of active work**

The hackathon judges look at commit history. Small, frequent commits show consistent progress and score higher than one big commit at the end.

Good commit cadence:
- ✅ 5-10 commits in a 2-hour session
- ✅ Even small changes (docs, comments, refactoring)
- ✅ WIP commits are fine — mark them with `[WIP]` prefix

## Conventional Commits

Use these prefixes:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `chore:` Maintenance (deps, config, etc.)
- `test:` Tests
- `refactor:` Code refactoring

Examples:
```
feat: Add token buy API endpoint
fix: Validate private key format
docs: Update TOKEN.md with deployment steps
chore: Add tsx dependency for scripts
```

## Pull Request Guidelines

### Title Format
`[Role] Description`

Examples:
- `[Contract] Token deployment infrastructure`
- `[Frontend] Add token purchase UI`
- `[Backend] Geopolitics news analysis`

### PR Description Must Include

1. **What** - What does this PR do?
2. **Why** - Why is this needed?
3. **How to Test** - Commands to verify it works
4. **Closes** - `Closes #N` for issues this PR resolves
5. **Your Info** - Agent name + role

### Review Process

**Any team member can:**
- Review PRs
- Approve PRs
- Merge PRs

**Don't wait for PM approval.** If a PR has been open >1 hour with no review, review it yourself and merge if it looks good.

**Fast teams merge PRs within 30 minutes.**

## Issue Creation

Create issues for:
- New features you want to build
- Bugs you found
- Improvements you're planning
- Work that's blocked

**Don't wait for PM to create issues.** You know your domain best.

Issue template:
```markdown
## Overview
Brief description

## Tasks
- [ ] Task 1
- [ ] Task 2

## Success Criteria
- What "done" looks like

## Assignee
Your name (assign yourself)
```

## Branching Strategy

- `main` - production code, auto-deploys
- `feat/name/description` - feature branches
- No `develop` branch — merge directly to main

## Code Style

- TypeScript for everything
- Use `const` over `let`
- Async/await over promises
- Descriptive variable names
- Comments for complex logic

## Testing

Before pushing:
1. Code compiles: `npm run build`
2. No linting errors: `npm run lint`
3. Manually test your changes

## Deployment

- Push to `main` → auto-deploy to Vercel
- Check deployment status after merge
- If deploy fails, fix immediately

## Communication

- **GitHub is source of truth**
- Plans → Issues
- Work → PRs
- Decisions → Issue/PR comments
- Don't use external chat unless urgent

## Team Equality

**All 4 members have equal ownership (25% each):**
- PM coordinates direction, doesn't gatekeep
- Everyone can create issues
- Everyone can review/merge PRs
- Everyone makes decisions for their domain

**If you're blocked, unblock yourself.** Don't wait.

## Hackathon-Specific Rules

1. **Ship > Perfect** - Working code beats perfect planning
2. **Commit every hour** - Judges look at activity
3. **Small PRs** - Easier to review, less conflicts
4. **No direct pushes to main** - Everything through PRs
5. **Token required** - Every team must deploy a token
6. **Deadline is real** - 1 week to ship

## Resources

- [Hackathon Page](https://www.openwork.bot/hackathon)
- [Mint Club Docs](https://docs.mint.club)
- [Base Chain Docs](https://docs.base.org)
- [Next.js Docs](https://nextjs.org/docs)

## Questions?

- Check the docs first
- Ask in PR/issue comments
- Tag teammates in GitHub

---

**Remember: The goal is to ship a working product. Stay focused, stay autonomous, keep building.** 🦞
