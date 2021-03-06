"use strict";

function items() {
    this._init();
}

////// 初始化 //////
items.prototype._init = function () {
    this.items = items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.items;
    this.itemEffect = items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.itemEffect;
    this.itemEffectTip = items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.itemEffectTip;
    this.useItemEffect = items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.useItemEffect;
    this.canUseItemEffect = items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.canUseItemEffect;
    if (!items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.canEquip)
        items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.canEquip = {};
    this.equipCondition = items_296f5d02_12fd_4166_a7c1_b5e830c9ee3a.canEquip;
}

////// 获得所有道具 //////
items.prototype.getItems = function () {
    return core.clone(this.items);
}

////// “即捡即用类”道具的使用效果 //////
items.prototype.getItemEffect = function(itemId, itemNum) {
    var itemCls = core.material.items[itemId].cls;
    // 消耗品
    if (itemCls === 'items') {
        var ratio = parseInt(core.status.thisMap.item_ratio) || 1;
        var curr_hp = core.status.hero.hp;
        if (itemId in this.itemEffect) {
            try {
                eval(this.itemEffect[itemId]);
            }
            catch (e) {
                main.log(e);
            }
        }
        core.status.hero.statistics.hp += core.status.hero.hp - curr_hp;
    }
    else {
        core.addItem(itemId, itemNum);
    }
}

////// “即捡即用类”道具的文字提示 //////
items.prototype.getItemEffectTip = function(itemId) {
    var itemCls = core.material.items[itemId].cls;
    // 消耗品
    if (itemCls === 'items') {
        var ratio = parseInt(core.status.thisMap.item_ratio) || 1;
        if (itemId in this.itemEffectTip) {
            try {
                return eval(this.itemEffectTip[itemId])||"";
            } catch (e) {
                main.log(e);
                return "";
            }
        }
    }
    return "";
}

items.prototype._useItemEffect = function (itemId) {
    if (itemId in this.useItemEffect) {
        try {
            var ratio = parseInt(core.status.thisMap.item_ratio) || 1;
            eval(this.useItemEffect[itemId]);
        }
        catch (e) {
            main.log(e);
        }
    }
}

items.prototype._afterUseItem = function (itemId) {
    // 道具使用完毕：删除
    var itemCls = core.material.items[itemId].cls;
    if (itemCls=='tools')
        core.status.hero.items[itemCls][itemId]--;
    if (core.status.hero.items[itemCls][itemId]<=0)
        delete core.status.hero.items[itemCls][itemId];

    core.status.event.ui = null;
    core.updateStatusBar();
}

////// 使用道具 //////
items.prototype.useItem = function (itemId, noRoute, callback) {
    if (!this.canUseItem(itemId)) {
        if (core.isset(callback)) callback();
        return;
    }
    // 执行道具效果
    this._useItemEffect(itemId);
    // 执行完毕
    this._afterUseItem(itemId);
    // 记录路线
    if (!noRoute) core.status.route.push("item:"+itemId);
    if (core.isset(callback)) callback();
}

////// 当前能否使用道具 //////
items.prototype.canUseItem = function (itemId) {
    // 没有道具
    if (!core.hasItem(itemId)) return false;

    var able = false;
    if (itemId in this.canUseItemEffect) {
        try {
            able = eval(this.canUseItemEffect[itemId]);
        }
        catch (e) {
            main.log(e);
        }
    }
    if (!able) core.status.event.ui = null;

    return able;
}

////// 获得某个物品的个数 //////
items.prototype.itemCount = function (itemId) {
    if (!core.isset(core.status.hero)) return 0;
    if (!core.isset(itemId) || !core.isset(core.material.items[itemId])) return 0;
    var itemCls = core.material.items[itemId].cls;
    if (itemCls=="items") return 0;
    return core.status.hero.items[itemCls][itemId]||0;
}

////// 是否存在某个物品 //////
items.prototype.hasItem = function (itemId) {
    return this.itemCount(itemId) > 0;
}

////// 是否装备某件装备 //////
items.prototype.hasEquip = function (itemId) {
    if (!core.isset(core.status.hero)) return null;

    if (!core.isset(itemId)) return null;
    if (!core.isset((core.material.items[itemId]||{}).equip)) return null;

    for (var i in core.status.hero.equipment||[])
        if (core.status.hero.equipment[i] == itemId)
            return true;
    return false
}

////// 获得某个装备类型的当前装备 //////
items.prototype.getEquip = function (equipType) {
    if (!core.isset(core.status.hero)) return null;
    return (core.status.hero.equipment||[])[equipType]||null;
}

