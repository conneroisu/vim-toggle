# Contributing to Vim Toggle

Thank you for your interest in contributing to Vim Toggle! This document provides guidelines for contributing to this Obsidian plugin.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Bun (package manager)
- TypeScript knowledge
- Basic understanding of Obsidian plugin development
- Nix (optional, but recommended for consistent development environment)

### Development Setup

#### Option 1: Using Nix Flake (Recommended)

This project includes a `flake.nix` that provides a complete development environment with all necessary tools and dependencies.

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/vim-toggle.git
   cd vim-toggle
   ```

2. **Enter Development Shell**
   ```bash
   nix develop
   ```
   
   This automatically provides:
   - Bun package manager
   - TypeScript language server
   - Formatters (Alejandra for Nix, Biome for TypeScript/JavaScript)
   - Linters (oxlint, statix, deadnix)
   - Development scripts

3. **Available Scripts in Nix Shell**
   - `dx`: Edit the flake.nix file

4. **Format Code**
   ```bash
   nix fmt
   ```

#### Option 2: Manual Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/vim-toggle.git
   cd vim-toggle
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Development Build**
   ```bash
   bun run dev
   ```

4. **Production Build**
   ```bash
   bun run build
   ```

## Development Workflow

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting and style
- Use descriptive variable and function names
- Add JSDoc comments for public methods and interfaces
- Maintain consistent indentation (tabs)

#### With Nix
If using the Nix development environment, code formatting is handled automatically:
```bash
nix fmt  # Formats all code (Nix, TypeScript, JavaScript)
```

#### Manual Formatting
If not using Nix, ensure consistent formatting manually or set up the formatters specified in `flake.nix`:
- Biome for TypeScript/JavaScript
- Alejandra for Nix files

### File Structure

```
vim-toggle/
├── main.ts              # Main plugin code
├── manifest.json        # Plugin manifest
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── esbuild.config.mjs   # Build configuration
└── docs/                # Documentation assets
```

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code patterns
   - Test your changes thoroughly
   - Update documentation if needed

3. **Build and Test**
   ```bash
   # With Nix (recommended)
   nix develop  # Enter development shell if not already
   bun run build
   
   # Manual setup
   bun run build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## Pull Request Process

1. **Before Submitting**
   - Ensure your code builds successfully
   - Test the plugin in Obsidian
   - Update documentation if necessary
   - Follow the commit message format

2. **Commit Message Format**
   Use conventional commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code refactoring
   - `test:` for test additions
   - `chore:` for maintenance tasks

3. **Submit Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## Code Guidelines

### TypeScript

- Use explicit type annotations where helpful
- Leverage Obsidian's type definitions
- Handle errors appropriately
- Use async/await for asynchronous operations

### Plugin Development

- Follow Obsidian plugin best practices
- Use the plugin lifecycle methods appropriately
- Handle settings persistence correctly
- Provide user feedback for actions
- Ensure mobile compatibility when possible

### Example Code Pattern

```typescript
/**
 * Description of what this function does
 */
async functionName(parameter: Type): Promise<ReturnType> {
    try {
        // Implementation
        return result;
    } catch (error) {
        console.error('Error in functionName:', error);
        // Handle error appropriately
    }
}
```

## Testing

### Manual Testing

1. **Install in Obsidian**
   - Copy built files to `.obsidian/plugins/vim-toggle/`
   - Enable the plugin in Obsidian settings
   - Test all commands and settings

2. **Test Scenarios**
   - Toggle vim mode on/off
   - Test with canvas files
   - Verify settings persistence
   - Test notifications
   - Check mobile compatibility (if applicable)

### Key Testing Areas

- Command functionality
- Settings tab behavior
- Canvas file handling
- Notification system
- Mobile vs desktop differences

## Reporting Issues

### Bug Reports

Include:
- Obsidian version
- Plugin version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

### Feature Requests

Include:
- Clear description of the feature
- Use case or problem it solves
- Possible implementation approach
- Any relevant examples

## Code of Conduct

- Be respectful and constructive
- Focus on the code and ideas, not the person
- Help create a welcoming environment
- Follow GitHub's community guidelines

## Getting Help

- Check existing issues and discussions
- Review the Obsidian plugin development documentation
- Ask questions in GitHub discussions
- Join the Obsidian community forums

## Plugin Architecture

### Core Components

- **VimToggle**: Main plugin class handling commands and lifecycle
- **VimToggleSettings**: Interface defining plugin settings
- **VimToggleSettingsTab**: Settings UI implementation

### Key Methods

- `toggleVimMode()`: Toggles vim state
- `turnOnVimMode()` / `turnOffVimMode()`: Explicit state changes
- `getVimMode()`: Retrieves current vim state

### Settings

- `notification`: Show toggle notifications
- `debug`: Enable debug logging
- `canvasVim`: Auto-disable vim in canvas files

## Resources

- [Obsidian Plugin Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [Obsidian API Reference](https://docs.obsidian.md/Reference/TypeScript+API)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

By contributing to Vim Toggle, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Vim Toggle! Your efforts help make this plugin better for the entire Obsidian community.