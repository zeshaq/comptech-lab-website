---
name: No CommonMark autolinks in MDX
description: MDX's JSX-aware parser treats `<https://…>` autolinks as JSX tags and fails; always use `[text](url)` link syntax in MDX content on this blog
metadata:
  type: feedback
---

Don't write CommonMark autolinks (`<https://example.com>`) inside `.mdx`
files on the zahid blog. The MDX parser tokenizes `<...>` as a JSX tag,
which fails immediately on the `/` after `https:` with:

```
[@mdx-js/rollup] Unexpected character `/` (U+002F) before local name,
expected a character that can start a name, such as a letter, `$`,
or `_` (note: to create a link in MDX, use `[text](url)`)
```

**Why:** MDX intentionally narrows CommonMark autolink support so that
`<Component …/>` and friends are unambiguous. The error hint itself
spells out the workaround.

**How to apply:**
- Use markdown link syntax: `[github.com/owner/repo/security](https://github.com/owner/repo/security)`.
- This applies inside lists, paragraphs, callouts — anywhere. The
  parser doesn't care about context.
- Same rule generalizes to anything that *looks* like JSX in prose:
  see [[feedback-mdx-no-js-comments]] for the `//` issue and the
  CLAUDE.md gotchas section for `<digit` and `{...}` escaping.

Related: [[feedback-mdx-no-js-comments]], CLAUDE.md §6 "MDX gotchas with diagrams".
