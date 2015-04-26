const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const Utils = imports.misc.extensionUtils.getCurrentExtension().imports.util; 

let primary, saved;
 
function _toggleWorkspace() {
  let current = global.screen.get_active_workspace().index();
  if (current == primary) {
    global.screen.get_workspace_by_index(saved).activate(global.get_current_time());
  } else {
    global.screen.get_workspace_by_index(primary).activate(global.get_current_time());
    saved = current;
  }
}

function init() {
  primary = 0;
  saved = 1;
}

function enable() {
  Main.wm.addKeybinding(
    'toggle-primary-workspace',
    Utils.getSettings(),
    Meta.KeyBindingFlags.NONE,
    Shell.KeyBindingMode.NORMAL | Shell.KeyBindingMode.MESSAGE_TRAY,
    function() {
      _toggleWorkspace();
    }
  );
}

function disable() {
  Main.wm.removeKeybinding('toggle-primary-workspace');
}