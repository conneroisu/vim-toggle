import { App, ButtonComponent, Notice, Plugin, PluginSettingTab, Setting, ToggleComponent } from "obsidian";

/**
 * @author Conner Ohnesorge (@conneroisu) [connerohnesorge.mixa.site]
 * @summary This is the source code for the Vim Toggle plugin.
 * @version 1.0.0
 * @license MIT
 * Main class of the plugin, Vim Toggle.It allows for a user to toggle
 * the state of the vim editor inside obsidian with a single command
 * helpful for switching from the Vim Editor whilst working on a canvas file.
 */

/**
 *  Interface for the settings of the Vim Toggle plugin.
 */
interface VimToggleSettings {
	/**
	 * Boolean determining if a notice is sent when the Vim Mode is toggled.
	 **/
	notification: boolean;
	/**
	 * Boolean determining if debug messages are shown in the console.
	 **/
	debug: boolean;

	/**
	 * Boolean determining if Canvas files should have vim mode off by default
	 */
	canvasVim: boolean;
}

/**
 * This is the default settings for the Vim Toggle plugin.
 */
const DEFAULT_SETTINGS: VimToggleSettings = {
	/**
	 * Default value for the notification setting, detailing the
	 * condition for sending a notification. (By default, it is set to true).
	 */
	notification: true,
	/**
	 * Default value for the debug setting, detailing the condition
	 * for sending debug messages (By default, it is set to false).
	 */
	debug: false,

	/**
	 * Default value for the canvasVim setting, detailing the condition
	 * for setting vim mode off by default for canvas files (By default, it is set to false).
	 */
	canvasVim: false,
};

/**
 * Main Plugin class for Vim Toggle.
 * @extends Plugin
 */
export default class VimToggle extends Plugin {
	/**
	 * Settings variable for the Vim Toggle Plugin Settings.
	 */
	settings: VimToggleSettings;

	/**
	 * On load method for the Vim Toggle plugin. Called when Vim Toggle is loaded.
	 **/
	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: "toggle-vim",
			name: "Toggle Vim On/Off",
			callback: () => {
				this.toggleVimMode();
			},
		});
		this.addCommand({
			id: "turn-on-vim",
			name: "Turn On Vim Mode",
			callback: () => {
				this.turnOnVimMode();
			},
		});
		this.addCommand({
			id: "turn-off-vim",
			name: "Turn Off Vim Mode",
			callback: () => {
				this.turnOffVimMode();
			},
		});
		this.addSettingTab(new VimToggleSettingsTab(this.app, this));

		this.addRibbonIcon("text-cursor-input", "Toggle Vim Mode", () => {
			this.toggleVimMode();
		});

		this.registerEvent(
			this.app.workspace.on("file-open", (file) => {
				if(!file || !this.settings.canvasVim) return;
				if(file.extension == "canvas") {
					this.turnOffVimMode();
				}
				else {
					this.turnOnVimMode();
				}
			}
		));
	}

	/**
	 * Toggles the state of vim mode in the current instance of obsidian.
	 **/
	toggleVimMode() {
		if (this.getVimMode()) {
			this.turnOffVimMode();
		} else {
			this.turnOnVimMode();
		}
		if (this.settings.notification) {
			new Notice(
				"Vim mode toggled to " +
				this.getVimMode(),
				2000
			);
		}
	}

	/**
	 * Turns off vim mode in the current instance of obsidian.
	 **/
	turnOffVimMode() {
		// @ts-expect-error
		if (this.app.isMobile) {
			localStorage.removeItem("vim");
			this.app.workspace.updateOptions();
		} else {
			this.app.vault.setConfig("vimMode", false);
		}
	}

	/**
	 * Turns on vim mode in the current instance of obsidian.
	 **/
	turnOnVimMode() {
		// @ts-expect-error
		if (this.app.isMobile) {
			localStorage.setItem("vim", "true");
			this.app.workspace.updateOptions();
		} else {
			this.app.vault.setConfig("vimMode", true);
		}
	}

	/**
	 * Returns the current state of vim mode in the current instance of obsidian.
	 **/
	getVimMode() {
		// @ts-expect-error
		return this.app.isVimEnabled();
	}

	/**
	 * Unload Method for unloading Vim Toggle.Called when the plugin is unloaded.
	 **/
	onunload() {
		console.log("unloading plugin: " + this.manifest.name);
	}

	/**
	 * Loads the settings of the plugin, Vim Toggle, it is called in the onload function.
	 **/
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	/**
	 * Saves the settings of the Vim Toggle plugin.
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}
}

/**
 * Settings tab for the Vim Toggle plugin.The Tab is responsible for displaying
 * the settings of the plugin, and allowing the user to change them.
 **/
