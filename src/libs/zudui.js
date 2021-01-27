const positions = ['野', '中', 'AD', '辅', '上', '野', '中', 'AD', '辅']
const positionsObj = _get_positionsObj()

export const zudui_suanfa = (persons, someTj) => {
    /** 结果0-满人 */
    let result0 = persons.filter((per) => per.weizhi.includes('上')).map((v) => [v])
    console.log('结果0')
    console.log(result0)

    positions.forEach((p, i) => {
        /** 迭代结果下一个 */
        const next = []
        result0.forEach((seteds) => {
            // seteds.length应该比i大1, 好像这个判断没用
            if (seteds.length - i !== 1) {
                return
            }
            /** 过滤已经安排的 */
            const setedm = new Map()
            seteds.forEach((seted) => {
                setedm.set(seted.name, true)
            })
            let rest = persons
                .filter((v) => !setedm.get(v.name))
                .filter((v) => v.weizhi.includes(p))
            //到了这一步，如果没有人可以打这个位置了，随机找个人出来补位
            if (!rest.length) {
                rest = _random_person(setedm, persons)
            }
            rest.forEach((per2) => {
                next.push([...seteds, per2])
            })
        })

        result0 = next
        console.log(i, result0.length, result0[0].length)
    })
    console.log('已经排满人')

    /** 结果-计算战力差-再算位置权重 */
    const result1 = result0.map((v, i) => {
        //战力差
        const por = v.map((p) => Number(p.power))
        const po1 = _power_sum(por.slice(0, 5))
        const po2 = _power_sum(por.slice(5))
        //位置
        const wzPor = v.map((p, pi) => {
            let wz = positionsObj[pi]
            let wzValue = p.weizhi.indexOf(wz)
            if (wzValue > -1) {
                return (-wzValue + 5) * 200
            } else {
                return 0
            }
        })
        const wzPor1 = _power_sum(wzPor.slice(0, 5))
        const wzPor2 = _power_sum(wzPor.slice(5))
        return {
            persons: v.map((p) => p.name),
            po1,
            po2,
            diff: Math.abs(po1 - po2),
            wzPor1,
            wzPor2,
            wzPow: wzPor1 + wzPor2,
        }
    })
    // 如果有限制条件，先限制所有条件
    // 先限制队伍情况
    let reslutFilter = null
    if (someTj.selected11 && someTj.selected11.length > 1) {
        // 限制在一队的条件,2边都限制
        console.log('需要限制的是2')
        console.log(someTj.selected11)
        console.log(someTj.selected12)
        reslutFilter = result1.filter(v => {
            let value5 = v.persons.slice(0, 5)
            let value510 = v.persons.slice(5)
            let fh = true // 符不符合条件
            someTj.selected11.forEach(s => {
                if (value5.indexOf(s) < 0) {
                    fh = false
                }
            })
            if (someTj.selected12 && someTj.selected12.length) {
                someTj.selected12.forEach(s => {
                    if (value510.indexOf(s) < 0) {
                        fh = false
                    }
                })
            }
            return fh
        })
        // return resSort(reslut2).slice(0, 100)
    }
    // 再限制对位情况
    let reslutFilter2 = null
    if (someTj.selected2 && someTj.selected2.length) {
        reslutFilter2 = (reslutFilter || result1).filter(v => {
            let fh = true // 符不符合条件
            someTj.selected2.forEach(dw => {
                if(dw.length === 2){
                    // 有多个对位条件
                    let p1 = dw[0]
                    let p2 = dw[1]
                    // 这个判断= 5 的时候表示对位成功
                    let abs = Math.abs(v.persons.indexOf(p1) - v.persons.indexOf(p2))
                    if (abs !== 5) {
                        fh = false
                    }
                }
            })
            return fh
        })
    }

    const resall = reslutFilter2 || reslutFilter || result1
    console.log('最后结果')
    console.log(resall)
    return resSort(resall).slice(0, 100)
}

// 工具函数
export function _power_sum(arr) {
    return arr.reduce((sum, n) => sum + n)
}

function _get_positionsObj() {
    let positionsObj = {}
    let arr = ['上', '野', '中', 'AD', '辅', '上', '野', '中', 'AD', '辅']
    arr.forEach((v, i) => {
        positionsObj[i] = v
    })
    return positionsObj
}

function _random_person(cannotset, persons) {
    const arr = persons.filter((v) => !cannotset.get(v.name))
    let re = [arr[Math.floor(Math.random() * arr.length)]]
    return re
}

function resSort(result) {

    // 先按实力排序取实力相当的所有组合
    // result1.sort((a, b) => a.diff - b.diff)
    //
    // let result2 = result1.filter((v) => v.diff === result1[0].diff)
    //
    //  再按位置
    // result2.sort((a, b) => b.wzPow - a.wzPow)

    // 多条件排序方式
    return result.sort((a, b) => {
        if (a.diff === b.diff) {
            return b.wzPow - a.wzPow
        } else {
            return a.diff - b.diff
        }
    })
}
