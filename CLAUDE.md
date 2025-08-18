# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Obsidian plugin called "Vim Toggle" that allows users to toggle Vim mode on and off within Obsidian. The plugin is particularly useful when working with Canvas files where Vim mode can be cumbersome.

## Development Commands

### Build and Development
- **Development build**: `npm run dev` or `bun run dev` - Uses esbuild with inline sourcemaps for development
- **Production build**: `npm run build` or `bun run build` - TypeScript type checking + esbuild production build
- **Version bump**: `npm run version` - Updates manifest.json and versions.json with new version

### Code Quality
- **TypeScript checking**: `tsc -noEmit -skipLibCheck` - Run type checking without emitting files
- **Linting**: Use ESLint configuration in `.eslintrc` - supports TypeScript with `@typescript-eslint` plugin
- **Formatting**: Prettier is configured with 2-space tabs (no hard tabs)

### Development Environment
- Uses Nix flake for development environment with `nix develop`
- Includes TypeScript language server, Biome formatter, and other development tools
- Alternative: Use Bun for package management and building

## Architecture and Structure

### Core Components
- **main.ts**: Single source file containing the entire plugin implementation
- **VimToggle class**: Main plugin class extending Obsidian's Plugin class
- **VimToggleSettingsTab**: Settings interface for configuration options
- **VimToggleSettings interface**: Type definitions for plugin settings

### Key Features
1. **Toggle Commands**: Three commands for toggling, turning on, and turning off Vim mode
2. **Ribbon Icon**: Quick access button in Obsidian's ribbon
3. **Canvas Integration**: Automatically turns off Vim mode when opening Canvas files (optional)
4. **Settings**: Notification preferences, debug mode, and Canvas behavior settings
5. **Cross-platform**: Works on both desktop and mobile with different implementation paths

### Plugin Settings
- `notification`: Boolean for showing toggle notifications
- `debug`: Boolean for console debug messages  
- `canvasVim`: Boolean for automatic Canvas file handling

### Build System
- **esbuild**: Primary bundler configured in `esbuild.config.mjs`
- **Target**: ES2018, CommonJS format
- **Externals**: Obsidian API and CodeMirror packages are external dependencies
- **Output**: Bundles to `main.js` for plugin distribution

### Release Process
- GitHub Actions workflow in `.github/workflows/main.yml`
- Triggered on git tags
- Builds with Bun, creates release with assets (main.js, manifest.json, zip)
- Uses `version-bump.mjs` to sync versions between package.json and manifest.json

## Mobile vs Desktop Implementation

The plugin handles mobile and desktop differently:
- **Desktop**: Uses `this.app.vault.setConfig("vimMode", boolean)`
- **Mobile**: Uses localStorage with "vim" key and `this.app.workspace.updateOptions()`

## Development Notes

- Uses `@ts-expect-error` comments for accessing private Obsidian API methods
- Follows Obsidian plugin conventions with manifest.json and proper plugin lifecycle
- Settings are persisted using Obsidian's plugin data storage system
- Event registration for file-open events to handle Canvas integration