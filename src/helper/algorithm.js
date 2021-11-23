/**
 * chrome v8 实现
 */
/*
// ECMA 262 - 15.8.2.14
	var rngstate;  // Initialized to a Uint32Array during genesis.
	function MathRandom() {
		var r0 = (MathImul(18030, rngstate[0] & 0xFFFF) + (rngstate[0] >>> 16)) | 0;
		rngstate[0] = r0;
		var r1 = (MathImul(36969, rngstate[1] & 0xFFFF) + (rngstate[1] >>> 16)) | 0;
		rngstate[1] = r1;
		var x = ((r0 << 16) + (r1 & 0xFFFF)) | 0;
		// Division by 0x100000000 through multiplication by reciprocal.
		return (x < 0 ? (x + 0x100000000) : x) * 2.3283064365386962890625e-10;
	}
*/
/* eslint-disable */
import * as _ from 'lodash'

export function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}

/**
 * 取范围内随机整数
 * @param {number} minNum
 * @param {number} maxNum
 */
export function randomNum(minNum = 1, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

const mustin = ['丁纪', '潘正', '鸡', '蛙']
const mustout = ['付晨']
console.log(mustin, mustout)
/**
 * 单次抽奖
 * @param {number} total 总人数
 * @param {array} won 已中奖
 * @param {number} num 本次抽取人数
 */
export function luckydrawHandler(list, total, won = [], num, chit) {
  const peolist = generateArray(1, Number(total));
  const wons = won;
  let res = [];
  const mustinkeys = []
  const mustoutkeys = []
  if (chit) {
    for (let k of mustin) {
      const item = _.find(list, x => x.name.startsWith(k))
      console.log(k, item)
      if (item && won.indexOf(item.key) < 0) {
        mustinkeys.push(item.key)
      }
    }
    for (let k of mustout) {
      const item = _.find(list, x => x.name == k)
      if (item) {
        mustoutkeys.push(item.key)
      }
    }
  }
  for (let j = 0; j < num - mustinkeys.length; j++) {
    const nodraws = peolist.filter(item => !wons.includes(item));
    let current = nodraws[randomNum(1, nodraws.length) - 1];
    while (mustoutkeys.indexOf(current) >= 0 || mustinkeys.indexOf(current) >= 0) {
      current = nodraws[randomNum(1, nodraws.length) - 1];
    }
    res.push(current);
    wons.push(current);
  }

  for (let k of mustinkeys) {
    if (res.length < num) {
      res.push(k)
      wons.push(k)
    }
  }

  res = _.shuffle(res)
  return res;
}
