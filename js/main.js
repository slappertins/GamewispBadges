// JSON
var gwSubs
var gwBadges
var gwEmotes
var gwDev
var gwDonor

// Timers
var chatLoadCheck = setInterval(CheckForChat, 1000);
// Vars
var injected = false;
var usingDarkTheme = null;

// Objects
var observer;
var ChatLines;
var ChatMessageBox;


// dtc

function CheckForChat() {
    var chatLines = document.getElementsByClassName('chat-lines')[0];
    if (chatLines) {
        if (injected === false || chatLines != ChatLines) {
            injected = true;
            LoadJSON();
            ChatLines = chatLines;
            ChatMessageBox = document.getElementsByClassName('ember-view ember-text-area mousetrap')[0];
            ChatSendButton = document.getElementsByClassName('button float-right qa-chat-buttons__submit js-chat-buttons__submit')[0];

            if (ChatMessageBox != null) {
                ChatMessageBox.addEventListener("keydown", function(event) {
                    var message = ChatMessageBox.value;
                    if (event.keyCode === 13) {
                        if (message !== "") {
                            ParseTwitchMessage(message);
                        }
                    }
                });
            }
            if (ChatSendButton != null) {
                ChatSendButton.addEventListener("click", function() {
                    var message = ChatMessageBox.value;
                    if (message !== "") {
                        ParseTwitchMessage(message);
                    }
                });
            }
            ObserveChatLines(chatLines);
        }
    }
}

function ParseTwitchMessage(message) {}

//Check json file
function LoadJSON() {
    var gwJSONRequest = new XMLHttpRequest();
    gwJSONRequest.onreadystatechange = function() {
        if (gwJSONRequest.readyState == 4) {
            var json = JSON.parse(gwJSONRequest.responseText);
            gwSubs = json['subscribers'];
            gwBadges = json['sub_badge'];
            gwEmotes = json['emotes'];
            gwDev = json['developers'];
            gwDonor = json['donor'];
        }
    };
    {
      gwJSONRequest.open("GET", "*****", true);
      gwJSONRequest.send();
    }
}

function ObserveChatLines(chatLines) {
    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var Node = mutation.addedNodes[i];
                if (Node.tagName === 'LI' || Node.tagName === 'DIV') {
                    if (Node.className.indexOf('chat-line') > -1) {
                        // BTTV
                        ParseChatMessage(Node, true);
                    } else if (Node.className.indexOf('ember-view') > -1) {
                        // Twitch
                        ParseChatMessage(Node.children[0], false);
                    }
                }
            }
        });
    });
    observer.observe(chatLines, {
        childList: true
    });
}

