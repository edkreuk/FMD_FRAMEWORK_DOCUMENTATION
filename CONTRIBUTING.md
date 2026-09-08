# Contributing to FMD Documentation

Thank you for your interest in contributing to the **Fabric Metadata-Driven Framework (FMD)** documentation.

Community contributions help make FMD clearer, more practical, and more valuable for Microsoft Fabric users. Whether you want to correct a typo, improve an explanation, add a tested example, or propose a new guide, your contribution is welcome.

## Code of Conduct

By participating in this project, you agree to contribute respectfully, constructively, and professionally.

We are committed to maintaining a welcoming, inclusive, and collaborative environment for everyone in the Microsoft Fabric community. Please review the repository's `CODE_OF_CONDUCT.md` before contributing.

## Ways to Contribute

### Improve Existing Documentation

You can help by:

- Correcting spelling, grammar, or formatting issues
- Clarifying setup and configuration instructions
- Improving technical explanations
- Updating outdated screenshots or examples
- Adding useful cross-references
- Expanding troubleshooting guidance

### Add Examples and Guides

Useful contributions include:

- Sample metadata configurations
- Ingestion and transformation patterns
- Pipeline and notebook examples
- Lakehouse and Medallion Architecture guidance
- Incremental loading patterns
- Data quality and observability examples
- Troubleshooting scenarios and resolutions

All examples should be generic, reproducible, and free of customer-specific or confidential information.

### Report a Documentation Issue

Before opening an issue, search the existing issues to avoid duplicates.

When reporting a documentation problem, include:

- The affected page or file
- A link to the published page, when available
- A clear description of the issue
- The expected or suggested content
- Screenshots, logs, or examples where helpful

### Propose New Documentation

For larger additions, open a documentation or feature request before starting substantial work. Describe:

- The problem or knowledge gap
- The intended audience
- The proposed page or section
- The expected benefit to FMD users

This allows maintainers and contributors to align on scope and avoid duplicate work.

## Before You Start

Please review:

- Existing issues
- Open pull requests
- The public roadmap, if available
- Related documentation in the repository

For significant changes, reference an existing issue in your pull request or create one first.

## Repository Structure

Place new documentation in the most appropriate section:

```text
docs/
├── 01-tutorial/
├── 02-how-to/
├── 03-reference/
├── 04-explanation/

```

Use:

- `01-tutorial/` for high-level FMD orientation
- `02-how-to/` for prerequisites, installation, and first-use guidance
- `03-reference/` for explanations of FMD building blocks
- `04-explanation/` for design, security, governance, and platform architecture

## Documentation Standards

### Writing Style

Write content that is:

- Clear and concise
- Practical and task-focused
- Accessible to readers with different experience levels
- Technically accurate
- Consistent with Microsoft Fabric and FMD terminology

Prefer direct instructions:

> Create a Lakehouse in the Bronze workspace.

> Configure the metadata entry before running the ingestion pipeline.

Avoid:

- Unnecessary marketing language
- Undefined abbreviations
- Long or ambiguous sentences
- Assumptions about customer environments
- Claims that cannot be tested or verified

Define abbreviations the first time they are used. Use **Fabric Metadata-Driven Framework (FMD)** on first reference and **FMD** afterward.

### Page Titles and Headings

Use one level-one heading per page:

```markdown
# Page title

## Main section

### Subsection
```

Use sentence case for headings unless a product or feature name requires different capitalization.

### Recommended Page Template

Use this structure when it fits the topic:

```markdown
# Page title

## Overview

Briefly explain the purpose of the page and what the reader will accomplish.

## Prerequisites

List required permissions, tools, Fabric items, or prior configuration.

## Steps

Provide numbered, reproducible instructions.

## Example

Include a practical and tested example.

## Validation

Explain how the reader can confirm that the result is correct.

## Troubleshooting

Document common issues and resolutions where relevant.

## Related documentation

Link to related pages using descriptive link text.
```

Not every page needs every section. Conceptual pages, for example, may not require numbered steps.

## Markdown Guidelines

### Lists

Use numbered lists for ordered procedures and bullet lists for unordered information.

### Code Blocks

Always specify the language when possible:

````markdown
```python
print("Hello FMD")
```
````

For commands:

````markdown
```bash
npm run build
```
````

Do not include real credentials, tokens, tenant IDs, subscription IDs, workspace IDs, or customer names in examples. Use clear placeholders such as:

```text
<WORKSPACE_ID>
<LAKEHOUSE_NAME>
<TENANT_ID>
```

### Links

Use descriptive text instead of phrases such as "click here."

Prefer repository-relative links for other documentation pages:

```markdown
[Review the FMD architecture](../architecture/overview.md)
```

Check all links before submitting a pull request.

### Notes, Tips, and Warnings

Use Docusaurus admonitions where appropriate:

```markdown
:::note
This setting applies to all entities using the selected connection.
:::

:::tip
Validate the metadata configuration before running the pipeline.
:::

:::warning
Do not include credentials directly in metadata or documentation examples.
:::
```

