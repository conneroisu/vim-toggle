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
				//@ts-ignore
				this.app.vault.setConfig("vimMode", !this.app.vault.getConfig("vimMode"));
				if(this.settings.notify){
					new Notice("Vim mode toggled to " + !this.app.vault.getConfig("vimMode"), 2000);
				}
				//@ts-ignore
				this.app.workspace.iterateAllLeaves((le) => {
					if (le.view){
						//@ts-ignore
						le.view.editor.cm.setOption("keyMap", this.app.vault.getConfig("vimMode") ? "vim" : "default");
						//@ts-ignore
						le.view.editor.cm.refresh();
					}
				})
			}
		});
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new VimToggleTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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


