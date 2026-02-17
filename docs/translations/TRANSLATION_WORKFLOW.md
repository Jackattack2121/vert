# Translation Management Workflow

This document outlines the process for managing translations across all supported languages in the Yugo Metals website.

## Supported Languages

- **English (en)** - Primary/Source language
- **German (de)** - Deutsch
- **Bosnian (bs)** - Bosanski
- **Simplified Chinese (zh)** - 中文
- **Japanese (ja)** - 日本語
- **French (fr)** - Français
- **Italian (it)** - Italiano

## Translation File Structure

All translation files are located in the `/messages` directory:

```
messages/
  ├── en.json (source of truth)
  ├── de.json
  ├── bs.json
  ├── zh.json
  ├── ja.json
  ├── fr.json
  └── it.json
```

## Translation Key Naming Conventions

### Standard Format

Use the pattern: `{namespace}.{feature}.{element}.{modifier}`

### Rules

1. **Use camelCase consistently**
   - Good: `investors.sharePrice.currentLabel`
   - Bad: `investors.share_price.current_label`

2. **Be descriptive, not positional**
   - Good: `common.buttons.submitButton`
   - Bad: `common.buttons.button1`

3. **Keep under 50 characters**
   - Good: `investors.announcements.filterByCategory`
   - Bad: `investors.asxAnnouncementsPage.filterAnnouncementsBySelectedCategory`

4. **Avoid generic terms**
   - Good: `homepage.hero.title`
   - Bad: `homepage.title1`

5. **Group by feature, not by page**
   - Good: `investors.sharePrice.label`
   - Bad: `investorsPage.widgetArea.priceLabel`

6. **No spaces or special characters except dots**
   - Good: `navigation.header.aboutLink`
   - Bad: `navigation.header.about link` or `navigation.header.about-link`

### Namespace Organization

```json
{
  "common": {
    // Shared across all pages: buttons, errors, loading states
  },
  "navigation": {
    // Header, footer, mobile menu, breadcrumbs
  },
  "investors": {
    // All investor centre content
  },
  "projects": {
    // All project-specific content
  },
  "company": {
    // About, governance, board, corporate info
  },
  "forms": {
    // Labels, placeholders, validation messages
  },
  "asx": {
    // Regulatory content markers and notices
  }
}
```

### Examples

```json
{
  "navigation.header.aboutLink": "About",
  "navigation.header.investorsLink": "Investors",
  "investors.centre.welcomeTitle": "Investor Centre",
  "investors.sharePrice.currentLabel": "Current Price",
  "investors.sharePrice.changeLabel": "Change",
  "common.buttons.submit": "Submit",
  "common.buttons.cancel": "Cancel",
  "common.errors.networkError": "Network connection failed",
  "projects.doboj.title": "Doboj Project",
  "projects.doboj.description": "High-grade nickel exploration...",
  "footer.newsletter.title": "Stay Informed",
  "footer.newsletter.placeholder": "Your email address"
}
```

## Adding New Translation Keys

When you need to add new translatable content to the site:

### 1. Add to English Source (en.json)

Add the key to `messages/en.json` first, as it's the source of truth:

```json
{
  "investors": {
    "newFeature": {
      "title": "New Feature Title",
      "description": "Description of the new feature"
    }
  }
}
```

### 2. Add to All Other Language Files

Copy the same key structure to all other language files (`de.json`, `bs.json`, etc.), temporarily using the English text:

```json
// messages/de.json
{
  "investors": {
    "newFeature": {
      "title": "New Feature Title",  // TODO: Translate to German
      "description": "Description of the new feature"  // TODO: Translate to German
    }
  }
}
```

### 3. Mark for Translation

Add a comment in the JSON file or create a translation request issue (see below).

### 4. Validate

Run the validation script to ensure all files have matching keys:

```bash
npm run validate:translations
```

### 5. Create Translation Request

Use the GitHub issue template to request professional translations (see Translation Request Process below).

