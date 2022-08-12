import * as vscode from 'vscode';
import { InterfaceBuilder } from './interface-builder';
import { interfaceExportBuilder } from './interface-export-builder';

/**
 * @param {vscode.ExtensionContext} context
 */

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'interface-builder.getInterface',
		() => {
			const activeTextEditor = vscode.window.activeTextEditor;
			if (activeTextEditor) {
				const textFile = activeTextEditor.document.getText(activeTextEditor.selection);
				//const location = activeTextEditor.document.positionAt(0);
				const location = activeTextEditor.selection.active

				vscode.window.activeTextEditor?.edit((editBuilder) => {
					try {
						editBuilder.insert(location, (new InterfaceBuilder('').getInterface(textFile) as string));
					} catch (error) {
						vscode.window.showErrorMessage('Selected text is not a valid object');
					}
				});
			}
		});
		const disposable2 = vscode.commands.registerCommand(
			'interface-builder.getExportInterface',
			() => {
				const activeTextEditor = vscode.window.activeTextEditor;
				if (activeTextEditor) {
					const textFile = activeTextEditor.document.getText();
					const fileName = activeTextEditor.document.fileName
					const location = activeTextEditor.selection.active
					const name =  'I_' + fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.lastIndexOf('.')).replace(/\./g, '_')
					vscode.window.activeTextEditor?.edit((editBuilder) => {
						try {
							editBuilder.insert(location, interfaceExportBuilder(textFile, name));
						} catch (error) {
							vscode.window.showErrorMessage('Selected text is not a valid object');
						}
					});
				}
			});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);


}

export function deactivate() { }
