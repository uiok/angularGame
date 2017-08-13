 <script>
        /*开始评量*/
        $(".fancybox").fancybox({
            autoSize: false,
            arrows: false,
            openEffect: 'fade', //fade, elastic
            closeEffect: 'fade', //fade, elastic
            prevEffect: 'elastic',
            nextEffect: 'elastic',
            tpl: {
                next: '<a title="下一则" class="fancybox-nav fancybox-next"><span></span></a>',
                prev: '<a title="上一则" class="fancybox-nav fancybox-prev"><span></span></a>'
            },
            helpers: {
                title: {
                    //inside, outside, over
                },
                overlay: {
                    speedIn: 0,
                    speedOut: 300,
                    opacity: 0.8,
                    css: {
                        cursor: 'default'
                    },
                    closeClick: false
                }
            }
        });

        /*关闭*/
        $("#close").click(function () {
            $.fancybox.close();
        });
    </script>