# Contributing to Hanif Habib & Cco. Website

We welcome contributions to the Hanif Habib & Cco. website! Please follow these guidelines to ensure a smooth and efficient contribution process.

## Branching Strategy

We use a simplified Gitflow branching model:

*   **main:** Production-ready code.
*   **develop:** Integration branch for new features.
*   **feature/\***: Short-lived branches for developing new features.

## Pull Request Workflow

1.  Create a new `feature` branch from `develop`.
2.  Implement your changes and commit them to the `feature` branch.
3.  Push the `feature` branch to the remote repository.
4.  Create a pull request targeting the `develop` branch.
5.  Address any feedback from code reviews.
6.  Once approved, the PR will be merged into `develop`.

## Development Workflow

### Setting up the development environment

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Making changes

1. Create a new feature branch:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

2. Make your changes and test them locally.

3. Commit your changes with meaningful commit messages:
```bash
git add .
git commit -m "Add feature: brief description of changes"
```

4. Push your branch to GitHub:
```bash
git push -u origin feature/your-feature-name
```

5. Create a pull request on GitHub.

## Coding Standards

*   Follow the existing coding style.
*   Write clear, concise, and well-documented code.
*   Use meaningful variable and function names.
*   Keep components small and focused with a single responsibility.
*   Use TypeScript types appropriately.
*   Follow React best practices.

## Component Guidelines

When creating new components:

1. Place them in the appropriate directory based on their purpose:
   - Common components in `src/components/common`
   - Page-specific components in `src/components/[page-name]`
   - Layout components in `src/components/layout`

2. Use TypeScript interfaces for component props.

3. Follow this basic component structure:
```tsx
import React from 'react';
import { SomeIcon } from 'lucide-react';

interface MyComponentProps {
  title: string;
  description?: string;
  // other props...
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  description,
  // other props... 
}) => {
  return (
    <div className="[tailwind classes]">
      <h3 className="[tailwind classes]">{title}</h3>
      {description && <p className="[tailwind classes]">{description}</p>}
      {/* component content */}
    </div>
  );
};

export default MyComponent;
```

## Pull Request Guidelines

*   Keep PRs focused on a single feature or fix.
*   Include a clear description of the changes.
*   Reference any related issues.
*   Update documentation if necessary.
*   Ensure all tests pass.

## Code Review Guidelines

*   Review code early and often.
*   Focus on code quality, potential bugs, and security vulnerabilities.
*   Provide constructive feedback and suggestions for improvement.
*   Be respectful and considerate of the author's work.

Thank you for contributing!