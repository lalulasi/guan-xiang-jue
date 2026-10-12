export type Trigram = {
  index: number
  name: string
  nature: string
  image: string
  bits: [number, number, number]
}

export type Hexagram = {
  number: number
  name: string
  theme: string
  insight: string
  action: string
  tendency: number
}

export type Reading = {
  input: string
  digitSum: number
  upper: Trigram
  lower: Trigram
  changingLine: number
  primary: Hexagram
  transformed: Hexagram
  primaryLines: number[]
  transformedLines: number[]
  tendency: '宜行' | '审慎行' | '暂缓'
  tendencyNote: string
  timestamp: Date
  timeSeed: number
}

export const TRIGRAMS: Trigram[] = [
  { index: 1, name: '乾', nature: '天', image: '健', bits: [1, 1, 1] },
  { index: 2, name: '兑', nature: '泽', image: '悦', bits: [1, 1, 0] },
  { index: 3, name: '离', nature: '火', image: '明', bits: [1, 0, 1] },
  { index: 4, name: '震', nature: '雷', image: '动', bits: [1, 0, 0] },
  { index: 5, name: '巽', nature: '风', image: '入', bits: [0, 1, 1] },
  { index: 6, name: '坎', nature: '水', image: '险', bits: [0, 1, 0] },
  { index: 7, name: '艮', nature: '山', image: '止', bits: [0, 0, 1] },
  { index: 8, name: '坤', nature: '地', image: '顺', bits: [0, 0, 0] },
]

