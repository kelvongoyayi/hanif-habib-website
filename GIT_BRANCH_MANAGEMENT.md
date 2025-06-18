# Git Branch Management Guide

## 🌿 Current Branch Status
- **Active Branch**: `main`
- **Tracking**: `origin/main` (GitHub)
- **Status**: Up to date

## 📋 Essential Branch Commands

### 1. **Viewing Branches**

```bash
# List local branches
git branch

# List all branches (local + remote)
git branch -a

# List remote branches only
git branch -r

# Show branch tracking information
git branch -vv

# Show detailed remote information
git remote show origin
```

### 2. **Creating Branches**

```bash
# Create a new branch (but stay on current branch)
git branch feature/new-feature

# Create and switch to new branch
git checkout -b feature/new-feature

# Modern way (Git 2.23+)
git switch -c feature/new-feature

# Create branch from specific commit
git checkout -b feature/bug-fix a7606fb
```

### 3. **Switching Between Branches**

```bash
# Switch to existing branch
git checkout main
git checkout feature/new-feature

# Modern way
git switch main
git switch feature/new-feature

# Switch to previous branch
git checkout -
git switch -
```

### 4. **Pushing Branches to Remote**

```bash
# Push current branch and set upstream tracking
git push -u origin feature/new-feature

# Push to remote (if tracking already set)
git push

# Push all branches
git push --all origin

# Push tags
git push --tags
```

### 5. **Pulling Changes from Remote**

```bash
# Pull changes from tracked remote branch  
git pull

# Pull from specific remote/branch
git pull origin main

# Fetch changes without merging
git fetch

# Fetch from all remotes
git fetch --all
```

### 6. **Deleting Branches**

```bash
# Delete local branch (safe - prevents deletion if unmerged)
git branch -d feature/completed-feature

# Force delete local branch
git branch -D feature/abandoned-feature  

# Delete remote branch
git push origin --delete feature/old-feature

# Delete remote tracking references that no longer exist
git remote prune origin
```

## 🔄 Common Workflows

### Workflow 1: Feature Development
```bash
# 1. Start from main
git checkout main
git pull

# 2. Create feature branch
git checkout -b feature/contact-form

# 3. Work on your feature... make commits
git add .
git commit -m "Add contact form validation"

# 4. Push to remote
git push -u origin feature/contact-form

# 5. Create Pull Request on GitHub
# 6. After approval, merge and cleanup
git checkout main
git pull
git branch -d feature/contact-form
```

### Workflow 2: Hotfix
```bash
# 1. Create hotfix from main
git checkout main
git pull
git checkout -b hotfix/critical-bug

# 2. Fix the issue and commit
git add .
git commit -m "Fix critical bug in PDF viewer"

# 3. Push and merge quickly
git push -u origin hotfix/critical-bug
# Create PR or merge directly if urgent
```

### Workflow 3: Release Branch
```bash
# 1. Create release branch
git checkout -b release/v1.1.0 main

# 2. Final testing, version bumps, etc.
git commit -m "Bump version to 1.1.0"

# 3. Merge to main and tag
git checkout main
git merge release/v1.1.0
git tag v1.1.0
git push origin main --tags

# 4. Cleanup
git branch -d release/v1.1.0
```

## 🔍 Checking Branch Status

### See what's different between branches:
```bash
# Compare current branch with main
git diff main

# Compare two branches
git diff main..feature/new-feature

# See commits in feature branch not in main
git log main..feature/new-feature --oneline

# See which files changed
git diff --name-only main..feature/new-feature
```

### Check branch relationships:
```bash
# See which branches contain a specific commit
git branch --contains a7606fb

# See which branches are merged into main
git branch --merged main

# See which branches are NOT merged
git branch --no-merged main
```

## ⚠️ Branch Management Best Practices

### 1. **Naming Conventions**
```bash
feature/user-authentication
bugfix/pdf-loading-error
hotfix/security-patch
release/v1.2.0
chore/update-dependencies
```

### 2. **Keep Branches Up to Date**
```bash
# Regularly sync with main
git checkout main
git pull
git checkout feature/my-feature
git merge main  # or git rebase main
```

### 3. **Clean Up Regularly**
```bash
# See merged branches
git branch --merged main

# Delete merged branches
git branch -d feature/completed-feature

# Clean up remote tracking branches
git remote prune origin
```

## 🚨 Emergency Commands

### Recover deleted branch:
```bash
# Find the commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch <commit-hash>
```

### Undo last commit (but keep changes):
```bash
git reset --soft HEAD~1
```

### Switch branch with uncommitted changes:
```bash
# Temporarily save changes
git stash

# Switch branch
git checkout other-branch

# Return and restore changes
git checkout original-branch
git stash pop
```

## 📊 Branch Visualization

```bash
# Pretty branch graph
git log --oneline --graph --all --decorate

# Show branch structure
git show-branch --all
```

## 🔧 Advanced Configuration

### Set default branch name:
```bash
git config --global init.defaultBranch main
```

### Auto-setup tracking:
```bash
git config --global push.autoSetupRemote true
```

### Prune on fetch:
```bash
git config --global fetch.prune true
```

---

## 📝 Your Current Setup Summary

- **Main Branch**: `main` (standard)
- **Remote**: `origin` → https://github.com/kelvongoyayi/hanif-habib-website.git
- **Tracking**: Local `main` tracks `origin/main`
- **Status**: ✅ Up to date and ready for development

You're all set for professional git branch management! 🎉 