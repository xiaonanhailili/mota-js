// 这里需要改楼层名，请和文件名及下面的floorId保持完全一致
main.floors.sample0 = {
    'floorId': 'sample0', // 楼层唯一标识符，需要和名字完全一致
    'title': "样板 0 层", // 楼层中文名
    'name': 0, // 显示在状态栏中的名称
    "canFlyTo": true, // 该楼能否被楼传器飞到（不能的话在该楼也不允许使用楼传器）
    "map": [ // 地图数据，需要是13x13，建议使用地图生成器来生成
        [0,    0,    220,  0,    0,    6,    87,   3,    65,   64,   44,   43,   42],
        [0,    246,  0,    246,  0,    6,    0,    3,    58,   59,   60,   61,   41],
        [219,  0,    0,    0,    219,  6,    0,    3,    57,   26,   62,   63,   40],
        [6,    6,    125,  6,    6,    6,    0,    3,    53,   54,   55,   56,   39],
        [216,  247,  256,  235,  248,  6,    0,    3,    49,   50,   51,   52,   38],
        [5,    5,    125,  5,    5,    5,    0,    1,    45,   46,   47,   48,   37],
        [224,  254,  212,  232,  204,  5,    0,    1,    31,   32,   34,   33,   36],
        [201,  205,  217,  215,  207,  5,    0,    1,    27,   28,   29,   30,   35],
        [5,    5,    125,  5,    5,    5,    0,    1,    21,   22,   23,   24,   25],
        [45,   0,    0,    0,    0,    0,    0,    1,    1,    1,    121,  1,    1],
        [4,    4,    126,  4,    4,    4,    0,    0,    0,    0,    0,    85,   124],
        [87,   11,   12,   13,   14,   4,    4,    2,    2,    2,    122,  2,    2],
        [88,   89,   90,   91,   92,   93,   94,   2,    81,   82,   83,   84,   86],
    ],
    "firstArrive": [ // 第一次到该楼层触发的事件
        "\t[样板提示]首次到达某层可以触发 firstArrive 事件，\n该事件可类似于RMXP中的“自动执行脚本”。",
        "本事件支持一切的事件类型，常常用来触发对话，\n例如：",
        "\t[hero]我是谁？\n我从哪来？\n我又要到哪去？",
        "\t[仙子,fairy]你问我...？我也不知道啊...",
        "本层主要对道具、门、怪物等进行介绍，\n有关事件的各种信息在下一层会有更为详细的说明。",
    ],
    "events": { // 该楼的所有可能事件列表；NPC事件和楼层转换事件也需要包括在内

        /****** NPC事件 ******/
        "10,9": [ // 守着道具的老人
            "\t[老人,man]这些是本样板支持的所有的道具。\n\n道具分为三类：items, constants, tools。\nitems 为即捡即用类道具，例如宝石、血瓶、\n剑盾等。\nconstants 为永久道具，例如怪物手册、楼层\n传送器、幸运金币等。\ntools 为消耗类道具，例如破墙镐、炸弹、中\n心对称飞行器等。\n\n后两类道具在工具栏中可以看到并使用。",
            "\t[老人,man]有关道具效果，定义在items.js中。\n目前大多数道具已有默认行为，如有自定义\n的需求则需在items.js中修改代码。",
            "\t[老人,man]constants 和 tools 各最多只允许12种，\n多了会导致图标溢出。",
            "\t[老人,man]拾取道具结束后可触发 afterGetItem 事件。\n\n有关事件的各种信息在下一层会有更为详细的\n说明。",
            {"type": "disappear"} // 消失
        ],
        "10,11": [ // 守着门的老人
            "\t[老人,woman]这些是门，需要对应的钥匙打开。\n机关门必须使用特殊的开法。",
            "\t[老人,woman]开门后可触发 afterOpenDoor 事件。\n\n有关事件的各种信息在下一层会有更为详细的\n说明。",
            {'type': 'disappear'}
        ],
        "2,10": [ // 守着楼梯、传送门、路障的老人
            "\t[老人,womanMagician]这些是路障、楼梯、传送门。",
            "\t[老人,womanMagician]血网的伤害数值、中毒后每步伤害数值、衰弱\n时攻防下降的数值，都在 data.js 内定义。\n\n路障同样会尽量被自动寻路绕过。",
            "\t[老人,womanMagician]楼梯和传送门需要在events中定义目标楼层\n和位置，可参见样板里已有的的写法。",
            "\t[老人,womanMagician]楼梯和传送门是否可“穿透”，由data.js中的\n全局变量所决定，你也可以单独设置。\n穿透的意思是，自动寻路得到的路径中间经\n过了楼梯，行走时是否触发楼层转换事件。\n例如，下面的“下箭头”就是不能穿透的。",
            {"type": "disappear"}
        ],
        "2,8": [ // 守着第一批怪物的老人
            "\t[老人,magician]这些都是各种各样的怪物。\n所有怪物的属性都在enemys.js中设置。\n\n每个怪物最多只能有一个属性。",
            "\t[老人,magician]这批怪物分别为：普通、先攻、魔攻、坚固、\n2连击、3连击、4连击、破甲、反击、净化。",
            "\t[老人,magician]打败怪物后可触发 afterBattle 事件。\n\n有关事件的各种信息在下一层会有更为详细的\n说明。",
            {"type": "disappear"}
        ],
        "2,5": [
            "\t[老人,magician]模仿、吸血、中毒、衰弱、诅咒。\n\n请注意吸血怪需要设置value为吸血数值，\n可参见样板中黑魔法师的写法。",
            {"type": "disappear"}
        ],
        "2,3": [
            "\t[老人,magician]领域、夹击。\n请注意领域怪需要设置value为伤害数值，\n可参见样板中初级巫师的写法。",
            "\t[老人,magician]出于游戏性能的考虑，我们不可能每走一步都\n对领域和夹击进行检查。\n因此我们需要在本楼层的 events 中指明哪些\n点可能会触发领域和夹击事件，在这些点才会\n对领域和夹击进行检查和处理。\n\n具体可参见本层样板中events的做法。",
            "\t[老人,magician]夹击和领域同时发生时先计算领域，再夹击。\n\n另：本塔不支持阻击怪。",
            {"type": "disappear"}
        ],

        /****** 楼层转换事件 ******/
        "6,0": {"trigger": "changeFloor", "data": {"floorId": "sample0", "stair": "downFloor"}},
        "0,11": {"trigger": "changeFloor", "data": {"floorId": "sample0", "loc": [0,12]}},
        "0,12": {"trigger": "changeFloor", "data": {"floorId": "sample0", "stair": "upFloor"}}, // 注意，目标层有多个楼梯的话，写stair可能会导致到达位置不确定。这时候推荐写loc指明目标点位置。
        "1,12": {"trigger": "changeFloor", "data": {"floorId": "sample0", "loc": [1,12]}},
        "2,12": {"trigger": "changeFloor", "data": {"floorId": "sample0", "loc": [2,12]}},
        "3,12": {"trigger": "changeFloor", "data": {"floorId": "sample0", "loc": [6,1]}},
        "4,12": {"trigger": "changeFloor", "data": {"floorId": "sample0", "loc": [0,9]}},
        "5,12": {"trigger": "changeFloor", "data": {"floorId": "sample0", "loc": [6,10]}, "portalWithoutTrigger": false}, // 不能穿透
        "6,12": {"trigger": "changeFloor", "data": {"floorId": "sample0", "loc": [10,10]}},


        /****** 领域、夹击检查事件 ******/
        "1,0": {"trigger": "checkBlock"},
        "0,1": {"trigger": "checkBlock"},
        "1,1": {"trigger": "checkBlock"},
        "1,2": {"trigger": "checkBlock"},
        "2,1": {"trigger": "checkBlock"},
        "1,0": {"trigger": "checkBlock"},
        "3,0": {"trigger": "checkBlock"},
        "3,2": {"trigger": "checkBlock"},
        "4,1": {"trigger": "checkBlock"},

    },
    "afterOpenDoor": { // 开完门后可能触发的事件列表
        "11,12": "你开了一个绿门，触发了一个afterOpenDoor事件"
    },
    "afterBattle": { // 战斗后可能触发的事件列表
        "2,6": "\t[ghostSkeleton]不可能，你怎么可能打败我！\n（一个打败怪物触发的事件）"
    },
    "afterGetItem": { // 获得道具后可能触发的事件列表
        "11,8": "由于状态栏放不下，绿钥匙和铁门钥匙均视为tools，\n放入工具栏中。\n碰到绿门和铁门仍然会自动使用开门。",
        "8,6": "由于吸血和夹击等的存在，血瓶默认自动被绕路。\n你可以修改data.js中的系统Flag来设置这一项。",
        "8,7": "如需修改消耗品的效果，请前往items.js，修改\ngetItemEffect 和 getItemEffectTip 两个函数\n的具体数值即可。",
        "9,5": [
            "每层楼的 canFlyTo 决定了该楼层能否被飞到。\n\n不能被飞到的楼层也无法使用楼层传送器。",
            "飞行的楼层顺序由 main.js 中 floorIds 加载顺序\n所决定。\n\n是否必须在楼梯边使用楼传器由 data.js 中的系统\nFlag所决定。"
        ],
        "10,5": "破墙镐是破面前的墙壁还是四个方向的墙壁，\n由data.js中的系统Flag所决定。",
        "8,4": [
            "炸弹可以炸四个方向的怪物。\n如只需要炸前方怪物请使用上面的圣锤。",
            "不能被炸的怪物在enemys中可以定义。\n可参见样板里黑衣魔王的写法。\n\n炸死怪物是否触发事件由 data.js 中的系统Flag\n所决定。"
        ],
        "9,4": "中心对称飞行器飞向的目标不能在楼层的events\n列表里存在，即使事件已经结束（如刚刚的老人）。",
        "10,4": "上楼器和下楼器的目标点要求同中心对称飞行器。\n\n“上楼”和“下楼”的目标层由 main.js 的 floorIds\n顺序所决定。",
        "10,3": "十字架目前未被定义，可能需要自行实现功能。\n有关如何实现一个道具功能参见doc文档。",
        "9,2": "该道具默认是大黄门钥匙，如需改为钥匙盒直接\n修改 data.js 中的系统Flag即可。",
        "10,2": "屠龙匕首目前未被定义，可能需要自行实现功能。\n有关如何实现一个道具功能参见doc文档。",
    }

}
