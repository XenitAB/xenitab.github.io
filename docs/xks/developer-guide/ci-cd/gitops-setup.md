---
id: gitops
title: GitOps Setup
---

# GitOps Setup

## Validation for GitOps Status

Important to remember is to setup the Build Validation for the Status pipelin to trigger correctly.

That is done:
- In Azure devops
- Project Settings -> Repositories -> 'your-gitops-repo' -> On the 'Policies' tab
- Select your default branch, usually 'main'. And on the 'Build Validation' section, press the '+' button.
- Select your Status pipeline
- Enter the following settings:
- Trigger: Automatic
- Policy requirement: Required
- Build expiration: 12h