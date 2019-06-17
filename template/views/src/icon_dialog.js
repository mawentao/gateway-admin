// 图标选择对话框
var iconDialog,iconCallback;

var iconList = [
    'fa fa-home','icon icon-home','sicon-home',
    'icon icon-contact','icon icon-user','icon icon-users','sicon-user','sicon-user-female','sicon-users','fa fa-user','fa fa-users',
    'fa fa-male','fa fa-female','fa fa-street-view','icon icon-activity',
    'fa fa-tv',
    'fa fa-question-circle','sicon-question',
    'fa fa-th-large','fa fa-th','fa fa-caret-right','fa fa-list','fa fa-list-ol','fa fa-list-ul',
    'fa fa-star','fa fa-star-o','fa fa-tag','fa fa-tags',
    'fa fa-car','fa fa-taxi','fa fa-bus','fa fa-user','fa fa-users','fa fa-street-view','fa fa-cny',
    'fa fa-dollar','fa fa-warning',
    'fa fa-cube','fa fa-cubes','fa fa-database','fa fa-file-text-o','fa fa-list-alt','fa fa-table',
    'fa fa-globe',
    'icon icon-score','sicon-compass','fa fa-commenting','fa fa-commenting-o','fa fa-info-circle','fa fa-wrench',
    'fa fa-line-chart','fa fa-pie-chart','fa fa-cloud',

    // 
    'sicon-action-redo','sicon-action-undo','sicon-anchor','sicon-arrow-down','sicon-arrow-left','sicon-arrow-right','sicon-arrow-up','sicon-badge','sicon-bag','sicon-ban','sicon-bar-chart','sicon-basket','sicon-basket-loaded','sicon-bell','sicon-book-open','sicon-briefcase','sicon-bubble','sicon-bubbles','sicon-bulb','sicon-calculator','sicon-calendar','sicon-call-end','sicon-call-in','sicon-call-out','sicon-camcorder','sicon-camera','sicon-check','sicon-chemistry','sicon-clock','sicon-close','sicon-cloud-download','sicon-cloud-upload','sicon-compass','sicon-control-end','sicon-control-forward','sicon-control-pause','sicon-control-play','sicon-control-rewind','sicon-control-start','sicon-credit-card','sicon-crop','sicon-cup','sicon-cursor','sicon-cursor-move','sicon-diamond','sicon-direction','sicon-directions','sicon-disc','sicon-dislike','sicon-doc','sicon-docs','sicon-drawer','sicon-drop','sicon-earphones','sicon-earphones-alt','sicon-emoticon-smile','sicon-energy','sicon-envelope','sicon-envelope-letter','sicon-envelope-open','sicon-equalizer','sicon-eye','sicon-eyeglasses','sicon-feed','sicon-film','sicon-fire','sicon-flag','sicon-folder','sicon-folder-alt','sicon-frame','sicon-game-controller','sicon-ghost','sicon-globe','sicon-globe-alt','sicon-graduation','sicon-graph','sicon-grid','sicon-handbag','sicon-heart','sicon-home','sicon-hourglass','sicon-info','sicon-key','sicon-layers','sicon-like','sicon-link','sicon-list','sicon-lock','sicon-lock-open','sicon-login','sicon-logout','sicon-loop','sicon-magic-wand','sicon-magnet','sicon-magnifier','sicon-magnifier-add','sicon-magnifier-remove','sicon-map','sicon-microphone','sicon-mouse','sicon-moustache','sicon-music-tone','sicon-music-tone-alt','sicon-note','sicon-notebook','sicon-paper-clip','sicon-paper-plane','sicon-pencil','sicon-picture','sicon-pie-chart','sicon-pin','sicon-plane','sicon-playlist','sicon-plus','sicon-pointer','sicon-power','sicon-present','sicon-printer','sicon-puzzle','sicon-question','sicon-refresh','sicon-reload','sicon-rocket','sicon-screen-desktop','sicon-screen-smartphone','sicon-screen-tablet','sicon-settings','sicon-share','sicon-share-alt','sicon-shield','sicon-shuffle','sicon-size-actual','sicon-size-fullscreen','sicon-social-dribbble','sicon-social-dropbox','sicon-social-facebook','sicon-social-tumblr','sicon-social-twitter','sicon-social-youtube','sicon-speech','sicon-speedometer','sicon-star','sicon-support','sicon-symbol-female','sicon-symbol-male','sicon-tag','sicon-target','sicon-trash','sicon-trophy','sicon-umbrella','sicon-user','sicon-user-female','sicon-user-follow','sicon-user-following','sicon-user-unfollow','sicon-users','sicon-vector','sicon-volume-1','sicon-volume-2','sicon-volume-off','sicon-wallet','sicon-wrench',

    //
    'icon icon-loading fa fa-spin fa-2x','icon icon-activity','icon icon-wegene','icon icon-contact','icon icon-about','icon icon-protect','icon icon-drug','icon icon-hear','icon icon-ear','icon icon-beat','icon icon-23','icon icon-good','icon icon-bad','icon icon-format','icon icon-strike','icon icon-full','icon icon-gene','icon icon-count','icon icon-order','icon icon-google','icon icon-facebook','icon icon-twitter','icon icon-cart','icon icon-bulb','icon icon-download','icon icon-home','icon icon-bar','icon icon-right','icon icon-left','icon icon-unlock','icon icon-verify','icon icon-date','icon icon-log','icon icon-forbid','icon icon-transfer','icon icon-reader','icon icon-phone','icon icon-file','icon icon-ol','icon icon-undo','icon icon-redo','icon icon-bold','icon icon-italic','icon icon-underline','icon icon-ul','icon icon-image','icon icon-video','icon icon-quote','icon icon-code','icon icon-preview','icon icon-help','icon icon-h','icon icon-prestige','icon icon-v','icon icon-score','icon icon-plus','icon icon-followed','icon icon-mytopic','icon icon-up','icon icon-trash','icon icon-fold','icon icon-thank','icon icon-report','icon icon-qzone','icon icon-at','icon icon-attach','icon icon-bell','icon icon-triangle','icon icon-wechat','icon icon-lock','icon icon-i','icon icon-bubble','icon icon-flag','icon icon-txweibo','icon icon-bestbg','icon icon-best','icon icon-job','icon icon-favor','icon icon-down','icon icon-location','icon icon-bind','icon icon-weibo','icon icon-qq','icon icon-signup','icon icon-users','icon icon-topic','icon icon-login','icon icon-logout','icon icon-insert','icon icon-setting','icon icon-inbox','icon icon-pic','icon icon-user','icon icon-delete','icon icon-comment','icon icon-share','icon icon-loading','icon icon-inviteask','icon icon-list','icon icon-ask','icon icon-search','icon icon-more','icon icon-agree','icon icon-disagree','icon icon-reply','icon icon-draft','icon icon-check','icon icon-invite','icon icon-edit','icon icon-insert',

    //
    'fa fa-glass','fa fa-music','fa fa-search','fa fa-envelope-o','fa fa-heart','fa fa-star','fa fa-star-o','fa fa-user','fa fa-film','fa fa-th-large','fa fa-th','fa fa-th-list','fa fa-check','fa fa-remove','fa fa-close','fa fa-times','fa fa-search-plus','fa fa-search-minus','fa fa-power-off','fa fa-signal','fa fa-gear','fa fa-cog','fa fa-trash-o','fa fa-home','fa fa-file-o','fa fa-clock-o','fa fa-road','fa fa-download','fa fa-arrow-circle-o-down','fa fa-arrow-circle-o-up','fa fa-inbox','fa fa-play-circle-o','fa fa-rotate-right','fa fa-repeat','fa fa-refresh','fa fa-list-alt','fa fa-lock','fa fa-flag','fa fa-headphones','fa fa-volume-off','fa fa-volume-down','fa fa-volume-up','fa fa-qrcode','fa fa-barcode','fa fa-tag','fa fa-tags','fa fa-book','fa fa-bookmark','fa fa-print','fa fa-camera','fa fa-font','fa fa-bold','fa fa-italic','fa fa-text-height','fa fa-text-width','fa fa-align-left','fa fa-align-center','fa fa-align-right','fa fa-align-justify','fa fa-list','fa fa-dedent','fa fa-outdent','fa fa-indent','fa fa-video-camera','fa fa-photo','fa fa-image','fa fa-picture-o','fa fa-pencil','fa fa-map-marker','fa fa-adjust','fa fa-tint','fa fa-edit','fa fa-pencil-square-o','fa fa-share-square-o','fa fa-check-square-o','fa fa-arrows','fa fa-step-backward','fa fa-fast-backward','fa fa-backward','fa fa-play','fa fa-pause','fa fa-stop','fa fa-forward','fa fa-fast-forward','fa fa-step-forward','fa fa-eject','fa fa-chevron-left','fa fa-chevron-right','fa fa-plus-circle','fa fa-minus-circle','fa fa-times-circle','fa fa-check-circle','fa fa-question-circle','fa fa-info-circle','fa fa-crosshairs','fa fa-times-circle-o','fa fa-check-circle-o','fa fa-ban','fa fa-arrow-left','fa fa-arrow-right','fa fa-arrow-up','fa fa-arrow-down','fa fa-mail-forward','fa fa-share','fa fa-expand','fa fa-compress','fa fa-plus','fa fa-minus','fa fa-asterisk','fa fa-exclamation-circle','fa fa-gift','fa fa-leaf','fa fa-fire','fa fa-eye','fa fa-eye-slash','fa fa-warning','fa fa-exclamation-triangle','fa fa-plane','fa fa-calendar','fa fa-random','fa fa-comment','fa fa-magnet','fa fa-chevron-up','fa fa-chevron-down','fa fa-retweet','fa fa-shopping-cart','fa fa-folder','fa fa-folder-open','fa fa-arrows-v','fa fa-arrows-h','fa fa-bar-chart-o','fa fa-bar-chart','fa fa-twitter-square','fa fa-facebook-square','fa fa-camera-retro','fa fa-key','fa fa-gears','fa fa-cogs','fa fa-comments','fa fa-thumbs-o-up','fa fa-thumbs-o-down','fa fa-star-half','fa fa-heart-o','fa fa-sign-out','fa fa-linkedin-square','fa fa-thumb-tack','fa fa-external-link','fa fa-sign-in','fa fa-trophy','fa fa-github-square','fa fa-upload','fa fa-lemon-o','fa fa-phone','fa fa-square-o','fa fa-bookmark-o','fa fa-phone-square','fa fa-twitter','fa fa-facebook-f','fa fa-facebook','fa fa-github','fa fa-unlock','fa fa-credit-card','fa fa-feed','fa fa-rss','fa fa-hdd-o','fa fa-bullhorn','fa fa-bell','fa fa-certificate','fa fa-hand-o-right','fa fa-hand-o-left','fa fa-hand-o-up','fa fa-hand-o-down','fa fa-arrow-circle-left','fa fa-arrow-circle-right','fa fa-arrow-circle-up','fa fa-arrow-circle-down','fa fa-globe','fa fa-wrench','fa fa-tasks','fa fa-filter','fa fa-briefcase','fa fa-arrows-alt','fa fa-group','fa fa-users','fa fa-chain','fa fa-link','fa fa-cloud','fa fa-flask','fa fa-cut','fa fa-scissors','fa fa-copy','fa fa-files-o','fa fa-paperclip','fa fa-save','fa fa-floppy-o','fa fa-square','fa fa-navicon','fa fa-reorder','fa fa-bars','fa fa-list-ul','fa fa-list-ol','fa fa-strikethrough','fa fa-underline','fa fa-table','fa fa-magic','fa fa-truck','fa fa-pinterest','fa fa-pinterest-square','fa fa-google-plus-square','fa fa-google-plus','fa fa-money','fa fa-caret-down','fa fa-caret-up','fa fa-caret-left','fa fa-caret-right','fa fa-columns','fa fa-unsorted','fa fa-sort','fa fa-sort-down','fa fa-sort-desc','fa fa-sort-up','fa fa-sort-asc','fa fa-envelope','fa fa-linkedin','fa fa-rotate-left','fa fa-undo','fa fa-legal','fa fa-gavel','fa fa-dashboard','fa fa-tachometer','fa fa-comment-o','fa fa-comments-o','fa fa-flash','fa fa-bolt','fa fa-sitemap','fa fa-umbrella','fa fa-paste','fa fa-clipboard','fa fa-lightbulb-o','fa fa-exchange','fa fa-cloud-download','fa fa-cloud-upload','fa fa-user-md','fa fa-stethoscope','fa fa-suitcase','fa fa-bell-o','fa fa-coffee','fa fa-cutlery','fa fa-file-text-o','fa fa-building-o','fa fa-hospital-o','fa fa-ambulance','fa fa-medkit','fa fa-fighter-jet','fa fa-beer','fa fa-h-square','fa fa-plus-square','fa fa-angle-double-left','fa fa-angle-double-right','fa fa-angle-double-up','fa fa-angle-double-down','fa fa-angle-left','fa fa-angle-right','fa fa-angle-up','fa fa-angle-down','fa fa-desktop','fa fa-laptop','fa fa-tablet','fa fa-mobile-phone','fa fa-mobile','fa fa-circle-o','fa fa-quote-left','fa fa-quote-right','fa fa-spinner','fa fa-circle','fa fa-mail-reply','fa fa-reply','fa fa-github-alt','fa fa-folder-o','fa fa-folder-open-o','fa fa-smile-o','fa fa-frown-o','fa fa-meh-o','fa fa-gamepad','fa fa-keyboard-o','fa fa-flag-o','fa fa-flag-checkered','fa fa-terminal','fa fa-code','fa fa-mail-reply-all','fa fa-reply-all','fa fa-star-half-empty','fa fa-star-half-full','fa fa-star-half-o','fa fa-location-arrow','fa fa-crop','fa fa-code-fork','fa fa-unlink','fa fa-chain-broken','fa fa-question','fa fa-info','fa fa-exclamation','fa fa-superscript','fa fa-subscript','fa fa-eraser','fa fa-puzzle-piece','fa fa-microphone','fa fa-microphone-slash','fa fa-shield','fa fa-calendar-o','fa fa-fire-extinguisher','fa fa-rocket','fa fa-maxcdn','fa fa-chevron-circle-left','fa fa-chevron-circle-right','fa fa-chevron-circle-up','fa fa-chevron-circle-down','fa fa-html5','fa fa-css3','fa fa-anchor','fa fa-unlock-alt','fa fa-bullseye','fa fa-ellipsis-h','fa fa-ellipsis-v','fa fa-rss-square','fa fa-play-circle','fa fa-ticket','fa fa-minus-square','fa fa-minus-square-o','fa fa-level-up','fa fa-level-down','fa fa-check-square','fa fa-pencil-square','fa fa-external-link-square','fa fa-share-square','fa fa-compass','fa fa-toggle-down','fa fa-caret-square-o-down','fa fa-toggle-up','fa fa-caret-square-o-up','fa fa-toggle-right','fa fa-caret-square-o-right','fa fa-euro','fa fa-eur','fa fa-gbp','fa fa-dollar','fa fa-usd','fa fa-rupee','fa fa-inr','fa fa-cny','fa fa-rmb','fa fa-yen','fa fa-jpy','fa fa-ruble','fa fa-rouble','fa fa-rub','fa fa-won','fa fa-krw','fa fa-bitcoin','fa fa-btc','fa fa-file','fa fa-file-text','fa fa-sort-alpha-asc','fa fa-sort-alpha-desc','fa fa-sort-amount-asc','fa fa-sort-amount-desc','fa fa-sort-numeric-asc','fa fa-sort-numeric-desc','fa fa-thumbs-up','fa fa-thumbs-down','fa fa-youtube-square','fa fa-youtube','fa fa-xing','fa fa-xing-square','fa fa-youtube-play','fa fa-dropbox','fa fa-stack-overflow','fa fa-instagram','fa fa-flickr','fa fa-adn','fa fa-bitbucket','fa fa-bitbucket-square','fa fa-tumblr','fa fa-tumblr-square','fa fa-long-arrow-down','fa fa-long-arrow-up','fa fa-long-arrow-left','fa fa-long-arrow-right','fa fa-apple','fa fa-windows','fa fa-android','fa fa-linux','fa fa-dribbble','fa fa-skype','fa fa-foursquare','fa fa-trello','fa fa-female','fa fa-male','fa fa-gittip','fa fa-gratipay','fa fa-sun-o','fa fa-moon-o','fa fa-archive','fa fa-bug','fa fa-vk','fa fa-weibo','fa fa-renren','fa fa-pagelines','fa fa-stack-exchange','fa fa-arrow-circle-o-right','fa fa-arrow-circle-o-left','fa fa-toggle-left','fa fa-caret-square-o-left','fa fa-dot-circle-o','fa fa-wheelchair','fa fa-vimeo-square','fa fa-turkish-lira','fa fa-try','fa fa-plus-square-o','fa fa-space-shuttle','fa fa-slack','fa fa-envelope-square','fa fa-wordpress','fa fa-openid','fa fa-institution','fa fa-bank','fa fa-university','fa fa-mortar-board','fa fa-graduation-cap','fa fa-yahoo','fa fa-google','fa fa-reddit','fa fa-reddit-square','fa fa-stumbleupon-circle','fa fa-stumbleupon','fa fa-delicious','fa fa-digg','fa fa-pied-piper','fa fa-pied-piper-alt','fa fa-drupal','fa fa-joomla','fa fa-language','fa fa-fax','fa fa-building','fa fa-child','fa fa-paw','fa fa-spoon','fa fa-cube','fa fa-cubes','fa fa-behance','fa fa-behance-square','fa fa-steam','fa fa-steam-square','fa fa-recycle','fa fa-automobile','fa fa-car','fa fa-cab','fa fa-taxi','fa fa-tree','fa fa-spotify','fa fa-deviantart','fa fa-soundcloud','fa fa-database','fa fa-file-pdf-o','fa fa-file-word-o','fa fa-file-excel-o','fa fa-file-powerpoint-o','fa fa-file-photo-o','fa fa-file-picture-o','fa fa-file-image-o','fa fa-file-zip-o','fa fa-file-archive-o','fa fa-file-sound-o','fa fa-file-audio-o','fa fa-file-movie-o','fa fa-file-video-o','fa fa-file-code-o','fa fa-vine','fa fa-codepen','fa fa-jsfiddle','fa fa-life-bouy','fa fa-life-buoy','fa fa-life-saver','fa fa-support','fa fa-life-ring','fa fa-circle-o-notch','fa fa-ra','fa fa-rebel','fa fa-ge','fa fa-empire','fa fa-git-square','fa fa-git','fa fa-y-combinator-square','fa fa-yc-square','fa fa-hacker-news','fa fa-tencent-weibo','fa fa-qq','fa fa-wechat','fa fa-weixin','fa fa-send','fa fa-paper-plane','fa fa-send-o','fa fa-paper-plane-o','fa fa-history','fa fa-circle-thin','fa fa-header','fa fa-paragraph','fa fa-sliders','fa fa-share-alt','fa fa-share-alt-square','fa fa-bomb','fa fa-soccer-ball-o','fa fa-futbol-o','fa fa-tty','fa fa-binoculars','fa fa-plug','fa fa-slideshare','fa fa-twitch','fa fa-yelp','fa fa-newspaper-o','fa fa-wifi','fa fa-calculator','fa fa-paypal','fa fa-google-wallet','fa fa-cc-visa','fa fa-cc-mastercard','fa fa-cc-discover','fa fa-cc-amex','fa fa-cc-paypal','fa fa-cc-stripe','fa fa-bell-slash','fa fa-bell-slash-o','fa fa-trash','fa fa-copyright','fa fa-at','fa fa-eyedropper','fa fa-paint-brush','fa fa-birthday-cake','fa fa-area-chart','fa fa-pie-chart','fa fa-line-chart','fa fa-lastfm','fa fa-lastfm-square','fa fa-toggle-off','fa fa-toggle-on','fa fa-bicycle','fa fa-bus','fa fa-ioxhost','fa fa-angellist','fa fa-cc','fa fa-shekel','fa fa-sheqel','fa fa-ils','fa fa-meanpath','fa fa-buysellads','fa fa-connectdevelop','fa fa-dashcube','fa fa-forumbee','fa fa-leanpub','fa fa-sellsy','fa fa-shirtsinbulk','fa fa-simplybuilt','fa fa-skyatlas','fa fa-cart-plus','fa fa-cart-arrow-down','fa fa-diamond','fa fa-ship','fa fa-user-secret','fa fa-motorcycle','fa fa-street-view','fa fa-heartbeat','fa fa-venus','fa fa-mars','fa fa-mercury','fa fa-intersex','fa fa-transgender','fa fa-transgender-alt','fa fa-venus-double','fa fa-mars-double','fa fa-venus-mars','fa fa-mars-stroke','fa fa-mars-stroke-v','fa fa-mars-stroke-h','fa fa-neuter','fa fa-genderless','fa fa-facebook-official','fa fa-pinterest-p','fa fa-whatsapp','fa fa-server','fa fa-user-plus','fa fa-user-times','fa fa-hotel','fa fa-bed','fa fa-viacoin','fa fa-train','fa fa-subway','fa fa-medium','fa fa-yc','fa fa-y-combinator','fa fa-optin-monster','fa fa-opencart','fa fa-expeditedssl','fa fa-battery-4','fa fa-battery-full','fa fa-battery-3','fa fa-battery-three-quarters','fa fa-battery-2','fa fa-battery-half','fa fa-battery-1','fa fa-battery-quarter','fa fa-battery-0','fa fa-battery-empty','fa fa-mouse-pointer','fa fa-i-cursor','fa fa-object-group','fa fa-object-ungroup','fa fa-sticky-note','fa fa-sticky-note-o','fa fa-cc-jcb','fa fa-cc-diners-club','fa fa-clone','fa fa-balance-scale','fa fa-hourglass-o','fa fa-hourglass-1','fa fa-hourglass-start','fa fa-hourglass-2','fa fa-hourglass-half','fa fa-hourglass-3','fa fa-hourglass-end','fa fa-hourglass','fa fa-hand-grab-o','fa fa-hand-rock-o','fa fa-hand-stop-o','fa fa-hand-paper-o','fa fa-hand-scissors-o','fa fa-hand-lizard-o','fa fa-hand-spock-o','fa fa-hand-pointer-o','fa fa-hand-peace-o','fa fa-trademark','fa fa-registered','fa fa-creative-commons','fa fa-gg','fa fa-gg-circle','fa fa-tripadvisor','fa fa-odnoklassniki','fa fa-odnoklassniki-square','fa fa-get-pocket','fa fa-wikipedia-w','fa fa-safari','fa fa-chrome','fa fa-firefox','fa fa-opera','fa fa-internet-explorer','fa fa-tv','fa fa-television','fa fa-contao','fa fa-500px','fa fa-amazon','fa fa-calendar-plus-o','fa fa-calendar-minus-o','fa fa-calendar-times-o','fa fa-calendar-check-o','fa fa-industry','fa fa-map-pin','fa fa-map-signs','fa fa-map-o','fa fa-map','fa fa-commenting','fa fa-commenting-o','fa fa-houzz','fa fa-vimeo','fa fa-black-tie','fa fa-fonticons','fa fa-reddit-alien','fa fa-edge','fa fa-credit-card-alt','fa fa-codiepie','fa fa-modx','fa fa-fort-awesome','fa fa-usb','fa fa-product-hunt','fa fa-mixcloud','fa fa-scribd','fa fa-pause-circle','fa fa-pause-circle-o','fa fa-stop-circle','fa fa-stop-circle-o','fa fa-shopping-bag','fa fa-shopping-basket','fa fa-hashtag','fa fa-bluetooth','fa fa-bluetooth-b','fa fa-percent'

];