const HEXAGRAMS: Hexagram[] = [
  { number: 1, name: '乾为天', theme: '主动开创', insight: '条件支持主动承担，但力量越强越要守正。', action: '先定目标与边界，再果断推进。', tendency: 2 },
  { number: 2, name: '坤为地', theme: '顺势承载', insight: '此时贵在配合现实、积累资源，不必争先。', action: '借力成熟条件，以稳健执行代替强攻。', tendency: 1 },
  { number: 3, name: '水雷屯', theme: '起步维艰', insight: '开端混乱并非方向错误，只是秩序尚未形成。', action: '缩小第一步，先解决最具体的阻力。', tendency: 0 },
  { number: 4, name: '山水蒙', theme: '信息不足', insight: '判断所需的知识仍有缺口，贸然行动容易反复。', action: '先请教、验证或补齐一个关键事实。', tendency: -1 },
  { number: 5, name: '水天需', theme: '等待时机', insight: '方向可以保留，但现在更适合准备而非催熟。', action: '设定明确触发条件，条件满足再行动。', tendency: 0 },
  { number: 6, name: '天水讼', theme: '分歧争执', insight: '继续硬推会放大立场冲突与沟通成本。', action: '先澄清利益和底线，避免情绪化对抗。', tendency: -1 },
  { number: 7, name: '地水师', theme: '组织纪律', insight: '事情可做，但成败依赖规则、分工与一致行动。', action: '明确负责人、节奏和停止条件。', tendency: 1 },
  { number: 8, name: '水地比', theme: '结盟协作', insight: '找到可信赖的同行者，比独自判断更重要。', action: '先确认合作关系与共同目标。', tendency: 1 },
  { number: 9, name: '风天小畜', theme: '小步积累', insight: '暂不足以完成大跨越，微小进展却能持续累积。', action: '以低成本试点换取真实反馈。', tendency: 1 },
  { number: 10, name: '天泽履', theme: '谨慎践行', insight: '可以前进，但所处环境要求礼序与风险意识。', action: '按规则行事，避免越界和侥幸。', tendency: 1 },
  { number: 11, name: '地天泰', theme: '通达顺遂', insight: '上下相通、资源匹配，是推动事情的好窗口。', action: '抓住窗口执行，同时预留回撤空间。', tendency: 2 },
  { number: 12, name: '天地否', theme: '闭塞不通', insight: '信息、资源或关系存在阻断，强行投入回报偏低。', action: '暂停扩张，先修复最关键的连接。', tendency: -2 },
  { number: 13, name: '天火同人', theme: '求同协作', insight: '公开目标、集合不同能力，有助于突破个人局限。', action: '把意图说清楚，邀请合适的人共同参与。', tendency: 1 },
  { number: 14, name: '火天大有', theme: '资源充足', insight: '拥有推动事情的能力与资源，关键是合理使用。', action: '可以执行，并把资源优先投向主目标。', tendency: 2 },
  { number: 15, name: '地山谦', theme: '谦逊有度', insight: '低姿态能减少阻力，也让真实问题更容易浮现。', action: '稳步推进，主动听取反对意见。', tendency: 1 },
  { number: 16, name: '雷地豫', theme: '顺势动员', insight: '积极氛围利于启动，但兴奋不能代替准备。', action: '趁势行动，先检查资源和预案。', tendency: 1 },
  { number: 17, name: '泽雷随', theme: '因势调整', insight: '跟随真实变化比坚持原计划更有价值。', action: '保留目标，调整方法与节奏。', tendency: 1 },
  { number: 18, name: '山风蛊', theme: '整顿积弊', insight: '旧问题正在拖累新行动，需要先清理再建设。', action: '先修复根因，不要只覆盖表面症状。', tendency: 0 },
  { number: 19, name: '地泽临', theme: '机会临近', insight: '局面正在靠近有利位置，适合主动接触与推进。', action: '及时行动，并关注后续承接能力。', tendency: 2 },
  { number: 20, name: '风地观', theme: '观察全局', insight: '先拉开距离看清结构，能减少局部经验的误导。', action: '再观察一轮，用事实校准直觉。', tendency: 0 },
  { number: 21, name: '火雷噬嗑', theme: '排除障碍', insight: '明确处理阻碍，事情才会恢复流动。', action: '直面难点，依据规则做出清晰处置。', tendency: 0 },
  { number: 22, name: '山火贲', theme: '修饰表达', insight: '呈现方式很重要，但形式不能掩盖内容不足。', action: '优化表达，同时验证核心价值。', tendency: 0 },
  { number: 23, name: '山地剥', theme: '基础剥落', insight: '支撑条件正在减少，此时扩张容易伤及根本。', action: '停止新增投入，优先保住核心。', tendency: -2 },
  { number: 24, name: '地雷复', theme: '回归重启', insight: '纠偏与重新开始的时机已经出现。', action: '从最可靠的一步重新启动。', tendency: 2 },
  { number: 25, name: '天雷无妄', theme: '守真勿妄', insight: '依真实动机行事可通，投机与臆测会带来偏差。', action: '去掉不必要算计，只做事实支持的部分。', tendency: 1 },
  { number: 26, name: '山天大畜', theme: '蓄力待发', insight: '实力正在累积，克制能换来更大的行动空间。', action: '继续准备，达到门槛后集中发力。', tendency: 1 },
  { number: 27, name: '山雷颐', theme: '节制养正', insight: '输入什么就会滋养什么，需审视信息与资源来源。', action: '减少消耗，补充真正需要的条件。', tendency: 0 },
  { number: 28, name: '泽风大过', theme: '负荷过重', insight: '当前结构承压明显，继续加码可能超过承受上限。', action: '先减负或加固支点，再考虑推进。', tendency: -1 },
  { number: 29, name: '坎为水', theme: '重重风险', insight: '风险并非一次性的，需要靠原则与流程穿越。', action: '暂缓重大承诺，逐项排除危险。', tendency: -2 },
  { number: 30, name: '离为火', theme: '清晰依附', insight: '看清依赖关系，才能让热情持续而不失控。', action: '明确依据与责任，再有序推进。', tendency: 1 },
  { number: 31, name: '泽山咸', theme: '相互感应', insight: '真诚互动会带来积极回应，强迫则适得其反。', action: '可以接触试探，尊重双方反馈。', tendency: 1 },
  { number: 32, name: '雷风恒', theme: '长期坚持', insight: '真正的收益来自稳定节奏，而非短期冲刺。', action: '选择可持续方案，按周期复盘。', tendency: 1 },
  { number: 33, name: '天山遁', theme: '主动退让', insight: '暂避并非失败，而是保存选择权。', action: '减少正面消耗，等待局面变化。', tendency: -1 },
  { number: 34, name: '雷天大壮', theme: '力量增长', insight: '推动力很强，但越有力量越不能越界。', action: '可以推进，先约束冲动与扩张范围。', tendency: 2 },
  { number: 35, name: '火地晋', theme: '循序上进', insight: '方向向好，持续展示成果会获得更多支持。', action: '稳步执行，用阶段成果争取资源。', tendency: 2 },
  { number: 36, name: '地火明夷', theme: '韬光护明', insight: '环境暂不利于公开表达全部意图。', action: '保护核心判断，低调通过困难阶段。', tendency: -1 },
  { number: 37, name: '风火家人', theme: '内在秩序', insight: '先把内部角色与规则理顺，外部行动才会稳定。', action: '明确分工和边界后再推进。', tendency: 1 },
  { number: 38, name: '火泽睽', theme: '求同存异', insight: '差异客观存在，不必强求完全一致。', action: '只在共同利益上合作，保留分歧。', tendency: 0 },
  { number: 39, name: '水山蹇', theme: '行路受阻', insight: '阻力提示路径需要调整，而不是继续增加蛮力。', action: '暂停原路径，寻求帮助或替代路线。', tendency: -2 },
  { number: 40, name: '雷水解', theme: '压力释放', insight: '紧张因素正在松动，适合尽快处理遗留问题。', action: '抓住缓和窗口，轻装推进。', tendency: 2 },
  { number: 41, name: '山泽损', theme: '有舍有得', insight: '主动减少次要部分，才能保全真正重要的目标。', action: '删去一个非核心投入，再决定是否行动。', tendency: 0 },
  { number: 42, name: '风雷益', theme: '增益成长', insight: '投入能形成正向循环，也有利于共同收益。', action: '适合执行，把增量投向长期价值。', tendency: 2 },
  { number: 43, name: '泽天夬', theme: '果断决断', insight: '问题已到必须明确表态的阶段，拖延成本更高。', action: '基于事实公开决断，但避免过度强硬。', tendency: 1 },
  { number: 44, name: '天风姤', theme: '意外相遇', insight: '新因素突然出现，吸引力强但稳定性未明。', action: '先小范围接触，不要立刻深度绑定。', tendency: 0 },
  { number: 45, name: '泽地萃', theme: '汇聚资源', insight: '人和资源正在集中，适合形成共同焦点。', action: '可以组织推进，先建立共同规则。', tendency: 1 },
  { number: 46, name: '地风升', theme: '稳步上升', insight: '循序累积能够到达更高位置，急躁反而失序。', action: '从低处着手，持续推进。', tendency: 2 },
  { number: 47, name: '泽水困', theme: '资源受困', insight: '外在空间有限，继续消耗只会加重疲惫。', action: '减少动作，守住底线并等待出口。', tendency: -2 },
  { number: 48, name: '水风井', theme: '修复系统', insight: '价值长期存在，问题可能在取用方式而非资源本身。', action: '优化基础设施或流程，再扩大使用。', tendency: 1 },
  { number: 49, name: '泽火革', theme: '变革更新', insight: '旧方式已难维持，改变需要正当理由与合适时机。', action: '先获得关键支持，再执行明确变更。', tendency: 1 },
  { number: 50, name: '火风鼎', theme: '重组焕新', insight: '通过新的结构与分工，可以把资源转化为成果。', action: '重构关键环节，建立稳定承载。', tendency: 2 },
  { number: 51, name: '震为雷', theme: '震动唤醒', insight: '突发变化会打乱节奏，也暴露真正重要之处。', action: '先稳住基本盘，再快速响应。', tendency: 0 },
  { number: 52, name: '艮为山', theme: '适时止步', insight: '停止本身就是必要行动，能防止惯性带来损失。', action: '现在先停，重新确认继续的理由。', tendency: -1 },
  { number: 53, name: '风山渐', theme: '渐进成熟', insight: '事情适合按阶段自然成长，不宜跳过关键过程。', action: '可以做，但坚持小步和长期节奏。', tendency: 1 },
  { number: 54, name: '雷泽归妹', theme: '位置未正', insight: '关系与条件尚未匹配，过早承诺容易被动。', action: '先确认角色、权责与长期后果。', tendency: -1 },
  { number: 55, name: '雷火丰', theme: '盛大充盈', insight: '资源与关注达到高点，行动窗口难得但不会长久。', action: '集中完成最重要的事，并准备高峰后的调整。', tendency: 2 },
  { number: 56, name: '火山旅', theme: '行旅不定', insight: '身处临时环境，宜轻装、守礼并保留退路。', action: '只做短周期决定，避免重资产承诺。', tendency: 0 },
  { number: 57, name: '巽为风', theme: '柔顺深入', insight: '持续而温和的影响，比一次强推更有效。', action: '从阻力最小处进入，反复沟通。', tendency: 1 },
  { number: 58, name: '兑为泽', theme: '真诚交流', insight: '开放沟通有利于形成共识，但不能只求取悦。', action: '坦诚交换信息，落实口头共识。', tendency: 1 },
  { number: 59, name: '风水涣', theme: '疏散隔阂', insight: '僵局可以化解，前提是打散固有边界与误解。', action: '先恢复沟通，再重建共同方向。', tendency: 1 },
  { number: 60, name: '水泽节', theme: '节制立界', insight: '合理限制能保护长期发展，过严也会失去活力。', action: '设定预算、时间或风险上限。', tendency: 0 },
  { number: 61, name: '风泽中孚', theme: '诚信相应', insight: '真实、可信的信息会带来稳定合作。', action: '核实承诺并以坦诚方式推进。', tendency: 2 },
  { number: 62, name: '雷山小过', theme: '小事可为', insight: '适合处理细节与小范围修正，不宜进行大跨越。', action: '缩小规模，以可逆动作试探。', tendency: 0 },
  { number: 63, name: '水火既济', theme: '已成防乱', insight: '主要结构已经成形，收尾阶段最容易因松懈出错。', action: '可以完成，但重点检查细节与后续维护。', tendency: 1 },
  { number: 64, name: '火水未济', theme: '尚未完成', insight: '终点看似接近，关键条件仍未完全衔接。', action: '不急于宣布完成，补齐最后一个缺口。', tendency: 0 },
]

