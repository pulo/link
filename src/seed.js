import events from 'events';

class Seed{
    constructor() {
        this.tags = [];
        this.children = [];
        this.parent = undefined;
        this.newTag('seed');
        this.emitter = new events.EventEmitter();
        this.emit('after_boot');
    }
    boot(){}
    on(){
        this.emitter.on.apply(this,arguments);
    }
    emit(){
        this.emitter.emit.apply(this,arguments);
    }
    newTag(tag){
        let isExist = false;
        this.tags.find( (item)=>{
            if(item === tag){
                isExist = true;
            }
        });
        if(!isExist)this.tags.push(tag);
    }
    hasTag(tag){
        let _has = false;
        this.tags.find( (item)=>{
            if(item === tag){
                _has = true;
            }
        });
        return _has;
    }
    /*
    中断一个父子对象的关系，一旦中断，双向都中断,
    注意 中断并非销毁，
    */
    breakLink(_obj){
        //先判断子对象
        this.children.forEach((element, index)=>{
            if (element == _obj) {
                this.children.splice(index, 1);
                element.parent = undefined;
            }
        })
        //再判断父对象
        //检测该对象是否为父对象，如果是父对象，也可中断
        if (this.parent == _obj) {
            this.parent = undefined;
            _obj.breakLink(this);
        }
    }
    destroy(){
        this.emitter.removeAllListeners();
        Object.getOwnPropertyNames(this).forEach((index)=>{
            delete this[index];
        })
    }
}
export default Seed;