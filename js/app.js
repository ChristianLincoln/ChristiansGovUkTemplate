class govuk_page {
    add_menu_item(element) {
        console.log(element.attr("href"))
        console.log($(element.attr("href")))
        this.menus.push($(element.attr("href")))
        let menus = this.menus
        let previous_menu = this.previous_menu
        element.on("click",function() {
            menus.forEach(function (menu, index) {
                menu.css("display","none")
            });
            if (previous_menu !== element.id) {
                $(element.attr("href")).css("display","inherit")
                previous_menu = element.id
            } else {
                previous_menu = ""
            }
        });
    }
    add_theme_button(button) {
        let themes = this.themes
        button.on("click",function(){
            if(button.attr("value") == "light") {DarkReader.disable(); return;}
            DarkReader.enable(themes[button.attr("value")])
        });
    }

    set_site_font(name) {
        let current_font_style = document.createElement("style")
        current_font_style.id = "font-family-style-sheet"
        current_font_style.innerText = `
    * {
      font-family: `+name+`, sans-serif !important;
    }
    `
        document.head.appendChild(current_font_style)
    }
    set_site_scale(scale) {
        document.body.style.zoom = scale
    }
    add_font_button(button) {
        let set_site_font = this.set_site_font
        let fonts = this.fonts
        button.on("click",function(){
            let previous_style = document.getElementById("font-family-style-sheet")
            document.head.removeChild(previous_style)
            set_site_font(fonts[button.attr("value")])
        })
    }
    add_font_size_button(button) {
        let set_site_scale = this.set_site_scale
        button.on("click",function() {
            set_site_scale(Number(button.attr("value")))
        })
    }
    constructor() {
        this.themes = {
            "night":{
                brightness: 100,
                contrast: 120,
                sepia: 60
            },
            "dark":{
                brightness: 100,
                contrast: 100,
                sepia: 0
            },
        }

        this.fonts = {
            "comic sans": `"Comic Sans MS"`,
            "original": "hyperlegible",
            "monospace": "Monospace"
        }


        this.menus = []
        this.previous_menu = ""
        this.chat_messages = []

        this.add_font_button($("#comic-sans-font-button"))
        this.add_font_button($("#monospace-font-button"))
        this.add_font_button($("#original-font-button"))

        this.add_menu_item($("#nav-chat-button"))
        this.add_menu_item($("#nav-appearance-button"))
        this.add_menu_item($("#nav-services-button"))

        this.add_font_size_button($("#large-font-button"))
        this.add_font_size_button($("#normal-font-button"))

        this.add_theme_button($("#light-theme-button"))
        this.add_theme_button($("#dark-theme-button"))
        this.add_theme_button($("#night-theme-button"))

        let chat_messages = this.chat_messages
        let making_chat_request = false
        $("#chat-bot-submit").on("click",function(){
            if (making_chat_request) {return;}
            making_chat_request = true;
            console.log("request!")
            chat_messages.push($("#chat-box").val())
            let data = {"messages":chat_messages}
            console.log(data)
            console.log(data.toString())
            $.ajax({
                type: "POST",
                url: "/chatbot",
                contentType: 'application/json',
                dataType : 'json',
                data: JSON.stringify(data),
                success: function(data, status) {
                    let new_text = document.createElement("div")
                    new_text.classList.add("govuk-inset-text");
                    new_text.innerHTML = data.result;
                    document.getElementById("chat-section").appendChild(new_text)
                    making_chat_request = false;
                }
            });
        })

        this.set_site_font("GDS Transport")
    }
}

const my_page = new govuk_page()