import { Notice, Plugin } from 'obsidian';
import { VimToggleTab } from 'src/VimToggleTab';

interface VimToggleSettings {
	notify: boolean;
}

const DEFAULT_SETTINGS: VimToggleSettings = {
	notify: true
}

export default class VimToggle extends Plugin {
	settings: VimToggleSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'toggle-vim',
			name: 'Toggle Vim',
			callback: () => {
				// Set the vim mode to the opposite of what it was before
				// if the user has it enabled, disable it, and vice versa
				// if enabled, disable it
				//@ts-ignore
				if(this.app.vault.getConfig("vimMode")){
					// @ts-expect-error
					this.app.vault.setConfig("vimMode", false);
				}else{ 
					// @ts-expect-error
					this.app.vault.setConfig("vimMode", true);
				}
				// @ts-expect-error
				new Notice("Vim mode toggled to " + this.app.vault.getConfig("vimMode"), 2000);
			}
		});
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new VimToggleTab(this.app, this));
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


