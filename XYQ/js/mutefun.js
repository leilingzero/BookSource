var rule = {
     title: 'mutefun - LR',
     host: 'https://www.mutean.com',
     homeUrl: '/label/week.html',
     searchUrl: '/vodsearch/**----------fypage---.html',
     url:'/vodshow/fyclass--------fypage---.html',
     searchable: 2,//是否启用全局搜索,
     quickSearch: 1,//是否启用快速搜索,
     filterable: 0,//是否启用分类筛选,
     headers: {
       'User-Agent': 'MOBILE_UA'
     },
     play_parse: false,
     lazy:`js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        var from = html.from;
        var MacPlayerConfig={};
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/.m3u8|.mp4/.test(url)) {
            input = url
        } else {
        eval(fetch(HOST + '/static/js/playerconfig.js').replace('var Mac','Mac'));
        var list = MacPlayerConfig.player_list[from].parse;
            input={
                jx:0,
                url:list+url,
                parse:1,
                header: JSON.stringify({
                    'referer': HOST
                })
            }
        }
     `,
     limit: 6,
     tab_rename:{'排序':'LR',},
     class_name:'日漫&美漫&特摄&日剧',
     class_url:'20&22&23&24',
     double: false, // 推荐内容是否双层定位
     推荐: '.module-main;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
     一级: 'body a.module-poster-item.module-item;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
     二级: {
              'title': 'h1&&Text',
              'img': '.lazyload&&data-original',
              'desc': '.module-info-item-content:eq(8)&&Text;.module-info-tag-link:eq(0)&&Text;.module-info-tag-link:eq(1)&&Text;.module-info-tag-link:eq(3)&&Text;.module-info-tag-link:eq(4)&&Text',
              'content': '.module-info-introduction-content&&Text',
              'tabs': '.module-tab-item',
              'lists': '.module-play-list:eq(#id) a'
          },
     搜索: 'body .module-item;.module-card-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href;.module-info-item-content&&Text'
    }