Use warnings only when the information has a genuine operational, security, or data-loss impact.

## Images and Diagrams

Store public documentation images under:

```text
static/img/
```

Use descriptive, lowercase file names with hyphens:

```text
static/img/fmd-medallion-architecture.png
```

Images should:

- Directly support the surrounding content
- Be readable on desktop and mobile screens
- Avoid customer names and confidential information
- Avoid credentials, tenant details, and identifiable environment data
- Be optimized for web use
- Use PNG, WebP, or SVG where appropriate

Always provide meaningful alt text:

```markdown
![FMD metadata flow from configuration to pipeline execution](/img/fmd-metadata-flow.png)
```

When replacing an image, remove obsolete assets if they are no longer referenced.

## Examples and Technical Content

Technical examples must be:

- Tested where reasonably possible
- Complete enough to understand
- Consistent with the documented FMD version
- Free of secrets and customer-specific data
- Accompanied by prerequisites and expected results

If an example is intentionally simplified, state that clearly.

Avoid presenting experimental or unreleased functionality as generally available. If preview functionality is documented, label it clearly and describe any known limitations.

## Local Development

Clone your fork and install the documentation dependencies:

```bash
git clone https://github.com/<YOUR-GITHUB-USER>/<FMD-DOCS-REPOSITORY>.git
cd <FMD-DOCS-REPOSITORY>
npm ci
```

Start the local documentation site:

```bash
npm run start
```

Validate the documentation before submitting your changes:

```bash
npm run validate
```

If the repository does not provide a `validate` script, run the available Markdown validation and production build commands defined in `package.json`.

## Contribution Workflow

### 1. Fork and Clone the Repository

Create a fork in GitHub and clone it locally.

### 2. Create a Branch

Create a short-lived branch from the latest `main` branch:

```bash
git checkout main
git pull origin main
git checkout -b docs/add-incremental-ingestion-guide
```

Use one of these branch prefixes:

```text
docs/<topic>
fix/<issue>
guide/<topic>
```

Examples:

```text
docs/improve-metadata-reference
fix/broken-installation-link
guide/incremental-ingestion
```

### 3. Make Focused Changes

Keep each pull request focused on one topic. Avoid combining unrelated corrections, restructuring, and new content in the same pull request.

### 4. Commit Your Changes

Use concise and meaningful commit messages:

```text
docs: add medallion architecture guide
docs: clarify workspace prerequisites
fix: correct metadata configuration example
fix: repair broken installation link
```

### 5. Validate Locally

Confirm that:

- The documentation builds successfully
- Markdown validation passes
- Links work
- Images render correctly
- Code and configuration examples are valid
- No secrets or private information are included

### 6. Open a Pull Request

Push your branch and create a pull request against `main`.

In the pull request description, include:

- A summary of the change
- The problem being solved
- A reference to the related issue, if applicable
- Screenshots for visual changes
- How the content or example was validated

## Pull Request Checklist

Before submitting your pull request, confirm:

- [ ] The change is focused and appropriately scoped
- [ ] The documentation builds successfully
- [ ] Markdown formatting and headings are correct
- [ ] Links have been checked
- [ ] Images include meaningful alt text
- [ ] Screenshots are current and contain no sensitive data
- [ ] Examples were tested where applicable
- [ ] FMD and Microsoft Fabric terminology is used consistently
- [ ] No secrets, credentials, customer names, or private roadmap information are included
- [ ] The pull request description explains what changed and why

## Review and Merge Process

Maintainers review all contributions before merging. During review, maintainers may:

- Request technical corrections
- Suggest structural or editorial improvements
- Ask for additional validation
- Move content to a more appropriate section
- Decline a contribution that does not align with the documentation scope or project direction

The public documentation repository uses pull requests and squash merging. The `main` branch should remain in a publishable state.

Be responsive to review feedback and keep discussions focused on improving the contribution.

## Security and Responsible Disclosure

Do not open a public issue for a suspected security vulnerability.

Follow the process described in `SECURITY.md` to report security concerns privately. Do not include exploit details, credentials, tenant information, or sensitive logs in public issues or pull requests.

## Content That Must Not Be Submitted

Do not submit:

- Credentials, secrets, access tokens, or connection strings
- Real tenant, capacity, workspace, Lakehouse, or subscription identifiers
- Customer names, configurations, screenshots, or proprietary data
- Internal deployment scripts or commercial tooling
- Private prompts, skills, agents, or automation assets
- Confidential architecture or operational information
- Unannounced features or non-public roadmap items
- Third-party content you do not have permission to contribute

If you are unsure whether content is suitable for the public repository, remove or anonymize the sensitive elements before submitting it.

## Licensing

By submitting a contribution, you agree that your contribution may be distributed under the license of this repository. Ensure that you have the right to contribute all text, code, images, diagrams, and other materials included in your pull request.

## Recognition

Every contribution helps data professionals understand and use the Fabric Metadata-Driven Framework more effectively.

Thank you for contributing to FMD and supporting the Microsoft Fabric community.