class VimToggleSettingsTab extends PluginSettingTab {
	/**
	 * The plugin for the settings tab of the Vim Toggle plugin.
	 */
	plugin: VimToggle;

	/**
	 * Constructor for the settings tab of the Vim Toggle plugin.
	 */
	constructor(app: App, plugin: VimToggle) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * This is the display method for the settings tab of the Vim Toggle Plugin.It is
	 * responsible for displaying the settings of the plugin.
	 */
	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Settings for Vim Toggle" });

		/**
		 * This is the notification setting for the Vim Toggle plugin allowing the user
		 * to toggle the sending of a notification when toggling vim mode.
		 */
		new Setting(containerEl)
			.setName("Notification")
			.setDesc("Show notification when toggling vim mode.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.notification)
					.onChange(async (value) => {
						this.plugin.settings.notification = value;
						await this.plugin.saveSettings();
					})
			);

		/**
		 * This is the debug setting for the Vim Toggle plugin.
		 */
		new Setting(containerEl)
			.setName("Debug")
			.setDesc(
				"Show debug messages in the console whilst performing operations with the plugin."
			)
			.addToggle((toggle: ToggleComponent) =>
				toggle
					.setValue(this.plugin.settings.debug)
					.onChange(async (value) => {
						this.plugin.settings.debug = value;
						await this.plugin.saveSettings();
					})
			);


		/**
		 * This is the canvas-always-off setting for Vim Toggle plugin.
		 */
		new Setting(containerEl)
			.setName("Canvas Off")
			.setDesc(
				"When switching to a Canvas, turn vim off, and when not in Canvas, turn vim on."
			)
			.addToggle((toggle: ToggleComponent) =>
				toggle
					.setValue(this.plugin.settings.canvasVim)
					.onChange(async (value) => {
						this.plugin.settings.canvasVim = value;
						await this.plugin.saveSettings();
					})
			);




		/**
		 * Creates a horizontal rule to separate the settings from the repository-related
		 * information.
		 */
		containerEl.createEl("hr");

		/**
		 * Creates a button linking to the repository of the plugin, Vim Toggle.
		 * This is used to allow the user to easily access the repository of the plugin.
		 */
		new Setting(containerEl)
			.setName("Repository")
			.setDesc("Link to the repository of the plugin.")
			.addButton((button: ButtonComponent) =>
				button
					.setButtonText("Open Repository")
					.setCta()
					.onClick(() => {
						open("https://github.com/conneroisu/vim-toggle-obsidian");
					})
			);

		/**
		 * Setting for a button that to report an issue to the Vim Toggle Repo.
		 */
		new Setting(containerEl)
			.setName("Report Issue")
			.setDesc("Report an issue or wanted feature with the plugin.")
			.addButton((button: ButtonComponent) =>
				button
					.setButtonText("Report Issue/Feature")
					.setCta()
					.onClick(() => {
						open("https://github.com/conneroisu/vim-toggle-obsidian/issues/new");
					})
			);


		/**
		 * Setting for button that to create a pull request to the Vim Toggle Repo.
		 * Allows the user to submit a pull request to the repository of Vim Toggle.
		 */
		new Setting(containerEl)
			.setName("Create Pull Request")
			.setDesc("Developer? Create a pull request to the Vim Toggle.")
			.addButton((button) =>
				button
					.setButtonText("Create Pull Request")
					.setCta()
					.onClick(() => {
						open("https://github.com/conneroisu/vim-toggle-obsidian/compare");
					})
			);

		/**
		 * Horizontal rule separating repository info from the about section.
		 */
		containerEl.createEl("hr");
		/**
		 * About section for the Vim Toggle plugin.
		 */
		containerEl.createEl("h2", { text: "About Vim Toggle" });
		containerEl.createEl("p", { text: "This plugin was created by Conner Ohnesorge" });
		/**
		 * Portfolio button for Conner Ohnesorge
		 */
		new Setting(containerEl)
			.setName("Portfolio")
			.setDesc("Go to my portfolio website.")
			.addButton((button) =>
				button
					.setButtonText("Go to Portfolio")
					.setCta()
					.onClick(() => {
						open("https://conneroh.com");
					})
			);
		/**
		 * Kofi button for Conner Ohnesorge
		 */
		new Setting(containerEl)
			.setName("Kofi")
			.setDesc("Buy me a coffee!")
			.addButton((button: ButtonComponent) =>
				button
					.setButtonText("Buy Me A Coffee")
					.setCta()
					.onClick(() => {
						open("https://ko-fi.com/conneroisu");
					})
			);
	}
}