## Translation Request Process

### When to Request Professional Translation

**Always use professional translation for:**
- Financial content and reports
- Legal documents and disclaimers
- ASX regulatory content labels
- Corporate governance materials
- Press releases and official announcements
- Marketing copy for investor relations

**Can use internal translation for:**
- UI labels and buttons
- Navigation elements
- Form field labels
- Error messages
- Help text and tooltips

### Creating a Translation Request

1. Go to GitHub Issues
2. Click "New Issue"
3. Select "Translation Update Request" template
4. Fill in:
   - **Languages needed**: Which locales need updating
   - **Keys to translate**: List of translation keys
   - **Context**: Explain where and how the text is used
   - **Priority**: High (legal/financial), Medium (marketing), Low (UI)
   - **Deadline**: When translations are needed by

### Translation Review Process

1. **Translation** - Professional translator or native speaker translates
2. **Review** - Second native speaker reviews for accuracy
3. **Testing** - Test translations in-context on the website
4. **Proofreading** - Final check for grammar, spelling, formatting
5. **Deployment** - Merge approved translations

## What to Translate vs. Not Translate

### ✅ Always Translate

- Page titles and headings
- Body content and descriptions
- Navigation labels
- Button labels and CTAs
- Form labels and placeholders
- Error messages and validation
- Help text and tooltips
- Meta titles and descriptions
- Alt text for images (context-dependent)

### ❌ Never Translate

- **ASX announcements** - Must remain in English per regulatory requirements
- Company registration numbers (ABN, ACN, etc.)
- Email addresses and phone numbers
- Product codes and identifiers
- Technical abbreviations (ASX, ESG, IR, NI 43-101)
- Currency codes (AUD, USD)
- Proper nouns (Yugo Metals, Doboj Project, Jezero Project)*

*Note: Some proper nouns may need local variations - consult with regional teams

### ⚠️ Special Cases

- **Numbers**: Use locale-specific formatting
  - US: 1,000.50
  - Germany: 1.000,50
  - France: 1 000,50

- **Dates**: Use locale-specific formats
  - US: MM/DD/YYYY
  - EU: DD/MM/YYYY
  - China/Japan: YYYY-MM-DD

- **Addresses**: Adapt format to local conventions

- **Names**: Consider name order (Given-Family vs Family-Given)

## Localization Beyond Translation

### Cultural Adaptation

- **Bosnian (bs)**: Emphasize local operations and community impact
- **Chinese (zh)**: Highlight Asia-Pacific opportunities and partnerships
- **German (de)**: Focus on technical precision and regulatory compliance
- **French (fr)**: Emphasize EU market access
- **Italian (it)**: Similar to French - EU focus
- **Japanese (ja)**: Formal business tone, detail-oriented

### Regional Content Variations

Consider creating locale-specific content variations:
- Local news and events
- Regional regulatory information
- Market-specific opportunities
- Local contact information

## Translation Quality Assurance

### Before Submitting Translations

- [ ] Run validation script: `npm run validate:translations`
- [ ] Test translations in-context on the website
- [ ] Check text length doesn't break UI (German +30% longer than English)
- [ ] Verify numbers and dates use correct locale formatting
- [ ] Ensure proper nouns are handled correctly
- [ ] Check for consistency with existing translations

### Testing Translations

1. **Visual Testing**: View pages in each locale to check layout
2. **Length Testing**: Ensure translations fit in buttons, navigation, headings
3. **Contextual Testing**: Verify translations make sense in context
4. **Linguistic Testing**: Have native speaker review in-context

### Common Issues

1. **Text Overflow**: German and French translations are typically 30% longer
   - Solution: Use flexible layouts, test with longest language

2. **Missing Context**: Translators need to know where text appears
   - Solution: Provide screenshots or context in translation requests

3. **Inconsistent Terminology**: Same word translated differently
   - Solution: Maintain a terminology glossary (see below)

