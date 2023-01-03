import { App, Editor, WorkspaceLeaf, MarkdownView, Modal, Notice, PluginSettingTab, Setting } from 'obsidian';
import { Plugin } from 'obsidian';

interface VimToggleSettings {
	notify: boolean;
}

const DEFAULT_SETTINGS: VimToggleSettings = {
	notify: false
}

export default class VimToggle extends Plugin {
	settings: VimToggleSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'toggle-vim',
			name: 'Toggle Vim',
			callback: () => {
				//@ts-ignore
				this.app.vault.setConfig("vimMode", !this.app.vault.getConfig("vimMode"));
				//@ts-ignore
				this.app.workspace.iterateAllLeaves((le) => {
					if (le.view){
						//@ts-ignore
						le.view.editor.cm.setOption("keyMap", this.app.vault.getConfig("vimMode") ? "vim" : "default");
						//@ts-ignore
						le.view.editor.cm.refresh();
						if(this.settings.notify){
							new Notice("Vim mode toggled", 2000);
						}
					}
				});
			}
		});
	}
	
	onunload() {
		
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class VimToggleTab extends PluginSettingTab {
	plugin: VimToggle;

	constructor(app: App, plugin: VimToggle) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('Should a notification be sent when vim mode is actually toggled?')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.notify)
				.onChange(async (value) => {
					console.log('Toggle: ' + value);
					this.plugin.settings.notify = value;
					await this.plugin.saveSettings();
				}));
	}
}