// 图标搜索
function iconQuery()
{
    var key = mwt.get_value('sokey');
    var ls = [];
    for (var i=0;i<iconList.length;++i) {
        var icon = iconList[i];
        var name = icon.replace('fa ','');
        name = name.replace('icon ','');
        if (key=='' || icon.indexOf(key)>=0) {
            var code = '<a href="javascript:;" name="iconselitem" class="iconsel" data-ic="'+icon+'">'+
                '<i class="'+icon+'"></i> '+name+
            '</a>';
            ls.push(code);
        }
    }
    jQuery('#center-div').html(ls.join(''));
    jQuery("[name=iconselitem]").unbind('click').click(function(){
        var selected_icon = jQuery(this).data('ic');
        iconDialog.close();
        if (iconCallback) iconCallback(selected_icon);
    });
}

// 初始化图标选择对话框
function initIconDialog()
{/*{{{*/
    iconDialog = new MWT.Dialog({
        title: '选择图标',
        fullscreen: true,
        style : 'left:10%;right:10%;',
        body: '<div id="tbar" class="mwt-layout-border-north" style="height:40px;top:-1px;"></div>'+
              '<div id="center-div" class="mwt-layout-border-center" style="top:38px;padding:10px;bottom:0px;"></div>',
        buttons: [
            {label:"取消",type:'close',cls:'mwt-btn-default'}
        ]
    });
    iconDialog.create();

    new mwt.ToolBar({
        render : 'tbar',
        items  : [
            {type:'search',id:'sokey',width:300,placeholder:'查询关键词',handler:iconQuery}
        ]
    }).create();

    iconDialog.on('open', function(){
        iconQuery();
    });
}/*}}}*/

// 打开图标选择对话框
function openIconDialog(callfun)
{
    if (callfun) iconCallback=callfun;
    if (!iconDialog) initIconDialog();
    iconDialog.open();
}