4. **Placeholder Translations**: English text in non-English files
   - Solution: Run validation script regularly

## Terminology Glossary

Maintain consistency for technical and mining-specific terms:

| English | German | Bosnian | Chinese | Japanese | French | Italian |
|---------|--------|---------|---------|----------|--------|---------|
| Exploration | Exploration | Istraživanje | 勘探 | 探査 | Exploration | Esplorazione |
| Nickel | Nickel | Nikal | 镍 | ニッケル | Nickel | Nichel |
| Cobalt | Kobalt | Kobalt | 钴 | コバルト | Cobalt | Cobalto |
| Announcement | Bekanntmachung | Obavijest | 公告 | 発表 | Annonce | Annuncio |
| Share Price | Aktienkurs | Cijena dionica | 股价 | 株価 | Cours de l'action | Prezzo delle azioni |
| Investor | Investor | Investitor | 投资者 | 投資家 | Investisseur | Investitore |

*Note: Update this glossary as more terms are identified*

## Translation Management Tools

### Current Setup

- **Translation Files**: JSON files in `/messages` directory
- **Validation**: Automated script (`npm run validate:translations`)
- **Version Control**: Git for all translation files

### Future Considerations

For scaling translation management, consider:

1. **Lokalise** or **Crowdin**
   - Collaborative translation platform
   - Translation memory (TM) for consistency
   - GitHub integration for automated PRs
   - Professional translator marketplace

2. **Translation Memory (TM)**
   - Reuse previous translations
   - Ensure consistency across updates
   - Reduce costs for repeated content

3. **Machine Translation Post-Editing (MTPE)**
   - Use AI for first pass
   - Professional post-editing by humans
   - Cost-effective for large volumes
   - Quality depends on post-editing

## Validation and Testing

### Automated Validation

Run before every commit:

```bash
npm run validate:translations
```

This checks:
- All locales have matching keys
- No missing translations
- No extra keys
- Identifies placeholder translations (same as English)

### Manual Testing Checklist

- [ ] Test language switcher on all pages
- [ ] Verify translations display correctly
- [ ] Check date and number formatting
- [ ] Test ASX content remains English
- [ ] Verify lang attributes are correct
- [ ] Test with screen reader (accessibility)
- [ ] Check mobile view for text overflow

### E2E Testing

Run Playwright tests:

```bash
npm run test:e2e
```

Tests cover:
- Language switching functionality
- Cookie persistence
- Locale routing
- Accessibility (WCAG 2.1)
- Lang attribute validation

## Deployment Process

### Pre-Deployment

1. Run validation script
2. Run E2E tests
3. Visual QA in staging environment
4. Get approval from native speakers (if available)

### Post-Deployment

1. Monitor for missing translation errors in logs
2. Gather user feedback on translations
3. Track language usage in analytics
4. Iterate on translations based on feedback

## Maintenance

### Regular Tasks

- **Weekly**: Review new translation requests
- **Monthly**: Validate all translation files
- **Quarterly**: Audit for placeholder translations
- **Annually**: Full translation quality review by native speakers

### Updating Existing Translations

When English content changes:

1. Update `messages/en.json`
2. Mark changed keys in other language files
3. Create translation update request
4. Run validation to track progress
5. Deploy when all critical languages updated

## Contact and Support

### Translation Coordinators

- **English/German**: [Name/Contact]
- **Bosnian**: [Name/Contact]
- **Chinese/Japanese**: [Name/Contact]
- **French/Italian**: [Name/Contact]

### Getting Help

- **Technical issues**: Create GitHub issue
- **Translation questions**: Contact language coordinator
- **Professional translation**: See Translation Request Process

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ASX Regulatory Requirements](https://www.asx.com.au/regulation/rules)
- Translation validation script: `scripts/validate-translations.js`
- E2E tests: `e2e/` directory

---

**Last Updated**: 2026-02-01
**Version**: 1.0
