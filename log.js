/*
 * @Author: mr-huangyh
 * @Date: 2023-10-25 18:00:00
 * @LastEditors: HuangYH
 * @LastEditTime: 2023-10-25 22:07:49
 * @Description: log模块
 */
const fs = require('fs');

class log {
  constructor(name, consoleOption, toFile, toFileOption) {
    // 等级表(借鉴log4js value 属性暂时无用)
    this.levels = {
      //  默认属性
      TRACE: { value: 5000, colour: 'blue' },
      DEBUG: { value: 10000, colour: 'cyan' },
      INFO: { value: 20000, colour: 'green' },
      WARN: { value: 30000, colour: 'yellow' },
      ERROR: { value: 40000, colour: 'red' },
      FATAL: { value: 50000, colour: 'magenta' },
      MARK: { value: 9007199254740992, colour: 'grey' },
    };

    // 颜色映射表(用于输出)
    this.colors = {
      "black": 30,
      "red": 31,
      "green": 32,
      "yellow": 33,
      "blue": 34,
      "magenta": 35,
      "cyan": 36,
      "white": 37,
      "gray": 90,
      "bright Red": 91,
      "bright Green": 92,
      "bright Yellow": 93,
      "bright blue": 94,
      "bright Magenta": 95,
      "bright Cyan": 96,
      "bright White": 97
    }

    // 将创建信息导入
    this.name = name;
    this.consoleOption = consoleOption;
    this.toFile = toFile;
    this.toFileOption = toFileOption;

    // 注册log方法
    for (let i in this.levels) {
      this[i.toLowerCase()] = function (...msg) {
        this.print(i.toLowerCase(), ...msg);
      }
    }
  }

  // 打印方法
  print(level, ...msg) {
    // 拼接输出字符串
    let color = this.colors[this.levels[level.toUpperCase()]["colour"]];
    let str = `[${this.formatDateTime(new Date(), 'yyyy-MM-dd HH:mm:ss')}] [${this.name}] [${level}] ${this.toLogStr(...msg)}`;
    for (let i of this.consoleOption) {
      if (i == level) {
        console.log(`\x1B[${color}m${str}\x1B[0m`);
      }
    }
    // 是否记录进文件
    if (this.toFile) {
      for (let i in this.toFileOption) {
        if (i == level) {
          this.logToFile(this.toFileOption[i].path, str);
          break;
        }
      }
    }
  }

  // 模仿console.log拼接字符串
  toLogStr(...msg) {
    return msg.reduce((r, c) => r += c + " ", "")
  }

  // 输出到文件
  logToFile(path, msg) {
    fs.appendFile(path, msg + '\n', 'utf-8', (err) => { })
  }

  // 添加自定义等级
  addLevel(level, color, isConsole, toFileOption) {
    this.levels[level.toUpperCase()] = {
      colour: color,
    }
    if (isConsole) {
      this.consoleOption.push(level)
    }
    this[level] = function (...msg) {
      this.print(level.toLowerCase(), ...msg);
    }
    if (toFileOption && toFileOption["path"]) {
      this.toFileOption[level] = toFileOption;
    }
  }

  // 格式化时间
  formatDateTime(date, format) {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
      a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
      A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return format;
  }

}

module.exports = log;