////// 设置某个物品的个数 //////
items.prototype.setItem = function (itemId, itemNum) {
    if (!core.isset(core.status.hero)) return null;
    itemNum = itemNum || 0;
    var itemCls = core.material.items[itemId].cls;
    if (itemCls == 'items') return;
    if (!core.isset(core.status.hero.items[itemCls])) {
        core.status.hero.items[itemCls] = {};
    }
    core.status.hero.items[itemCls][itemId] = itemNum;
    if (core.status.hero.items[itemCls][itemId] <= 0) {
        if (itemCls!='keys') delete core.status.hero.items[itemCls][itemId];
        else core.status.hero.items[itemCls][itemId] = 0;
    }
    core.updateStatusBar();
}

////// 删除某个物品 //////
items.prototype.removeItem = function (itemId, itemNum) {
    if (!core.isset(core.status.hero)) return null;
    if (!core.isset(itemNum)) itemNum = 1;
    if (!core.hasItem(itemId)) return false;
    var itemCls = core.material.items[itemId].cls;
    core.status.hero.items[itemCls][itemId]-=itemNum;
    if (core.status.hero.items[itemCls][itemId] <= 0) {
        if (itemCls!='keys') delete core.status.hero.items[itemCls][itemId];
        else core.status.hero.items[itemCls][itemId] = 0;
    }
    core.updateStatusBar();
    return true;
}

////// 增加某个物品的个数 //////
items.prototype.addItem = function (itemId, itemNum) {
    if (!core.isset(core.status.hero)) return null;
    if (!core.isset(itemNum)) itemNum = 1;
    var itemData = core.material.items[itemId];
    var itemCls = itemData.cls;
    if (itemCls == 'items') return;
    if (!core.isset(core.status.hero.items[itemCls])) {
        core.status.hero.items[itemCls] = {};
        core.status.hero.items[itemCls][itemId] = 0;
    }
    else if (!core.isset(core.status.hero.items[itemCls][itemId])) {
        core.status.hero.items[itemCls][itemId] = 0;
    }
    core.status.hero.items[itemCls][itemId] += itemNum;
    if (core.status.hero.items[itemCls][itemId] <= 0) {
        if (itemCls!='keys') delete core.status.hero.items[itemCls][itemId];
        else core.status.hero.items[itemCls][itemId] = 0;
    }
    // 永久道具只能有一个
    if (itemCls == 'constants' && core.status.hero.items[itemCls][itemId]>1)
        core.status.hero.items[itemCls][itemId] = 1;
    core.updateStatusBar();
}

// ---------- 装备相关 ------------ //

items.prototype.getEquipTypeById = function (equipId) {
    var type = core.material.items[equipId].equip.type;
    if (typeof type == 'string')
        type = this.getEquipTypeByName(type);
    return type;
}

items.prototype.getEquipTypeByName = function (name) {
    var names = core.status.globalAttribute.equipName;
    for (var i = 0; i < names.length; ++i) {
        if (names[i] === name && !core.isset((core.status.hero.equipment||[])[i])) {
            return i;
        }
    }
    return -1;
}