const KING_WEN_MATRIX = [
  [1, 10, 13, 25, 44, 6, 33, 12],
  [43, 58, 49, 17, 28, 47, 31, 45],
  [14, 38, 30, 21, 50, 64, 56, 35],
  [34, 54, 55, 51, 32, 40, 62, 16],
  [9, 61, 37, 42, 57, 59, 53, 20],
  [5, 60, 63, 3, 48, 29, 39, 8],
  [26, 41, 22, 27, 18, 4, 52, 23],
  [11, 19, 36, 24, 46, 7, 15, 2],
]

const positiveModulo = (value: number, modulus: number) =>
  ((value - 1) % modulus + modulus) % modulus + 1

const trigramFromBits = (bits: number[]) => {
  const found = TRIGRAMS.find((trigram) =>
    trigram.bits.every((bit, index) => bit === bits[index]),
  )
  if (!found) throw new Error('Invalid trigram lines')
  return found
}

export function normalizeNumber(value: string) {
  const digits = value.match(/\d/g) ?? []
  if (digits.length === 0) throw new Error('请输入至少一个数字')
  return {
    input: digits.join(''),
    digitSum: digits.reduce((sum, digit) => sum + Number(digit), 0),
  }
}

export function getHexagram(upperIndex: number, lowerIndex: number) {
  const number = KING_WEN_MATRIX[upperIndex - 1][lowerIndex - 1]
  return HEXAGRAMS[number - 1]
}

