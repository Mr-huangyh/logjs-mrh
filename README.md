## logjs-mrh

> 解决不能单独输出某个等级日志的问题产生的模块

### 快速使用

``` js
// 导入log包
const _log = require('./log');
// 创建log对象
/**
 * @param { String } name 别名
 * @param { Array } consoleOption 控制台输出的类型
 * @param { Boolean } toFile 是否输出到文件
 * @param { Object } toFileOption 输出到文件的配置
 */
const log = new _log('test', ["trace"], true, {
  trace: {
    path: "./trace.log"
  },
  info: {
    path: "./info.log"
  },
  debug: {
    path: "./debug.log"
  }
});

log.trace(1)
log.info(1,2)
log.debug(1,2,3)
log.addLevel('test', 'green', true, {});
log.test('test');
```

### 默认类别(level)

> 参考log4js

#### TRACE  
使用方法 `log.trace(msg)`  
控制台颜色 默认为蓝色`blue`

#### DEBUG  
使用方法 `log.trace(msg)`  
控制台颜色 默认为青色(蓝绿色)`cyan`

#### INFO  
使用方法 `log.info(msg)`  
控制台颜色 默认为绿色`green`

#### WARN  
使用方法 `log.warn(msg)`  
控制台颜色 默认为黄色`yellow`

#### ERROR  
使用方法 `log.error(msg)`  
控制台颜色 默认为红色`red`

#### FATAL  
使用方法 `log.fatal(msg)`  
控制台颜色 默认为品红色`magenta`

#### MARK  
使用方法 `log.mark(msg)`  
控制台颜色 默认为灰色`grey`

### addLevel 使用方法
```js
// 导入log包
const _log = require('./log');
// 创建log对象
const log = new _log('test', [], false);
// 添加test级别
/**
 * @param { String } level 级别名称 如果与默认类别重复为覆盖
 * @param { String } color 颜色(下一节为颜色的可选项)
 * @param { Boolean } isConsole 是否在控制台输出
 * @param { Object } toFileOption 输出文件配置
 */
log.addLevel('test', 'green', true, {});
// 使用级别
log.test(...msg);
// 特别注意 使用前一定要先定义
// 该方法也可用于覆盖
```

### color的默认值

> 在控制台输出颜色 `\x1b[31m输出信息\x1b[0m`  
> 其中`\x1b[31m`为开头`31`为颜色代码  
> 颜色代码出处[https://en.wikipedia.org/wiki/ANSI_escape_code#Colors](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)  
> 颜色兼容请查看出处
 
|颜色名称|颜色对应程序代码|颜色代码|
|-|-|-|
|黑色|black| 30|
|红色|red| 31|
|绿色|green| 32|
|黄色|yellow| 33|
|蓝色|blue| 34|
|品红|magenta| 35|
|青色(蓝绿色)|cyan| 36|
|白色|white| 37|
|灰色|gray| 90|
|鲜红色|bright Red| 91|
|鲜绿色|bright Green| 92|
|鲜黄色|bright Yellow| 93|
|鲜蓝色|bright blue| 94|
|亮品红色|bright Magenta| 95|
|亮青色|bright Cyan| 96|
|亮白色|bright White| 97|

## 更新计划

|功能|是否已经完成|版本|
|-|-|-|
|对level等级以及以下的输出到同个文件|否||
|生成每日日记|否||
|支持pm|否||