// 当前能否撞上某装备
items.prototype.canEquip = function (equipId, hint) {
    // 装备是否合法
    var equip = core.material.items[equipId]||{};
    if (!core.isset(equip.equip)) {
        if (hint) core.drawTip("不合法的装备！");
        return false;
    }

    // 是否拥有该装备
    if (!core.hasItem(equipId) && !core.hasEquip(equipId)) {
        if (hint) core.drawTip("你当前没有"+equip.name+"，无法换装");
        return false;
    }

    // 可装备条件
    var condition = this.equipCondition[equipId];
    if (core.isset(condition) && condition.length>0) {
        try {
            if (!eval(condition)) {
                if (hint) core.drawTip("当前不可换上"+equip.name);
                return false;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    return true;
}

////// 实际换装的效果 //////
items.prototype._loadEquipEffect = function (equipId, unloadEquipId, isPercentage) {
    // 比较能力值
    var result = core.compareEquipment(equipId, unloadEquipId);

    if (isPercentage) {
        for (var v in result)
            core.addFlag('__'+v+'_buff__', result[v]/100);
    }
    else {
        for (var v in result)
            core.status.hero[v] += result[v];
    }
}

items.prototype._realLoadEquip = function (type, loadId, unloadId, callback) {
    var loadEquip = core.material.items[loadId] || {}, unloadEquip = core.material.items[unloadId] || {};
    if (!core.isset(loadEquip.equip)) loadEquip.equip = {};
    if (!core.isset(unloadEquip.equip)) unloadEquip.equip = {};

    var loadPercentage = loadEquip.equip.percentage, unloadPercentage = unloadEquip.equip.percentage;

    if (loadPercentage != null && unloadPercentage != null && loadPercentage != unloadPercentage) {
        this.unloadEquip(type);
        this.loadEquip(loadId);
        if (core.isset(callback)) callback();
        return;
    }

    // --- 音效
    core.playSound('equip.mp3');

    // --- 实际换装
    this._loadEquipEffect(loadId, unloadId, loadPercentage==null?unloadPercentage:loadPercentage);

    // --- 加减
    if (loadId) core.removeItem(loadId);
    if (unloadId) core.addItem(unloadId);
    core.status.hero.equipment[type] = loadId||null;

    // --- 提示
    if (loadId) core.drawTip("已装备上"+loadEquip.name, core.material.icons.items[loadId]);
    else if (unloadId) core.drawTip("已卸下"+unloadEquip.name, core.material.icons.items[unloadId]);

    if (core.isset(callback)) callback();
}

////// 换上 //////
items.prototype.loadEquip = function (equipId, callback) {
    if (!core.isset(core.status.hero)) return null;
    if (!core.isset(core.status.hero.equipment)) core.status.hero.equipment = [];
    if (!this.canEquip(equipId, true)) {
        if (core.isset(callback)) callback();
        return;
    }

    var loadEquip = core.material.items[equipId] || {};
    var type = this.getEquipTypeById(equipId);
    if (type < 0) {
        core.drawTip("当前没有"+loadEquip.equip.type+"的空位！");
        return;
    }

    this._realLoadEquip(type, equipId, core.status.hero.equipment[type], callback);
}

////// 卸下 //////
items.prototype.unloadEquip = function (equipType, callback) {
    if (!core.isset(core.status.hero)) return null;
    if (!core.isset(core.status.hero.equipment)) core.status.hero.equipment = [];

    var unloadEquipId = core.status.hero.equipment[equipType];
    if (!core.isset(unloadEquipId)) {
        if (core.isset(callback)) callback();
        return;
    }

    this._realLoadEquip(equipType, null, unloadEquipId, callback);
}

items.prototype.compareEquipment = function (compareEquipId, beComparedEquipId) {
    var compareAtk = 0, compareDef = 0, compareMdef = 0;
    if (core.isset(compareEquipId)) {
        var compareEquip = core.material.items[compareEquipId];
        compareAtk += (compareEquip.equip||{}).atk || 0;
        compareDef += (compareEquip.equip||{}).def || 0;
        compareMdef += (compareEquip.equip||{}).mdef || 0;
    }
    if (core.isset(beComparedEquipId)) {
        var beComparedEquip = core.material.items[beComparedEquipId];
        compareAtk -= (beComparedEquip.equip||{}).atk || 0;
        compareDef -= (beComparedEquip.equip||{}).def || 0;
        compareMdef -= (beComparedEquip.equip||{}).mdef || 0;
    }
    return {"atk":compareAtk,"def":compareDef,"mdef":compareMdef};
}

////// 保存装备 //////
items.prototype.quickSaveEquip = function (index) {
    if (!core.isset(core.status.hero.equipment)) core.status.hero.equipment = [];
    var saveEquips = core.getFlag("saveEquips", []);
    saveEquips[index] = core.clone(core.status.hero.equipment);
    core.setFlag("saveEquips", saveEquips);
    core.drawTip("已保存"+index+"号套装");
}

////// 读取装备 //////
items.prototype.quickLoadEquip = function (index) {
    var current = core.getFlag("saveEquips", [])[index];
    if (!core.isset(current)) {
        core.drawTip(index+"号套装不存在");
        return;
    }
    // 检查所有的装备
    var equipSize = core.status.globalAttribute.equipName.length;
    for (var i=0;i<equipSize;i++) {
        var v = current[i];
        if (core.isset(v) && !this.canEquip(v, true))
            return;
    }
    // 快速换装
    if (!core.isset(core.status.hero.equipment)) core.status.hero.equipment = [];
    for (var i=0;i<equipSize;i++) {
        var now = core.status.hero.equipment[i] || null;
        if (now != null) {
            this.unloadEquip(i);
            core.status.route.push("unEquip:" + i);
        }
    }
    for (var i=0;i<equipSize;i++) {
        var to = current[i]||null;
        if (to!=null) {
            this.loadEquip(to);
            core.status.route.push("equip:"+to);
        }
    }
    core.drawTip("成功换上"+index+"号套装");
}