function ParseChatMessage(chatLine, bttv) {

    // Fetch BTTV BG setting
    if (bttv === true && usingDarkTheme === null) {
        var styles = document.body.getElementsByTagName('link');
        for (var i = 0; i < styles.length; i++) {
            if (styles[i].id == "darkTwitch") {
                usingDarkTheme = true;
            }
        }

        if (usingDarkTheme != true) {
            usingDarkTheme = false;
        }
    }

    var senderObject = chatLine.getElementsByClassName('from')[0];
    var sender = senderObject.textContent.toLowerCase();
    sender = sender.trim();

    if (sender != null && sender != "jtv") {


        // Developer Glow
        if (gwDev[sender] != null) {
            // Fetching chat name color
            var nameStyle = "";
            var nameColour = "";
            if (gwDev[sender].colour != null) {
                if (gwDev[sender].colour == "None") {
                    nameColour = senderObject.style.color;
                    nameColour.replace("rgb(", "rgba(");
                    if (usingDarkTheme == true) {
                        nameColour.replace(")", ",0.8)");
                    } else {
                        nameColour.replace(")", ",1.0)");
                    }

                } else {

                    nameStyle = nameStyle + "color:" + gwDev[sender].colour + ";";
                    if (usingDarkTheme == true) {
                        nameColour = Hex2RGB(gwDev[sender].colour, 0.8);
                    } else {
                        nameColour = Hex2RGB(gwDev[sender].colour, 1.0);
                    }
                }
            }
            if (gwDev[sender].glow == true) {
                if (usingDarkTheme == true) {
                    nameStyle = nameStyle + "text-shadow: 0 0 20px " + nameColour + ", 0 0 20px " + nameColour + ";" + "color: " + nameColour;
                } else {
                    nameStyle = nameStyle + "text-shadow: 0 0 20px " + nameColour + ", 0 0 20px " + nameColour + ";" + "color: " + nameColour;
                }
                senderObject.setAttribute("style", nameStyle);
            }
        }

        // Donator Glow
        if (gwDonor[sender] != null) {
            // Fetching chat name color
            var nameStyle = "";
            var nameColour = "";
            if (gwDonor[sender].colour != null) {
                if (gwDonor[sender].colour == "None") {
                    nameColour = senderObject.style.color;
                    nameColour.replace("rgb(", "rgba(");
                    if (usingDarkTheme == true) {
                        nameColour.replace(")", ",0.8)");
                    } else {
                        nameColour.replace(")", ",1.0)");
                    }

                } else {

                    nameStyle = nameStyle + "color:" + gwDonor[sender].colour + ";";
                    if (usingDarkTheme == true) {
                        nameColour = Hex2RGB(gwDonor[sender].colour, 0.8);
                    } else {
                        nameColour = Hex2RGB(gwDonor[sender].colour, 1.0);
                    }
                }
            }
            if (gwDonor[sender].glow == true) {
                if (usingDarkTheme == true) {
                    nameStyle = nameStyle + "text-shadow: 0 0 20px " + nameColour + ", 0 0 20px " + nameColour + ";" + "color: " + nameColour;
                } else {
                    nameStyle = nameStyle + "text-shadow: 0 0 20px " + nameColour + ", 0 0 20px " + nameColour + ";" + "color: " + nameColour;
                }
                senderObject.setAttribute("style", nameStyle);
            }
        }


        // Subscriber Badges

        if (chatLine.className.indexOf("whisper") < 0) {
            if (gwSubs[sender] != null) {
                var badges = gwSubs[sender].sub_badge.split(",");
                for (var b = 0; b < badges.length; b++) {
                    // Every Badge
                    if (gwBadges[badges[b]]) {
                        var customBadge = document.createElement('div');
                        var badge = gwBadges[badges[b]];
                        if (badge.border == 1) {
                            // CSS Border
                            customBadge.className = "badge float-left tooltip gwCustomBadgeWithBorder";
                            customBadge.style.borderColor = badge.border_color;
                        } else {
                            customBadge.className = "badge float-left tooltip gwCustomBadge";
                        }

                        if (badge.text != "") {
                            customBadge.setAttribute("original-title", badge.text);
                        }

                        if (badge.bg_color != "") {
                            customBadge.style.backgroundColor = badge.bg_color;
                        }

                        if (badge.image != "") {
                            customBadge.style.backgroundImage = 'url(data:image/png;base64,' + badge.image + ')';
                        }

                        if (badge.width != null) {
                            customBadge.style.width = '' + badge.width + 'px !important';
                        }

                        if (badge.link != "") {
                            // Check badge for link!
                            var linkEle = document.createElement('a');
                            linkEle.href = badge.link;
                            linkEle.target = "_blank";
                            linkEle.appendChild(customBadge);
                            var attach = chatLine.getElementsByClassName('badges')[0];
                            attach.appendChild(linkEle);
                        } else {
                            var attach = chatLine.getElementsByClassName('badges')[0];
                            attach.appendChild(customBadge);
                        }

                    }
                }
            }
        }


        // Developer Badges

        if (gwDev[sender] != null) {
            if (gwDev[sender].developer == true) {
                var linkEle = document.createElement('a');
                linkEle.href = "http://gamewispbadges.com";
                linkEle.target = "_blank";
                var developerBadge = document.createElement('div');
                developerBadge.className = "badge float-left tooltip gwdeveloperBadge";
                developerBadge.setAttribute("original-title", "GameWisp Badge Developer");
                linkEle.appendChild(developerBadge);
                var attach = chatLine.getElementsByClassName('badges')[0];
                attach.appendChild(linkEle);
            }
        }

        // Custom Donation Badges

        if (gwDonor[sender] != null) {
            if (gwDonor[sender].custom == true) {
                //Add custom donor badge
                var linkEle = document.createElement('a');
                linkEle.href = "http://gamewispbadges.com";
                linkEle.target = "_blank";
                var developerBadge = document.createElement('div');
                developerBadge.className = "badge float-left tooltip gwCustom";
                developerBadge.setAttribute("original-title", "GameWisp Badge Supporter");
                linkEle.appendChild(developerBadge);
                var attach = chatLine.getElementsByClassName('badges')[0];
                attach.appendChild(linkEle);
            }
        }

        // Donation Badges

        if (gwDonor[sender] != null) {
            if (gwDonor[sender].donor == true) {
                // Add donor badge
                var linkEle = document.createElement('a');
                linkEle.href = "http://gamewispbadges.com/";
                linkEle.target = "_blank";
                var donorBadge = document.createElement('div');
                donorBadge.className = "badge float-left tooltip gwDonor";
                donorBadge.setAttribute("original-title", "GameWisp Badge Supporter");
                linkEle.appendChild(donorBadge);
                var attach = chatLine.getElementsByClassName('badges')[0];
                attach.appendChild(linkEle);

            }
        }
    }
    // Emotes
    var message = chatLine.getElementsByClassName('message')[0];
    var words = message.innerHTML.trim().split(' ');
    var htmlString = "";
    for (var w = 0; w < words.length; w++) {
        if (gwEmotes[words[w]]) {
            var emoteTooltip;
            if (bttv === true) {
                emoteTooltip = "Emote: " + words[w] + "<br/>GameWisp-Badges Global Emote";
            } else {
                emoteTooltip = "" + words[w];
            }
            htmlString = htmlString + "<span class='emoticon tooltip' style='padding:0 !important;margin-top:0px !important;height:" + gwEmotes[words[w]].height + "px;width:" + gwEmotes[words[w]].width + "px;background-image:url(https://i.imgur.com/" + gwEmotes[words[w]].url + ");background-size:contain;background-position:center center;' alt='" + emoteTooltip + "' original-title='" + emoteTooltip + "' data-regex='" + emoteTooltip + "'></span>" + " ";
        } else {
            htmlString = htmlString + words[w] + " ";
        }
    }
    var range = document.createRange();
    var messageElement = range.createContextualFragment(htmlString);
    while (message.hasChildNodes()) {
        message.removeChild(message.lastChild);
    }
    message.textContent = "";
    message.appendChild(messageElement);
}


// Start of text shadow - CC
function Hex2RGB(hex, opacity) {
    var rgb = "";

    rgb = "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) + "," + opacity + ")";

    return rgb;
}

function hexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
}

function hexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
}

function hexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
}

function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}
