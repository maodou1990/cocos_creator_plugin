// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var ScrollNumType = cc.Enum({
    integer:0,
    float:1,
});

var ScrollLabel = cc.Class({
    extends: cc.Label,

    properties: {
        _current:0,
        _target:0,
        _timestamp:0,
        scroll_type:{type:ScrollNumType,default:ScrollNumType.integer},
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {},
    show_current:function()
    {
        let str = '';
        if(this.scroll_type == ScrollNumType.integer)
        {
            str = Math.floor(this._current);
        }
        else
        {
            str = Number(this._current.toString().match(/^\d+(?:\.\d{0,2})?/));
        }
        this.string = str;
    },

    set_current:function(num)
    {
        this._current = num;
        this._target = num;
        this.show_current();
    },
    
    set_target:function(num)
    {
        this._target = num;
        this._timestamp = 0.5;
    },

    update:function(dt) {
        if(this._current != this._target)
        {
            if(this._timestamp > 0)
            {
                let delta = (this._target - this._current) * dt / this._timestamp;
                this._current += delta;
                this._timestamp -= dt;
            }
            else
            {
                this._current = this._target;
            }
            this.show_current();
        }        
    },
});

module.export = ScrollLabel;
