
const googleTranslateConfig = {
    lang: "en",
    /* Ð•ÑÐ»Ð¸ ÑÐºÑ€Ð¸Ð¿Ñ‚ Ð½Ðµ Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÐµÑ‚ Ð½Ð° Ð¿Ð¾Ð´Ð´Ð¾Ð¼ÐµÐ½Ðµ, 
    Ñ€Ð°ÑÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð¸Ñ€ÑƒÐ¹Ñ‚Ðµ Ð¸
    ÑƒÐºÐ°Ð¶Ð¸Ñ‚Ðµ Ð¾ÑÐ½Ð¾Ð²Ð½Ð¾Ð¹ Ð´Ð¾Ð¼ÐµÐ½ Ð² ÑÐ²Ð¾Ð¹ÑÑ‚Ð²Ðµ domain */
    /* domain: "Get-Web.Site" */
};

function TranslateInit() {
    let code = TranslateGetCode();
    // ÐÐ°Ñ…Ð¾Ð´Ð¸Ð¼ Ñ„Ð»Ð°Ð³ Ñ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ñ‹Ð¼ ÑÐ·Ñ‹ÐºÐ¾Ð¼ Ð´Ð»Ñ Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð° Ð¸ Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ðº Ð½ÐµÐ¼Ñƒ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ð¹ ÐºÐ»Ð°ÑÑ
    $('[data-google-lang="' + code + '"]').addClass('language__img_active');

    if (code == googleTranslateConfig.lang) {
        // Ð•ÑÐ»Ð¸ ÑÐ·Ñ‹Ðº Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ, ÑÐ¾Ð²Ð¿Ð°Ð´Ð°ÐµÑ‚ Ñ ÑÐ·Ñ‹ÐºÐ¾Ð¼ Ð½Ð° ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¹ Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð¸Ð¼
        // Ð¢Ð¾ Ð¾Ñ‡Ð¸Ñ‰Ð°ÐµÐ¼ ÐºÑƒÐºÐ¸
        TranslateCookieHandler(null, googleTranslateConfig.domain);
    }

    // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€ÑƒÐµÐ¼ Ð²Ð¸Ð´Ð¶ÐµÑ‚ Ñ ÑÐ·Ñ‹ÐºÐ¾Ð¼ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ
    new google.translate.TranslateElement({
        pageLanguage: googleTranslateConfig.lang,
    });

    // Ð’ÐµÑˆÐ°ÐµÐ¼ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ðµ  ÐºÐ»Ð¸Ðº Ð½Ð° Ñ„Ð»Ð°Ð³Ð¸
    $('[data-google-lang]').click(function () {
        TranslateCookieHandler("/auto/" + $(this).attr("data-google-lang"), googleTranslateConfig.domain);
        // ÐŸÐµÑ€ÐµÐ·Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÐ¼ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ
        window.location.reload();
    });
}

function TranslateGetCode() {
    // Ð•ÑÐ»Ð¸ ÐºÑƒÐºÐ¸ Ð½ÐµÑ‚, Ñ‚Ð¾ Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÐ¼ Ð´ÐµÑ„Ð¾Ð»Ñ‚Ð½Ñ‹Ð¹ ÑÐ·Ñ‹Ðº
    let lang = ($.cookie('googtrans') != undefined && $.cookie('googtrans') != "null") ? $.cookie('googtrans') : googleTranslateConfig.lang;
    return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
    // Ð—Ð°Ð¿Ð¸ÑÑ‹Ð²Ð°ÐµÐ¼ ÐºÑƒÐºÐ¸ /ÑÐ·Ñ‹Ðº_ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¹_Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð¸Ð¼/ÑÐ·Ñ‹Ðº_Ð½Ð°_ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¹_Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð¸Ð¼
    $.cookie('googtrans', val);
    $.cookie("googtrans", val, {
        domain: "." + document.domain,
    });

    if (domain == "undefined") return;
    // Ð·Ð°Ð¿Ð¸ÑÑ‹Ð²Ð°ÐµÐ¼ ÐºÑƒÐºÐ¸ Ð´Ð»Ñ Ð´Ð¾Ð¼ÐµÐ½Ð°, ÐµÑÐ»Ð¸ Ð¾Ð½ Ð½Ð°Ð·Ð½Ð°Ñ‡ÐµÐ½ Ð² ÐºÐ¾Ð½Ñ„Ð¸Ð³Ðµ
    $.cookie("googtrans", val, {
        domain: domain,
    });

    $.cookie("googtrans", val, {
        domain: "." + domain,
    });
}