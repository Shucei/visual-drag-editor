module.exports = {
    root: true,
    env: {
        node: true,
    },
    ignorePatterns: ['iconfont.js'],
    extends: [
        'plugin:vue/recommended',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'no-console': 'off', // console.log
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // debugger
        'array-element-newline': ['error', 'consistent'], // 数组元素换行
        indent: ['error', 4, { MemberExpression: 0, SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }], // 缩进
        quotes: ['error', 'single'], // 引号
        'comma-dangle': ['error', 'always-multiline'], // 逗号
        semi: ['error', 'never'], // 分号
        'object-curly-spacing': ['error', 'always'], // 对象花括号前后空格
        'max-len': ['error', 142], // 单行最大长度
        'no-new': 'off', // new
        // 'linebreak-style': 'off', // 换行符
        'import/extensions': 'off', // import
        'eol-last': 'off', // 文件末尾空行
        'no-shadow': 'off', // 变量名不能与上层作用域内的定义过的变量重名
        'no-unused-vars': 'warn', // 不能有声明后未被使用的变量或参数
        'import/no-cycle': 'off', // 循环引用
        'arrow-parens': 'off', // 箭头函数参数括号
        eqeqeq: 'off', // 必须使用全等
        'no-param-reassign': 'off', // 禁止给参数重新赋值
        'import/prefer-default-export': 'off', // 当模块只有一个导出时，是否需要添加default
        'no-use-before-define': 'off', // 未定义前不能使用
        'no-continue': 'off', // 禁止使用continue
        'prefer-destructuring': 'off', // 优先使用数组和对象解构
        'no-plusplus': 'off', // 禁止使用++，--
        'prefer-const': 'off', // 优先使用const
        'global-require': 'off', // 全局require
        'no-prototype-builtins': 'off', // 禁止使用对象的某些属性
        'consistent-return': 'off', // return后面是否允许省略
        'vue/require-component-is': 'off', // 组件名必须和文件名一致
        'prefer-template': 'off', // 是否使用模板字符串
        'one-var-declaration-per-line': 'off', // 每一行声明一个变量
        'one-var': 'off', // 每一行声明一个变量
        'import/named': 'off', // import的变量必须在export中存在
        'object-curly-newline': 'off', // 对象花括号换行
        'default-case': 'off', // switch必须有default
        'import/order': 'off', // import顺序
        'no-trailing-spaces': 'off', // 一行结束后面不要有空格
        'func-names': 'off', // 函数表达式必须有名字
        radix: 'off', // parseInt必须指定第二个参数
        'no-unused-expressions': 'off', // 禁止无用的表达式
        'no-underscore-dangle': 'off', // 禁止标识符中有悬空下划线
        'no-nested-ternary': 'off', // 禁止使用嵌套的三目运算
        'no-restricted-syntax': 'off', // 禁止使用特定的语法
        'no-mixed-operators': 'off', // 禁止混合使用不同的操作符
        'no-await-in-loop': 'off', // 禁止在循环中使用await
        'template-curly-spacing': 'off', // 模板字符串中使用空格
        'no-unused-vars': 'off', // 禁止未使用过的变量
        'vue/html-indent': ['error', 4, {
            attribute: 1, // 属性缩进
            baseIndent: 1, // 基本缩进
            closeBracket: 0, // 结束标签缩进
            alignAttributesVertically: true, // 属性垂直对齐
            ignores: [], // 忽略的标签
        }], // html缩进
        'vue/html-self-closing': 'off', // 自闭合标签
        'vue/singleline-html-element-content-newline': 'off', // 单行html元素内容换行
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 3,
            },
            multiline: {
                max: 1,
            },
        }], // html标签属性换行
        'no-return-assign': 'off', // 禁止在return中使用赋值语句
        'vue/multi-word-component-names': 'off', // 组件名必须是多个单词
        'vuejs-accessibility/click-events-have-key-events': 'off', // 点击事件必须有键盘事件
        'vuejs-accessibility/mouse-events-have-key-events': 'off', // 鼠标事件必须有键盘事件
        'vuejs-accessibility/alt-text': 'off', // img标签必须有alt属性
        'vue/no-mutating-props': 'off', // 禁止修改props
    },
}
