const positions = ['野', '中', 'AD', '辅', '上', '野', '中', 'AD', '辅']
const positionsObj = _get_positionsObj()

export const zudui_suanfa = (persons) => {
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

    // 先按实力排序取实力相当的所有组合
    result1.sort((a, b) => a.diff - b.diff)

    let result2 = result1.filter((v) => v.diff === result1[0].diff)

    // 再按位置
    result2.sort((a, b) => b.wzPow - a.wzPow)
    return result2.slice(0, 100)
}

// 工具函数
function _power_sum(arr) {
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
