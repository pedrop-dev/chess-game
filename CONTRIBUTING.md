# Chess Game Repository Contribution Guidelines

Thank you for considering contributing to our chess game repository! We appreciate your interest in improving and extending our project. To ensure a smooth and collaborative development process, please follow the guidelines outlined below.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Development Workflow](#development-workflow)
    - [Branching](#branching)
    - [Coding Standards](#coding-standards)
    - [Commit Guidelines](#commit-guidelines)
    - [Testing](#testing)
4. [Submitting Changes](#submitting-changes)
    - [Pull Requests](#pull-requests)
    - [Code Review](#code-review)
5. [Reporting Issues](#reporting-issues)
6. [Community and Communication](#community-and-communication)
7. [Acknowledgments](#acknowledgments)
8. [License](#license)

## Introduction

This repository contains a chess game implemented with React.js for the frontend and Flask for the backend. We welcome contributions from the community to enhance the game's features, fix bugs, and improve overall quality.

## Getting Started

### Prerequisites

Ensure that you have the following software installed on your local machine:

- Node.js (https://nodejs.org/)
- Python (https://www.python.org/)
- Git (https://git-scm.com/)

### Installation

1. Fork the repository to your GitHub account.
2. Clone your fork to your local machine.
   ```bash
   git clone https://github.com/pedrop-dev/chess-game.git
   ```
3. Navigate to the project directory.
   ```bash
   cd chess-game
   ```
4. Install dependencies for the frontend and backend.
   ```bash
   # Frontend (React.js)
   npm install

   # Backend (Flask)
   cd api
   pipenv install
   pipenv shell
   ```

## Development Workflow

### Branching

- Create a new branch for your feature or bug fix.
  ```bash
  git checkout -b feature/new-feature
  ```
- Ensure that your branch is based on the latest `main` branch.

### Coding Standards

- Follow the coding standards and guidelines provided in the respective frontend and backend directories.

### Commit Guidelines

- Make meaningful and atomic commits.
- Write clear and concise commit messages.
- Use present tense in commit messages ("Add feature" instead of "Added feature").

### Testing

- Ensure that your changes include appropriate tests.
- Run tests locally to verify that your changes do not break existing functionality.

## Submitting Changes

### Pull Requests

1. Push your changes to your fork on GitHub.
   ```bash
   git push origin feature/new-feature
   ```
2. Open a pull request against the `main` branch of the main repository.
3. Provide a detailed description of your changes in the pull request.

### Code Review

- Be open to feedback and address comments raised during the code review process.
- Squash and rebase commits as needed.

## Reporting Issues

If you encounter any issues or have suggestions for improvement, please report them on the [issue tracker](https://github.com/pedrop-dev/chess-game/issues).


## Acknowledgments

We appreciate and acknowledge all contributors for their valuable contributions to the project.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for your contribution! We look forward to working with you to improve our chess game.
