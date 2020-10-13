/***************************************************************************************
 侧边栏插件
 @autor     iProg
 @date      2016-01-25
 @version   1.0

 使用方法：
 在页面建立html标签如下：
 <div class="sliderbar-container">
    <div class="sliderbar-title"><i></i> 通知消息</div>
    <div class="sliderbar-body">
        无消息
    </div>
 </div>

 说明：上面的class属性值，除了sliderbar-container可以随意更改，其它的如
           sliderbar-title，sliderbar-body都不能更改哦！
 
 然后加入js代码如下，就可以了:
 <script type="text/javascript">
 $(function(){
    $('.sliderbar-container').sliderBar({
        open : true,
        top : 200,
        width : 360,
        height : 240,
        theme : '#463eee',
        position : 'right'
    });
 });
 </script>

from: http://xcdn.php.cn/js/html5/H5+jQuery%E7%BD%91%E9%A1%B5%E5%B7%A6%E4%BE%A7%E6%82%AC%E6%B5%AE%E6%B6%88%E6%81%AF%E9%80%9A%E7%9F%A5%E7%89%B9%E6%95%88/index.html?sign=5eee003338770db94da47a224697d4ac&timestamp=1582252197

说明：本js脚本已被博主调整过
****************************************************************************************/
;(function ($) {
    $.fn.extend({
        "sliderBar": function (options) {
            // 使用jQuery.extend 覆盖插件默认参数
            var opts = $.extend(
                {} ,
                $.fn.sliderBar.defalutPublic ,
                options
            );

            // 这里的this 就是 jQuery对象，遍历页面元素对象
            // 加个return可以链式调用
            return this.each(function () {
                //获取当前元素 的this对象 
                var $this = $(this);  

                $this.data('open', opts.open);

                privateMethods.initSliderBarCss($this, opts);

                switch(opts.position){
                    case 'right' : privateMethods.showAtRight($this, opts); break;
                    case 'left'  : privateMethods.showAtLeft($this, opts); break;
                }
                
            });
        }
    });

    // 默认公有参数
    $.fn.sliderBar.defalutPublic = {
        open : true,           // 默认是否打开，true打开，false关闭
        top : 200,             // 距离顶部多高
        width : 260,           // body内容宽度
        height : 200,          // body内容高度
        theme : 'green',       // 主题颜色
        position : 'left'      // 显示位置，有left和right两种
    }

    var privateMethods = {
        initSliderBarCss : function(obj, opts){
            obj.css({
                'width': opts.width+20+'px',
                'height' : opts.height+20+'px',
                'top' : opts.top+'px',
                'border' : '1px solid '+opts.theme,
                'position':'fixed',
                'font-family':'Microsoft Yahei',
                'z-index': '9999'
            }).find('.sliderbar-body').css({
                'width': opts.width+'px',
                'height' : opts.height+'px',
                'position':'relative',
                'padding':'10px',
                'overflow-x':'hidden',
                'overflow-y':'auto',
                'font-family':'Noto Serif SC',      //'Microsoft Yahei',
                'background':'url(https://s1.ax1x.com/2020/04/15/J95BM6.png),#f6f4ec',      //'#ddd',
                'background-size':'cover',
                'background-repeat':'no-repeat',
                'background-position':'center',
                'opacity':'0.8',
                'font-size' : '14px'
            });

            var titleCss = {
                'width':'15px',
                'height':'80px',
                'position':'absolute',
                'top':'-1px',
                'display':'block',
                'background-color': opts.theme,
                'font-size': '13px',
                'padding':'3px 4px 0px 5px',
                'color':'#fff',
                'border-radius':'10px',
                'cursor':'pointer',
                'font-family':'ZCOOL KuaiLe'    //'Microsoft Yahei'
            }

            obj.find('.sliderbar-title').css(titleCss).find('i').css({
                'font-size': '14px'
            });
        },
        showAtLeft : function(obj, opts){
            if(opts.open){
                obj.css({left:'0px'});
                obj.find('.sliderbar-title').css('right','-25px').find('i').attr('class','fa fa-chevron-circle-left');
            }else{
                obj.css({left:-opts.width-22+'px'});
                obj.find('.sliderbar-title').css('right','-25px').find('i').attr('class','fa fa-chevron-circle-right');
            }

            obj.find('.sliderbar-title').click(function(){
                if(obj.data('open')){
                    obj.animate({left:-opts.width-22+'px'}, 500);
                    $(this).find('i').attr('class','fa fa-chevron-circle-right');
                }else{
                    obj.animate({left:'0px'}, 500);
                    $(this).find('i').attr('class','fa fa-chevron-circle-left');
                }
                obj.data('open',obj.data('open') == true ? false : true);
            });
        },
        showAtRight : function(obj, opts){
            if(opts.open){
                obj.css({right:'0px'});
                obj.find('.sliderbar-title').css('right', opts.width+20+'px').find('i').attr('class','fa fa-chevron-circle-right');
            }else{
                obj.css({right:-opts.width-22+'px'});    // origin:25px
                obj.find('.sliderbar-title').css('right', opts.width+20+'px').find('i').attr('class','fa fa-chevron-circle-left');
            }

            obj.find('.sliderbar-title').click(function(){
                if(obj.data('open')){
                    obj.animate({right:-opts.width-22+'px'}, 500);
                    $(this).find('i').attr('class','fa fa-chevron-circle-left');
                }else{
                    obj.animate({right:'0px'}, 500);
                    $(this).find('i').attr('class','fa fa-chevron-circle-right');
                }
                obj.data('open',obj.data('open') == true ? false : true);
            });
        }
    };
})(jQuery)