export function castReading(value: string, timestamp = new Date()): Reading {
  const normalized = normalizeNumber(value)
  const signalSeed = normalized.digitSum === 0 ? 8 : normalized.digitSum
  const upperIndex = positiveModulo(signalSeed, 8)
  const timeSeed =
    timestamp.getFullYear() +
    timestamp.getMonth() +
    1 +
    timestamp.getDate() +
    timestamp.getHours()
  const lowerIndex = positiveModulo(signalSeed + timeSeed, 8)
  const changingLine = positiveModulo(signalSeed + timeSeed, 6)
  const upper = TRIGRAMS[upperIndex - 1]
  const lower = TRIGRAMS[lowerIndex - 1]
  const primaryLines = [...lower.bits, ...upper.bits]
  const transformedLines = [...primaryLines]
  transformedLines[changingLine - 1] = transformedLines[changingLine - 1] ? 0 : 1
  const transformedLower = trigramFromBits(transformedLines.slice(0, 3))
  const transformedUpper = trigramFromBits(transformedLines.slice(3, 6))
  const primary = getHexagram(upper.index, lower.index)
  const transformed = getHexagram(transformedUpper.index, transformedLower.index)
  const score = primary.tendency + transformed.tendency * 0.45

  const tendency =
    score >= 1.4 ? '宜行' : score >= -0.35 ? '审慎行' : '暂缓'
  const tendencyNote =
    tendency === '宜行'
      ? '方向具备推动条件，适合在边界清楚后行动。'
      : tendency === '审慎行'
        ? '不必立即押上全部筹码，先用可逆的小步骤验证。'
        : '当前阻力或不确定性偏高，先处理前置问题。'

  return {
    ...normalized,
    upper,
    lower,
    changingLine,
    primary,
    transformed,
    primaryLines,
    transformedLines,
    tendency,
    tendencyNote,
    timestamp,
    timeSeed,
  }
}

export function hexagramSymbol(number: number) {
  return String.fromCodePoint(0x4dc0 + number - 1)
}
