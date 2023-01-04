import { App, PluginSettingTab, Setting } from 'obsidian';
import VimToggle from 'main';

export class VimToggleTab extends PluginSettingTab {
	plugin: VimToggle;

	constructor(app: App, plugin: VimToggle) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		// Add your plugin settings view here
		containerEl.createEl('h2', { text: 'Obsidian Vim Toggle Plugin Settings' });
		containerEl.createEl('h3', { text: 'Learn more at the https://github.com/conneroisu/Vim-Toggle-Obsidian' });

		new Setting(containerEl)
			.setName('Notifications on Toggle')
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
