


module.exports = (opts = { }) => {
  // 此处可对插件配置opts进行处理
  const replaceInlineClassName = opts.replaceInlineClassName || ''
  return {
    postcssPlugin: 'postcss-inline-antd', // 插件名字，以postcss-开头
    Rule (rule, postcss) {
      let ruleArray = []
      rule.selector.split(',').forEach((ruleSelectorText) => {
        const ruleSelectorTextAfterReplace = ruleSelectorText.replaceAll('\n', '');
        const addPrefixReplaceInlineClassName = '.' + replaceInlineClassName;
        let isDeal = false;
        if (ruleSelectorTextAfterReplace === 'body'
          || ruleSelectorTextAfterReplace === addPrefixReplaceInlineClassName + ' body') {
          isDeal = true;
          ruleArray.push('\n' +addPrefixReplaceInlineClassName);
        } else if (ruleSelectorTextAfterReplace === 'html'
          || ruleSelectorTextAfterReplace === addPrefixReplaceInlineClassName + ' html') {
          isDeal = true;
        } else {
          const startIndex = ruleSelectorTextAfterReplace.indexOf(addPrefixReplaceInlineClassName);
          if (startIndex !== -1) {
            // console.log(ruleSelectorTextAfterReplace)
            const endIndex = ruleSelectorTextAfterReplace.lastIndexOf(addPrefixReplaceInlineClassName);
            if (endIndex !== 0) {
              if (startIndex !== endIndex) {
                isDeal = true;
                ruleArray.push(
                  '\n' +
                  ruleSelectorTextAfterReplace.substr(0, endIndex) +
                  ruleSelectorTextAfterReplace.substr(endIndex + addPrefixReplaceInlineClassName.length)
                );
              }
            }
          }
        }
        if (!isDeal) {
          ruleArray.push('\n' + ruleSelectorTextAfterReplace);
        }
      });
      rule.selector = ruleArray.join(',')
    },

  }
}
module.exports.postcss = true
