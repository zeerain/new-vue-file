
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function getConfig(keys) {
  return vscode.workspace.getConfiguration().get('newVueFile.' + keys)
}

function getHtml(keys, flag) {
  if (getConfig(keys) && (flag === 'data')) {
    return `data() {
      return {

      };
    },
    `
  } else if(getConfig(keys) && (flag === 'name')) {
    return `name: "",
    `
  } else if(getConfig(keys) && (flag === 'components')) {
    return `components: {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'props')) {
    return `props: {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'methods')) {
    return `methods: {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'watch')) {
    return `watch: {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'computed')) {
    return `computed: {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'beforeCreate')) {
    return `beforeCreate() {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'created')) {
    return `created() {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'beforeMount')) {
    return `beforeMount() {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'mounted')) {
    return `mounted() {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'beforeUpdate')) {
    return `beforeUpdate() {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'updated')) {
    return `updated() {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'beforeDestroy')) {
    return `beforeDestroy() {
      
    },
    `
  } else if (getConfig(keys) && (flag === 'destroyed')) {
    return `destroyed() {
      
    },
    `
  } else {
    return ``
  }
}

function creatVueFile(fileName) {
  if (!fileName.trim()) {
    console.log('请输入文件名！');
    return false
  }
  var vueName = fileName.trim()
  if (fileName.indexOf('.vue') === -1) {
    vueName = fileName + '.vue'
  }
  fs.writeFile(vueName, 
`<template>
  <div class="">

  </div>
</template>
<script>
  export default {
    ${getHtml('showName', 'name')}${getHtml('showProps', 'props')}${getHtml('showData', 'data')}${getHtml('showComponents', 'components')}${getHtml('showBeforeCreate', 'beforeCreate')}${getHtml('showCreated', 'created')}${getHtml('showBeforeUpdate', 'beforeUpdate')}${getHtml('showUpdated', 'updated')}${getHtml('showBeforeDestroy', 'beforeDestroy')}${getHtml('showDestroyed', 'destroyed')}${getHtml('showMethods', 'methods')}${getHtml('showWatch', 'watch')}${getHtml('showComputed', 'computed')}
  }
</script>
<style lang="less" scoped>

</style>`, 
    'utf8',function(error){
    if(error){
				console.log('创建失败！', error);
				vscode.window.showErrorMessage('创建失败！', error);
        return false;
		}
		vscode.window.showInformationMessage('文件创建成功！');
  })
}

// 是否显示name
// name 是否和文件名保持一致
// 是否显示cerated
// 是否显示beforeMount
// 是否显示mounted
// 是否显示beforeUpdate
// 是否显示updated
// 是否显示beforeDestory
// 是否显示destroyed
// 是否显示methods
// 是否显示computed
// 是否显示watch
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.newVueFile', function (obj) {
		vscode.window.showInputBox({
			placeHolder: "请输入.vue文件的名称,",
			prompt: "按enter将为您创建一个vue模板文件"
		}).then((res) => {
			console.log('输入的内容为', res);
			let fileName = path.join(obj.fsPath, res)
			creatVueFile(fileName)
		});
		
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
