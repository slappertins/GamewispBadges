// Apply Dark Theme
function WaitForHead(darkTheme)
{
    var timer = setInterval(function ()
    {
        if(document.head)
        {
            clearInterval(timer);
            ApplyDarkTheme();
        }
    }, 100);
}

WaitForHead();

var darkThemeCSS = "" +
"html,body{background-color:#191919 !important;}" +
"/* ScrollBar */" +
"::-webkit-scrollbar{width:12px;}" +
"::-webkit-scrollbar-track{-webkit-box-shadow:insert 0 0 6px rgba(0,0,0,0.3);-webkit-border-radius:10px;border-radius:10px;}" +
"::-webkit-scrollbar-thumb{-webkit-border-radius:10px;border-radius:10px;background: rgba(255,255,255,0.2);-webkit-box-shadow:insert 0 0 6px rgba(0,0,0,0.5);}" +
"::-webkit-scrollbar-thumb:window-inactive{background: rgba(255,255,255,0.1);}" +
".ember-chat-container{background-color:#191919 !important;}" +
".ember-chat .chat-messages{background-color:#191919 !important;}" +
".ember-chat .chat-messages .tse-scroll-content{background-color:#191919 !important;}" +
".ember-chat .chat-messages span.message{color:#FFF !important;}" +
".chat-line span.timestamp{color:rgba(255,255,255,0.3) !important;}" +
".ember-chat .chat-interface .textarea-contain textarea{box-shadow:inset 0 1px 3px rgba(0,0,0,0.3),0 1px rgba(255,255,255,0.1) !important;background-color:rgba(0,0,0,0.25) !important;border-radius:3px !important;color:#fff !important;border:none !important;}" +
"svg.svg-emoticons path{fill:rgba(255,255,255,0.4) !important;}" +
"svg.svg-emoticons:hover path{fill:rgba(197,149,49,1) !important;}" +
".chat-buttons-container a svg path{fill:rgba(255,255,255,0.5) !important;}" +
".chat-buttons-container a svg:hover path{fill:rgba(197,149,49,1) !important;}" +
".ember-chat div.chat-interface{border-top:1px solid #2b2d2f !important;background-color:#191919 !important;}" +
".ember-chat-container div.chat-room{top:0px !important;}" +
".ember-chat-container div.chat-header{height:0px !important;padding:0px !important;}" +
".ember-chat .chat-settings{background-color:#191919 !important;box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.75) !important;}" +
".chat-hidden-overlay{background-color:#191919 !important;color:#FFF !important;}" +
"div.chat-settings div.bttvChatSettings{height:0px !important;overflow:hidden !important;}" +
"button.send-chat-button{background:#c59531 !important;border-radius:3px !important;text-shadow:none !important;border:none !important;}" +
"button.send-chat-button.primary{background:#c59531 !important;border-radius:3px !important;text-shadow:none !important;border:none !important;}" +
"button.send-chat-button.primary:hover{background:#c59531 !important;border-radius:3px !important;text-shadow:none !important;border:none !important;}" +
"button.send-chat-button span{color:#191919 !important;font-size:14px !important;font-weight:bold !important;}" +
".ember-chat .chat-interface .emoticon-selector div.emoticon-selector-box{width:500px !important;margin-bottom:0px !important;max-height:280px !important;}" +
".ember-chat .chatters-view .chatters-container .chatters div.chat-header{height:40px !important;}" +
".ember-chat div.chatters-view{background:#191919 !important;}" +
"div.loading-mask{background-color:#191919 !important;}" +
".ember-chat .chat-menu .chat-menu-content p.toggle-darkmode{height:0px !important;overflow:hidden !important;}" +
".ember-chat .chat-menu div.chat-menu-content p{color:#FFF !important;}" +
".ember-chat .chat-menu div.list-header{color:#FFF !important;}" +
".ember-chat .chat-messages div.chat-line{background-color:#191919 !important;line-height:20px !important;padding:4px 10px 4px 10px !important;}" +
"#chat_line_list .line, .chat-messages div.chat-line{border-bottom:none !important;border-top:none !important; box-shadow:none !important;}" +
"/* Icons */" +
".ember-chat .badges div.broadcaster{background-color:#191919 !important;}" +
".ember-chat .badges div.moderator{background-color:#191919 !important;}" +
".ember-chat .badges div.turbo{background-color:#191919 !important;}" +
"";

function ApplyDarkTheme()
{
    var darkcss = document.createElement('style');
    darkcss.id = 'gw-plugin-chat-darkThemeCSS';
    darkcss.type = 'text/css';
    darkcss.textContent = darkThemeCSS;
    document.head.appendChild(darkcss);
}
