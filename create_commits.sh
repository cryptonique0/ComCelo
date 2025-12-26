#!/bin/bash

# Add security policy
cat > SECURITY.md << 'EOF'
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@comcelo.example.com.
Do not open public issues for security vulnerabilities.
EOF
git add SECURITY.md && git commit -m "docs: add security policy" && git push

# Add code of conduct
cat > CODE_OF_CONDUCT.md << 'EOF'
# Code of Conduct

## Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

## Our Standards
- Be respectful
- Be collaborative
- Focus on what is best for the community
EOF
git add CODE_OF_CONDUCT.md && git commit -m "docs: add code of conduct" && git push

# Add issue templates directory
mkdir -p .github/ISSUE_TEMPLATE

cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug report
about: Create a report to help us improve
---

**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.
EOF
git add .github/ISSUE_TEMPLATE/bug_report.md && git commit -m "chore: add bug report template" && git push

cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature request
about: Suggest an idea
---

**Feature Description**
Describe the feature you'd like to see.

**Use Case**
Explain why this would be useful.
EOF
git add .github/ISSUE_TEMPLATE/feature_request.md && git commit -m "chore: add feature request template" && git push

# Add PR template
cat > .github/PULL_REQUEST_TEMPLATE.md << 'EOF'
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows style guidelines
EOF
git add .github/PULL_REQUEST_TEMPLATE.md && git commit -m "chore: add pull request template" && git push

echo "Created 5 commits so far..."
