---
name: Translation Update Request
about: Request translations for new or updated content
title: '[TRANSLATION] '
labels: translation, i18n
assignees: ''
---

## Translation Request

### Languages Needed

- [ ] German (de)
- [ ] Bosnian (bs)
- [ ] Simplified Chinese (zh)
- [ ] Japanese (ja)
- [ ] French (fr)
- [ ] Italian (it)

### Priority

- [ ] High (Legal/Financial/Regulatory - requires professional translation)
- [ ] Medium (Marketing/Investor relations)
- [ ] Low (UI labels/buttons)

### Deadline

**Needed by**: [YYYY-MM-DD]

### Content Type

- [ ] Marketing copy
- [ ] Financial/Legal content
- [ ] UI labels and buttons
- [ ] Form fields and validation
- [ ] Help text and tooltips
- [ ] Meta descriptions and SEO
- [ ] Other: [specify]

---

## Translation Keys

List the translation keys that need to be translated:

```json
{
  "namespace.feature.element": "English text here",
  "another.key.path": "Another English text"
}
```

### Context and Usage

Describe where and how this text will be used:

- **Page/Section**: [e.g., Investor Centre > ASX Announcements]
- **Element Type**: [e.g., Button, Heading, Body text, Form label]
- **Character Limit**: [e.g., Max 20 characters for button]
- **Tone**: [e.g., Formal, Professional, Conversational]

### Screenshots or Mockups

If possible, attach screenshots showing where the text appears:

[Attach images here]

---

## Additional Notes

### Special Instructions

Any specific requirements or considerations:

- Terminology to use/avoid
- Target audience considerations
- Regional variations needed
- Links to style guides

### Related Issues/PRs

- Related to #[issue number]
- Part of epic: #[epic number]

---

## Translation Checklist

Before submitting this request:

- [ ] All translation keys added to `messages/en.json`
- [ ] Placeholder text added to other language files
- [ ] Validation script run: `npm run validate:translations`
- [ ] Context and usage clearly described
- [ ] Priority and deadline specified

---

## For Translators

### Terminology Reference

Refer to the [Translation Workflow Guide](../TRANSLATION_WORKFLOW.md) for:
- Terminology glossary
- Style guidelines
- What to translate vs. not translate
- Quality assurance checklist

### Translation Memory

Check if similar content has been translated before:
- Review existing translations in `messages/` folder
- Maintain consistency with established terminology
- Flag any unclear or ambiguous terms

### Questions?

If you need clarification or more context:
- Comment on this issue
- Contact the translation coordinator
- Review the implementation in the codebase

---

## Completion Checklist

When translations are complete:

- [ ] All requested languages translated
- [ ] Translations reviewed by second native speaker
- [ ] Translations tested in-context on staging
- [ ] No text overflow or layout issues
- [ ] Validation script passes
- [ ] Pull request created and linked to this issue
