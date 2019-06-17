define(function(require){
    // 字典
    var dict_map={
        'status': [
			{text:'离线',value:0,color:'#999'},
			{text:'在线',value:1,color:'#006400'}
		]
    };

    var o={};

    function loadall(key) {
        if (dict_map[key]) return dict_map[key];
        ajax.post('dict&action=getoptions',{key:key},function(res){
            if (res.retcode!=0) alert(res.retmsg);
            else {
                dict_map[key] = [];
                for (var i=0;i<res.data.length;++i) {
                    dict_map[key].push(res.data[i]);
                }
            }
        },true);
        return dict_map[key];
    }

    o.get_options=function(key,firstoption) {
        var list = loadall(key);
        var options = [];
        if (firstoption) options.push(firstoption);
        for (var i=0;i<list.length;++i) {
            options.push(list[i]);
        }
        return options;
    };

    o.get_map=function(key) {
        var map = {};
        var list = loadall(key);
        for (var i=0;i<list.length;++i) {
            var im = list[i];
            map[im.value] = im.text;
        }
        return map;
    };

    o.getMap2=function(key) {
        var map = {};
        var list = loadall(key);
        for (var i=0;i<list.length;++i) {
            var im = list[i];
            map[im.value] = {
                text: im.text,
                color: im.color ? im.color : '#000'
            };
        }
        return map;
    };


    return o;
});
